// Nội dung cá nhân nằm ở data.js. Danh sách công trình đọc từ Google Drive (cột theo tiêu đề).
const PUBLICATIONS_SHEET_ID = '1QH-UAOGskfazBcLWSgasXxsnTnvsqnOU';

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = matchMedia('(hover: hover) and (pointer: fine)');

const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[c]));

const foldText = text => String(text || '')
  .normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase();

const ARROW_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

/* ───────── Ngôn ngữ ───────── */
const I18N = {
  vi: {
    docTitle: 'TS. Nguyễn Dũng – Khoa Công nghệ Thông tin, Đại học Khoa học Huế',
    docDesc: 'Trang học thuật của TS. Nguyễn Dũng, giảng viên Khoa Công nghệ Thông tin, Trường Đại học Khoa học, Đại học Huế. Nghiên cứu về phát hiện đối tượng, học sâu và thị giác máy tính.',
    skip: 'Bỏ qua, đến nội dung chính',
    brandHome: 'Về đầu trang', navAria: 'Các mục chính', langAria: 'Chọn ngôn ngữ', themeLabel: 'Đổi giao diện sáng/tối',
    navBackground: 'Học vấn', navResearch: 'Nghiên cứu', navModels: 'Mô hình', navPubs: 'Công trình', navProjects: 'Đề tài', navTeaching: 'Giảng dạy', navContact: 'Liên hệ',
    ctaPubs: 'Xem công trình',
    portraitAlt: 'Chân dung TS. Nguyễn Dũng, mặc áo sơ mi trắng có logo HUSC, khoanh tay và mỉm cười',
    bboxFace: 'giảng viên',
    metricCitations: 'Trích dẫn', metricH: 'Chỉ số h',
    secBackground: 'Học vấn & công tác', eduTitle: 'Học vấn', careerTitle: 'Quá trình công tác', teachAreasTitle: 'Chuyên môn giảng dạy', fieldLabel: 'Ngành đào tạo', updating: 'Đang cập nhật', present: 'nay', highlightLead: 'Công bố nổi bật',
    appsTitle: 'Nghiên cứu qua hình ảnh', relatedShort: 'Công trình liên quan',
    appsNote: 'Khung nhận diện và điểm số được đặt thủ công để minh hoạ, không phải kết quả của mô hình. Ảnh từ Wikimedia Commons, đã thu nhỏ và cắt để hiển thị.',
    panoBox: 'cầu Trường Tiền', panoEyebrow: 'Huế, Việt Nam', panoTitle: 'Nơi tôi giảng dạy và nghiên cứu',
    secPlaces: 'Huế & nhà trường',
    placesNote: 'Ảnh từ Wikimedia Commons, đã thu nhỏ và cắt để hiển thị. Khung nhận diện và điểm số chỉ để minh hoạ, không phải kết quả của mô hình.',
    photoBy: 'Ảnh', publicDomain: 'phạm vi công cộng',
    secModels: 'Mô hình nghiên cứu', modelsAria: 'Chọn mô hình',
    modelsNote: 'Các mô hình tiêu biểu (SOTA), cập nhật 11/2026. Sơ đồ chỉ minh hoạ kiến trúc tổng quát; nhãn, khung và mặt nạ được đặt thủ công, chuỗi khung hình được cắt từ một ảnh tĩnh.',
    tasksTitle: 'Bốn bài toán, cùng một cảnh', tasksAria: 'Chọn bài toán', modelsSub: 'Mô hình SOTA', sourcePaper: 'Nguồn',
    modelHint: 'Kéo để xoay, chạm vào số để xem từng bước',
    relatedPapers: 'Công trình của tôi trong bài toán này (tham chiếu)', modelAlt: name => `Sơ đồ 3D kiến trúc ${name}`,
    statPubs: 'Công trình đã công bố & được chấp nhận',
    statIndexed: 'Đã công bố trong ISI / Scopus / WoS',
    statLead: 'Công trình là tác giả chính',
    statProjects: 'Đề tài, dự án khoa học',
    secResearch: 'Hướng nghiên cứu', secPubs: 'Công trình nghiên cứu', secProjects: 'Đề tài & dự án', secTeaching: 'Giảng dạy & giáo trình',
    corrNote: 'Dấu <b>*</b> chỉ tác giả liên hệ.',
    featured: 'Tiêu biểu', byYear: 'Theo năm',
    histAria: 'Lọc công trình theo năm', filterAria: 'Lọc theo loại công trình',
    all: 'Tất cả', journal: 'Tạp chí', conference: 'Hội nghị', book: 'Sách',
    searchLabel: 'Tìm công trình', searchPh: 'Tìm theo tên, tác giả, tạp chí…',
    loading: 'Đang tải danh sách công trình…',
    contactLead: 'Trao đổi về nghiên cứu, hợp tác hoặc giảng dạy',
    toTop: 'Về đầu trang ↑',
    live: 'Đang thực hiện',
    roles: {},
    national: 'Trong nước',
    accepted: 'Đã được chấp nhận', submitted: 'Đã nộp, chờ phản biện',
    other: 'Khác', pagesPrefix: 'tr.',
    copyEmail: 'Sao chép email', copyCite: 'Sao chép trích dẫn',
    copiedEmail: 'Đã sao chép email', copiedCite: 'Đã sao chép trích dẫn', copyFail: 'Trình duyệt không cho sao chép tự động',
    unit: 'Đơn vị', address: 'Địa chỉ', profiles: 'Hồ sơ học thuật',
    noMatch: 'Không có công trình nào phù hợp với bộ lọc.',
    loadFail: 'Chưa tải được danh sách công trình.',
    seeScholar: url => `Bạn có thể xem trên <a href="${url}" target="_blank" rel="noopener">Google Scholar</a>.`,
    pubsN: n => `${n} công trình`,
    yearAria: (y, n) => `Năm ${y}: ${n} công trình`,
    countAll: (n, s) => s ? `${n} công trình, gồm ${s} bài đã nộp đang chờ phản biện.` : `${n} công trình.`,
    countSome: (k, n) => `Hiển thị ${k} trong ${n} công trình.`
  },
  en: {
    docTitle: 'Dr. Dung Nguyen – Faculty of Information Technology, University of Sciences, Hue University',
    docDesc: 'Academic profile of Dr. Dung Nguyen, lecturer at the Faculty of Information Technology, University of Sciences, Hue University. Research in object detection, deep learning and computer vision.',
    skip: 'Skip to main content',
    brandHome: 'Back to top', navAria: 'Main sections', langAria: 'Choose language', themeLabel: 'Switch light/dark theme',
    navBackground: 'Background', navResearch: 'Research', navModels: 'Models', navPubs: 'Publications', navProjects: 'Projects', navTeaching: 'Teaching', navContact: 'Contact',
    ctaPubs: 'View publications',
    portraitAlt: 'Portrait of Dr. Dung Nguyen in a white shirt with the HUSC logo, arms crossed and smiling',
    bboxFace: 'lecturer',
    metricCitations: 'Citations', metricH: 'h-index',
    secBackground: 'Education & career', eduTitle: 'Education', careerTitle: 'Career', teachAreasTitle: 'Teaching areas', fieldLabel: 'Field of study', updating: 'To be updated', present: 'present', highlightLead: 'Selected publications',
    appsTitle: 'Research in pictures', relatedShort: 'Related publications',
    appsNote: 'The detection boxes and scores were placed by hand as an illustration and are not model output. Photos from Wikimedia Commons, resized and cropped for display.',
    panoBox: 'Truong Tien Bridge', panoEyebrow: 'Hue, Vietnam', panoTitle: 'Where I teach and do research',
    secPlaces: 'Hue & the university',
    placesNote: 'Photos from Wikimedia Commons, resized and cropped for display. The detection boxes and scores are illustrative, not model output.',
    photoBy: 'Photo', publicDomain: 'public domain',
    secModels: 'Research models', modelsAria: 'Choose a model',
    modelsNote: 'Representative state-of-the-art models, updated 11/2026. Diagrams show the general architecture only; labels, boxes and masks were placed by hand, and the frame sequence is cropped from one still photo.',
    tasksTitle: 'Four tasks, one scene', tasksAria: 'Choose a task', modelsSub: 'State-of-the-art models', sourcePaper: 'Source',
    modelHint: 'Drag to rotate, tap a number to see that step',
    relatedPapers: 'My work on this task (for reference)', modelAlt: name => `3D diagram of the ${name} architecture`,
    statPubs: 'Publications, published & accepted',
    statIndexed: 'Published in ISI / Scopus / WoS',
    statLead: 'Publications as lead author',
    statProjects: 'Research projects',
    secResearch: 'Research interests', secPubs: 'Publications', secProjects: 'Research projects', secTeaching: 'Teaching & textbooks',
    corrNote: '<b>*</b> marks the corresponding author.',
    featured: 'Selected', byYear: 'By year',
    histAria: 'Filter publications by year', filterAria: 'Filter by publication type',
    all: 'All', journal: 'Journal', conference: 'Conference', book: 'Book',
    searchLabel: 'Search publications', searchPh: 'Search by title, author, venue…',
    loading: 'Loading publications…',
    contactLead: 'Get in touch about research, collaboration or teaching',
    toTop: 'Back to top ↑',
    live: 'Ongoing',
    roles: { 'Chủ nhiệm': 'Principal Investigator', 'Thành viên chính': 'Key member', 'Thành viên': 'Member' },
    national: 'National',
    accepted: 'Accepted', submitted: 'Submitted, under review',
    other: 'Other', pagesPrefix: 'pp.',
    copyEmail: 'Copy email', copyCite: 'Copy citation',
    copiedEmail: 'Email copied', copiedCite: 'Citation copied', copyFail: 'Your browser blocked automatic copying',
    unit: 'Affiliation', address: 'Address', profiles: 'Academic profiles',
    noMatch: 'No publications match these filters.',
    loadFail: 'The publication list could not be loaded.',
    seeScholar: url => `You can view it on <a href="${url}" target="_blank" rel="noopener">Google Scholar</a>.`,
    pubsN: n => `${n} ${n === 1 ? 'publication' : 'publications'}`,
    yearAria: (y, n) => `${y}: ${n} ${n === 1 ? 'publication' : 'publications'}`,
    countAll: (n, s) => s ? `${n} publications, including ${s} submitted and under review.` : `${n} publications.`,
    countSome: (k, n) => `Showing ${k} of ${n} publications.`
  }
};

