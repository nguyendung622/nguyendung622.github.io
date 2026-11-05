// Sơ đồ 3D các kiến trúc mô hình, vẽ bằng canvas 2D. Nội dung chữ của từng bước nằm ở data.js (researchModels).
// Mỗi khối có số bước n, trùng với thứ tự trong danh sách "steps" của mô hình đó.
(function () {
  const block = (id, n, x, y, z, w, h, d, extra) => ({ id, n, x, y, z, w, h, d, ...extra });
  const plane = (id, n, x, y, z, h, d, extra) => block(id, n, x, y, z, .08, h, d, extra);

  const SCENES = {
    // ViT: các khối cùng kích thước, kết thúc bằng lớp phân loại
    dinov3: {
      blocks: [
        plane('img', 1, 0, 0, 0, 3, 3, { grid: 6 }),
        plane('patch', 2, 1.1, 0, 0, 2.8, 2.8, { grid: 8 }),
        block('v1', 3, 2.2, 0, 0, .3, 2.3, 2.3, { warm: true }),
        block('v2', 3, 2.8, 0, 0, .3, 2.3, 2.3, { warm: true }),
        block('v3', 3, 3.4, 0, 0, .3, 2.3, 2.3, { warm: true, mark: true }),
        block('v4', 3, 4, 0, 0, .3, 2.3, 2.3, { warm: true }),
        block('v5', 3, 4.6, 0, 0, .3, 2.3, 2.3, { warm: true }),
        block('tok', 4, 6, 0, 0, .25, 2, 2, { grid: 4 }),
        block('head', 5, 7.3, 0, 0, .35, 2.2, .5),
        plane('out', 6, 8.7, 0, 0, 3, 3, { bars: [.82, .5, .18, .12] })
      ],
      links: [['img', 'patch', 'v1', 'v2', 'v3', 'v4', 'v5', 'tok', 'head', 'out']]
    },

    // Tích chập phân cấp: độ phân giải giảm dần qua 4 tầng
    convnext: {
      blocks: [
        plane('img', 1, 0, 0, 0, 3, 3, { grid: 6 }),
        block('stem', 2, 1.2, 0, 0, .35, 2.7, 2.7),
        block('m1', 3, 2.4, 0, 0, .5, 2.3, 2.3, { warm: true }),
        block('m2', 3, 3.5, 0, 0, .6, 1.9, 1.9, { warm: true, mark: true }),
        block('m3', 3, 4.7, 0, 0, .7, 1.5, 1.5, { warm: true }),
        block('m4', 3, 6, 0, 0, .8, 1.1, 1.1, { warm: true }),
        block('pool', 4, 7.2, 0, 0, .2, 1.1, 1.1),
        block('fc', 5, 8.2, 0, 0, .35, 2.2, .5),
        plane('out', 6, 9.5, 0, 0, 3, 3, { bars: [.88, .42, .22, .1] })
      ],
      links: [['img', 'stem', 'm1', 'm2', 'm3', 'm4', 'pool', 'fc', 'out']]
    },

    // Backbone ViT → Projector → Decoder (có object queries) → heads
    rfdetr: {
      blocks: [
        plane('img', 1, 0, 0, 0, 3, 3, { grid: 6 }),
        block('b1', 2, 1.3, 0, 0, .3, 2.4, 2.4),
        block('b2', 2, 1.9, 0, 0, .3, 2.4, 2.4, { mark: true }),
        block('b3', 2, 2.5, 0, 0, .3, 2.4, 2.4),
        block('p', 3, 3.8, 0, 0, .5, 1.7, 1.7),
        ...[-1, -.5, 0, .5, 1].map((z, i) => block(`q${i}`, 4, 5.5, -1.9, z, .3, .3, .3, { warm: true, mark: i === 2 })),
        block('d1', 5, 5.1, 0, 0, .28, 2.1, 2.1, { warm: true }),
        block('d2', 5, 5.5, 0, 0, .28, 2.1, 2.1, { warm: true, mark: true }),
        block('d3', 5, 5.9, 0, 0, .28, 2.1, 2.1, { warm: true }),
        ...[.9, .3, -.3, -.9].map((y, i) => block(`f${i}`, 6, 7.2, y, 0, .35, .4, .9, { mark: i === 0 })),
        plane('out', 7, 8.5, 0, 0, 3, 3, { boxes: [[.15, .2, .35, .3], [.55, .5, .3, .35], [.2, .62, .22, .2]] })
      ],
      links: [
        ['img', 'b1', 'b2', 'b3', 'p', 'd1', 'd2', 'd3', 'f1', 'out'],
        ['q2', 'd2'], ['d3', 'f0'], ['d3', 'f2'], ['d3', 'f3'], ['f0', 'out'], ['f3', 'out']
      ]
    },

    // Backbone → Encoder → Decoder → tinh chỉnh phân phối cạnh hộp
    dfine: {
      blocks: [
        plane('img', 1, 0, 0, 0, 3, 3, { grid: 6 }),
        block('b1', 2, 1.3, 0, 0, .35, 2.7, 2.7),
        block('b2', 2, 2, 0, 0, .5, 2, 2, { mark: true }),
        block('b3', 2, 2.8, 0, 0, .65, 1.4, 1.4),
        block('e1', 3, 3.9, 0, 0, .35, 2.1, 2.1),
        block('e2', 3, 4.4, 0, 0, .35, 2.1, 2.1, { mark: true }),
        ...[-1, -.5, 0, .5, 1].map((z, i) => block(`q${i}`, 4, 6, -1.9, z, .3, .3, .3, { warm: true, mark: i === 2 })),
        block('d1', 5, 5.6, 0, 0, .28, 2.1, 2.1, { warm: true }),
        block('d2', 5, 6, 0, 0, .28, 2.1, 2.1, { warm: true, mark: true }),
        block('d3', 5, 6.4, 0, 0, .28, 2.1, 2.1, { warm: true }),
        plane('fdr', 6, 7.7, 0, 0, 2.4, 2.4, { bars: [.3, .85, .55, .15] }),
        plane('out', 7, 9, 0, 0, 3, 3, { boxes: [[.15, .2, .35, .3], [.55, .5, .3, .35]] })
      ],
      links: [['img', 'b1', 'b2', 'b3', 'e1', 'e2', 'd1', 'd2', 'd3', 'fdr', 'out'], ['q2', 'd2']]
    },

    // Ba cột Backbone → Neck → Head, mỗi cột có ba tỉ lệ
    yolo26: {
      blocks: [
        plane('img', 1, -1.2, 0, 0, 3, 3, { grid: 6 }),
        block('c1', 2, 1, 2, 0, .5, 1.6, 1.6),
        block('c2', 2, 1, 0, 0, .5, 1.2, 1.2, { mark: true }),
        block('c3', 2, 1, -1.7, 0, .5, .9, .9),
        block('p1', 3, 3.5, 2, 0, .5, 1.6, 1.6, { warm: true }),
        block('p2', 3, 3.5, 0, 0, .5, 1.2, 1.2, { warm: true, mark: true }),
        block('p3', 3, 3.5, -1.7, 0, .5, .9, .9, { warm: true }),
        block('h1', 4, 6, 2, 0, .6, .9, .9),
        block('h2', 4, 6, 0, 0, .6, .9, .9, { mark: true }),
        block('h3', 4, 6, -1.7, 0, .6, .9, .9),
        plane('out', 5, 8.2, 0, 0, 3, 3, { boxes: [[.2, .15, .3, .25], [.55, .55, .28, .3]] })
      ],
      links: [
        ['img', 'c1', 'c2', 'c3'], ['c1', 'p1'], ['c2', 'p2'], ['c3', 'p3'], ['p3', 'p2', 'p1'],
        ['p1', 'h1', 'out'], ['p2', 'h2', 'out'], ['p3', 'h3', 'out']
      ]
    },

    // Video → tubelet → encoder → (predictor khi huấn luyện) → probe → xác suất
    vjepa2: {
      blocks: [
        plane('f1', 1, 0, 0, 0, 2.8, 2.8, { grid: 4 }),
        plane('f2', 1, .4, 0, 0, 2.8, 2.8, { grid: 4, mark: true }),
        plane('f3', 1, .8, 0, 0, 2.8, 2.8, { grid: 4 }),
        block('tub', 2, 2, 0, 0, .7, 2.5, 2.5, { grid: 5 }),
        block('v1', 3, 3.3, 0, 0, .3, 2.3, 2.3, { warm: true }),
        block('v2', 3, 3.9, 0, 0, .3, 2.3, 2.3, { warm: true, mark: true }),
        block('v3', 3, 4.5, 0, 0, .3, 2.3, 2.3, { warm: true }),
        block('pred', 4, 5.8, 2.1, 0, .9, 1, 1),
        block('probe', 5, 6.3, 0, 0, .35, 2, .5),
        plane('out', 6, 7.8, 0, 0, 3, 3, { bars: [.84, .46, .2, .1] })
      ],
      links: [['f1', 'f2', 'f3', 'tub', 'v1', 'v2', 'v3', 'probe', 'out'], ['v3', 'pred']]
    },

    // Video → che token → encoder → (decoder khi tiền huấn luyện) → phân loại
    videomae2: {
      blocks: [
        plane('f1', 1, 0, 0, 0, 2.8, 2.8, { grid: 4 }),
        plane('f2', 1, .4, 0, 0, 2.8, 2.8, { grid: 4, mark: true }),
        plane('f3', 1, .8, 0, 0, 2.8, 2.8, { grid: 4 }),
        block('tok', 2, 2, 0, 0, .25, 2.5, 2.5, { warm: true, grid: 8 }),
        block('v1', 3, 3.2, 0, 0, .3, 1.9, 1.9),
        block('v2', 3, 3.8, 0, 0, .3, 1.9, 1.9, { mark: true }),
        block('v3', 3, 4.4, 0, 0, .3, 1.9, 1.9),
        block('dec', 4, 5.8, 2.1, 0, .9, 1.1, 1.1, { warm: true }),
        block('fc', 5, 6.1, 0, 0, .35, 2, .5),
        plane('out', 6, 7.6, 0, 0, 3, 3, { bars: [.78, .5, .24, .12] })
      ],
      links: [['f1', 'f2', 'f3', 'tok', 'v1', 'v2', 'v3', 'fc', 'out'], ['v3', 'dec']]
    },

    // Video → chồng heatmap tư thế → mạng 3D → phân loại
    posec3d: {
      blocks: [
        plane('f1', 1, 0, 0, 0, 2.8, 2.8, { grid: 4 }),
        plane('f2', 1, .4, 0, 0, 2.8, 2.8, { grid: 4, mark: true }),
        plane('f3', 1, .8, 0, 0, 2.8, 2.8, { grid: 4 }),
        block('h1', 2, 2.1, 0, 0, .12, 2.4, 2.4, { warm: true }),
        block('h2', 2, 2.4, 0, 0, .12, 2.4, 2.4, { warm: true, mark: true }),
        block('h3', 2, 2.7, 0, 0, .12, 2.4, 2.4, { warm: true }),
        block('c1', 3, 3.9, 0, 0, .55, 2, 2),
        block('c2', 3, 4.9, 0, 0, .7, 1.5, 1.5, { mark: true }),
        block('c3', 3, 6, 0, 0, .85, 1.1, 1.1),
        block('pool', 4, 7.1, 0, 0, .2, 1.1, 1.1),
        block('fc', 5, 8, 0, 0, .35, 2, .5),
        plane('out', 6, 9.3, 0, 0, 3, 3, { bars: [.86, .4, .22, .1] })
      ],
      links: [['f1', 'f2', 'f3', 'h1', 'h2', 'h3', 'c1', 'c2', 'c3', 'pool', 'fc', 'out']]
    },

    // Prompt + ảnh → backbone chung → bộ phát hiện và bộ theo dõi → mặt nạ
    sam3: {
      blocks: [
        plane('img', 1, 0, 0, 0, 3, 3, { grid: 6 }),
        ...[-.6, 0, .6].map((z, i) => block(`pr${i}`, 2, 4.4, -2.2, z, .35, .35, .35, { warm: true, mark: i === 1 })),
        block('b1', 3, 1.3, 0, 0, .4, 2.6, 2.6),
        block('b2', 3, 2.1, 0, 0, .4, 2.6, 2.6, { mark: true }),
        block('det', 4, 4.4, 0, 0, .6, 2, 2, { warm: true }),
        block('pres', 5, 4.4, 1.9, 0, .4, .4, .4, { warm: true }),
        block('trk', 6, 6, 1.5, 0, .6, 1.4, 1.4),
        plane('out', 7, 7.8, 0, 0, 3, 3, { mask: true })
      ],
      links: [['img', 'b1', 'b2', 'det', 'out'], ['pr1', 'det'], ['det', 'pres'], ['b2', 'trk', 'out']]
    },

    // Backbone → Pixel decoder → Transformer decoder (masked attention) → mặt nạ
    mask2former: {
      blocks: [
        plane('img', 1, 0, 0, 0, 3, 3, { grid: 6 }),
        block('b1', 2, 1.2, 0, 0, .4, 2.6, 2.6),
        block('b2', 2, 2, 0, 0, .5, 1.9, 1.9, { mark: true }),
        block('b3', 2, 2.9, 0, 0, .6, 1.3, 1.3),
        block('p1', 3, 4, 0, 0, .5, 1.5, 1.5),
        block('p2', 3, 4.8, 0, 0, .4, 2.1, 2.1, { mark: true }),
        block('p3', 3, 5.5, 0, 0, .3, 2.7, 2.7),
        ...[-1, -.5, 0, .5, 1].map((z, i) => block(`q${i}`, 4, 7.1, -2.2, z, .3, .3, .3, { warm: true, mark: i === 2 })),
        block('d1', 5, 6.7, 0, 0, .28, 2.1, 2.1, { warm: true }),
        block('d2', 5, 7.1, 0, 0, .28, 2.1, 2.1, { warm: true, mark: true }),
        block('d3', 5, 7.5, 0, 0, .28, 2.1, 2.1, { warm: true }),
        block('h', 6, 8.5, 0, 0, .35, 1.4, 1),
        plane('out', 7, 9.7, 0, 0, 3, 3, { mask: true })
      ],
      links: [['img', 'b1', 'b2', 'b3', 'p1', 'p2', 'p3', 'd1', 'd2', 'd3', 'h', 'out'], ['q2', 'd2']]
    },

    // Hình chữ U với skip connection, cấu hình tự động từ dữ liệu
    nnunet: {
      blocks: [
        plane('img', 1, -1.4, 2.2, 0, 2.6, 2.6, { grid: 6 }),
        block('cfg', 2, -1.4, -1, 0, .9, .9, .9, { warm: true }),
        block('e1', 3, 0, 2.2, 0, .4, 2.4, 2.4),
        block('e2', 3, 1.2, .8, 0, .55, 1.8, 1.8, { mark: true }),
        block('e3', 3, 2.4, -.4, 0, .7, 1.3, 1.3),
        block('bn', 4, 4, -1.6, 0, .95, .95, .95),
        block('d3', 5, 5.6, -.4, 0, .7, 1.3, 1.3),
        block('d2', 5, 6.8, .8, 0, .55, 1.8, 1.8, { mark: true }),
        block('d1', 5, 8, 2.2, 0, .4, 2.4, 2.4),
        plane('out', 6, 9.4, 2.2, 0, 2.6, 2.6, { mask: true })
      ],
      links: [
        ['img', 'e1', 'e2', 'e3', 'bn', 'd3', 'd2', 'd1', 'out'],
        ['img', 'cfg'], ['e1', 'd1'], ['e2', 'd2'], ['e3', 'd3']
      ]
    }
  };

  // Mỗi mặt: 4 góc (bit 4 = x+, bit 2 = y+, bit 1 = z+), pháp tuyến, độ sáng.
  const FACES = [
    { c: [0, 1, 3, 2], n: [-1, 0, 0], a: .34 }, { c: [4, 6, 7, 5], n: [1, 0, 0], a: .34 },
    { c: [0, 4, 5, 1], n: [0, -1, 0], a: .16 }, { c: [2, 3, 7, 6], n: [0, 1, 0], a: .5 },
    { c: [0, 2, 6, 4], n: [0, 0, -1], a: .24 }, { c: [1, 5, 7, 3], n: [0, 0, 1], a: .24 }
  ];
  const easeOut = t => 1 - Math.pow(1 - t, 3);

  function create(canvas, { onHover } = {}) {
    const ctx = canvas.getContext('2d');
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let scene = null, center = [0, 0, 0], camera = 30, startedAt = 0;
    let baseY = -.62, rotX = .36, swayY = 0, dragging = false, moved = 0, lastX = 0, lastY = 0;
    let w = 0, h = 0, dpr = 1, raf = 0, visible = false;
    let scale = 0, ox = 0, oy = 0, highlight = null, markers = [];
    let colors = { accent: '#c7adf5', warm: '#f3c98b', ground: '#1b1226' };

    function readColors() {
      const cs = getComputedStyle(canvas);
      colors = {
        accent: cs.getPropertyValue('--accent').trim(),
        warm: cs.getPropertyValue('--warm').trim(),
        ground: cs.getPropertyValue('--sec-bg').trim()
      };
    }

    function show(id) {
      const next = SCENES[id];
      if (!next || next === scene) return;
      scene = next;
      const byId = {};
      const lo = [Infinity, Infinity, Infinity], hi = [-Infinity, -Infinity, -Infinity];
      scene.blocks.forEach(b => {
        byId[b.id] = b;
        [[b.x, b.w], [b.y, b.h], [b.z, b.d]].forEach(([c, s], k) => {
          lo[k] = Math.min(lo[k], c - s / 2);
          hi[k] = Math.max(hi[k], c + s / 2);
        });
      });
      scene.byId = byId;
      center = lo.map((v, k) => (v + hi[k]) / 2);
      camera = Math.hypot(hi[0] - lo[0], hi[1] - lo[1], hi[2] - lo[2]) * 1.7;
      baseY = scene.view ? scene.view.ry : -.62;
      rotX = scene.view ? scene.view.rx : .36;
      startedAt = performance.now();
      highlight = null;
      scale = 0;
      request();
    }

    function setHighlight(n) {
      highlight = n;
      request();
    }

    function draw(now) {
      const ry = baseY + swayY, sy = Math.sin(ry), cy = Math.cos(ry), sx = Math.sin(rotX), cx = Math.cos(rotX);
      const rotate = (x, y, z) => {
        const x1 = x * cy + z * sy, z1 = -x * sy + z * cy;
        return [x1, y * cx - z1 * sx, y * sx + z1 * cx];
      };
      const unit = (x, y, z) => {
        const [a, b, c] = rotate(x - center[0], y - center[1], z - center[2]);
        const s = camera / (camera - c);
        return [a * s, -b * s, c];
      };

      // Co giãn để toàn bộ sơ đồ luôn nằm trong khung ở mọi góc xoay.
      let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
      scene.blocks.forEach(b => {
        for (let k = 0; k < 8; k++) {
          const p = unit(b.x + (k & 4 ? b.w : -b.w) / 2, b.y + (k & 2 ? b.h : -b.h) / 2, b.z + (k & 1 ? b.d : -b.d) / 2);
          x0 = Math.min(x0, p[0]); x1 = Math.max(x1, p[0]);
          y0 = Math.min(y0, p[1]); y1 = Math.max(y1, p[1]);
        }
      });
      const margin = 26;
      const fit = Math.min((w - margin * 2) / (x1 - x0), (h - margin * 2) / (y1 - y0));
      const tx = w / 2 - (x0 + x1) / 2 * fit, ty = h / 2 - (y0 + y1) / 2 * fit;
      const k = scale === 0 || reduced.matches ? 1 : .18;
      scale += (fit - scale) * k; ox += (tx - ox) * k; oy += (ty - oy) * k;

      const screen = (x, y, z) => {
        const p = unit(x, y, z);
        return [ox + p[0] * scale, oy + p[1] * scale, p[2]];
      };
      const path = pts => {
        ctx.beginPath();
        pts.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])));
      };

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';

      const elapsed = reduced.matches ? 1e6 : now - startedAt;
      const progress = i => easeOut(Math.min(1, Math.max(0, (elapsed - i * 38) / 620)));

      // Đường nối
      const linkAlpha = Math.min(1, elapsed / 700);
      const routes = scene.links.map(ids => ids.map(id => scene.byId[id]));
      ctx.strokeStyle = colors.accent;
      ctx.lineWidth = 1;
      ctx.globalAlpha = .38 * linkAlpha * (highlight === null ? 1 : .5);
      routes.forEach(route => {
        path(route.map(b => screen(b.x, b.y, b.z)));
        ctx.stroke();
      });

      // Khối: xa vẽ trước, gần vẽ sau
      const order = scene.blocks.map((b, i) => ({ b, i, z: rotate(b.x - center[0], b.y - center[1], b.z - center[2])[2] }))
        .sort((a, c) => a.z - c.z);

      order.forEach(({ b, i }) => {
        const e = progress(i);
        if (e <= 0) return;
        const hw = b.w * e / 2, hh = b.h * e / 2, hd = b.d * e / 2;
        const corners = [];
        for (let c = 0; c < 8; c++) corners.push(screen(b.x + (c & 4 ? hw : -hw), b.y + (c & 2 ? hh : -hh), b.z + (c & 1 ? hd : -hd)));
        const color = b.warm ? colors.warm : colors.accent;
        const dim = highlight !== null && highlight !== b.n ? .28 : 1;
        const lift = highlight === b.n ? 1.5 : 1;
        ctx.fillStyle = ctx.strokeStyle = color;
        FACES.forEach(f => {
          if (rotate(f.n[0], f.n[1], f.n[2])[2] <= 0) return;
          path(f.c.map(c => corners[c]));
          ctx.closePath();
          ctx.globalAlpha = Math.min(.95, f.a * lift) * dim * e;
          ctx.fill();
          ctx.globalAlpha = Math.min(1, .75 * lift) * dim * e;
          ctx.lineWidth = highlight === b.n ? 1.4 : 1;
          ctx.stroke();
        });

        // Trang trí trên mặt vuông góc trục x đang quay về phía người xem
        const fx = b.x + (rotate(1, 0, 0)[2] > 0 ? hw : -hw);
        const onFace = (u, v) => screen(fx, b.y + hh - u * hh * 2, b.z - hd + v * hd * 2);
        ctx.globalAlpha = .8 * dim * e;
        ctx.lineWidth = .8;
        if (b.grid) {
          for (let g = 1; g < b.grid; g++) {
            const t = g / b.grid;
            path([onFace(t, 0), onFace(t, 1)]); ctx.stroke();
            path([onFace(0, t), onFace(1, t)]); ctx.stroke();
          }
        }
        if (b.boxes) {
          ctx.strokeStyle = colors.warm;
          ctx.lineWidth = 1.6;
          b.boxes.forEach(([u, v, du, dv]) => {
            path([onFace(u, v), onFace(u, v + dv), onFace(u + du, v + dv), onFace(u + du, v)]);
            ctx.closePath();
            ctx.stroke();
          });
        }
        if (b.bars) {
          ctx.fillStyle = colors.warm;
          ctx.globalAlpha = .85 * dim * e;
          b.bars.forEach((value, n) => {
            const top = .2 + n * .16, end = .12 + value * .76;
            path([onFace(top, .12), onFace(top, end), onFace(top + .1, end), onFace(top + .1, .12)]);
            ctx.closePath();
            ctx.fill();
          });
        }
        if (b.mask) {
          ctx.fillStyle = colors.warm;
          const pts = [];
          for (let a = 0; a < 26; a++) {
            const t = a / 26 * Math.PI * 2, r = 1 + .16 * Math.sin(t * 3) + .08 * Math.cos(t * 5);
            pts.push(onFace(.48 + Math.sin(t) * .24 * r, .52 + Math.cos(t) * .28 * r));
          }
          path(pts);
          ctx.closePath();
          ctx.globalAlpha = .75 * dim * e;
          ctx.fill();
        }
      });

      // Dữ liệu chạy dọc theo đường nối
      if (!reduced.matches) {
        ctx.fillStyle = colors.warm;
        routes.forEach((route, r) => {
          const segments = route.length - 1;
          for (let s = 0; s < 2; s++) {
            const t = ((now * .00016 + r * .23 + s * .5) % 1) * segments;
            const seg = Math.min(segments - 1, Math.floor(t)), f = t - seg;
            const a = route[seg], c = route[seg + 1];
            const p = screen(a.x + (c.x - a.x) * f, a.y + (c.y - a.y) * f, a.z + (c.z - a.z) * f);
            ctx.globalAlpha = (highlight === null ? .95 : .4) * linkAlpha;
            ctx.beginPath();
            ctx.arc(p[0], p[1], 2.2, 0, Math.PI * 2);
            ctx.fill();
          }
        });
      }

      // Số thứ tự của từng bước
      markers = [];
      const seen = {};
      const marked = new Set(scene.blocks.filter(b => b.mark).map(b => b.n));
      scene.blocks.forEach((b, i) => {
        if (seen[b.n] || (marked.has(b.n) && !b.mark)) return;
        seen[b.n] = true;
        const e = progress(i);
        const p = screen(b.x, b.y + b.h / 2 + .28, b.z);
        markers.push({ n: b.n, x: p[0], y: p[1] });
        const on = highlight === b.n;
        ctx.globalAlpha = e * (highlight === null || on ? 1 : .45);
        ctx.fillStyle = on ? colors.warm : colors.accent;
        ctx.beginPath();
        ctx.arc(p[0], p[1], 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = colors.ground;
        ctx.font = "500 11px 'JetBrains Mono', ui-monospace, monospace";
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(String(b.n), p[0], p[1] + .5);
      });
      ctx.globalAlpha = 1;
    }

    function frame(now) {
      raf = 0;
      if (!scene || !w) return;
      if (!dragging && !reduced.matches) swayY = Math.sin(now * .00042) * .15;
      draw(now);
      if (visible && !document.hidden && !reduced.matches) request();
    }

    function request() {
      if (!raf) raf = requestAnimationFrame(frame);
    }

    function resize() {
      const r = canvas.getBoundingClientRect();
      dpr = Math.min(devicePixelRatio || 1, 2);
      w = r.width; h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      scale = 0;
      request();
    }

    const markerAt = e => {
      const r = canvas.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      const hit = markers.find(m => Math.hypot(m.x - x, m.y - y) <= 16);
      return hit ? hit.n : null;
    };

    canvas.addEventListener('pointerdown', e => {
      dragging = true;
      moved = 0;
      lastX = e.clientX; lastY = e.clientY;
      canvas.setPointerCapture(e.pointerId);
      canvas.classList.add('is-dragging');
    });
    canvas.addEventListener('pointermove', e => {
      if (!dragging) {
        const n = markerAt(e);
        canvas.classList.toggle('on-marker', n !== null);
        if (e.pointerType !== 'touch' && n !== highlight && onHover) onHover(n);
        return;
      }
      const dx = e.clientX - lastX, dy = e.clientY - lastY;
      moved += Math.abs(dx) + Math.abs(dy);
      lastX = e.clientX; lastY = e.clientY;
      baseY += dx * .007;
      rotX = Math.max(-.25, Math.min(1.15, rotX + dy * .006));
      request();
    });
    const endDrag = e => {
      dragging = false;
      canvas.classList.remove('is-dragging');
      // Chạm vào số thứ tự trên màn hình cảm ứng cũng làm sáng bước đó.
      if (moved < 6 && onHover) onHover(markerAt(e));
      request();
    };
    canvas.addEventListener('pointerup', endDrag);
    canvas.addEventListener('pointercancel', endDrag);
    canvas.addEventListener('pointerleave', () => {
      if (!dragging && onHover && highlight !== null) onHover(null);
    });

    new ResizeObserver(resize).observe(canvas);
    new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) request();
    }).observe(canvas);
    document.addEventListener('visibilitychange', request);
    new MutationObserver(() => { readColors(); request(); })
      .observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(request);

    readColors();
    return { show, setHighlight };
  }

  window.ModelViewer = { create };
})();
