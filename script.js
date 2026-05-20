/* Charrie Castillo — Portfolio (Complete edition)
   Theme toggle, mobile menu with hamburger, reveals, magnetic buttons, marquee */

(function () {
  'use strict';

  // ---------- Theme ----------
  const root = document.documentElement;
  const stored = localStorage.getItem('cc-theme-c');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  root.setAttribute('data-theme', stored || (prefersDark ? 'dark' : 'light'));

  function setupTheme() {
    const btn = document.querySelector('[data-theme-toggle]');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem('cc-theme-c', next);
      btn.setAttribute('aria-label', next === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    });
    // initialise label
    const current = root.getAttribute('data-theme');
    btn.setAttribute('aria-label', current === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }

  // ---------- Mobile menu ----------
  function setupMobileMenu() {
    const btn = document.querySelector('[data-menu-toggle]');
    const nav = document.querySelector('.nav');
    const body = document.body;
    if (!btn || !nav) return;

    function close() {
      body.removeAttribute('data-menu-open');
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-label', 'Open menu');
    }
    function open() {
      body.setAttribute('data-menu-open', '');
      btn.setAttribute('aria-expanded', 'true');
      btn.setAttribute('aria-label', 'Close menu');
    }

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      body.hasAttribute('data-menu-open') ? close() : open();
    });

    document.querySelectorAll('.nav__links a, .nav__menu-cta').forEach(link => {
      link.addEventListener('click', close);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && body.hasAttribute('data-menu-open')) {
        close();
        btn.focus();
      }
    });

    document.addEventListener('click', (e) => {
      if (!body.hasAttribute('data-menu-open')) return;
      if (!nav.contains(e.target)) close();
    });

    const mql = window.matchMedia('(min-width: 881px)');
    const handler = () => { if (mql.matches) close(); };
    if (mql.addEventListener) mql.addEventListener('change', handler);
    else if (mql.addListener) mql.addListener(handler);
  }

  // ---------- Scroll reveals ----------
  function setupReveals() {
    const items = document.querySelectorAll('.reveal');
    if (!items.length) return;
    if (!('IntersectionObserver' in window)) {
      items.forEach(el => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    items.forEach(el => io.observe(el));
  }

  // ---------- Active nav link ----------
  function setupActiveLink() {
    const links = document.querySelectorAll('.nav__links a[data-route]');
    const path = location.pathname.split('/').pop() || 'index.html';
    links.forEach(a => {
      if (a.getAttribute('data-route') === path) {
        a.classList.add('active');
        a.setAttribute('aria-current', 'page');
      }
    });
    // mark CTA as current if on contact page
    if (path === 'contact.html') {
      document.querySelectorAll('.nav__cta, .nav__menu-cta').forEach(c => c.setAttribute('aria-current', 'page'));
    }
  }

  // ---------- Magnetic CTA buttons ----------
  function setupMagnetic() {
    if (window.matchMedia('(hover: none)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const targets = document.querySelectorAll('[data-magnetic]');
    targets.forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        el.style.transform = `translate(${x * 0.18}px, ${y * 0.25}px)`;
      });
      el.addEventListener('mouseleave', () => { el.style.transform = ''; });
    });
  }

  // ---------- Marquee loop ----------
  function setupMarquee() {
    const tracks = document.querySelectorAll('.marquee__track');
    tracks.forEach(track => {
      const inner = track.innerHTML;
      track.innerHTML = inner + inner;
    });
  }

  // ---------- Boot ----------
  document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('js-ready');
    setupTheme();
    setupMobileMenu();
    setupReveals();
    setupActiveLink();
    setupMagnetic();
    setupMarquee();
  });
})();
