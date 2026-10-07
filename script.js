/* ============================================================
   RESHMA DEVI SRI PENTA — PORTFOLIO JAVASCRIPT
   ============================================================ */

'use strict';

/* ─────────────────────────────────────────────────────────────
   1. PRELOADER
   ───────────────────────────────────────────────────────────── */
(function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  const hide = () => {
    preloader.classList.add('hidden');
    // Remove from DOM after transition
    setTimeout(() => preloader.remove(), 600);
  };

  if (document.readyState === 'complete') {
    setTimeout(hide, 1300); // let bar animation finish
  } else {
    window.addEventListener('load', () => setTimeout(hide, 1300));
  }
})();

/* ─────────────────────────────────────────────────────────────
   2. TYPING EFFECT
   ───────────────────────────────────────────────────────────── */
const roles = [
  '[YOUR ROLE / TITLE]',      // ← Replace with your role
  'Web Developer',
  'Diploma Student',
  'Python Enthusiast',
  'Problem Solver',
];

let roleIndex  = 0;
let charIndex  = 0;
let isDeleting = false;
const typingEl = document.getElementById('typingRole');

function typeEffect() {
  if (!typingEl) return;
  const current = roles[roleIndex];

  if (!isDeleting) {
    typingEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1800);
      return;
    }
  } else {
    typingEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting  = false;
      roleIndex   = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeEffect, isDeleting ? 55 : 90);
}

window.addEventListener('load', () => setTimeout(typeEffect, 1600));

/* ─────────────────────────────────────────────────────────────
   3. NAVBAR — scroll shadow + mobile hamburger
   ───────────────────────────────────────────────────────────── */
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
const navItems  = navLinks ? Array.from(navLinks.querySelectorAll('.nav-link')) : [];

// Scroll: add .scrolled class
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// Hamburger toggle
hamburger && hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
});

// Close on nav link click
navItems.forEach(link => link.addEventListener('click', closeMenu));

// Close on outside click
document.addEventListener('click', e => {
  if (navLinks && navLinks.classList.contains('open')) {
    if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) closeMenu();
  }
});

// Close on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeMenu();
});

function closeMenu() {
  hamburger && hamburger.classList.remove('open');
  navLinks  && navLinks.classList.remove('open');
  hamburger && hamburger.setAttribute('aria-expanded', 'false');
}

/* ─────────────────────────────────────────────────────────────
   4. ACTIVE NAV LINK ON SCROLL
   ───────────────────────────────────────────────────────────── */
const sections = Array.from(document.querySelectorAll('section[id]'));

