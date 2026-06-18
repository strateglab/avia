/* БО «БФ «Безпечна Україна» — interactions */
(function () {
  'use strict';

  // --- year ---
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // --- mobile nav ---
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // --- scroll reveal ---
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var items = document.querySelectorAll('.reveal');
  if (reduce || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    items.forEach(function (el) { io.observe(el); });
  }

  // --- hero clock (Kyiv) ---
  var clock = document.getElementById('clock');
  if (clock) {
    var tick = function () {
      var t = new Date().toLocaleTimeString('uk-UA', {
        hour12: false, timeZone: 'Europe/Kyiv'
      });
      clock.textContent = t + ' KYIV';
    };
    tick();
    setInterval(tick, 1000);
  }
})();
