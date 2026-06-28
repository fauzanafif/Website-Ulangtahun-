/* ===================== BIRTHDAY WEBSITE SCRIPT ===================== */

// ==================== CURSOR SPARKLE ====================
const cursorEl = document.getElementById('cursor-sparkle');
const sparkleSymbols = ['✦', '❤️', '✨', '★', '•'];
let lastSparkle = 0;

document.addEventListener('mousemove', (e) => {
  cursorEl.style.left = e.clientX + 'px';
  cursorEl.style.top = e.clientY + 'px';

  const now = Date.now();
  if (now - lastSparkle > 80) {
    lastSparkle = now;
    const s = document.createElement('div');
    s.className = 'sparkle-trail';
    s.textContent = sparkleSymbols[Math.floor(Math.random() * sparkleSymbols.length)];
    s.style.left = e.clientX + 'px';
    s.style.top = e.clientY + 'px';
    s.style.color = `hsl(${Math.random() * 60 + 320},100%,70%)`;
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 900);
  }
});

// ==================== MUSIC ====================
const musicBtn = document.getElementById('music-btn');
const bgMusic = document.getElementById('bg-music');
let musicOn = false;

musicBtn.addEventListener('click', () => {
  if (musicOn) {
    bgMusic.pause();
    musicBtn.textContent = '🔇';
    musicBtn.classList.add('muted');
  } else {
    bgMusic.play().catch(() => {});
    musicBtn.textContent = '🎵';
    musicBtn.classList.remove('muted');
  }
  musicOn = !musicOn;
});

// ==================== PAGE NAVIGATION ====================
let currentPage = 'loading-screen';

function goToPage(pageId) {
  const cur = document.getElementById(currentPage);
  const nxt = document.getElementById(pageId);
  if (!nxt) return;
  if (cur) cur.classList.remove('active');
  nxt.classList.add('active');
  currentPage = pageId;
  onPageEnter(pageId);
  // scroll page to top
  nxt.scrollTop = 0;
}

function onPageEnter(pageId) {
  if (pageId === 'page-cake') {
    startCakeCountdown();
    createBokeh('bokeh');
    createLoveRain('love-rain');
    createSparkles('sparkles');
  } else if (pageId === 'page-ucapan') {
    createBokeh('bokeh2');
    createLoveRain('love-rain2');
    typewriterText('ucapan-typewriter', ucapanText, 40);
  } else if (pageId === 'page-life') {
    createBokeh('bokeh3');
    updateAge();
    setInterval(updateAge, 1000);
    triggerScrollReveal();
  } else if (pageId === 'page-giftbox') {
    createBokeh('bokeh4');
    createGiftboxSparkles();
  } else if (pageId === 'page-gallery') {
    createBokeh('bokeh5');
    createLoveRain('love-rain3');
    buildGallery();
    startSlideshow();
  } else if (pageId === 'page-quiz') {
    createBokeh('bokeh6');
    loadQuiz();
  } else if (pageId === 'page-letter') {
    createBokeh('bokeh7');
  } else if (pageId === 'page-timeline') {
    createBokeh('bokeh8');
    triggerScrollReveal();
  } else if (pageId === 'page-final') {
    createBokeh('bokeh9');
    createLoveRain('love-rain4');
  }
}

// ==================== LOADING SCREEN ====================
function initLoadingScreen() {
  createLoadingHearts();
  setTimeout(() => {
    goToPage('page-cake');
  }, 3000);
}

function createLoadingHearts() {
  const container = document.getElementById('loading-hearts');
  for (let i = 0; i < 18; i++) {
    const h = document.createElement('div');
    h.className = 'heart-particle';
    h.textContent = ['❤️', '💕', '💖', '💗'][Math.floor(Math.random() * 4)];
    h.style.left = Math.random() * 100 + 'vw';
    h.style.animationDuration = (2 + Math.random() * 3) + 's';
    h.style.animationDelay = (Math.random() * 2) + 's';
    h.style.fontSize = (14 + Math.random() * 18) + 'px';
    container.appendChild(h);
  }
}

