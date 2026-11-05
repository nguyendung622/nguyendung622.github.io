// Ảnh chân dung 3D: dùng bản đồ độ sâu (assets/images/dung-depth.jpg) để lệch từng điểm ảnh theo góc nhìn.
// Không có WebGL hoặc người xem bật giảm chuyển động thì ảnh thường vẫn hiển thị như cũ.
(function () {
  const VERTEX = `
    attribute vec2 pos;
    varying vec2 uv;
    void main() {
      uv = vec2(pos.x * .5 + .5, .5 - pos.y * .5);
      gl_Position = vec4(pos, 0., 1.);
    }`;

  const FRAGMENT = `
    precision mediump float;
    varying vec2 uv;
    uniform sampler2D photo;
    uniform sampler2D depth;
    uniform vec2 offset;
    void main() {
      // Phóng nhẹ để còn phần ảnh dư ở mép khi lệch (khớp với scale của ảnh thường trong CSS).
      vec2 base = .5 + (uv - .5) / 1.06;
      // Lớp ở độ sâu .35 đứng yên: người nhô ra đi một chiều, nền đi chiều ngược lại.
      // Lặp để tìm điểm ảnh thật sự rơi vào vị trí này, tránh mép bị nhân đôi.
      vec2 p = base;
      for (int i = 0; i < 8; i++) p = base - offset * (texture2D(depth, p).r - .35);
      gl_FragColor = texture2D(photo, p);
    }`;

  function compile(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
  }

  function texture(gl, unit, image) {
    gl.activeTexture(gl.TEXTURE0 + unit);
    gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  }

  const loaded = img => (img.complete && img.naturalWidth
    ? Promise.resolve(img)
    : new Promise((resolve, reject) => {
      img.addEventListener('load', () => resolve(img), { once: true });
      img.addEventListener('error', reject, { once: true });
    }));

  async function create({ photo, depthSrc, pointerArea, boxLayer, motionButton }) {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = document.createElement('canvas');
    canvas.className = 'portrait-3d';
    canvas.setAttribute('aria-hidden', 'true');
    const gl = canvas.getContext('webgl', { alpha: false, antialias: false });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERTEX), fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
    if (!vs || !fs) return;
    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const depthImage = new Image();
    depthImage.src = depthSrc;
    try {
      await Promise.all([loaded(photo), loaded(depthImage)]);
    } catch (err) {
      return; // Không tải được bản đồ độ sâu: giữ ảnh thường.
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const attr = gl.getAttribLocation(program, 'pos');
    gl.enableVertexAttribArray(attr);
    gl.vertexAttribPointer(attr, 2, gl.FLOAT, false, 0, 0);
    texture(gl, 0, photo);
    texture(gl, 1, depthImage);
    gl.uniform1i(gl.getUniformLocation(program, 'photo'), 0);
    gl.uniform1i(gl.getUniformLocation(program, 'depth'), 1);
    const offsetLoc = gl.getUniformLocation(program, 'offset');

    photo.after(canvas);
    canvas.addEventListener('webglcontextlost', () => canvas.remove());

    let w = 0, h = 0, raf = 0, visible = false;
    let targetX = 0, targetY = 0, curX = 0, curY = 0, lastPointer = -1e9, motionActive = false;
    const STRENGTH = .05, IDLE_AFTER = 1800;

    function resize() {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(devicePixelRatio || 1, 2);
      w = r.width; h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      request();
    }

    function frame(now) {
      raf = 0;
      if (!motionActive && now - lastPointer > IDLE_AFTER) {
        // Không có con trỏ và chưa có cảm biến: tự đổi góc nhìn rất chậm.
        targetX = Math.sin(now * .00052) * .85;
        targetY = Math.sin(now * .00037) * .45;
      }
      curX += (targetX - curX) * .07;
      curY += (targetY - curY) * .07;

      const ox = curX * STRENGTH, oy = curY * STRENGTH * (w / (h || 1));
      gl.uniform2f(offsetLoc, ox, oy);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      canvas.classList.add('is-ready');

      // Khung phát hiện đi theo khuôn mặt và logo.
      boxLayer.style.setProperty('--bx', `${(ox * w).toFixed(2)}px`);
      boxLayer.style.setProperty('--by', `${(oy * h).toFixed(2)}px`);

      if (visible && !document.hidden) request();
    }

    function request() {
      if (!raf && w) raf = requestAnimationFrame(frame);
    }

    pointerArea.addEventListener('pointermove', e => {
      if (e.pointerType === 'touch') return;
      const r = canvas.getBoundingClientRect();
      const nx = (e.clientX - (r.left + r.width / 2)) / (innerWidth / 2);
      const ny = (e.clientY - (r.top + r.height / 2)) / (innerHeight / 2);
      targetX = Math.max(-1, Math.min(1, nx * 1.5));
      targetY = Math.max(-1, Math.min(1, ny * 1.5));
      lastPointer = performance.now();
    });

    // Điện thoại: góc nhìn đi theo độ nghiêng của máy.
    const clamp = v => Math.max(-1, Math.min(1, v));
    const RANGE = 11; // nghiêng chừng này độ là đạt mức lệch tối đa
    let baseX = null, baseY = null;

    function onOrientation(e) {
      if (e.beta === null || e.gamma === null) return;
      // Khi xoay ngang màn hình, trục của cảm biến đổi chỗ cho nhau.
      const angle = (screen.orientation && screen.orientation.angle) || 0;
      const x = angle === 90 ? e.beta : angle === 270 ? -e.beta : e.gamma;
      const y = angle === 90 ? -e.gamma : angle === 270 ? e.gamma : e.beta;
      if (baseX === null) { baseX = x; baseY = y; }
      // Mốc trôi chậm theo tư thế cầm máy, nên cầm ở góc nào cũng dùng được.
      baseX += (x - baseX) * .008;
      baseY += (y - baseY) * .008;
      targetX = clamp((x - baseX) / RANGE);
      targetY = clamp((y - baseY) / RANGE);
      if (!motionActive) {
        motionActive = true;
        boxLayer.classList.add('has-motion');
        if (motionButton) motionButton.hidden = true;
      }
      boxLayer.style.setProperty('--ry', `${(targetX * 13).toFixed(2)}deg`);
      boxLayer.style.setProperty('--rx', `${(-targetY * 9).toFixed(2)}deg`);
      request();
    }

    if ('DeviceOrientationEvent' in window && matchMedia('(hover: none)').matches) {
      // Android gửi dữ liệu ngay. iPhone và iPad chỉ gửi sau khi người xem bấm và đồng ý,
      // nên nút chỉ hiện khi đã chờ một lúc mà chưa nhận được dữ liệu.
      addEventListener('deviceorientation', onOrientation);
      if (motionButton && typeof DeviceOrientationEvent.requestPermission === 'function') {
        setTimeout(() => { if (!motionActive) motionButton.hidden = false; }, 1000);
        motionButton.addEventListener('click', async () => {
          motionButton.hidden = true;
          try {
            await DeviceOrientationEvent.requestPermission();
          } catch (err) { /* không được phép: giữ hiệu ứng tự chuyển động */ }
        });
      }
    }

    new ResizeObserver(resize).observe(canvas);
    new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      request();
    }).observe(canvas);
    document.addEventListener('visibilitychange', request);
  }

  window.Portrait3D = { create };
})();
