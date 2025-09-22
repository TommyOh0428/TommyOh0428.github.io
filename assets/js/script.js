(function () {
  const root = document.documentElement;
  const body = document.body;
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const storedTheme = localStorage.getItem('preferred-theme');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelectorAll('.site-nav a[data-nav]');
  const themeToggle = document.querySelector('[data-theme-toggle]');
  const sections = document.querySelectorAll('main section[id]');
  const backToTop = document.querySelector('.back-to-top');
  const observerTargets = document.querySelectorAll('.reveal');
  const currentYearEl = document.getElementById('year');

  function setTheme(theme) {
    const nextTheme = theme || (prefersDark.matches ? 'dark' : 'light');
    root.setAttribute('data-theme', nextTheme);
    localStorage.setItem('preferred-theme', nextTheme);
    if (themeToggle) {
      const nextLabel = nextTheme === 'dark' ? 'Activate light theme' : 'Activate dark theme';
      themeToggle.setAttribute('aria-label', nextLabel);
    }
  }

  function toggleTheme() {
    const current = root.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
  }

  function closeNav() {
    body.classList.remove('nav-open');
    navToggle?.setAttribute('aria-expanded', 'false');
  }

  function toggleNav() {
    const isOpen = body.classList.toggle('nav-open');
    navToggle?.setAttribute('aria-expanded', String(isOpen));
  }

  function updateActiveLink() {
    const offset = document.querySelector('.site-header')?.offsetHeight || 0;
    const scrollPosition = window.scrollY + offset + 8;

    sections.forEach((section) => {
      const { id } = section;
      const start = section.offsetTop;
      const end = start + section.offsetHeight;
      const isActive = scrollPosition >= start && scrollPosition < end;
      const link = document.querySelector(`.site-nav a[data-nav="${id}"]`);
      link?.classList.toggle('is-active', isActive);
    });
  }

  function updateBackToTop() {
    if (!backToTop) return;
    const shouldShow = window.scrollY > 600;
    backToTop.classList.toggle('is-visible', shouldShow);
  }

  function handleBackToTop(event) {
    if (!backToTop) return;
    event.preventDefault();
    if (prefersReducedMotion.matches) {
      window.scrollTo(0, 0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function initReveal() {
    if (!('IntersectionObserver' in window)) {
      observerTargets.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );

    observerTargets.forEach((el) => observer.observe(el));
  }

  function bindEvents() {
    navToggle?.addEventListener('click', toggleNav);

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        closeNav();
      });
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeNav();
      }
    });

    themeToggle?.addEventListener('click', toggleTheme);
    prefersDark.addEventListener?.('change', () => {
      const stored = localStorage.getItem('preferred-theme');
      if (!stored) {
        setTheme();
      }
    });

    backToTop?.addEventListener('click', handleBackToTop);

    window.addEventListener('scroll', () => {
      updateActiveLink();
      updateBackToTop();
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 840) {
        closeNav();
      }
    });
  }

  function init() {
    setTheme(storedTheme);
    bindEvents();
    initReveal();
    updateActiveLink();
    updateBackToTop();

    if (currentYearEl) {
      currentYearEl.textContent = new Date().getFullYear();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