const root = document.documentElement;
let lang = root.lang === 'en' ? 'en' : 'vi';
const t = key => I18N[lang][key];

// Lấy bản tiếng Anh của một trường ("title" → "titleEn"); thiếu thì dùng bản tiếng Việt.
const tr = (obj, key) => (lang === 'en' && obj[`${key}En`]) || obj[key] || '';

function applyStaticText() {
  root.lang = lang;
  document.title = t('docTitle');
  $('meta[name="description"]').content = t('docDesc');
  $('link[rel="canonical"]').href = `https://nguyendung622.github.io/${lang === 'en' ? '?lang=en' : ''}`;

  $$('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
  $$('[data-i18n-html]').forEach(el => { el.innerHTML = t(el.dataset.i18nHtml); });
  $$('[data-i18n-aria-label]').forEach(el => el.setAttribute('aria-label', t(el.dataset.i18nAriaLabel)));
  $$('[data-i18n-placeholder]').forEach(el => { el.placeholder = t(el.dataset.i18nPlaceholder); });
  $$('[data-i18n-alt]').forEach(el => { el.alt = t(el.dataset.i18nAlt); });
  $$('.lang a').forEach(a => {
    if (a.dataset.lang === lang) a.setAttribute('aria-current', 'true');
    else a.removeAttribute('aria-current');
  });
}

/* ───────── Thông tin cơ bản ───────── */
let booted = false;

function renderProfile() {
  const p = profileData;
  const name = tr(p, 'name'), degree = tr(p, 'degree');
  const fullName = degree ? `${degree} ${name}` : name;
  $('#brand-name').textContent = fullName;
  $('#hero-eyebrow').textContent = `${tr(p, 'title')} · ${tr(p, 'department')}`;
  $('#hero-affil').textContent = tr(p, 'university');

  // Tên: từng dòng lộ dần (chỉ lần tải trang đầu); dòng cuối in nghiêng. Không tách chữ cái để giữ kerning.
  const nameEl = $('#hero-name');
  nameEl.setAttribute('aria-label', fullName);
  nameEl.classList.toggle('intro', !booted);
  const words = name.normalize('NFC').split(' ');
  const lines = [words.slice(0, -1).join(' '), words[words.length - 1]].filter(Boolean);
  nameEl.innerHTML = lines.map((line, i) =>
    `<span class="line" aria-hidden="true" style="--c:${i}">${i === 0 && degree ? `<span class="hero-degree">${esc(degree)}</span>` : ''}${esc(line)}</span>`
  ).join('');

  $('#hero-bio').innerHTML = tr(p, 'bio').split('\n').filter(s => s.trim()).map(s => `<p>${esc(s.trim())}</p>`).join('');
  $('#hero-links').innerHTML = externalLinks().map(externalLinkHtml).join('');
  $('[data-stat="projects"]').dataset.value = (p.projects || []).length;
  renderScholarMetrics();
}

// Chỉ hiện khi đã nhập đủ số liệu trong data.js.
function renderScholarMetrics() {
  const { citations, hIndex, asOf } = profileData.scholarMetrics || {};
  const ready = Number.isFinite(citations) && Number.isFinite(hIndex);
  $('#stats').classList.toggle('has-metrics', ready);
  $$('[data-metric]').forEach(el => { el.hidden = !ready; });
  if (!ready) return;
  $('[data-stat="citations"]').dataset.value = citations;
  $('[data-stat="hindex"]').dataset.value = hIndex;
  const url = profileData.links?.googleScholar;
  const source = `<a href="${esc(url)}" target="_blank" rel="noopener">Google Scholar</a>${asOf ? `, ${esc(asOf)}` : ''}`;
  $('#metric-citations').innerHTML = `${t('metricCitations')} (${source})`;
  $('#metric-hindex').innerHTML = `${t('metricH')} (${source})`;
}

function externalLinks() {
  const l = profileData.links || {};
  return [
    l.googleScholar && ['Google Scholar', l.googleScholar],
    l.researchgate && ['ResearchGate', l.researchgate],
    profileData.orcidUrl && ['ORCID', profileData.orcidUrl],
    l.github && ['GitHub', l.github],
    l.linkedin && ['LinkedIn', l.linkedin]
  ].filter(Boolean);
}

const externalLinkHtml = ([label, url]) =>
  `<a class="tlink" href="${esc(url)}" target="_blank" rel="noopener">${esc(label)}</a>`;

/* ───────── Hướng nghiên cứu + khung "phát hiện" chạy qua từng hướng ───────── */
const interests = { items: [], index: 0, timer: 0, visible: false, hovering: false };

function focusInterest(el) {
  if (!el) return;
  const wrap = $('#interests'), box = $('.detector', wrap);
  const w = wrap.getBoundingClientRect(), r = el.getBoundingClientRect();
  const pad = Math.max(5, r.height * .12);
  box.style.transform = `translate(${r.left - w.left - pad}px, ${r.top - w.top - pad * .6}px)`;
  box.style.width = `${r.width + pad * 2}px`;
  box.style.height = `${r.height + pad * 1.2}px`;
  box.classList.add('is-live');
  interests.items.forEach(i => i.classList.toggle('is-on', i === el));
}

function tickInterests() {
  const s = interests;
  clearTimeout(s.timer);
  if (!s.visible || s.hovering || document.hidden || reducedMotion.matches || !s.items.length) return;
  s.timer = setTimeout(() => {
    s.index = (s.index + 1) % s.items.length;
    focusInterest(s.items[s.index]);
    tickInterests();
  }, 2200);
}

function renderInterests() {
  const wrap = $('#interests');
  $$('.interest', wrap).forEach(el => el.remove());
  const list = lang === 'en' && profileData.researchInterestsEn ? profileData.researchInterestsEn : profileData.researchInterests || [];
  interests.items = list.map(text => {
    const el = document.createElement('span');
    el.className = 'interest';
    el.textContent = text;
    wrap.appendChild(el);
    return el;
  });
  interests.index = Math.min(interests.index, Math.max(0, interests.items.length - 1));
  if (interests.visible) focusInterest(interests.items[interests.index]);
}

function initInterests() {
  const wrap = $('#interests');
  wrap.addEventListener('pointerover', e => {
    const el = e.target.closest('.interest');
    if (!el) return;
    interests.hovering = true;
    interests.index = interests.items.indexOf(el);
    clearTimeout(interests.timer);
    focusInterest(el);
  });
  wrap.addEventListener('pointerleave', () => { interests.hovering = false; tickInterests(); });
  document.addEventListener('visibilitychange', tickInterests);
  new ResizeObserver(() => focusInterest(interests.items[interests.index])).observe(wrap);
  new IntersectionObserver(([entry]) => {
    interests.visible = entry.isIntersecting;
    if (interests.visible) focusInterest(interests.items[interests.index]);
    tickInterests();
  }, { threshold: .25 }).observe(wrap);
}

/* ───────── Ba task và mô hình nghiên cứu ───────── */
const models = { viewer: null, task: 0, model: 0 };

const currentTask = () => profileData.researchTasks.items[models.task];
const taskModels = () => (profileData.researchModels || []).filter(m => m.task === currentTask().id);
const currentModel = () => taskModels()[models.model];

function renderTaskCards() {
  const { demo, items } = profileData.researchTasks;
  const [x0, y0, x1, y1] = demo.box;
  const pct = (v, total) => +(v / total * 100).toFixed(2);
  const label = tr(demo, 'label');
  const overlay = {
    classification: `<span class="task-chip">${esc(label)} <b>${esc(demo.score)}</b></span>`,
    detection: boxHtml({ x: pct(x0, demo.width), y: pct(y0, demo.height), w: pct(x1 - x0, demo.width), h: pct(y1 - y0, demo.height), label, score: demo.score }),
    segmentation: `<svg class="task-mask" viewBox="0 0 ${demo.width} ${demo.height}" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><polygon points="${esc(demo.polygon)}" /></svg>`,
    action: `<div class="task-frames" aria-hidden="true">${[0, 1, 2].map(() => `<span><img src="${esc(demo.src)}" alt="" loading="lazy" /></span>`).join('')}</div>
      <span class="task-chip">${esc(tr(demo, 'actionLabel'))} <b>${esc(demo.actionScore)}</b></span>`
  };
  $('#task-tabs').innerHTML = items.map((task, i) => `
    <button class="task-card place r ${i === models.task ? 'is-on' : ''}" type="button" data-task="${i}" aria-pressed="${i === models.task}" style="--i:${i}">
      <div class="place-photo">
        <div class="place-stage">
          <img src="${esc(demo.src)}" width="${demo.width}" height="${demo.height}" alt="" loading="lazy" />
          ${overlay[task.id] || ''}
        </div>
        <span class="scanline place-scan" aria-hidden="true"></span>
      </div>
      <span class="task-text">
        <span class="task-name">${esc(tr(task, 'name'))}</span>
        <span class="task-out">${esc(tr(task, 'output'))}</span>
      </span>
    </button>`).join('');
  $('#task-credit').innerHTML = creditHtml(demo);
}

function renderModelPapers() {
  const box = $('#model-papers');
  // Công trình của tác giả gắn theo bài toán, không gắn với mô hình SOTA đang xem.
  const found = (currentTask().references || [])
    .map(key => pubState.all.find(p => p.title.toLowerCase().includes(key.toLowerCase())))
    .filter(Boolean);
  box.hidden = !found.length;
  $('#model-papers-list').innerHTML = found.map(p => `<li>
    ${p.href ? `<a class="tlink" href="${esc(p.href)}" target="_blank" rel="noopener">${esc(p.title)}</a>` : `<span>${esc(p.title)}</span>`}
    ${p.state !== 'published' ? `<span class="tag tag-line">${t(p.state)}</span>` : ''}
  </li>`).join('');
}

function renderModels() {
  const task = currentTask();
  $$('.task-card').forEach((card, i) => {
    card.classList.toggle('is-on', i === models.task);
    card.setAttribute('aria-pressed', String(i === models.task));
  });
  $('#task-detail').innerHTML = `<p class="task-question">${esc(tr(task, 'question'))}</p><p class="task-use">${esc(tr(task, 'use'))}</p>`;

  const list = taskModels();
  const model = list[models.model];
  if (!model) return;
  $('#model-tabs').innerHTML = list.map((m, i) =>
    `<button class="chip ${i === models.model ? 'is-on' : ''}" type="button" data-model="${i}" aria-pressed="${i === models.model}">${esc(tr(m, 'name'))}</button>`
  ).join('');
  $('#model-summary').textContent = tr(model, 'summary');
  $('#model-source').innerHTML = model.source
    ? `${t('sourcePaper')}: <a class="tlink" href="${esc(model.source)}" target="_blank" rel="noopener">${esc(tr(model, 'sourceLabel'))}</a>`
    : '';
  $('#model-canvas').setAttribute('aria-label', t('modelAlt')(tr(model, 'name')));
  $('#model-steps').innerHTML = model.steps.map((s, i) => `
    <li><button class="step" type="button" data-step="${i + 1}">
      <span class="step-no" aria-hidden="true">${i + 1}</span>
      <span><b>${esc(tr(s, 'name'))}</b><span>${esc(tr(s, 'desc'))}</span></span>
    </button></li>`).join('');
  renderModelPapers();
  if (models.viewer) models.viewer.show(model.id);
}

function highlightStep(n) {
  if (models.viewer) models.viewer.setHighlight(n);
  $$('.step').forEach(el => el.classList.toggle('is-on', Number(el.dataset.step) === n));
}

function initModels() {
  if (!window.ModelViewer || !$('#model-canvas')) return;
  models.viewer = ModelViewer.create($('#model-canvas'), { onHover: highlightStep });
  const first = currentModel();
  if (first) models.viewer.show(first.id);

  $('#task-tabs').addEventListener('click', e => {
    const card = e.target.closest('[data-task]');
    if (!card || Number(card.dataset.task) === models.task) return;
    models.task = Number(card.dataset.task);
    models.model = 0;
    renderModels();
  });
  $('#model-tabs').addEventListener('click', e => {
    const btn = e.target.closest('[data-model]');
    if (!btn) return;
    models.model = Number(btn.dataset.model);
    renderModels();
  });
  const stepsBox = $('#model-steps');
  const stepOf = e => {
    const el = e.target.closest('.step');
    return el ? Number(el.dataset.step) : null;
  };
  stepsBox.addEventListener('pointerover', e => highlightStep(stepOf(e)));
  stepsBox.addEventListener('pointerleave', () => highlightStep(null));
  stepsBox.addEventListener('focusin', e => highlightStep(stepOf(e)));
  stepsBox.addEventListener('focusout', () => highlightStep(null));
}

/* ───────── Đề tài ───────── */
function renderProjects() {
  const yearsOf = period => (String(period).match(/\d{4}/g) || []).map(Number);
  const isLive = p => /đang/i.test(p.status || '');
  const list = [...(profileData.projects || [])].sort((a, b) =>
    (isLive(b) - isLive(a)) ||
    (/chủ nhiệm/i.test(b.role) - /chủ nhiệm/i.test(a.role)) ||
    (Math.max(...yearsOf(b.period), 0) - Math.max(...yearsOf(a.period), 0)));

  $('#timeline').innerHTML = list.map((p, i) => {
    const lead = /chủ nhiệm/i.test(p.role || '');
    return `<li class="tl r ${isLive(p) ? 'is-live' : ''} ${lead ? 'is-lead' : ''}" style="--i:${Math.min(i, 3)}">
      <div class="tl-when">
        <span>${esc(p.period)}</span>
        ${isLive(p) ? `<span class="tl-live">${t('live')}</span>` : ''}
      </div>
      <h3 class="tl-title">${esc(tr(p, 'title'))}</h3>
      <div class="tl-meta">
        <span class="tag ${lead ? '' : 'tag-line'}">${esc(t('roles')[p.role] || p.role)}</span>
        <span>${esc(tr(p, 'sponsor'))}</span>
      </div>
    </li>`;
  }).join('');
}

/* ───────── Giảng dạy + giáo trình ───────── */
function renderTeaching() {
  $('#courses').innerHTML = (profileData.teaching || []).map((c, i) => `
    <a class="course r" style="--i:${i}" href="${esc(c.url)}" target="_blank" rel="noopener">
      <span class="course-no">${String(i + 1).padStart(2, '0')}</span>
      <span>
        <span class="course-name">${esc(tr(c, 'name'))}</span>
        <span class="course-desc">${esc(tr(c, 'description'))}</span>
      </span>
      <span class="course-go">${ARROW_ICON}</span>
    </a>`).join('');

  $('#books').innerHTML = (profileData.books || []).map(b => {
    const title = tr(b, 'title'), type = tr(b, 'type'), publisher = tr(b, 'publisher');
    const note = lang === 'en' ? b.noteEn : '';
    return `<article class="book r">
      <div class="book-3d" aria-hidden="true">
        <div class="book-cover">
          <span class="book-kind">${esc(type)}</span>
          <span class="book-name">${esc(title.replace(/^Giáo trình\s+/i, ''))}</span>
          <span class="book-pub">${esc(publisher)}, ${esc(b.year)}</span>
        </div>
      </div>
      <div class="book-info">
        <span class="tag">${esc(type)} · ${esc(b.year)}</span>
        <h3>${esc(title)}</h3>
        <p>${esc(tr(b, 'authors'))}</p>
        <p>${esc(publisher)} · ${esc(tr(b, 'field'))}${note ? ` · ${esc(note)}` : ''}</p>
        <p class="mono">ISBN ${esc(b.isbn)}</p>
      </div>
    </article>`;
  }).join('');
}

/* ───────── Học vấn và công tác ───────── */
function renderBackground() {
  const p = profileData;
  const areas = (lang === 'en' && p.teachingAreasEn) || p.teachingAreas || [];
  const education = (p.education || []).map(e => `<li>
      <span class="bg-when">${esc(e.year || t('updating'))}</span>
      <span class="bg-what">${esc(tr(e, 'degree'))}${tr(e, 'major') ? `, ${esc(tr(e, 'major'))}` : ''}</span>
      ${tr(e, 'place') ? `<span class="bg-where">${esc(tr(e, 'place'))}</span>` : ''}
    </li>`).join('');
  const career = (p.career || []).map(c => `<li>
      <span class="bg-when">${esc(c.from)} – ${esc(c.to || t('present'))}</span>
      <span class="bg-what">${esc(tr(c, 'role'))}</span>
      <span class="bg-where">${esc(tr(c, 'place'))}</span>
    </li>`).join('');
  $('#bg-cols').innerHTML = `
    <div class="bg-col r">
      <h3 class="sub-title">${t('eduTitle')}</h3>
      <ul class="bg-list">${education}</ul>
      ${tr(p, 'educationField') ? `<p class="bg-note">${t('fieldLabel')}: ${esc(tr(p, 'educationField'))}</p>` : ''}
    </div>
    <div class="bg-col r" style="--i:1">
      <h3 class="sub-title">${t('careerTitle')}</h3>
      <ul class="bg-list">${career}</ul>
      <h3 class="sub-title bg-sub">${t('teachAreasTitle')}</h3>
      <p class="bg-areas">${areas.map(esc).join(' · ')}</p>
    </div>`;
}

/* ───────── Huế và nhà trường ───────── */
function creditHtml(photo) {
  const author = photo.source
    ? `<a href="${esc(photo.source)}" target="_blank" rel="noopener">${esc(photo.author)}</a>`
    : esc(photo.author);
  const license = photo.license
    ? (photo.licenseUrl
      ? `<a href="${esc(photo.licenseUrl)}" target="_blank" rel="noopener">${esc(photo.license)}</a>`
      : esc(photo.license))
    : t('publicDomain');
  return `${t('photoBy')}: ${author}, ${license}`;
}

function boxHtml({ x, y, w, h, label, score, tone }, order = 0) {
  const classes = ['place-box', label ? '' : 'is-tiny', tone ? `tone-${tone}` : ''].filter(Boolean).join(' ');
  return `<div class="${classes}" aria-hidden="true" style="left:${x}%;top:${y}%;width:${w}%;height:${h}%;--b:${order}">
    ${label ? `<span class="bbox-label ${y < 11 ? 'is-inside' : ''} ${x + w / 2 > 52 ? 'is-right' : ''}">${esc(label)} <b>${esc(score)}</b></span>` : ''}
  </div>`;
}

// Khung trong data.js tính theo pixel của ảnh; đổi sang % để co giãn theo khung hiển thị.
function applicationBoxes(app) {
  const pct = (v, total) => +(v / total * 100).toFixed(2);
  return (app.boxes || []).map(([x0, y0, x1, y1, label, labelEn, score, tone], i) => boxHtml({
    x: pct(x0, app.width), y: pct(y0, app.height), w: pct(x1 - x0, app.width), h: pct(y1 - y0, app.height),
    label: lang === 'en' ? labelEn : label, score, tone
  }, i)).join('');
}

function renderApplications() {
  $('#apps').innerHTML = (profileData.applications || []).map((app, i) => `
    <figure class="place app r" style="--i:${i % 2}">
      <div class="place-photo">
        <div class="place-stage">
          <img src="${esc(app.src)}" width="${app.width}" height="${app.height}" alt="${esc(tr(app, 'title'))}" loading="lazy" />
          ${applicationBoxes(app)}
        </div>
        <span class="scanline place-scan" aria-hidden="true"></span>
      </div>
      <figcaption>
        <span>${esc(tr(app, 'title'))}</span>
        <p class="app-desc">${esc(tr(app, 'desc'))}</p>
        <div class="app-papers" data-app="${i}"></div>
        <small>${creditHtml(app)}</small>
      </figcaption>
    </figure>`).join('');
  renderApplicationPapers();
}

function renderApplicationPapers() {
  $$('.app-papers').forEach(box => {
    const app = profileData.applications[Number(box.dataset.app)];
    const found = (app.papers || [])
      .map(key => pubState.all.find(p => p.title.toLowerCase().includes(key.toLowerCase())))
      .filter(Boolean);
    box.innerHTML = found.map(p => (p.href
      ? `<a class="tlink" href="${esc(p.href)}" target="_blank" rel="noopener">${esc(p.title)}</a>`
      : `<span class="app-paper">${esc(p.title)}</span> <span class="tag tag-line">${t(p.state)}</span>`)).join('');
  });
}

function renderPlaces() {
  const places = profileData.places;
  if (!places) return;
  const pano = places.panorama, img = $('#pano-img');
  if (img.getAttribute('src') !== pano.src) {
    img.width = pano.width;
    img.height = pano.height;
    img.src = pano.src;
  }
  img.alt = tr(pano, 'alt');
  $('#pano-credit').innerHTML = creditHtml(pano);

  $('#places-grid').innerHTML = (places.gallery || []).map((p, i) => `
    <figure class="place r" style="--i:${i % 3}">
      <div class="place-photo">
        <div class="place-stage">
          <img src="${esc(p.src)}" width="${p.width}" height="${p.height}" alt="${esc(tr(p, 'caption'))}" loading="lazy" />
          ${p.box ? boxHtml({ ...p.box, label: tr(p.box, 'label') }) : ''}
        </div>
        <span class="scanline place-scan" aria-hidden="true"></span>
      </div>
      <figcaption>
        <span>${esc(tr(p, 'caption'))}</span>
        <small>${creditHtml(p)}</small>
      </figcaption>
    </figure>`).join('');
}

function initPano() {
  const pano = $('#pano'), layer = $('.pano-layer');
  onceInView(pano, () => pano.classList.add('in'));
  if (reducedMotion.matches) return;

  // Ảnh trôi chậm hơn trang khi cuộn, trong phần ảnh còn dư so với khung.
  let active = false, queued = false;
  const update = () => {
    queued = false;
    const r = pano.getBoundingClientRect();
    const slack = Math.max(0, layer.offsetHeight - pano.offsetHeight) / 2;
    const p = (r.top + r.height / 2 - innerHeight / 2) / (innerHeight / 2 + r.height / 2);
    layer.style.setProperty('--py', `${(Math.max(-1, Math.min(1, p)) * slack).toFixed(1)}px`);
  };
  const schedule = () => {
    if (active && !queued) { queued = true; requestAnimationFrame(update); }
  };
  new IntersectionObserver(([entry]) => {
    active = entry.isIntersecting;
    schedule();
  }).observe(pano);
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule);
}

