/* ==========================================================================
   Renew Exterior Cleaning — Jacksonville, FL
   Site interactions: nav, scroll state, reveals, counters, form validation
   ========================================================================== */
(function () {
  'use strict';

  /* ---------------------------------------------------------------
   * Mobile navigation
   * ------------------------------------------------------------- */
  var navToggle = document.getElementById('navToggle');
  var nav = document.getElementById('primaryNav');

  function closeNav() {
    if (!nav || !navToggle) return;
    nav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open navigation menu');
    document.body.classList.remove('nav-open');
  }

  function openNav() {
    if (!nav || !navToggle) return;
    nav.classList.add('is-open');
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Close navigation menu');
    document.body.classList.add('nav-open');
  }

  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      var isOpen = nav.classList.contains('is-open');
      if (isOpen) { closeNav(); } else { openNav(); }
    });

    // Close when a link is tapped
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) { closeNav(); }
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!nav.classList.contains('is-open')) return;
      if (nav.contains(e.target) || navToggle.contains(e.target)) return;
      closeNav();
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        closeNav();
        navToggle.focus();
      }
    });

    // Reset when resizing back to desktop
    window.addEventListener('resize', function () {
      if (window.innerWidth > 900) { closeNav(); }
    });
  }

  /* ---------------------------------------------------------------
   * Sticky header shadow
   * ------------------------------------------------------------- */
  var header = document.getElementById('header');
  function onScrollHeader() {
    if (!header) return;
    if (window.scrollY > 12) {
      header.classList.add('is-stuck');
    } else {
      header.classList.remove('is-stuck');
    }
  }
  window.addEventListener('scroll', onScrollHeader, { passive: true });
  onScrollHeader();

  /* ---------------------------------------------------------------
   * Active nav link on scroll (scroll spy)
   * ------------------------------------------------------------- */
  var navLinks = Array.prototype.slice.call(
    document.querySelectorAll('.nav__list a[href^="#"]')
  );
  var sections = navLinks
    .map(function (link) {
      var id = link.getAttribute('href');
      if (!id || id === '#' || id.length < 2) return null;
      var el = document.querySelector(id);
      return el ? { link: link, el: el } : null;
    })
    .filter(Boolean);

  function setActiveLink() {
    var pos = window.scrollY + (window.innerHeight * 0.28);
    var current = null;

    sections.forEach(function (item) {
      if (item.el.offsetTop <= pos) { current = item; }
    });

    navLinks.forEach(function (l) { l.classList.remove('is-active'); });
    if (current) { current.link.classList.add('is-active'); }
  }

  if (sections.length) {
    window.addEventListener('scroll', setActiveLink, { passive: true });
    setActiveLink();
  }

  /* ---------------------------------------------------------------
   * Reveal on scroll
   * ------------------------------------------------------------- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  var reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!revealEls.length) {
    // nothing to do
  } else if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry, i) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var delay = Math.min(i * 90, 360);
        setTimeout(function () { el.classList.add('is-visible'); }, delay);
        obs.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---------------------------------------------------------------
   * Animated stat counters
   * ------------------------------------------------------------- */
  var counters = Array.prototype.slice.call(document.querySelectorAll('[data-count]'));

  function animateCount(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    if (isNaN(target)) return;

    var finalText = el.textContent;
    var suffix = finalText.replace(/[\d,]/g, '');
    var duration = 1400;
    var start = null;

    function frame(ts) {
      if (start === null) { start = ts; }
      var progress = Math.min((ts - start) / duration, 1);
      // easeOutCubic
      var eased = 1 - Math.pow(1 - progress, 3);
      var value = Math.floor(eased * target);
      el.textContent = value.toLocaleString('en-US') + suffix;
      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        el.textContent = finalText;
      }
    }
    requestAnimationFrame(frame);
  }

  if (counters.length && !reduceMotion && 'IntersectionObserver' in window) {
    var countObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        animateCount(entry.target);
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.5 });

    counters.forEach(function (el) { countObserver.observe(el); });
  }

  /* ---------------------------------------------------------------
   * Current year in footer
   * ------------------------------------------------------------- */
  var yearEl = document.getElementById('year');
  if (yearEl) { yearEl.textContent = String(new Date().getFullYear()); }

  /* ---------------------------------------------------------------
   * Quote form validation
   * ------------------------------------------------------------- */
  var form = document.getElementById('quoteForm');
  var success = document.getElementById('formSuccess');

  if (form) {
    var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

    function fieldError(name) {
      return form.querySelector('[data-error-for="' + name + '"]');
    }

    function showError(field, message) {
      var box = fieldError(field.name);
      if (field.type !== 'checkbox') { field.classList.add('is-invalid'); }
      field.setAttribute('aria-invalid', 'true');
      if (box) {
        box.textContent = message;
        box.classList.add('is-visible');
      }
    }

    function clearError(field) {
      var box = fieldError(field.name);
      field.classList.remove('is-invalid');
      field.removeAttribute('aria-invalid');
      if (box) {
        box.textContent = '';
        box.classList.remove('is-visible');
      }
    }

    function validateField(field) {
      var value = (field.value || '').trim();

      if (field.type === 'checkbox') {
        if (field.required && !field.checked) {
          showError(field, 'Please confirm we may contact you about your quote.');
          return false;
        }
        clearError(field);
        return true;
      }

      if (field.required && !value) {
        var labels = {
          name: 'Please enter your full name.',
          phone: 'Please enter a phone number we can reach you on.',
          email: 'Please enter your email address.',
          service: 'Please choose the service you need.'
        };
        showError(field, labels[field.name] || 'This field is required.');
        return false;
      }

      if (field.name === 'email' && value && !EMAIL_RE.test(value)) {
        showError(field, 'Please enter a valid email address, e.g. jane@example.com');
        return false;
      }

      if (field.name === 'phone' && value) {
        var digits = value.replace(/\D/g, '');
        if (digits.length < 10) {
          showError(field, 'Please enter a 10-digit phone number.');
          return false;
        }
      }

      if (field.name === 'name' && value && value.length < 2) {
        showError(field, 'Please enter your full name.');
        return false;
      }

      clearError(field);
      return true;
    }

    var validatable = Array.prototype.slice.call(
      form.querySelectorAll('input[required], select[required], #email, #phone')
    );

    validatable.forEach(function (field) {
      field.addEventListener('blur', function () { validateField(field); });
      field.addEventListener('input', function () {
        if (field.classList.contains('is-invalid') || field.type === 'checkbox') {
          validateField(field);
        }
      });
      field.addEventListener('change', function () {
        if (field.tagName === 'SELECT' || field.type === 'checkbox') {
          validateField(field);
        }
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var valid = true;
      var firstBad = null;

      validatable.forEach(function (field) {
        if (!validateField(field)) {
          valid = false;
          if (!firstBad) { firstBad = field; }
        }
      });

      if (!valid) {
        if (firstBad) {
          firstBad.focus();
          firstBad.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
        }
        return;
      }

      var button = form.querySelector('button[type="submit"]');
      var originalLabel = button ? button.textContent : '';

      if (button) {
        button.disabled = true;
        button.textContent = 'Sending your request…';
      }

      // No backend is configured for this static site, so the submission is
      // acknowledged locally and the visitor is pointed to phone and email.
      setTimeout(function () {
        form.reset();

        validatable.forEach(function (field) { clearError(field); });

        if (button) {
          button.disabled = false;
          button.textContent = originalLabel;
        }

        if (success) {
          success.hidden = false;
          success.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
        }
      }, 700);
    });
  }

  /* ---------------------------------------------------------------
   * Smooth anchor scrolling fallback (older Safari)
   * ------------------------------------------------------------- */
  if (!('scrollBehavior' in document.documentElement.style)) {
    document.addEventListener('click', function (e) {
      var link = e.target.closest('a[href^="#"]');
      if (!link) return;

      var id = link.getAttribute('href');
      if (!id || id === '#' || id.length < 2) return;

      var target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();
      var offset = (header ? header.offsetHeight : 0) + 12;
      window.scrollTo(0, target.getBoundingClientRect().top + window.pageYOffset - offset);
    });
  }
})();
