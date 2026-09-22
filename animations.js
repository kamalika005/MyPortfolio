// Subtle scroll-reveal: fades + slides content up as it enters the viewport.
document.addEventListener('DOMContentLoaded', function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var selector = [
    '.hero .eyebrow', '.hero h1', '.hero .hero-copy', '.hero .tags',
    '.story-head', '.story-image',
    '.section-label',
    '.about h2', '.about > p', '.about-grid > div',
    '.contact h2', '.contact > p', '.contact .email',
    '.case-hero .eyebrow', '.case-hero h1', '.case-hero .lead', '.meta-grid > div',
    '.case-image', '.narrative h2', '.narrative > p', '.section > h2', '.section > p',
    '.dark-card', '.timeline > div', '.iteration-grid > div', '.choice',
    '.routine', '.evo-card', '.reward-grid > div', '.watch-grid > div',
    '.role-grid > div', '.system-flow > div', '.persona-grid', '.hierarchy',
    '.outcome-box', '.next-case a', '.activity-visual > div', '.flow',
    '.journey-step', '.journey-repeat'
  ].join(',');

  var els = Array.prototype.slice.call(document.querySelectorAll(selector));

  // Group by parent so siblings stagger nicely relative to each other.
  var groups = new Map();
  els.forEach(function (el) {
    var key = el.parentElement;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(el);
  });
  groups.forEach(function (list) {
    list.forEach(function (el, i) {
      el.classList.add('reveal');
      el.style.transitionDelay = (Math.min(i, 5) * 70) + 'ms';
    });
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

  els.forEach(function (el) { observer.observe(el); });
});
