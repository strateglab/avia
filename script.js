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
    var loc = document.documentElement.lang === 'en' ? 'en-GB' : 'uk-UA';
    var tick = function () {
      var t = new Date().toLocaleTimeString(loc, {
        hour12: false, timeZone: 'Europe/Kyiv'
      });
      clock.textContent = t + ' KYIV';
    };
    tick();
    setInterval(tick, 1000);
  }

  // --- currency tabs ---
  var tabs = document.querySelectorAll('.tab');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var key = tab.getAttribute('data-pay');
      tabs.forEach(function (t) {
        var on = t === tab;
        t.classList.toggle('active', on);
        t.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      document.querySelectorAll('.pay-panel').forEach(function (p) {
        p.hidden = (p.id !== 'pay-' + key);
        p.classList.toggle('active', p.id === 'pay-' + key);
      });
    });
  });

  // --- copy to clipboard ---
  var copyText = function (el) {
    var txt = el.textContent.trim();
    var done = function () {
      el.classList.add('copied');
      setTimeout(function () { el.classList.remove('copied'); }, 1600);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(txt).then(done).catch(function () { done(); });
    } else {
      var ta = document.createElement('textarea');
      ta.value = txt; document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); } catch (e) {}
      document.body.removeChild(ta); done();
    }
  };
  document.querySelectorAll('.copyable').forEach(function (el) {
    el.addEventListener('click', function () { copyText(el); });
    el.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); copyText(el); }
    });
  });
})();