/* ───────── Quét định kỳ: mô hình "nhận diện lại" các ảnh đang hiện trên màn hình ───────── */
let refreshScanTargets = () => { };

function initPeriodicScan() {
  if (reducedMotion.matches || !Element.prototype.animate) return;
  const COOLDOWN = 7000, TICK = 1200;
  const lastScan = new WeakMap(), visible = new Set();

  const io = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      visible.add(entry.target);
      // Lần xuất hiện đầu đã có hiệu ứng mở đầu, nên chờ đủ một nhịp mới quét.
      if (!lastScan.has(entry.target)) lastScan.set(entry.target, performance.now());
    } else {
      visible.delete(entry.target);
    }
  }), { threshold: .5 });

  refreshScanTargets = () => {
    io.disconnect();
    visible.clear();
    $$('.portrait-tilt, .place-photo, #pano').forEach(el => io.observe(el));
  };
  refreshScanTargets();

  const isReady = el => {
    const reveal = el.closest('.r');
    if (reveal && !reveal.classList.contains('in')) return false;
    return el.id !== 'pano' || el.classList.contains('in');
  };

  function countUp(el, delay) {
    if (!el.dataset.final) el.dataset.final = el.dataset.conf || el.textContent;
    const target = Number(el.dataset.final);
    setTimeout(() => {
      const start = performance.now();
      (function frame(now) {
        const p = Math.min(1, (now - start) / 650);
        el.textContent = (target * (1 - Math.pow(1 - p, 3))).toFixed(2);
        if (p < 1) requestAnimationFrame(frame);
      })(start);
    }, delay);
  }

  function play(el) {
    const scan = $('.scanline', el);
    const duration = 1500;
    if (scan) {
      scan.animate([
        { transform: 'translateY(-100%)', opacity: 1 },
        { opacity: 1, offset: .92 },
        { transform: 'translateY(460%)', opacity: 0 }
      ], { duration, easing: 'cubic-bezier(.45, 0, .4, 1)' });
    }
    const area = el.getBoundingClientRect();
    $$('.bbox, .place-box, .pano-box, .task-mask', el).forEach(box => {
      // Khung nhấp lại đúng lúc tia quét đi qua vị trí của nó.
      const at = Math.max(0, (box.getBoundingClientRect().top - area.top) / (area.height || 1));
      const delay = 120 + at * duration * .75;
      box.animate([{ opacity: 1 }, { opacity: .1, offset: .3 }, { opacity: 1 }], { duration: 900, delay, easing: 'ease-out' });
      const score = $('b', box);
      if (score) countUp(score, delay + 200);
    });
  }

  setInterval(() => {
    if (document.hidden) return;
    const now = performance.now();
    const due = [...visible]
      .filter(el => el.isConnected && isReady(el) && now - lastScan.get(el) >= COOLDOWN)
      .sort((a, b) => lastScan.get(a) - lastScan.get(b))[0];
    if (!due) return;
    lastScan.set(due, now);
    play(due);
  }, TICK);
}

