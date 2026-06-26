/* ═══════════════════════════════════════════════════════════
   AARYAN GUPTA PORTFOLIO — MAIN JS
   Cursor · Scroll · Animations · Theme · FAQ · Counters · Nav
   ═══════════════════════════════════════════════════════════ */

'use strict';

/* ─── CONFIG LOADER ─── */
let SITE_CONFIG = {};
async function loadConfig() {
  try {
    const r = await fetch('/data/config.json');
    SITE_CONFIG = await r.json();
    applyDynamicContent();
  } catch (e) {
    console.warn('Config not loaded, using defaults');
  }
}

function applyDynamicContent() {
  // Inject dynamic values into data-bind elements
  document.querySelectorAll('[data-bind]').forEach(el => {
    const key = el.dataset.bind;
    const val = getNestedVal(SITE_CONFIG, key);
    if (val !== undefined) {
      if (el.tagName === 'A' && el.dataset.bindAttr === 'href') el.href = val;
      else el.textContent = val;
    }
  });
}

function getNestedVal(obj, path) {
  return path.split('.').reduce((acc, k) => acc && acc[k], obj);
}

/* ─── PAGE LOADER ─── */
function initLoader() {
  const loader = document.getElementById('page-loader');
  if (!loader) return;
  window.addEventListener('load', () => {
    setTimeout(() => {
      document.body.classList.add('loaded');
      setTimeout(() => loader.remove(), 700);
    }, 800);
  });
}

/* ─── THEME ─── */
function initTheme() {
  const root = document.documentElement;
  const stored = localStorage.getItem('ag-theme');
  const system = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  const theme = stored || system;
  root.setAttribute('data-theme', theme);

  const btns = document.querySelectorAll('.theme-toggle');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const current = root.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem('ag-theme', next);
    });
    btn.setAttribute('aria-label', 'Toggle colour theme');
  });
}

/* ─── CUSTOM CURSOR ─── */
function initCursor() {
  if (window.matchMedia('(hover: none)').matches) return;
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  let mx = -100, my = -100;
  let rx = -100, ry = -100;
  let raf;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  function lerp(a, b, t) { return a + (b - a) * t; }

  function tick() {
    // Dot: instant
    dot.style.transform = `translate(${mx - 4}px,${my - 4}px)`;
    // Ring: lagged
    rx = lerp(rx, mx, 0.12);
    ry = lerp(ry, my, 0.12);
    ring.style.transform = `translate(${rx - 19}px,${ry - 19}px)`;
    raf = requestAnimationFrame(tick);
  }
  raf = requestAnimationFrame(tick);

  // Hover states
  const hoverEls = 'a,button,[data-cursor="hover"],.card,.service-card,.project-card,.why-card';
  document.querySelectorAll(hoverEls).forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
  });

  document.addEventListener('mousedown', () => ring.classList.add('click'));
  document.addEventListener('mouseup', () => ring.classList.remove('click'));

  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0'; ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity = '1'; ring.style.opacity = '0.7';
  });
}

/* ─── SCROLL PROGRESS ─── */
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  const update = () => {
    const h = document.documentElement;
    const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    bar.style.width = Math.min(pct, 100) + '%';
  };
  window.addEventListener('scroll', update, { passive: true });
}

/* ─── NAV SCROLL STATE ─── */
function initNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Active link
  const links = nav.querySelectorAll('.nav-links a[href^="#"]');
  const sections = [];
  links.forEach(l => {
    const id = l.getAttribute('href').slice(1);
    const sec = document.getElementById(id);
    if (sec) sections.push({ el: sec, link: l });
  });

  if (sections.length) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        const match = sections.find(s => s.el === e.target);
        if (match) match.link.classList.toggle('active', e.isIntersecting);
      });
    }, { threshold: 0.35 });
    sections.forEach(s => io.observe(s.el));
  }

  // Hamburger
  const ham = document.querySelector('.hamburger');
  const menu = document.getElementById('mobile-menu');
  if (ham && menu) {
    ham.addEventListener('click', () => {
      const open = ham.classList.toggle('open');
      menu.classList.toggle('open', open);
      document.body.classList.toggle('no-scroll', open);
    });
    menu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        ham.classList.remove('open');
        menu.classList.remove('open');
        document.body.classList.remove('no-scroll');
      });
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY;
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72;
      window.scrollTo({ top: top - navH, behavior: 'smooth' });
    });
  });
}

/* ─── REVEAL ON SCROLL ─── */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => io.observe(el));
}

