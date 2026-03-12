'use strict';

(function () {
  // ── Mobile navigation ──────────────────────────────
  const toggle = document.querySelector('.nav-toggle');
  const nav    = document.querySelector('.site-nav');
  const header = document.querySelector('.site-header');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.classList.toggle('is-active', open);
      toggle.setAttribute('aria-expanded', String(open));

      // Prevent body scroll when menu is open on mobile
      document.body.style.overflow = open ? 'hidden' : '';
    });

    // Close nav when a link is clicked
    nav.querySelectorAll('.site-nav__link').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        toggle.classList.remove('is-active');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close nav on outside click
    document.addEventListener('click', (e) => {
      if (!header.contains(e.target) && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        toggle.classList.remove('is-active');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  // ── Scroll-aware header ────────────────────────────
  if (header) {
    const hero = document.querySelector('.hero');
    const THRESHOLD = 80;

    function updateHeader() {
      const scrolled = window.scrollY > THRESHOLD;

      if (hero) {
        // We're on the home page — start transparent over the dark hero
        header.classList.toggle('site-header--over-dark', !scrolled);
        header.classList.toggle('site-header--transparent', !scrolled);
        header.classList.toggle('site-header--solid', scrolled);
      } else {
        // Inner pages — always solid
        header.classList.remove('site-header--over-dark', 'site-header--transparent');
        header.classList.add('site-header--solid');
      }
    }

    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
  }

  // ── Entrance animations via IntersectionObserver ───
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
  }
})();
