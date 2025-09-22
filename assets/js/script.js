const body = document.body;
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('#nav-menu');
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const themeToggle = document.querySelector('.theme-toggle');
const cursor = document.querySelector('.cursor');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.primary-nav a[data-section]');
const yearEl = document.querySelector('#year');

// Set current year in footer
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Custom cursor interaction
if (cursor) {
  document.addEventListener('pointermove', (event) => {
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
  });

  document.querySelectorAll('a, button').forEach((interactive) => {
    interactive.addEventListener('pointerenter', () => cursor.classList.add('is-active'));
    interactive.addEventListener('pointerleave', () => cursor.classList.remove('is-active'));
  });
}

// Navigation toggle for mobile
if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navMenu.classList.toggle('is-open');
    navToggle.classList.toggle('is-open');
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navToggle.setAttribute('aria-expanded', 'false');
      navMenu.classList.remove('is-open');
      navToggle.classList.remove('is-open');
    });
  });
}

// Project filtering interaction
filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.remove('is-active'));
    button.classList.add('is-active');

    const filter = button.dataset.filter;

    projectCards.forEach((card) => {
      const categories = card.dataset.category.split(' ');
      const isVisible = filter === 'all' || categories.includes(filter);
      card.style.opacity = isVisible ? '1' : '0.2';
      card.style.pointerEvents = isVisible ? 'auto' : 'none';
      card.style.filter = isVisible ? 'none' : 'grayscale(0.8)';
    });
  });
});

// Theme toggle with preference persistence
const storedTheme = localStorage.getItem('preferred-theme');
if (storedTheme) {
  body.setAttribute('data-theme', storedTheme);
} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  body.setAttribute('data-theme', 'dark');
}

const toggleTheme = () => {
  const currentTheme = body.getAttribute('data-theme');
  const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
  body.setAttribute('data-theme', nextTheme);
  localStorage.setItem('preferred-theme', nextTheme);
};

themeToggle?.addEventListener('click', toggleTheme);

// Scroll spy to highlight navigation
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const link = document.querySelector(`.primary-nav a[data-section="${entry.target.id}"]`);
      if (!link) return;

      if (entry.isIntersecting) {
        navLinks.forEach((navLink) => navLink.classList.remove('is-active'));
        link.classList.add('is-active');
      }
    });
  },
  {
    threshold: 0.4,
  }
);

sections.forEach((section) => observer.observe(section));

// Animate elements on scroll
const animatedElements = document.querySelectorAll(
  '.section, .skill-card, .project-card, .timeline-item, .highlight-card'
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.2,
  }
);

animatedElements.forEach((el) => {
  el.classList.add('will-animate');
  revealObserver.observe(el);
});

// Floating card parallax
const floatingCard = document.querySelector('.floating-card');
if (floatingCard) {
  window.addEventListener('pointermove', (event) => {
    const { innerWidth, innerHeight } = window;
    const x = (event.clientX / innerWidth - 0.5) * 10;
    const y = (event.clientY / innerHeight - 0.5) * 10;
    floatingCard.style.transform = `translateY(${y}px) rotateX(${y / 5}deg) rotateY(${x / 5}deg)`;
  });
}

// Reduce motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (prefersReducedMotion.matches) {
  document.querySelectorAll('*').forEach((element) => {
    element.style.setProperty('animation-duration', '0.001ms');
    element.style.setProperty('animation-iteration-count', '1');
    element.style.setProperty('transition-duration', '0.001ms');
  });
}

// Accessibility: close nav when clicking outside
if (navMenu) {
  document.addEventListener('click', (event) => {
    if (!navMenu.contains(event.target) && !navToggle?.contains(event.target)) {
      navMenu.classList.remove('is-open');
      navToggle?.setAttribute('aria-expanded', 'false');
      navToggle?.classList.remove('is-open');
    }
  });
}
