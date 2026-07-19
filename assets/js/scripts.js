(function () {
  'use strict';

  var body = document.body;
  var menuTrigger = document.getElementById('toggle-main-menu-mobile');
  var menuContainer = document.getElementById('main-menu-mobile');
  var header = document.querySelector('.header');
  var fullscreenModal = document.getElementById('fullscreenModal');

  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function initStickyHeader() {
    if (!header) return;

    var ticking = false;

    function updateHeader() {
      header.classList.toggle('header-scrolled', window.scrollY > 8);
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(updateHeader);
        ticking = true;
      }
    }, { passive: true });

    updateHeader();
  }

  function initMobileMenu() {
    if (!menuTrigger || !menuContainer) return;

    var menuLinks = menuContainer.querySelectorAll('a');
    var lastFocusedElement = null;

    function setMenuState(isOpen) {
      menuContainer.classList.toggle('open', isOpen);
      menuTrigger.classList.toggle('is-active', isOpen);
      body.classList.toggle('lock-scroll', isOpen);
      menuTrigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      menuTrigger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
      menuContainer.setAttribute('aria-hidden', isOpen ? 'false' : 'true');

      if (isOpen) {
        lastFocusedElement = document.activeElement;
        var firstLink = menuLinks[0];
        if (firstLink) firstLink.focus();
      } else if (lastFocusedElement) {
        menuTrigger.focus();
      }
    }

    function closeMenu() {
      setMenuState(false);
    }

    function openMenu() {
      setMenuState(true);
    }

    menuTrigger.addEventListener('click', function (event) {
      event.stopPropagation();
      if (menuContainer.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    menuContainer.addEventListener('click', function (event) {
      event.stopPropagation();
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && menuContainer.classList.contains('open')) {
        closeMenu();
      }
    });

    document.addEventListener('click', function () {
      if (menuContainer.classList.contains('open')) {
        closeMenu();
      }
    });

    menuLinks.forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
  }

  function initSmoothScroll() {
    document.addEventListener('click', function (event) {
      var link = event.target.closest('a[href^="#"]');
      if (!link) return;

      var href = link.getAttribute('href');
      if (!href || href === '#') return;

      var target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({
        behavior: prefersReducedMotion() ? 'auto' : 'smooth',
        block: 'start'
      });
    });
  }

  function initFullscreenModal() {
    if (!fullscreenModal) return;

    var modalImg = fullscreenModal.querySelector('img');
    if (!modalImg) return;

    function closeModal() {
      fullscreenModal.classList.remove('show');
      fullscreenModal.setAttribute('hidden', '');
      modalImg.removeAttribute('src');
    }

    function openModal(src) {
      modalImg.src = src;
      fullscreenModal.classList.add('show');
      fullscreenModal.removeAttribute('hidden');
      fullscreenModal.focus();
    }

    document.querySelectorAll('.fullscreen-link').forEach(function (link) {
      link.addEventListener('click', function (event) {
        event.preventDefault();
        openModal(link.href);
      });
    });

    fullscreenModal.addEventListener('click', closeModal);

    fullscreenModal.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        closeModal();
      }
    });
  }

  function initLazyImages() {
    document.querySelectorAll('.content img:not([loading])').forEach(function (img) {
      img.setAttribute('loading', 'lazy');
      img.setAttribute('decoding', 'async');
    });
  }

  initStickyHeader();
  initMobileMenu();
  initSmoothScroll();
  initFullscreenModal();
  initLazyImages();
})();
