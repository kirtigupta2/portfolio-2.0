// About my process: the plastic sleeve. Hover lifts it over the notebook, click opens it and the three notes
// spread out on it in a new random arrangement each time; clicking the sleeve again, anywhere else, or pressing Esc puts them back.
(function () {
  const pouch = document.getElementById('pouch');
  if (!pouch) return;
  const all = [...pouch.querySelectorAll('.pouch__note')];
  const notes = all.filter(n => !n.classList.contains('pouch__note--hint'));
  const hint = pouch.querySelector('.pouch__note--hint');
  const rnd = (a, b) => a + Math.random() * (b - a);

  function arrange() {
    // the three notes take three vertical slots on the sleeve (shuffled), each nudged and tilted a little (the sleeve itself sits at about -25deg)
    const slots = [9, 32, 55].sort(() => Math.random() - .5);
    notes.forEach((n, i) => {
      n.style.setProperty('--w', rnd(64, 72).toFixed(1) + '%');
      n.style.setProperty('--x', rnd(12, 24).toFixed(1) + '%');
      n.style.setProperty('--y', (slots[i] + rnd(-2, 2)).toFixed(1) + '%');
      n.style.setProperty('--r', rnd(-16, -3).toFixed(1) + 'deg');
      n.style.setProperty('--r0', rnd(-30, -10).toFixed(1) + 'deg');
      n.style.setProperty('--d', (i * 0.09).toFixed(2) + 's');
    });
    // the small "click again to close" scrap sits apart from the others, lower down, and comes out last
    if (hint) {
      hint.style.setProperty('--w', rnd(40, 46).toFixed(1) + '%');
      hint.style.setProperty('--x', rnd(34, 50).toFixed(1) + '%');
      hint.style.setProperty('--y', rnd(80, 84).toFixed(1) + '%');
      hint.style.setProperty('--r', rnd(-14, -6).toFixed(1) + 'deg');
      hint.style.setProperty('--r0', rnd(-24, -14).toFixed(1) + 'deg');
      hint.style.setProperty('--d', '0.36s');
    }
  }
  function open() {
    if (pouch.classList.contains('is-open')) return;
    arrange();
    pouch.classList.add('is-open'); pouch.setAttribute('aria-expanded', 'true');
    pouch.setAttribute('aria-label', '3 things I strongly believe in');
  }
  function close() {
    if (!pouch.classList.contains('is-open')) return;
    pouch.classList.remove('is-open'); pouch.setAttribute('aria-expanded', 'false');
    pouch.setAttribute('aria-label', '3 things I strongly believe in. Open the sleeve to read them.');
  }

  pouch.addEventListener('click', e => { e.stopPropagation(); pouch.classList.contains('is-open') ? close() : open(); });   // click the sleeve: opens it, click it again: closes it
  pouch.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pouch.classList.contains('is-open') ? close() : open(); } });
  document.addEventListener('click', e => { if (!pouch.contains(e.target)) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
})();
