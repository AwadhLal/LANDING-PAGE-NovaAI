/* =========================================================
   NovaAI — script.js
   Vanilla ES6. No dependencies.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  initYear();
  initNavbarScrollShadow();
  initMobileMenu();
  initSmoothScroll();
  initScrollProgress();
  initScrollReveal();
  initAccordion();
  initCounters();
  initContactForm();
  initBackToTop();
  initNeuralCanvas();
});

/* ---------- Footer year ---------- */
function initYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}

/* ---------- Navbar shadow / background on scroll ---------- */
function initNavbarScrollShadow() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  const toggle = () => {
    if (window.scrollY > 24) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  };
  toggle();
  window.addEventListener('scroll', toggle, { passive: true });
}

/* ---------- Mobile hamburger menu ---------- */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  if (!hamburger || !menu) return;

  const closeMenu = () => {
    hamburger.classList.remove('open');
    menu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  };

  hamburger.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });
}

/* ---------- Smooth scrolling for in-page anchors ---------- */
function initSmoothScroll() {
  const navHeight = document.getElementById('navbar')?.offsetHeight || 76;
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight + 1;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ---------- Scroll progress bar ---------- */
function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;
  const update = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = pct + '%';
  };
  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
}

/* ---------- Scroll reveal animations ---------- */
function initScrollReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('in-view'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );

  items.forEach((el) => observer.observe(el));
}

/* ---------- FAQ accordion ---------- */
function initAccordion() {
  const items = document.querySelectorAll('.accordion-item');
  if (!items.length) return;

  items.forEach((item) => {
    const trigger = item.querySelector('.accordion-trigger');
    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all others (single-open accordion)
      items.forEach((other) => {
        other.classList.remove('open');
        other.querySelector('.accordion-trigger').setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ---------- Animated counters ---------- */
function initCounters() {
  const counters = document.querySelectorAll('.stat-number[data-target]');
  if (!counters.length) return;

  const animate = (el) => {
    const target = parseFloat(el.getAttribute('data-target'));
    const decimals = parseInt(el.getAttribute('data-decimal') || '0', 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1600;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const value = target * eased;
      el.textContent = (decimals ? value.toFixed(decimals) : Math.round(value).toLocaleString()) + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = (decimals ? target.toFixed(decimals) : target.toLocaleString()) + suffix;
    };
    requestAnimationFrame(step);
  };

  if (!('IntersectionObserver' in window)) {
    counters.forEach(animate);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );
  counters.forEach((el) => observer.observe(el));
}

/* ---------- Contact form validation ---------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const success = document.getElementById('formSuccess');

  const setError = (input, errorId, message) => {
    const errorEl = document.getElementById(errorId);
    const field = input.closest('.form-field');
    if (message) {
      field.classList.add('invalid');
      errorEl.textContent = message;
    } else {
      field.classList.remove('invalid');
      errorEl.textContent = '';
    }
  };

  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    success.textContent = '';
    let valid = true;

    if (!nameInput.value.trim()) {
      setError(nameInput, 'nameError', 'Please enter your name.');
      valid = false;
    } else {
      setError(nameInput, 'nameError', '');
    }

    if (!emailInput.value.trim()) {
      setError(emailInput, 'emailError', 'Please enter your email.');
      valid = false;
    } else if (!isValidEmail(emailInput.value.trim())) {
      setError(emailInput, 'emailError', 'Please enter a valid email address.');
      valid = false;
    } else {
      setError(emailInput, 'emailError', '');
    }

    if (!messageInput.value.trim()) {
      setError(messageInput, 'messageError', 'Please enter a short message.');
      valid = false;
    } else if (messageInput.value.trim().length < 10) {
      setError(messageInput, 'messageError', 'Message should be at least 10 characters.');
      valid = false;
    } else {
      setError(messageInput, 'messageError', '');
    }

    if (!valid) return;

    // Simulate successful submission (no backend in this task)
    success.textContent = "Thanks! Your message has been sent — we'll reply within one business day.";
    form.reset();
    [nameInput, emailInput, messageInput].forEach((input) =>
      input.closest('.form-field').classList.remove('invalid')
    );
  });
}

/* ---------- Back to top button ---------- */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  const toggle = () => {
    if (window.scrollY > 600) btn.classList.add('visible');
    else btn.classList.remove('visible');
  };
  toggle();
  window.addEventListener('scroll', toggle, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ---------- Hero neural network canvas (signature element) ---------- */
function initNeuralCanvas() {
  const canvas = document.getElementById('neuralCanvas');
  if (!canvas) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ctx = canvas.getContext('2d');
  let width, height, nodes;
  const mouse = { x: null, y: null };

  const NODE_COUNT_BASE = 60; // scaled by area below
  const LINK_DIST = 130;
  const MOUSE_DIST = 160;

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    width = canvas.width = rect.width;
    height = canvas.height = rect.height;
    const count = Math.max(24, Math.min(90, Math.floor((width * height) / 18000)));
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.6 + 1,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > width) n.vx *= -1;
      if (n.y < 0 || n.y > height) n.vy *= -1;

      // links between nodes
      for (let j = i + 1; j < nodes.length; j++) {
        const o = nodes[j];
        const dx = n.x - o.x;
        const dy = n.y - o.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < LINK_DIST) {
          const alpha = (1 - dist / LINK_DIST) * 0.35;
          ctx.strokeStyle = `rgba(124, 92, 252, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(o.x, o.y);
          ctx.stroke();
        }
      }

      // link to mouse
      if (mouse.x !== null) {
        const dx = n.x - mouse.x;
        const dy = n.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_DIST) {
          const alpha = (1 - dist / MOUSE_DIST) * 0.5;
          ctx.strokeStyle = `rgba(79, 209, 197, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      ctx.fillStyle = 'rgba(199, 195, 255, 0.85)';
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fill();
    }

    if (!prefersReducedMotion) requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener('resize', resize);

  canvas.parentElement.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  canvas.parentElement.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Draw a single static frame if reduced motion is preferred, else animate
  draw();
}
