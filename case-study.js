// Index: smooth-scroll to a section, highlight the section being read, phone sheet toggle
(function () {
  const links = [...document.querySelectorAll('#toc a')];
  const groups = links.map(a => document.querySelector(a.getAttribute('href')));
  const btn = document.getElementById('toc-btn'), toc = document.getElementById('toc');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const setActive = id => links.forEach(a => {
    const on = a.getAttribute('href') === '#' + id;
    a.classList.toggle('is-active', on);
    if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
  });
  const closeToc = () => { toc.classList.remove('is-open'); btn.setAttribute('aria-expanded', 'false'); };
  btn.addEventListener('click', () => {
    const open = toc.classList.toggle('is-open'); btn.setAttribute('aria-expanded', String(open));
  });
  links.forEach(a => a.addEventListener('click', e => {
    e.preventDefault();
    const t = document.querySelector(a.getAttribute('href'));
    t.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    history.replaceState(null, '', a.getAttribute('href'));
    setActive(t.id); closeToc();
  }));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeToc(); });
  // The active entry is the last section whose top has passed the reading line (just under the nav)
  let ticking = false;
  function spy() {
    ticking = false;
    const line = innerHeight * 0.3; let cur = groups[0];
    groups.forEach(g => { if (g.getBoundingClientRect().top <= line) cur = g; });
    if (innerHeight + scrollY >= document.documentElement.scrollHeight - 4) cur = groups[groups.length - 1];
    setActive(cur.id);
  }
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(spy); } }, { passive: true });
  addEventListener('resize', spy);
  spy();
  if (location.hash && document.querySelector(location.hash)) setTimeout(() => document.querySelector(location.hash).scrollIntoView(), 50);
})();
