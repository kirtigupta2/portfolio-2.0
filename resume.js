// Resume viewer: the nav "Resume" link opens the PDF in an on-page overlay with a Download button.
(function () {
  const PDF = 'assets/Kirti_Gupta_Resume.pdf?v=2';   // bump v when the PDF is replaced so browsers don't show the old copy
  const links = document.querySelectorAll('a[data-resume]');
  if (!links.length) return;

  const modal = document.createElement('div');
  modal.className = 'resume-modal';
  modal.hidden = true;
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-label', 'Resume');
  modal.innerHTML =
    '<div class="resume-modal__panel">' +
      '<div class="resume-modal__bar">' +
        '<span class="resume-modal__title">Resume</span>' +
        '<a class="resume-modal__btn" href="' + PDF + '" download="Kirti_Gupta_Resume.pdf">Download</a>' +
        '<button class="resume-modal__btn resume-modal__close" type="button" aria-label="Close resume">Close</button>' +
      '</div>' +
      '<iframe class="resume-modal__frame" title="Kirti Gupta resume" loading="lazy"></iframe>' +
      '<p class="resume-modal__fallback">Can’t see the resume? <a href="' + PDF + '" target="_blank" rel="noopener">Open it in a new tab</a>.</p>' +
    '</div>';
  document.body.appendChild(modal);

  const frame = modal.querySelector('iframe');
  let opener = null;

  function open(from) {
    opener = from;
    if (!frame.getAttribute('src')) frame.src = PDF + '#view=FitH';
    modal.hidden = false;
    document.documentElement.style.overflow = 'hidden';
    modal.querySelector('.resume-modal__close').focus();
  }
  function close() {
    modal.hidden = true;
    document.documentElement.style.overflow = '';
    if (opener) opener.focus();
  }

  links.forEach(a => a.addEventListener('click', e => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button) return; // let "open in new tab" work
    e.preventDefault(); open(a);
  }));
  modal.querySelector('.resume-modal__close').addEventListener('click', close);
  modal.addEventListener('click', e => { if (e.target === modal) close(); });
  addEventListener('keydown', e => { if (e.key === 'Escape' && !modal.hidden) close(); });
})();
