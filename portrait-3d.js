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
      // Lặp vài lần để tìm điểm ảnh thật sự rơi vào vị trí này, tránh mép bị nhân đôi.
      vec2 p = uv;
      for (int i = 0; i < 5; i++) p = uv - offset * texture2D(depth, p).r;
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

  async function create({ photo, depthSrc, pointerArea, boxLayer }) {
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
    let targetX = 0, targetY = 0, curX = 0, curY = 0, lastPointer = -1e9;
    const STRENGTH = .03, IDLE_AFTER = 1800;

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
      if (now - lastPointer > IDLE_AFTER) {
        // Không có con trỏ (kể cả màn hình cảm ứng): tự đổi góc nhìn rất chậm.
        targetX = Math.sin(now * .00052) * .6;
        targetY = Math.sin(now * .00037) * .3;
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

    new ResizeObserver(resize).observe(canvas);
    new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      request();
    }).observe(canvas);
    document.addEventListener('visibilitychange', request);
  }

  window.Portrait3D = { create };
})();