/* ───────── Liên hệ ───────── */
function renderContact() {
  const p = profileData;
  const [mainEmail, ...otherEmails] = p.emails || [];
  $('#contact-mail').innerHTML = mainEmail ? `
    <a class="mail-big" href="mailto:${esc(mainEmail)}">${esc(mainEmail)}</a>
    <button class="copy-btn" type="button" data-copy="${esc(mainEmail)}">${t('copyEmail')}</button>` : '';

  $('#contact-grid').innerHTML = `
    <div>
      <h3>${t('unit')}</h3>
      <p>${esc(tr(p, 'department'))}<br>${esc(tr(p, 'university'))}</p>
    </div>
    <div>
      <h3>${t('address')}</h3>
      <p>${esc(tr(p, 'address'))}</p>
      ${otherEmails.map(e => `<p style="margin-top:.5rem"><a class="tlink" href="mailto:${esc(e)}">${esc(e)}</a></p>`).join('')}
    </div>
    <div>
      <h3>${t('profiles')}</h3>
      <ul>${externalLinks().map(l => `<li>${externalLinkHtml(l)}</li>`).join('')}</ul>
    </div>`;

  $('#foot-left').textContent = `© ${new Date().getFullYear()} ${[tr(p, 'degree'), tr(p, 'name')].filter(Boolean).join(' ')} · ${tr(p, 'university')}`;
}

