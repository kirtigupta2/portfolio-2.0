// About my process: the plastic sleeve. Hover lifts it over the notebook, click opens it and the three notes
// spread out on it in a new random arrangement each time; clicking anywhere else (or Esc) puts them back.
(function () {
  const pouch = document.getElementById('pouch');
  if (!pouch) return;
  const notes = [...pouch.querySelectorAll('.pouch__note')];
  const rnd = (a, b) => a + Math.random() * (b - a);

  function arrange() {
    // three vertical slots on the sleeve, shuffled, each nudged and tilted a little (the sleeve itself sits at about -25deg)
    const slots = [17, 41, 65].sort(() => Math.random() - .5);
    notes.forEach((n, i) => {
      n.style.setProperty('--w', rnd(64, 72).toFixed(1) + '%');
      n.style.setProperty('--x', rnd(12, 24).toFixed(1) + '%');
      n.style.setProperty('--y', (slots[i] + rnd(-2.5, 2.5)).toFixed(1) + '%');
      n.style.setProperty('--r', rnd(-16, -3).toFixed(1) + 'deg');
      n.style.setProperty('--r0', rnd(-30, -10).toFixed(1) + 'deg');
      n.style.setProperty('--d', (i * 0.09).toFixed(2) + 's');
    });
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

  pouch.addEventListener('click', e => { e.stopPropagation(); open(); });
  pouch.addEventListener('keydown', e => { if ((e.key === 'Enter' || e.key === ' ') && !pouch.classList.contains('is-open')) { e.preventDefault(); open(); } });
  document.addEventListener('click', e => { if (!pouch.contains(e.target)) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
})();
