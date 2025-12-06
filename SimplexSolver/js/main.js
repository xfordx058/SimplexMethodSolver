/* main.js
 - Theme toggle and small UI helpers
 - Module notes download (Blob)
 - Nav active link highlighting
 - Minimal, non-invasive: does NOT override solver.js event listeners.
*/

(function () {
  const THEME_KEY = 'theme';
  const DEFAULT_THEME = localStorage.getItem(THEME_KEY) || 'light';

  // apply theme globally
  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    // set checkboxes if any
    document.querySelectorAll('.theme-switch').forEach(cb => {
      cb.checked = theme === 'dark';
    });
    localStorage.setItem(THEME_KEY, theme);
  }

  // initialize theme switches
  function initThemeToggles() {
    document.querySelectorAll('.theme-toggle').forEach(label => {
      const cb = label.querySelector('.theme-switch');
      const slider = label.querySelector('.slider');
      if (!cb) return;
      // set initial
      cb.addEventListener('change', () => {
        applyTheme(cb.checked ? 'dark' : 'light');
      });
    });
  }

  // Module note contents removed - PDFs now downloaded directly from HTML
  
  function initModuleButtons() {
    // No longer needed - downloads handled via HTML links
  }

  // Hamburger menu and drawer
  function initHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const drawer = document.getElementById('side-drawer');
    const backdrop = document.getElementById('drawer-backdrop');
    if (!hamburger || !drawer || !backdrop) return;

    function openDrawer() {
      drawer.classList.add('open');
      drawer.setAttribute('aria-hidden', 'false');
      backdrop.hidden = false;
    }

    function closeDrawer() {
      drawer.classList.remove('open');
      drawer.setAttribute('aria-hidden', 'true');
      backdrop.hidden = true;
    }

    hamburger.addEventListener('click', () => {
      if (drawer.classList.contains('open')) closeDrawer();
      else openDrawer();
    });

    backdrop.addEventListener('click', closeDrawer);

    document.querySelectorAll('.drawer-link').forEach(link => {
      link.addEventListener('click', closeDrawer);
    });
  }

  // Set year in footer
  function setFooterYear() {
    const yearSpan = document.getElementById('year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
  }

  // Nav active link based on path
  function setActiveNav() {
    document.querySelectorAll('nav a').forEach(a => {
      try {
        const href = a.getAttribute('href');
        if (!href) return;
        const path = location.pathname.split('/').pop() || 'index.html';
        if (href.includes(path)) a.classList.add('active');
        else a.classList.remove('active');
      } catch (e) {}
    });
  }

  // Provide styleConstraintRows for solver.js to call
  window.styleConstraintRows = function () {
    const rows = document.querySelectorAll('.constraint-row');
    rows.forEach((r, i) => {
      r.classList.remove('c-odd', 'c-even');
      r.classList.add(i % 2 === 0 ? 'c-odd' : 'c-even');
    });
  };

  // Carousel functionality
  let carouselIndex = 0;
  function initCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    if (slides.length === 0) return;
    
    function showSlide(n) {
      slides.forEach(slide => slide.classList.remove('show'));
      slides[n % slides.length].classList.add('show');
    }
    
    showSlide(carouselIndex);
    setInterval(() => {
      carouselIndex++;
      showSlide(carouselIndex);
    }, 4000); // Change slide every 4 seconds
  }

  // Fade-in small animation for .glass-card elements
  function revealCards() {
    document.querySelectorAll('.glass-card').forEach((el, idx) => {
      el.style.transitionDelay = (idx * 30) + 'ms';
      el.classList.add('fade-up');
      requestAnimationFrame(() => {
        el.classList.add('visible');
      });
    });
  }

  // Initialize on DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    applyTheme(localStorage.getItem(THEME_KEY) || DEFAULT_THEME);
    initThemeToggles();
    initModuleButtons();
    initHamburgerMenu();
    setFooterYear();
    setActiveNav();
    initCarousel();
    revealCards();
    // style constraint rows immediately
    if (typeof window.styleConstraintRows === 'function') window.styleConstraintRows();
  });

})();