function updateActiveNav() {
  const scrollY = window.scrollY + 100;
  sections.forEach(sec => {
    const link = document.querySelector(`.nav-link[href="#${sec.id}"]`);
    if (!link) return;
    const inView = scrollY >= sec.offsetTop && scrollY < sec.offsetTop + sec.offsetHeight;
    link.classList.toggle('active', inView);
  });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();

/* ─────────────────────────────────────────────────────────────
   5. SCROLL REVEAL (custom lightweight AOS)
   ───────────────────────────────────────────────────────────── */
function initScrollReveal() {
  const els = document.querySelectorAll('[data-aos]');
  if (!els.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el    = entry.target;
        const delay = parseInt(el.getAttribute('data-aos-delay') || 0, 10);
        setTimeout(() => el.classList.add('aos-animate'), delay);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', initScrollReveal);

/* ─────────────────────────────────────────────────────────────
   6. HERO PARTICLES
   ───────────────────────────────────────────────────────────── */
(function createParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;

  // Don't create particles on slow-connection / reduced-motion preference
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const count = 32;
  const frag  = document.createDocumentFragment();

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    Object.assign(p.style, {
      left    : `${Math.random() * 100}%`,
      top     : `${Math.random() * 100}%`,
      '--dur'  : `${6 + Math.random() * 9}s`,
      '--delay': `${(Math.random() * -12).toFixed(2)}s`,
      width   : `${1 + Math.random() * 2.5}px`,
      height  : `${1 + Math.random() * 2.5}px`,
      opacity : `${(0.12 + Math.random() * 0.4).toFixed(2)}`,
    });
    frag.appendChild(p);
  }
  container.appendChild(frag);
})();

/* ─────────────────────────────────────────────────────────────
   7. SMOOTH SCROLL (fallback for older browsers)
   ───────────────────────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const href   = anchor.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 70;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ─────────────────────────────────────────────────────────────
   8. CONTACT FORM — validation & simulated submit
   ───────────────────────────────────────────────────────────── */
const contactForm = document.getElementById('contactForm');

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function setError(id, msg) {
  const el = document.getElementById(id);
  if (el) el.textContent = msg;
}

function clearAllErrors() {
  ['nameError', 'emailError', 'subjectError', 'messageError'].forEach(id => setError(id, ''));
}

function markInvalid(inputId, errorId, msg) {
  const inp = document.getElementById(inputId);
  if (inp) inp.style.borderColor = '#f85149';
  setError(errorId, msg);
}

function markValid(inputId) {
  const inp = document.getElementById(inputId);
  if (inp) inp.style.borderColor = '';
}

contactForm && contactForm.addEventListener('submit', e => {
  e.preventDefault();
  clearAllErrors();

  const name    = (document.getElementById('contactName')?.value    || '').trim();
  const email   = (document.getElementById('contactEmail')?.value   || '').trim();
  const subject = (document.getElementById('contactSubject')?.value || '').trim();
  const message = (document.getElementById('contactMessage')?.value || '').trim();

  let valid = true;

  if (name.length < 2) {
    markInvalid('contactName', 'nameError', 'Please enter your name (at least 2 characters).');
    valid = false;
  } else markValid('contactName');

  if (!isValidEmail(email)) {
    markInvalid('contactEmail', 'emailError', 'Please enter a valid email address.');
    valid = false;
  } else markValid('contactEmail');

  if (subject.length < 3) {
    markInvalid('contactSubject', 'subjectError', 'Please enter a subject.');
    valid = false;
  } else markValid('contactSubject');

  if (message.length < 10) {
    markInvalid('contactMessage', 'messageError', 'Please enter a message (at least 10 characters).');
    valid = false;
  } else markValid('contactMessage');

  if (!valid) return;

  const btn        = document.getElementById('submitBtn');
  const btnText    = btn?.querySelector('.btn-text');
  const btnLoading = btn?.querySelector('.btn-loading');
  const success    = document.getElementById('formSuccess');

  if (btnText)    btnText.style.display    = 'none';
  if (btnLoading) btnLoading.style.display = 'inline-flex';
  if (btn)        btn.disabled = true;

  /*
    TODO: Replace this timeout with your actual email service:
    ─ Formspree:  fetch('https://formspree.io/f/YOUR_ID', { method:'POST', … })
    ─ EmailJS:    emailjs.send('serviceID', 'templateID', { name, email, subject, message })
  */
  setTimeout(() => {
    if (btnText)    btnText.style.display    = 'inline-flex';
    if (btnLoading) btnLoading.style.display = 'none';
    if (btn)        btn.disabled = false;
    if (success)  { success.style.display = 'flex'; contactForm.reset(); }

    // Reset border colours
    ['contactName','contactEmail','contactSubject','contactMessage']
      .forEach(id => markValid(id));

    setTimeout(() => { if (success) success.style.display = 'none'; }, 6000);
  }, 1800);
});

/* ─────────────────────────────────────────────────────────────
   9. SCROLL PROGRESS BAR
   ───────────────────────────────────────────────────────────── */
(function addScrollProgress() {
  const bar = document.createElement('div');
  bar.id = 'scrollProgress';
  bar.setAttribute('aria-hidden', 'true');
  bar.style.cssText = [
    'position:fixed', 'top:0', 'left:0', 'height:2px', 'z-index:99998',
    'background:linear-gradient(90deg,#4f9cf9,#74b3fd)',
    'width:0%', 'pointer-events:none',
    'transition:width 0.12s linear',
  ].join(';');
  document.body.prepend(bar);

  window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
    bar.style.width = Math.min(pct, 100) + '%';
  }, { passive: true });
})();

/* ─────────────────────────────────────────────────────────────
   10. ANIMATED COUNTER (About stats)
   ───────────────────────────────────────────────────────────── */
function animateCounter(el, target, suffix = '') {
  let start = 0;
  const duration = 1200;
  const startTime = performance.now();

  function step(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const value    = Math.floor(progress * target);
    el.textContent = value + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

(function initCounters() {
  const statsSection = document.querySelector('.about-stats');
  if (!statsSection) return;

  const counters = [
    { selector: '.stat-item:nth-child(1) .stat-number', target: 2,  suffix: '+' },
    { selector: '.stat-item:nth-child(3) .stat-number', target: 10, suffix: '+' },
    { selector: '.stat-item:nth-child(5) .stat-number', target: 2,  suffix: '+' },
  ];

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        counters.forEach(({ selector, target, suffix }) => {
          const el = document.querySelector(selector);
          if (el) animateCounter(el, target, suffix);
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.5 });

  observer.observe(statsSection);
})();

/* ─────────────────────────────────────────────────────────────
   CONSOLE GREETING
   ───────────────────────────────────────────────────────────── */
console.log('%c👩‍💻 Reshma Devi Sri Penta | Portfolio ', 'background:#4f9cf9;color:#fff;font-size:13px;font-weight:700;padding:5px 12px;border-radius:4px;');
console.log('%c Built with HTML · CSS · JavaScript', 'color:#8b949e;font-size:11px;');
