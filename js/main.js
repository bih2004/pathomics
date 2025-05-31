// Modern JavaScript with ES6+ features

// Intersection Observer for scroll animations
const animateOnScroll = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px'
  });

  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
};

// Smooth scrolling for anchor links
const initSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
};

// Mobile menu toggle
const initMobileMenu = () => {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const body = document.body;

  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu?.classList.toggle('active');
    body.classList.toggle('menu-open');
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-menu') && !e.target.closest('.hamburger')) {
      hamburger?.classList.remove('active');
      navMenu?.classList.remove('active');
      body.classList.remove('menu-open');
    }
  });
};

// Dropdown menu handling
const initDropdownMenus = () => {
  const dropdowns = document.querySelectorAll('.dropdown');

  dropdowns.forEach(dropdown => {
    const trigger = dropdown.querySelector('.nav-link');
    const menu = dropdown.querySelector('.dropdown-menu');

    trigger?.addEventListener('mouseenter', () => {
      menu?.classList.add('show');
    });

    dropdown.addEventListener('mouseleave', () => {
      menu?.classList.remove('show');
    });

    // Touch device handling
    trigger?.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        menu?.classList.toggle('show');
      }
    });
  });
};

// Lazy loading images
const initLazyLoading = () => {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
};

// Scroll-based header
const initScrollHeader = () => {
  const header = document.querySelector('.header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
      header?.classList.remove('scroll-up');
      return;
    }

    if (currentScroll > lastScroll && currentScroll > 80) {
      // Scrolling down & past header
      header?.classList.remove('scroll-up');
      header?.classList.add('scroll-down');
    } else if (currentScroll < lastScroll) {
      // Scrolling up
      header?.classList.remove('scroll-down');
      header?.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
  });
};

// Initialize all features
const initApp = () => {
  animateOnScroll();
  initSmoothScroll();
  initMobileMenu();
  initDropdownMenus();
  initLazyLoading();
  initScrollHeader();
};

// Run initialization when DOM is ready
document.addEventListener('DOMContentLoaded', initApp);