// ==================== BOKEH ====================
function createBokeh(containerId) {
  const container = document.getElementById(containerId);
  if (!container || container.children.length > 0) return;
  for (let i = 0; i < 20; i++) {
    const d = document.createElement('div');
    d.className = 'bokeh-dot parallax-layer';
    const size = 20 + Math.random() * 80;
    d.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random() * 100}%;
      top:${Math.random() * 100}%;
      opacity:${0.1 + Math.random() * 0.3};
      background: radial-gradient(circle, ${randomPink()}, transparent);
      animation-duration:${4 + Math.random() * 6}s;
      animation-delay:${Math.random() * 4}s;
    `;
    container.appendChild(d);
  }
}

function randomPink() {
  const pinks = ['rgba(255,107,157,0.4)', 'rgba(200,80,192,0.4)', 'rgba(255,180,220,0.3)', 'rgba(255,215,0,0.2)'];
  return pinks[Math.floor(Math.random() * pinks.length)];
}

// ==================== LOVE RAIN ====================
function createLoveRain(containerId) {
  const container = document.getElementById(containerId);
  if (!container || container.children.length > 0) return;
  const hearts = ['❤️', '💕', '💖', '💗', '🩷'];
  for (let i = 0; i < 25; i++) {
    const d = document.createElement('div');
    d.className = 'love-drop';
    d.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    d.style.left = Math.random() * 100 + 'vw';
    d.style.fontSize = (12 + Math.random() * 16) + 'px';
    d.style.animationDuration = (5 + Math.random() * 8) + 's';
    d.style.animationDelay = (Math.random() * 5) + 's';
    container.appendChild(d);
  }
}

// ==================== SPARKLES ====================
function createSparkles(containerId) {
  const container = document.getElementById(containerId);
  if (!container || container.children.length > 0) return;
  for (let i = 0; i < 40; i++) {
    const d = document.createElement('div');
    d.className = 'sparkle-dot';
    d.style.left = Math.random() * 100 + '%';
    d.style.top = Math.random() * 100 + '%';
    d.style.animationDuration = (1 + Math.random() * 3) + 's';
    d.style.animationDelay = (Math.random() * 3) + 's';
    const size = 2 + Math.random() * 4;
    d.style.width = size + 'px';
    d.style.height = size + 'px';
    container.appendChild(d);
  }
}

// ==================== PARALLAX ====================
document.addEventListener('mousemove', (e) => {
  const layers = document.querySelectorAll('#' + currentPage + ' .parallax-layer');
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;
  const dx = (e.clientX - cx) / cx;
  const dy = (e.clientY - cy) / cy;
  layers.forEach((l, i) => {
    const depth = (i % 3 + 1) * 4;
    l.style.transform = `translate(${dx * depth}px, ${dy * depth}px)`;
  });
});

// ==================== COUNTDOWN ====================
let cakeCountdownDone = false;

const ucapanText = `Selamat ulang tahun, sayang ❤️

Hari ini adalah hari spesial, karena seseorang yang begitu berarti lahir ke dunia.
Semoga langkahmu selalu dipenuhi bahagia,
hatimu selalu tenang,
dan semua harapan kecil maupun besar kamu perlahan menjadi nyata.
Tetap jadi kamu yang aku kenal,
yang manis, tulus, dan selalu punya cara membuat hari terasa lebih indah.
Nikmati hari ini ya...
karena kamu pantas mendapatkan semua hal baik di dunia ✨`;

function startCakeCountdown() {
  if (cakeCountdownDone) return;
  let count = 15;
  const numEl = document.getElementById('countdown-number');
  const textEl = document.getElementById('countdown-text');
  textEl.classList.add('typewriter-cursor');

  function updateMessage(sec) {
    if (sec <= 15 && sec >= 11) {
      const msg = 'Halo cantik ciahhh ❤️\nmau bertambah usianya nih...';
      if (textEl.dataset.msg !== msg) {
        textEl.dataset.msg = msg;
        typewriterText('countdown-text', msg, 60);
      }
    } else if (sec <= 10 && sec >= 6) {
      const msg = 'Jangan deg degan yaa 😆❤️';
      if (textEl.dataset.msg !== msg) {
        textEl.dataset.msg = msg;
        typewriterText('countdown-text', msg, 60);
      }
    } else if (sec <= 5 && sec >= 4) {
      const msg = 'Siap siap yaaa...\nTiup lilinnya ❤️';
      if (textEl.dataset.msg !== msg) {
        textEl.dataset.msg = msg;
        typewriterText('countdown-text', msg, 60);
      }
    }
  }

  updateMessage(15);

  const iv = setInterval(() => {
    count--;
    numEl.textContent = count;

    if (count <= 3 && count >= 1) {
      numEl.classList.add('big-countdown');
      textEl.textContent = '';
      textEl.classList.remove('typewriter-cursor');
    } else {
      numEl.classList.remove('big-countdown');
      textEl.classList.add('typewriter-cursor');
    }

    updateMessage(count);

    if (count <= 0) {
      clearInterval(iv);
      blowOutCandles();
    }
  }, 1000);
}

function blowOutCandles() {
  // Blow effect
  const flames = document.querySelectorAll('.flame');
  flames.forEach(f => f.classList.add('out'));

  // Flash
  const flash = document.getElementById('flash-overlay');
  flash.classList.add('flash');

  setTimeout(() => {
    // Love explosion
    const expContainer = document.getElementById('love-explosion');
    for (let i = 0; i < 30; i++) {
      const h = document.createElement('div');
      h.className = 'explosion-heart';
      const angle = Math.random() * 360;
      const dist = 100 + Math.random() * 250;
      const rad = (angle * Math.PI) / 180;
      const tx = Math.cos(rad) * dist;
      const ty = Math.sin(rad) * dist;
      h.style.setProperty('--tx', tx + 'px');
      h.style.setProperty('--ty', ty + 'px');
      h.style.animationDelay = (Math.random() * 0.3) + 's';
      h.textContent = ['❤️', '💕', '💖', '💗', '✨'][Math.floor(Math.random() * 5)];
      expContainer.appendChild(h);
    }

    setTimeout(() => {
      cakeCountdownDone = true;
      goToPage('page-ucapan');
    }, 1800);
  }, 600);
}

// ==================== TYPEWRITER ====================
const typewriterJobs = {};
function typewriterText(elId, text, speed = 50) {
  const el = document.getElementById(elId);
  if (!el) return;
  if (typewriterJobs[elId]) clearInterval(typewriterJobs[elId]);
  el.textContent = '';
  let i = 0;
  const iv = setInterval(() => {
    if (i < text.length) {
      el.textContent += text[i];
      i++;
    } else {
      clearInterval(iv);
      delete typewriterJobs[elId];
    }
  }, speed);
  typewriterJobs[elId] = iv;
}

// ==================== AGE CALCULATOR ====================
function updateAge() {
  const birth = new Date(2003, 6, 2); 
  const now = new Date();

  let years = now.getFullYear() - birth.getFullYear();
  let months = now.getMonth() - birth.getMonth();
  let days = now.getDate() - birth.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  const yearsEl = document.getElementById('age-years');
  const monthsEl = document.getElementById('age-months');
  const daysEl = document.getElementById('age-days');
  if (yearsEl) yearsEl.textContent = years;
  if (monthsEl) monthsEl.textContent = months;
  if (daysEl) daysEl.textContent = days;
}

// ==================== SCROLL REVEAL ====================
function triggerScrollReveal() {
  setTimeout(() => {
    const els = document.querySelectorAll('#' + currentPage + ' .scroll-reveal, #' + currentPage + ' .life-card');
    els.forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 200);
    });
  }, 300);
}

// ==================== GIFTBOX ====================
function createGiftboxSparkles() {
  const container = document.getElementById('gbox-sparkle');
  if (!container) return;
  const symbols = ['✦', '✨', '⭐', '💫'];
  for (let i = 0; i < 12; i++) {
    const s = document.createElement('div');
    s.style.cssText = `
      position: absolute;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      font-size: ${12 + Math.random() * 12}px;
      animation: sparkle-twinkle ${1 + Math.random() * 2}s ease-in-out infinite;
      animation-delay: ${Math.random() * 2}s;
      opacity: 0;
      pointer-events: none;
    `;
    s.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    container.appendChild(s);
  }
}

function openGiftBox() {
  const lid = document.getElementById('gbox-lid');
  const light = document.getElementById('gbox-light');
  const btn = document.getElementById('btn-open-gift');
  if (!lid) return;

  lid.classList.add('open');
  light.classList.add('glow');
  if (btn) btn.style.display = 'none';

  // love rain burst
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      const h = document.createElement('div');
      h.style.cssText = `
        position: fixed;
        left: 50%; top: 40%;
        font-size: ${16 + Math.random() * 20}px;
        pointer-events: none;
        z-index: 999;
        animation: explode-heart 1.2s ease-out forwards;
        --tx: ${(Math.random() - 0.5) * 300}px;
        --ty: ${(Math.random() - 1) * 200}px;
      `;
      h.textContent = ['❤️', '💕', '💖', '✨'][Math.floor(Math.random() * 4)];
      document.body.appendChild(h);
      setTimeout(() => h.remove(), 1500);
    }, i * 60);
  }

  setTimeout(() => goToPage('page-gallery'), 1800);
}

// ==================== GALLERY ====================
const photos = [
  { src: 'assets/memory/foto1.jpeg', caption: 'Kita dengan Muka Polosnya😭❤️' },
  { src: 'assets/memory/foto2.jpeg', caption: 'Kece abiesss wkwkw🤣' },
  { src: 'assets/memory/foto3.jpeg', caption: 'Jadi anak gunung nih, meski camp area😭' },
  { src: 'assets/memory/foto4.jpeg', caption: 'Mode capek Motor Mogok😭' },
  { src: 'assets/memory/foto5.jpeg', caption: 'Mode Pasangan Strong dan Kuat💪' },
  { src: 'assets/memory/foto6.jpeg', caption: 'Mode Gamis Masyaalloh 👳' },
];

let lightboxIndex = 0;
let slideshowTimer = null;

function buildGallery() {
  const grid = document.getElementById('gallery-grid');
  if (!grid || grid.children.length > 0) return;

  photos.forEach((p, i) => {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.innerHTML = `
      <img class="gallery-img" src="${p.src}" alt="${p.caption}" onerror="this.src='https://via.placeholder.com/300x300/ff6b9d/ffffff?text=❤️'" />
      <div class="gallery-caption">${p.caption}</div>
    `;
    item.addEventListener('click', () => openLightbox(i));
    grid.appendChild(item);
    setTimeout(() => item.classList.add('visible'), i * 150 + 300);
  });
}

function openLightbox(idx) {
  lightboxIndex = idx;
  const lb = document.getElementById('lightbox');
  lb.classList.add('open');
  showLightboxPhoto();
}

function showLightboxPhoto() {
  const img = document.getElementById('lb-img');
  const cap = document.getElementById('lb-caption');
  const p = photos[lightboxIndex];
  img.src = p.src;
  img.onerror = () => { img.src = 'https://via.placeholder.com/600x400/ff6b9d/ffffff?text=❤️'; };
  cap.textContent = p.caption;
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
}

function lightboxPrev() {
  lightboxIndex = (lightboxIndex - 1 + photos.length) % photos.length;
  showLightboxPhoto();
}

function lightboxNext() {
  lightboxIndex = (lightboxIndex + 1) % photos.length;
  showLightboxPhoto();
}

function startSlideshow() {
  if (slideshowTimer) return;
  slideshowTimer = setInterval(() => {
    const items = document.querySelectorAll('.gallery-item');
    if (!items.length) return;
    items.forEach(i => i.style.outline = '');
    const active = Math.floor(Math.random() * items.length);
    items[active].style.outline = '3px solid var(--pink)';
  }, 2500);
}

// ==================== QUIZ ====================
const quizData = [
  {
    q: 'Apa hadiah paling sederhana tapi paling berharga?',
    opts: ['A. Barang mahal', 'B. Waktu dan perhatian ❤️', 'C. Uang banyak'],
    correct: 1,
  },
  {
    q: 'Yang paling penting di hari ulang tahun?',
    opts: ['A. Kue', 'B. Lilin', 'C. Doa dan kebahagiaan ❤️'],
    correct: 2,
  },
];

let quizCurrent = 0;
let quizDone = false;

function loadQuiz() {
  if (quizDone) return;
  quizCurrent = 0;
  showQuizQuestion();
}

function showQuizQuestion() {
  const data = quizData[quizCurrent];
  if (!data) {
    document.getElementById('quiz-card').style.display = 'none';
    document.getElementById('quiz-done').style.display = 'flex';
    quizDone = true;
    return;
  }
  document.getElementById('quiz-question').textContent = data.q;
  const opts = document.getElementById('quiz-options');
  opts.innerHTML = '';
  const fb = document.getElementById('quiz-feedback');
  fb.textContent = '';
  data.opts.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-opt-btn';
    btn.textContent = opt;
    btn.addEventListener('click', () => handleQuizAnswer(idx, btn, data.correct, opts));
    opts.appendChild(btn);
  });
}

function handleQuizAnswer(idx, btn, correct, optsEl) {
  const allBtns = optsEl.querySelectorAll('.quiz-opt-btn');
  allBtns.forEach(b => b.disabled = true);
  const fb = document.getElementById('quiz-feedback');

  if (idx === correct) {
    btn.classList.add('correct');
    fb.textContent = '✅ Benar ❤️ kamu pintar';
    fb.style.color = '#00c864';
    setTimeout(() => {
      quizCurrent++;
      showQuizQuestion();
    }, 1400);
  } else {
    btn.classList.add('wrong');
    fb.textContent = '😆 Hehe belum tepat, coba lagi!';
    fb.style.color = '#ff5050';
    setTimeout(() => {
      allBtns.forEach(b => { b.disabled = false; b.classList.remove('wrong', 'correct'); });
      fb.textContent = '';
    }, 1200);
  }
}

// ==================== ENVELOPE ====================
// ==================== ENVELOPE ====================
let envelopeOpened = false;

const letterText = `To: Bee ❤️
Subject: Selamat Ulang Tahun Untuk Kamu 🎂


Halo Bee,

Hari ini adalah hari spesial kamu.
Hari dimana seseorang yang sangat berharga bertambah usia.

Aku cuma ingin mengucapkan...

Selamat ulang tahun ❤️


Semoga di umur yang baru ini,
kamu selalu diberikan kesehatan,
kebahagiaan,
panjang umur,
dan semua doa baik kamu bisa tercapai.


Terima kasih sudah hadir,
terima kasih untuk semua cerita,
tawa,
dan momen kecil yang mungkin terlihat sederhana,
tapi sangat berarti.


Tetap jadi Bee yang aku kenal ya...
yang punya senyum indah,
hati baik,
dan selalu punya cara membuat suasana jadi lebih hangat.

Maafin aku aku banyak salahnya😕
Semoga perjalanan kamu kedepannya
dipenuhi banyak hal baik,
banyak kebahagiaan,
dan banyak alasan untuk tersenyum.


From:
Boo❤️`;

function openEnvelope() {
  if (envelopeOpened) return;
  envelopeOpened = true;

  const flap = document.getElementById('env-flap');
  const letterContent = document.getElementById('letter-content');

  flap.classList.add('open');

  setTimeout(() => {
    letterContent.style.display = 'block';
    typewriterText('letter-typewriter', letterText, 50);
  }, 700);
}

// ==================== FINAL SURPRISE ====================
let finalTriggered = false;

function triggerFinalSurprise() {
  if (finalTriggered) return;
  finalTriggered = true;

  document.getElementById('final-surprise-btn-wrap').style.display = 'none';
  document.getElementById('final-message').style.display = 'block';

  spawnFinalConfetti();
  spawnFinalHearts();
}

function spawnFinalConfetti() {
  const container = document.getElementById('final-confetti');
  const symbols = ['❤️', '💕', '🎉', '✨', '💖', '🌸', '⭐'];
  for (let i = 0; i < 40; i++) {
    const c = document.createElement('div');
    c.className = 'confetti-piece';
    c.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    c.style.left = Math.random() * 100 + 'vw';
    c.style.animationDuration = (2 + Math.random() * 4) + 's';
    c.style.animationDelay = (Math.random() * 2) + 's';
    c.style.fontSize = (16 + Math.random() * 20) + 'px';
    container.appendChild(c);
  }
}

function spawnFinalHearts() {
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      const h = document.createElement('div');
      h.style.cssText = `
        position: fixed;
        left: ${Math.random() * 100}vw;
        top: 110vh;
        font-size: ${20 + Math.random() * 24}px;
        pointer-events: none;
        z-index: 200;
        animation: love-fall ${3 + Math.random() * 3}s ease-in-out forwards;
        opacity: 0.8;
      `;
      h.textContent = ['❤️', '💕', '💖'][Math.floor(Math.random() * 3)];
      document.body.appendChild(h);
      setTimeout(() => h.remove(), 6000);
    }, i * 120);
  }
}

function repeatSurprise() {
  finalTriggered = false;
  cakeCountdownDone = false;
  envelopeOpened = false;
  quizDone = false;
  quizCurrent = 0;

  // Reset candles
  document.querySelectorAll('.flame').forEach(f => f.classList.remove('out'));

  // Clear explosion
  document.getElementById('love-explosion').innerHTML = '';
  document.getElementById('final-confetti').innerHTML = '';
  document.getElementById('final-message').style.display = 'none';
  document.getElementById('final-surprise-btn-wrap').style.display = 'block';

  // Reset letter
  envelopeOpened = false;
  document.getElementById('env-flap').classList.remove('open');
  document.getElementById('letter-content').style.display = 'none';
  document.getElementById('letter-typewriter').textContent = '';

  // Go back to cake
  goToPage('page-cake');
}

// ==================== SCROLL REVEAL OBSERVER ====================
function observeScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.scroll-reveal, .life-card, .timeline-item, .tl-line-segment').forEach(el => {
    observer.observe(el);
  });
}

// ==================== INIT ====================
document.addEventListener('DOMContentLoaded', () => {
  // Show loading
  document.getElementById('loading-screen').classList.add('active');
  initLoadingScreen();
  observeScrollReveal();
});