/* ─── ANIMATED COUNTERS ─── */
function animateCounter(el, target, duration = 1600, suffix = '') {
  let start = null;
  const num = parseFloat(target.replace(/[^0-9.]/g, ''));
  const step = ts => {
    if (!start) start = ts;
    const prog = Math.min((ts - start) / duration, 1);
    const ease = 1 - Math.pow(1 - prog, 3);
    el.textContent = Math.round(num * ease) + suffix;
    if (prog < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
}

function initCounters() {
  const els = document.querySelectorAll('[data-counter]');
  if (!els.length) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const val = el.dataset.counter;
      const suffix = val.replace(/[0-9.]/g, '');
      animateCounter(el, val, 1600, suffix);
      io.unobserve(el);
    });
  }, { threshold: 0.5 });
  els.forEach(el => io.observe(el));
}

/* ─── TYPEWRITER ─── */
function initTypewriter() {
  const el = document.getElementById('typewriter-text');
  if (!el) return;
  const phrases = [
    'Technical Project Manager',
    'HealthTech Digital Strategist',
    'AI Automation Consultant',
    'Micro-SaaS Product Builder',
    'Developer-Turned-PM'
  ];
  let pi = 0, ci = 0, deleting = false;

  function tick() {
    const phrase = phrases[pi];
    if (!deleting) {
      el.textContent = phrase.slice(0, ++ci);
      if (ci === phrase.length) {
        deleting = true;
        setTimeout(tick, 2400);
        return;
      }
      setTimeout(tick, 58);
    } else {
      el.textContent = phrase.slice(0, --ci);
      if (ci === 0) {
        deleting = false;
        pi = (pi + 1) % phrases.length;
        setTimeout(tick, 300);
        return;
      }
      setTimeout(tick, 36);
    }
  }
  setTimeout(tick, 800);
}

/* ─── 3D CARD TILT ─── */
function initTilt() {
  if (window.matchMedia('(hover: none)').matches) return;
  const cards = document.querySelectorAll('[data-tilt]');
  cards.forEach(card => {
    card.style.transformStyle = 'preserve-3d';
    card.style.transition = 'transform 0.1s ease';

    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      const maxDeg = parseFloat(card.dataset.tiltMax || 7);
      card.style.transform = `perspective(1000px) rotateX(${-dy * maxDeg}deg) rotateY(${dx * maxDeg}deg) translateZ(4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.5s cubic-bezier(0.4,0,0.2,1)';
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
      setTimeout(() => { card.style.transition = 'transform 0.1s ease'; }, 500);
    });
  });
}

/* ─── MAGNETIC BUTTONS ─── */
function initMagnetic() {
  if (window.matchMedia('(hover: none)').matches) return;
  document.querySelectorAll('[data-magnetic]').forEach(el => {
    el.addEventListener('mousemove', e => {
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      el.style.transform = `translate(${dx * 0.22}px, ${dy * 0.22}px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transition = 'transform 0.4s cubic-bezier(0.4,0,0.2,1)';
      el.style.transform = 'translate(0,0)';
      setTimeout(() => { el.style.transition = ''; }, 400);
    });
  });
}

/* ─── FAQ ACCORDION ─── */
function initFAQ() {
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-q');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const open = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item.open').forEach(other => other.classList.remove('open'));
      if (!open) item.classList.add('open');
    });
    btn.setAttribute('aria-expanded', 'false');
    item.addEventListener('transitionend', () => {
      btn.setAttribute('aria-expanded', item.classList.contains('open').toString());
    });
  });
}

