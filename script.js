/* ============================================================
   PROFILE WEBSITE – script.js
   ============================================================ */

/* ─── Navbar scroll effect ───────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  highlightNavLink();
});

/* ─── Active nav link on scroll ─────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function highlightNavLink() {
  let current = '';
  sections.forEach(sec => {
    const sectionTop = sec.offsetTop - 120;
    if (window.scrollY >= sectionTop) current = sec.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('data-section') === current);
  });
}

/* ─── Mobile hamburger menu ──────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinksEl.classList.toggle('open');
  hamburger.classList.toggle('open');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinksEl.classList.remove('open');
    hamburger.classList.remove('open');
  });
});

/* ─── Typed text animation ───────────────────────────────── */
const phrases = [
  'Mobile Developer',
  'Flutter Engineer',
  'Android Developer',
  'iOS Developer',
  'App Architect'
];

let phraseIdx = 0;
let charIdx = 0;
let isDeleting = false;
const typedEl = document.getElementById('typedText');

function typeEffect() {
  if (!typedEl) return;
  const currentPhrase = phrases[phraseIdx];
  if (!isDeleting) {
    typedEl.textContent = currentPhrase.substring(0, charIdx + 1);
    charIdx++;
    if (charIdx === currentPhrase.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1800);
      return;
    }
  } else {
    typedEl.textContent = currentPhrase.substring(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
    }
  }
  setTimeout(typeEffect, isDeleting ? 60 : 100);
}
typeEffect();

/* ─── Scroll reveal animation ────────────────────────────── */
const revealTargets = document.querySelectorAll(
  '.section-header, .about-text, .info-card, .skill-category, .project-card, .contact-item, .contact-form, .about-tags'
);

revealTargets.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealTargets.forEach(el => revealObserver.observe(el));

/* ─── Skill bar animation ────────────────────────────────── */
const skillFills = document.querySelectorAll('.skill-fill');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

skillFills.forEach(fill => skillObserver.observe(fill));

/* ─── Animated background orbs ───────────────────────────── */
function createOrb(color, size, top, left, delay) {
  const orb = document.createElement('div');
  orb.className = 'floating-orb';
  orb.style.cssText = `
    width: ${size}px; height: ${size}px;
    background: ${color}; top: ${top}; left: ${left};
    animation-delay: ${delay}s; animation-duration: ${12 + Math.random() * 8}s;
    opacity: 0.15;
  `;
  document.body.appendChild(orb);
}

createOrb('rgba(139,92,246,0.6)', 400, '10%', '5%', 0);
createOrb('rgba(6,182,212,0.5)', 300, '60%', '70%', 3);
createOrb('rgba(79,70,229,0.5)', 250, '30%', '85%', 6);
createOrb('rgba(124,58,237,0.4)', 200, '75%', '15%', 9);

/* ─── Parallax hero on mouse move ────────────────────────── */
const heroVisual = document.querySelector('.hero-visual');
document.addEventListener('mousemove', (e) => {
  if (!heroVisual) return;
  const x = (e.clientX / window.innerWidth - 0.5) * 12;
  const y = (e.clientY / window.innerHeight - 0.5) * 12;
  heroVisual.style.transform = `translate(${x}px, ${y}px)`;
});

/* ─── Ripple effect on buttons ───────────────────────────── */
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const rect = this.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height);
    ripple.style.cssText = `
      position: absolute; width: ${size}px; height: ${size}px;
      top: ${e.clientY - rect.top - size/2}px;
      left: ${e.clientX - rect.left - size/2}px;
      background: rgba(255,255,255,0.25); border-radius: 50%;
      transform: scale(0); animation: ripple 0.6s ease-out forwards;
      pointer-events: none;
    `;
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  });
});

// Inject ripple keyframes
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `@keyframes ripple { to { transform: scale(2.5); opacity: 0; } }`;
document.head.appendChild(rippleStyle);

/* ─── Contact form handler ───────────────────────────────── */
function handleSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  const txt = document.getElementById('submitText');
  const success = document.getElementById('formSuccess');

  btn.disabled = true;
  txt.textContent = 'Đang gửi...';

  // Simulate sending (replace with actual fetch/API call)
  setTimeout(() => {
    btn.disabled = false;
    txt.textContent = 'Gửi tin nhắn';
    success.style.display = 'block';
    e.target.reset();
    setTimeout(() => { success.style.display = 'none'; }, 5000);
  }, 1500);
}

/* ─── Smooth scroll for anchor links ─────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ─── Counter animation for hero stats ───────────────────── */
function animateCounter(el, target, suffix = '') {
  let start = 0;
  const step = target / 40;
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target + suffix;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start) + suffix;
    }
  }, 35);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statNums = entry.target.querySelectorAll('.stat-num');
      const values = [3, 20, 10];
      const suffixes = ['+', '+', 'k+'];
      statNums.forEach((el, i) => animateCounter(el, values[i], suffixes[i]));
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

/* ─── Glitch effect on project cards hover ───────────────── */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.background = `
      radial-gradient(circle at ${x}% ${y}%, rgba(139,92,246,0.12), rgba(255,255,255,0.05))
    `;
  });
  card.addEventListener('mouseleave', () => {
    card.style.background = '';
  });
});