/* ───────── Đọc dữ liệu công trình ───────── */
function normalizeHeader(text) {
  return String(text || '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '_');
}

function normalizeType(type) {
  const folded = normalizeHeader(type);
  if (folded.includes('journal') || folded.includes('tap_chi') || folded.includes('tapchi')) return 'journal';
  if (folded.includes('conference') || folded.includes('hoi_nghi') || folded.includes('hoinghi')) return 'conference';
  if (folded.includes('book') || folded.includes('sach')) return 'book';
  return '';
}

// Ô chỉ có dấu gạch ngang trong bảng nghĩa là "chưa có".
const cleanCell = value => {
  const text = String(value ?? '').replace(/\s+,/g, ',').replace(/\s+/g, ' ').trim();
  return /^[-–—]+$/.test(text) ? '' : text;
};

function toPublicationRecord(item) {
  const year = parseInt(item.year, 10);
  const rec = {
    year: Number.isNaN(year) ? 0 : year,
    title: cleanCell(item.title),
    authors: cleanCell(item.authors),
    journal: cleanCell(item.journal),
    publisher: cleanCell(item.publisher),
    volume: cleanCell(item.volume),
    pages: cleanCell(item.pages),
    type: normalizeType(item.type),
    role: cleanCell(item.role),
    classification: cleanCell(item.classification),
    href: '',
    state: 'published'
  };

  // Cột Link/DOI đôi khi ghi trạng thái ("Submited", "Accepted, chờ publish") thay vì đường dẫn.
  const link = cleanCell(item.doi) || cleanCell(item.url);
  if (/^https?:\/\//i.test(link)) rec.href = link;
  else if (/^10\.\d{4,}\//.test(link)) rec.href = `https://doi.org/${link}`;
  else if (/accept|chấp nhận/i.test(link)) rec.state = 'accepted';
  else if (/submit|review|đã nộp|phản biện/i.test(link)) rec.state = 'submitted';

  if (!rec.type) {
    const source = `${rec.journal} ${rec.title}`.toLowerCase();
    rec.type = /conference|proceeding|workshop|symposium|hoi nghi/.test(source) ? 'conference' : 'journal';
  }
  return rec;
}

function parseSheetRows(rows) {
  if (!Array.isArray(rows) || rows.length === 0) return [];

  const header = (rows[0] || []).map(normalizeHeader);
  const aliases = {
    year: ['year', 'nam', 'published_year', 'publication_year', 'nam_xuat_ban'],
    title: ['title', 'tieu_de', 'ten_bai_bao', 'paper_title', 'article_title', 'ten_bai', 'bai_bao'],
    authors: ['authors', 'tac_gia', 'author', 'dong_tac_gia', 'danh_sach_tac_gia'],
    journal: ['journal', 'venue', 'tap_chi_hoi_nghi', 'tap_chi', 'conference_name', 'noi_dang', 'source', 'publication'],
    publisher: ['publisher', 'nha_xuat_ban', 'nxb', 'published_by', 'publisher_name'],
    volume: ['volume'],
    pages: ['pages', 'trang', 'page', 'pp'],
    doi: ['doi', 'doi_link', 'link_doi', 'link'],
    url: ['url', 'pdf', 'fulltext', 'full_text'],
    type: ['type', 'loai', 'category'],
    role: ['role', 'vai_tro', 'vai_tro_tac_gia'],
    classification: ['classification', 'phan_loai', 'phanloai', 'index', 'indexed']
  };

  const indexByKey = {};
  Object.keys(aliases).forEach(key => {
    const exact = header.findIndex(h => aliases[key].includes(h));
    indexByKey[key] = exact >= 0
      ? exact
      : header.findIndex(h => aliases[key].some(alias => h.includes(alias)));
  });

  const hasHeader = indexByKey.title >= 0;
  const dataRows = hasHeader ? rows.slice(1) : rows;

  // Bảng không có dòng tiêu đề: dùng thứ tự cột thông dụng.
  if (!hasHeader) {
    const maxCols = Math.max(...dataRows.map(r => (r || []).length), 0);
    const order = maxCols >= 11
      ? ['stt', 'title', 'year', 'type', 'journal', 'publisher', 'volume', 'role', 'classification', 'authors', 'doi']
      : ['year', 'title', 'authors', 'journal', 'publisher', 'volume', 'pages', 'doi', 'url', 'type'];
    order.forEach((key, idx) => {
      if (indexByKey[key] < 0) indexByKey[key] = idx;
    });
  }

  return dataRows
    .filter(r => (r || []).some(v => String(v || '').trim() !== ''))
    .map(row => {
      const obj = {};
      Object.keys(indexByKey).forEach(key => {
        const idx = indexByKey[key];
        obj[key] = idx >= 0 ? String(row[idx] || '').trim() : '';
      });
      return toPublicationRecord(obj);
    })
    .filter(pub => pub.title);
}

async function fetchPublications() {
  const url = `https://docs.google.com/spreadsheets/d/${PUBLICATIONS_SHEET_ID}/gviz/tq?tqx=out:json`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Không tải được dữ liệu (${res.status})`);
  const text = await res.text();
  const prefix = 'google.visualization.Query.setResponse(';
  const start = text.indexOf(prefix);
  if (start < 0) throw new Error('Dữ liệu trả về không đúng định dạng');
  const table = JSON.parse(text.slice(start + prefix.length, text.lastIndexOf(');')))?.table;
  if (!table) return [];
  const headers = (table.cols || []).map(col => (col?.label || col?.id || '').trim());
  const rows = (table.rows || []).map(r => (r.c || []).map(cell => (cell?.v ?? '').toString()));
  return parseSheetRows([headers, ...rows]);
}

/* ───────── Công trình: phân loại ───────── */
const INDEXED_RE = /ISI|SCIE|ESCI|Scopus|WoS/i;
const isIndexed = p => p.state !== 'submitted' && INDEXED_RE.test(p.classification);
const isLeadAuthor = p => /chính/i.test(p.role);
const ME_RE = /(Nguyễn Dũng|Dung Nguyen)(\*?)/g;

// "Hội nghị quốc tế (Scopus, WoS)" → "Scopus, WoS" vì loại công trình đã có nhãn riêng.
function classificationLabel(p) {
  if (p.state === 'submitted') return '';
  const c = p.classification;
  const inParens = c.match(/\(([^)]+)\)/);
  if (inParens && !/^ISI/i.test(c)) return inParens[1];
  if (/trong nước/i.test(c)) return t('national');
  return c;
}

const typeName = type => (['journal', 'conference', 'book'].includes(type) ? t(type) : '');

const venueHtml = p => {
  const parts = [];
  if (p.journal) parts.push(`<em>${esc(p.journal)}</em>`);
  if (p.publisher && p.publisher !== p.journal) parts.push(esc(p.publisher));
  if (p.volume) parts.push(esc(p.volume));
  if (p.pages) parts.push(`${t('pagesPrefix')} ${esc(p.pages)}`);
  return parts.join(' · ');
};

function citationText(p) {
  const authors = p.authors.replace(/\*/g, '');
  return [`${authors} (${p.year}). ${p.title}.`, p.journal && `${p.journal}.`, p.publisher && p.publisher !== p.journal && `${p.publisher}.`, p.href]
    .filter(Boolean).join(' ');
}

/* ───────── Công trình: hiển thị ───────── */
const pubState = { all: [], type: 'all', year: null, query: '', status: 'loading' };

function renderStats(pubs) {
  const counted = pubs.filter(p => p.state !== 'submitted');
  const set = (key, value) => { $(`[data-stat="${key}"]`).dataset.value = value; };
  set('pubs', counted.length);
  set('indexed', pubs.filter(p => p.state === 'published' && isIndexed(p)).length);
  set('lead', counted.filter(isLeadAuthor).length);
  runCounters();
}

// Tạp chí có xếp hạng: Q nhỏ trước, cùng Q thì IF cao trước.
const quartile = p => Number((p.classification.match(/Q([1-4])/) || [])[1] || 9);
const impact = p => parseFloat((p.classification.match(/(?:IF|CiteScore)\s*([\d.]+)/i) || [])[1] || 0);
const rankedPubs = pubs => pubs
  .filter(p => p.state === 'published' && p.href && quartile(p) < 9)
  .sort((a, b) => quartile(a) - quartile(b) || impact(b) - impact(a));

function renderHighlight(pubs) {
  const top = rankedPubs(pubs).filter(p => quartile(p) === 1);
  const box = $('#hero-highlight');
  box.hidden = !top.length;
  box.innerHTML = top.length ? `<span class="hl-lead">${t('highlightLead')}</span> ${top.map(p => {
    const rank = [`Q${quartile(p)}`, impact(p) ? `IF ${impact(p)}` : ''].filter(Boolean).join(', ');
    return `<a class="tlink" href="${esc(p.href)}" target="_blank" rel="noopener">${esc(p.journal)} (${esc(rank)})</a>`;
  }).join(' ')}` : '';
}

function renderFeatured(pubs) {
  const list = rankedPubs(pubs).slice(0, 3);
  if (!list.length) return;

  $('#featured').innerHTML = list.map((p, i) => `
    <a class="feat r" style="--i:${i}" href="${esc(p.href)}" target="_blank" rel="noopener">
      <span class="feat-venue">${esc(p.journal)} · ${p.year}</span>
      <h4 class="feat-title">${esc(p.title)}</h4>
      <span class="feat-foot">
        <span class="tag">${esc(classificationLabel(p))}</span>
        <span class="feat-arrow" aria-hidden="true">↗</span>
      </span>
    </a>`).join('');
  $('#featured-block').hidden = false;
}

function renderHistogram(pubs) {
  const counts = new Map();
  pubs.forEach(p => { if (p.year) counts.set(p.year, (counts.get(p.year) || 0) + 1); });
  if (!counts.size) return;
  const years = [...counts.keys()];
  const [lo, hi] = [Math.min(...years), Math.max(...years)];
  const span = Array.from({ length: hi - lo + 1 }, (_, i) => lo + i);
  const max = Math.max(...counts.values());
  const hist = $('#hist');

  hist.innerHTML = span.map((y, k) => {
    const n = counts.get(y) || 0;
    return `<button class="hist-col ${n === max ? 'is-peak' : ''}" type="button" data-year="${y}"
        aria-pressed="${pubState.year === y}" aria-label="${esc(t('yearAria')(y, n))}" ${n ? '' : 'disabled'} style="--k:${k}">
      <span class="hist-n">${n}</span>
      <span class="hist-bar" style="--h:${Math.round(n / max * 78)}%"></span>
    </button>`;
  }).join('');

  if (!$('.hist-years')) {
    const axis = document.createElement('div');
    axis.className = 'hist-years';
    axis.setAttribute('aria-hidden', 'true');
    axis.innerHTML = span.map(y => `<span>${y}</span>`).join('');
    hist.after(axis);
    // Thanh mọc lên khi cuộn tới, không phải khi trang vừa tải.
    onceInView(hist, () => hist.classList.add('in'));
  }
}

function pubItemHtml(p, n) {
  const authors = esc(p.authors).replace(ME_RE, '<strong>$1$2</strong>');
  const cls = classificationLabel(p);
  const stateTag = p.state !== 'published' ? `<span class="tag tag-line">${t(p.state)}</span>` : '';
  const shownLink = p.href.replace(/^https?:\/\/(dx\.)?(doi\.org\/)?/, '');
  return `<li class="pub" style="--n:${Math.min(n, 14)}">
    <div class="pub-tags">
      <span class="tag tag-plain">${typeName(p.type)}</span>
      ${cls ? `<span class="tag">${esc(cls)}</span>` : ''}
      ${stateTag}
    </div>
    <h4 class="pub-title">${p.href ? `<a href="${esc(p.href)}" target="_blank" rel="noopener">${esc(p.title)}</a>` : esc(p.title)}</h4>
    ${p.authors ? `<p class="pub-authors">${authors}</p>` : ''}
    <p class="pub-venue">${venueHtml(p)}</p>
    <div class="pub-actions">
      ${p.href ? `<a class="pub-act" href="${esc(p.href)}" target="_blank" rel="noopener">${esc(shownLink)}</a>` : ''}
      <button class="pub-act" type="button" data-cite="${esc(citationText(p))}">${t('copyCite')}</button>
    </div>
  </li>`;
}

const STATE_ORDER = { published: 0, accepted: 1, submitted: 2 };

function renderPubList({ animate = true } = {}) {
  const { all, type, year, query } = pubState;
  const q = foldText(query.trim());
  const shown = all.filter(p =>
    (type === 'all' || (type === 'indexed' ? isIndexed(p) : p.type === type)) &&
    (!year || p.year === year) &&
    (!q || foldText(`${p.title} ${p.authors} ${p.journal} ${p.publisher} ${p.classification}`).includes(q)));

  $('#pub-count').textContent = shown.length === all.length
    ? t('countAll')(all.length, all.filter(p => p.state === 'submitted').length)
    : t('countSome')(shown.length, all.length);

  const box = $('#pub-list');
  box.classList.toggle('animate', animate);
  if (!shown.length) {
    box.innerHTML = `<p class="pub-empty">${t('noMatch')}</p>`;
    return;
  }

  // Năm mới trước; trong cùng năm: bài đã công bố lên trước, bài mới nhập (cuối bảng) lên trên.
  const ordered = shown
    .map((p, i) => [p, i])
    .sort((a, b) => b[0].year - a[0].year || STATE_ORDER[a[0].state] - STATE_ORDER[b[0].state] || b[1] - a[1])
    .map(([p]) => p);

  const byYear = new Map();
  ordered.forEach(p => {
    if (!byYear.has(p.year)) byYear.set(p.year, []);
    byYear.get(p.year).push(p);
  });

  let n = 0;
  box.innerHTML = [...byYear.keys()].map(y => `<section class="pub-year">
      <div class="pub-year-label">${y || t('other')}<small>${t('pubsN')(byYear.get(y).length)}</small></div>
      <ul>${byYear.get(y).map(p => pubItemHtml(p, n++)).join('')}</ul>
    </section>`).join('');
}

function renderPublications({ animate = true } = {}) {
  if (pubState.status === 'loading') {
    $('#pub-count').textContent = t('loading');
    return;
  }
  if (pubState.status === 'failed') {
    const scholar = profileData.links?.googleScholar;
    $('#pub-count').textContent = '';
    $('#pub-list').innerHTML = `<p class="pub-empty">${t('loadFail')} ${scholar ? t('seeScholar')(esc(scholar)) : ''}</p>`;
    $$('.hist, .pub-controls, .pub-panel .sub-title').forEach(el => { el.style.display = 'none'; });
    return;
  }
  renderHighlight(pubState.all);
  renderFeatured(pubState.all);
  renderHistogram(pubState.all);
  renderPubList({ animate });
}

function bindPubControls() {
  $$('.chip').forEach(btn => btn.addEventListener('click', () => {
    $$('.chip').forEach(b => b.classList.toggle('is-on', b === btn));
    pubState.type = btn.dataset.filter;
    renderPubList();
  }));

  $('#hist').addEventListener('click', e => {
    const btn = e.target.closest('.hist-col');
    if (!btn) return;
    const y = Number(btn.dataset.year);
    pubState.year = pubState.year === y ? null : y;
    $$('.hist-col').forEach(b => b.setAttribute('aria-pressed', String(Number(b.dataset.year) === pubState.year)));
    renderPubList();
  });

  $('#featured').addEventListener('pointermove', e => {
    const card = e.target.closest('.feat');
    if (!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty('--x', `${e.clientX - r.left}px`);
    card.style.setProperty('--y', `${e.clientY - r.top}px`);
    if (reducedMotion.matches) return;
    card.style.setProperty('--try', `${((e.clientX - r.left) / r.width - .5) * 9}deg`);
    card.style.setProperty('--trx', `${(.5 - (e.clientY - r.top) / r.height) * 7}deg`);
  });

  let debounce = 0;
  $('#pub-search').addEventListener('input', e => {
    clearTimeout(debounce);
    debounce = setTimeout(() => { pubState.query = e.target.value; renderPubList(); }, 160);
  });

  // Khi in hoặc xuất PDF cần số liệu cuối cùng, không phải số đang đếm dở.
  addEventListener('beforeprint', () => {
    $$('[data-stat]').forEach(el => {
      if (!el.dataset.value) return;
      el.dataset.done = '1';
      el.dataset.final = '1';
      el.textContent = el.dataset.value;
    });
  });
}

async function loadPublications() {
  bindPubControls();
  let pubs = [];
  try {
    pubs = await fetchPublications();
  } catch (err) {
    console.error('Không tải được danh sách công trình:', err);
  }
  if (!pubs.length) pubs = (profileData.publications || []).map(toPublicationRecord);

  pubState.status = pubs.length ? 'ready' : 'failed';
  pubState.all = pubs;
  if (pubs.length) renderStats(pubs);
  renderPublications();
  renderModelPapers();
  renderApplicationPapers();
  observeReveals($('#publications'));
}

/* ───────── Số đếm ───────── */
let statsInView = false;

function runCounters() {
  if (!statsInView) return;
  $$('[data-stat]').forEach(el => {
    const target = Number(el.dataset.value);
    if (!el.dataset.value || el.dataset.done) return;
    el.dataset.done = '1';
    if (reducedMotion.matches || target === 0) { el.textContent = target; return; }
    const start = performance.now(), duration = 1400;
    (function frame(now) {
      if (el.dataset.final) return;
      const t = Math.min(1, (now - start) / duration);
      el.textContent = Math.round(target * (1 - Math.pow(1 - t, 4)));
      if (t < 1) requestAnimationFrame(frame);
    })(start);
  });
}

/* ───────── Xuất hiện khi cuộn ───────── */
const revealObserver = 'IntersectionObserver' in window
  ? new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('in');
    revealObserver.unobserve(entry.target);
  }), { rootMargin: '0px 0px -8% 0px', threshold: .08 })
  : null;

function observeReveals(scope = document) {
  if (revealObserver) $$('.r:not(.in)', scope).forEach(el => revealObserver.observe(el));
}

function onceInView(el, callback) {
  const io = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    io.disconnect();
    callback();
  }, { threshold: .3 });
  io.observe(el);
}

/* ───────── Thanh nav: tiến độ cuộn + mục đang xem ───────── */
let moveNavIndicator = () => { };

function initNav() {
  const nav = $('#nav');
  const progress = $('.progress');
  const linksBox = $('#nav-links');
  const indicator = $('.nav-indicator');
  const links = $$('a', linksBox);
  let queued = false;

  function onScroll() {
    queued = false;
    const y = scrollY;
    const max = root.scrollHeight - innerHeight;
    progress.style.setProperty('--p', max > 0 ? (y / max).toFixed(4) : 0);
    nav.classList.toggle('is-stuck', y > 8);
  }
  addEventListener('scroll', () => {
    if (!queued) { queued = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  let active = null;
  moveNavIndicator = () => {
    if (!active) { indicator.style.opacity = 0; return; }
    indicator.style.opacity = 1;
    indicator.style.transform = `translateX(${active.offsetLeft + 12}px) scaleX(${Math.max(active.offsetWidth - 24, 1)})`;
  };
  function setActive(link) {
    if (link === active) return;
    active = link;
    links.forEach(a => {
      a.classList.toggle('is-active', a === link);
      if (a === link) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    });
    moveNavIndicator();
    if (link && linksBox.scrollWidth > linksBox.clientWidth) {
      linksBox.scrollTo({ left: link.offsetLeft - 40, behavior: reducedMotion.matches ? 'auto' : 'smooth' });
    }
  }
  addEventListener('resize', () => moveNavIndicator());

  const targets = links.map(a => $(a.getAttribute('href'))).filter(Boolean);
  const visible = new Set();
  const spy = new IntersectionObserver(entries => {
    entries.forEach(e => e.isIntersecting ? visible.add(e.target) : visible.delete(e.target));
    const current = targets.find(el => visible.has(el));
    setActive(current ? links.find(a => a.getAttribute('href') === `#${current.id}`) : null);
  }, { rootMargin: '-45% 0px -50% 0px' });
  targets.forEach(el => spy.observe(el));
}

/* ───────── Giao diện sáng/tối ───────── */
function initTheme() {
  const btn = $('#theme-btn');

  const apply = theme => {
    root.dataset.theme = theme;
    try { localStorage.setItem('theme', theme); } catch (e) { /* trình duyệt chặn lưu trữ */ }
  };

  btn.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    if (!document.startViewTransition || reducedMotion.matches) { apply(next); return; }
    const r = btn.getBoundingClientRect();
    const x = r.left + r.width / 2, y = r.top + r.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    document.startViewTransition(() => apply(next)).ready.then(() => {
      root.animate(
        { clipPath: [`circle(0 at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 620, easing: 'cubic-bezier(.2,.7,.2,1)', pseudoElement: '::view-transition-new(root)' }
      );
    });
  });
}

/* ───────── Đổi ngôn ngữ tại chỗ: giữ vị trí cuộn và bộ lọc ───────── */
function renderAll({ animatePubs = true } = {}) {
  applyStaticText();
  renderProfile();
  renderBackground();
  renderInterests();
  renderApplications();
  renderTaskCards();
  renderModels();
  renderProjects();
  renderTeaching();
  renderPlaces();
  renderContact();
  renderPublications({ animate: animatePubs });
}

function setLanguage(next) {
  if (next === lang) return;

  const swap = () => {
    lang = next;
    try { localStorage.setItem('lang', lang); } catch (e) { /* trình duyệt chặn lưu trữ */ }
    const url = new URL(location.href);
    if (lang === 'en') url.searchParams.set('lang', 'en');
    else url.searchParams.delete('lang');
    history.replaceState(null, '', url);

    // Phần tử vừa dựng lại đang trong màn hình thì hiện ngay, không chạy lại hiệu ứng cuộn.
    root.classList.add('no-trans');
    renderAll({ animatePubs: false });
    $$('.r:not(.in)').forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.top < innerHeight && r.bottom > 0) {
        el.classList.add('in');
        // Ảnh đang trong màn hình: giữ nguyên khung, không quét lại khi chỉ đổi ngôn ngữ.
        el.classList.add('no-replay');
      }
    });
    observeReveals();
    refreshScanTargets();
    moveNavIndicator();
    void root.offsetHeight;
    root.classList.remove('no-trans');
  };

  if (!document.startViewTransition || reducedMotion.matches) { swap(); return; }
  root.classList.add('vt-fade');
  document.startViewTransition(swap).finished.finally(() => root.classList.remove('vt-fade'));
}

function initLanguage() {
  $$('.lang a').forEach(a => a.addEventListener('click', e => {
    e.preventDefault();
    setLanguage(a.dataset.lang);
  }));
}

/* ───────── Nền: lưới sáng theo con trỏ, ảnh nghiêng nhẹ, điểm tin cậy đếm lên ───────── */
function attachSpotlight(host) {
  const layer = $(':scope > .hero-grid, :scope > .bg-lines', host);
  if (!layer) return;
  let cx = 0, cy = 0, tx = 0, ty = 0, running = false, started = false;

  function animate() {
    cx += (tx - cx) * .12;
    cy += (ty - cy) * .12;
    layer.style.setProperty('--mx', `${cx.toFixed(1)}px`);
    layer.style.setProperty('--my', `${cy.toFixed(1)}px`);
    if (Math.abs(tx - cx) + Math.abs(ty - cy) > .3) requestAnimationFrame(animate);
    else running = false;
  }

  host.addEventListener('pointermove', e => {
    const r = layer.getBoundingClientRect();
    tx = e.clientX - r.left;
    ty = e.clientY - r.top;
    if (!started) { started = true; cx = tx; cy = ty; }
    if (!running) { running = true; requestAnimationFrame(animate); }
  });
}

function initMotion() {
  const tilt = $('.portrait-tilt');
  const portrait = $('#portrait');

  // Điểm tin cậy trên khung ảnh chạy theo nhịp khung xuất hiện.
  $$('[data-conf]').forEach((el, i) => {
    const target = Number(el.dataset.conf);
    if (reducedMotion.matches) { el.textContent = target.toFixed(2); return; }
    const delay = 1250 + i * 350, duration = 800;
    setTimeout(() => {
      const start = performance.now();
      (function frame(now) {
        const p = Math.min(1, (now - start) / duration);
        el.textContent = (target * (1 - Math.pow(1 - p, 3))).toFixed(2);
        if (p < 1) requestAnimationFrame(frame);
      })(start);
    }, delay);
  });

  if (window.Portrait3D) {
    Portrait3D.create({
      photo: $('.portrait-frame img'),
      depthSrc: 'assets/images/dung-depth.jpg',
      pointerArea: $('#about'),
      boxLayer: tilt
    });
  }

  if (!finePointer.matches || reducedMotion.matches) return;

  $$('[data-spot]').forEach(attachSpotlight);

  portrait.addEventListener('pointermove', e => {
    const r = portrait.getBoundingClientRect();
    const dx = (e.clientX - r.left) / r.width - .5;
    const dy = (e.clientY - r.top) / r.height - .5;
    tilt.style.setProperty('--ry', `${(dx * 12).toFixed(2)}deg`);
    tilt.style.setProperty('--rx', `${(-dy * 9).toFixed(2)}deg`);
  });
  portrait.addEventListener('pointerleave', () => {
    tilt.style.setProperty('--ry', '0deg');
    tilt.style.setProperty('--rx', '0deg');
  });
}

/* ───────── Sao chép ───────── */
let toastTimer = 0;
function toast(message) {
  const el = $('#toast');
  el.textContent = message;
  el.classList.add('is-on');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('is-on'), 2200);
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    return false;
  }
}

function initCopy() {
  document.addEventListener('click', async e => {
    const btn = e.target.closest('[data-copy], [data-cite]');
    if (!btn) return;
    const isCite = btn.hasAttribute('data-cite');
    const ok = await copyText(isCite ? btn.dataset.cite : btn.dataset.copy);
    toast(ok ? t(isCite ? 'copiedCite' : 'copiedEmail') : t('copyFail'));
  });
}

/* ───────── Khởi động ───────── */
renderAll();
booted = true;
root.classList.remove('i18n-pending');
observeReveals();
initInterests();
initModels();
initPano();
initPeriodicScan();
initNav();
initTheme();
initLanguage();
initMotion();
initCopy();

new IntersectionObserver((entries, io) => {
  if (!entries.some(e => e.isIntersecting)) return;
  io.disconnect();
  statsInView = true;
  runCounters();
}, { threshold: .4 }).observe($('#stats'));

loadPublications();