/* ─── THREE.JS HERO BACKGROUND ─── */
function initHeroBackground() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  // Lightweight canvas-based particle system (no Three.js dependency)
  const ctx = canvas.getContext('2d');
  let W, H, particles = [], animId;

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function getColors() {
    const dark = document.documentElement.getAttribute('data-theme') !== 'light';
    return {
      particle: dark ? 'rgba(0,200,150,' : 'rgba(0,107,82,',
      line: dark ? 'rgba(0,200,150,' : 'rgba(0,107,82,',
      bg: dark ? 'rgba(3,16,13,0)' : 'rgba(240,251,248,0)'
    };
  }

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.35;
      this.vy = (Math.random() - 0.5) * 0.35;
      this.r = Math.random() * 1.5 + 0.5;
      this.alpha = Math.random() * 0.4 + 0.1;
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0 || this.x > W) this.vx *= -1;
      if (this.y < 0 || this.y > H) this.vy *= -1;
    }
    draw(c, col) {
      c.beginPath();
      // Diamond shape instead of circle
      c.moveTo(this.x, this.y - this.r * 2);
      c.lineTo(this.x + this.r * 2, this.y);
      c.lineTo(this.x, this.y + this.r * 2);
      c.lineTo(this.x - this.r * 2, this.y);
      c.closePath();
      c.fillStyle = col.particle + this.alpha + ')';
      c.fill();
    }
  }

  function init() {
    const count = Math.min(50, Math.floor((W * H) / 18000));
    particles = Array.from({ length: count }, () => new Particle());
  }

  function frame() {
    ctx.clearRect(0, 0, W, H);
    const col = getColors();
    particles.forEach(p => {
      p.update();
      p.draw(ctx, col);
    });
    // Connect nearby particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = col.line + (1 - dist / 110) * 0.12 + ')';
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    animId = requestAnimationFrame(frame);
  }

  const ro = new ResizeObserver(() => { resize(); init(); });
  ro.observe(canvas.parentElement);
  resize(); init(); frame();

  // Pause when not visible (performance)
  const io = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      if (!animId) animId = requestAnimationFrame(frame);
    } else {
      cancelAnimationFrame(animId);
      animId = null;
    }
  });
  io.observe(canvas);
}

/* ─── CONTACT FORM ─── */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    const orig = btn.textContent;
    btn.textContent = 'Sending...'; btn.disabled = true;
    // Simulate — replace with your actual endpoint
    await new Promise(r => setTimeout(r, 1200));
    btn.textContent = 'Message Sent ✓';
    btn.style.background = 'var(--col-teal)';
    form.reset();
    setTimeout(() => { btn.textContent = orig; btn.disabled = false; btn.style.background = ''; }, 3500);
  });
  // Real-time validation
  form.querySelectorAll('input,textarea').forEach(f => {
    f.addEventListener('blur', () => {
      f.classList.toggle('error', !f.validity.valid && f.value !== '');
    });
    f.addEventListener('input', () => f.classList.remove('error'));
  });
}

/* ─── COOKIE BANNER ─── */
function initCookies() {
  const banner = document.getElementById('cookie-banner');
  if (!banner) return;
  if (localStorage.getItem('ag-cookies')) { banner.remove(); return; }
  banner.classList.remove('hidden');
  document.getElementById('cookie-accept')?.addEventListener('click', () => {
    localStorage.setItem('ag-cookies', '1');
    banner.classList.add('hidden');
    setTimeout(() => banner.remove(), 600);
    // GA4 consent
    if (window.gtag) window.gtag('consent', 'update', { analytics_storage: 'granted' });
  });
  document.getElementById('cookie-decline')?.addEventListener('click', () => {
    localStorage.setItem('ag-cookies', '0');
    banner.classList.add('hidden');
    setTimeout(() => banner.remove(), 600);
  });
}

/* ─── COPY EMAIL ─── */
function initCopyEmail() {
  document.querySelectorAll('[data-copy-email]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const email = btn.dataset.copyEmail || 'aaryangupta.pm@gmail.com';
      try {
        await navigator.clipboard.writeText(email);
        const orig = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => { btn.textContent = orig; }, 2000);
      } catch { window.location.href = `mailto:${email}`; }
    });
  });
}

/* ─── OFFLINE DETECTION ─── */
function initOffline() {
  const banner = document.createElement('div');
  banner.id = 'offline-banner';
  banner.textContent = 'You are offline. Some features may not work.';
  banner.style.cssText = 'position:fixed;bottom:0;left:0;right:0;background:#1A6EFF;color:#fff;text-align:center;padding:8px;font-size:0.8rem;z-index:9000;display:none';
  document.body.appendChild(banner);
  window.addEventListener('offline', () => { banner.style.display = 'block'; });
  window.addEventListener('online', () => { banner.style.display = 'none'; });
}

/* ─── SERVICE WORKER ─── */
function initSW() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    });
  }
}

/* ─── INIT ALL ─── */
document.addEventListener('DOMContentLoaded', () => {
  loadConfig();
  initLoader();
  initTheme();
  initCursor();
  initScrollProgress();
  initNav();
  initReveal();
  initCounters();
  initTypewriter();
  initTilt();
  initMagnetic();
  initFAQ();
  initHeroBackground();
  initContactForm();
  initCookies();
  initCopyEmail();
  initOffline();
  initSW();
});
