(() => {
  const mobileMenu = document.querySelector('.js-menu-container');
  const openMenuBtn = document.querySelector('.mobile-menu-open-btn');
  const closeMenuBtn = document.querySelector('.js-close-menu');

  openMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.add('is-open');
    closeMenuBtn.classList.remove('hiden-close');
    closeMenuBtn.classList.add('is-open');
    openMenuBtn.classList.add('hiden')
  });

  closeMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.remove('is-open');
    openMenuBtn.classList.remove('hiden')
    closeMenuBtn.classList.remove('is-open');
  });

  openMenuBtn.addEventListener('click', () => {
  mobileMenu.classList.add('is-open');
  document.body.style.overflow = 'hidden'; // додати
});

  closeMenuBtn.addEventListener('click', () => {
  mobileMenu.classList.remove('is-open');
  document.body.style.overflow = ''; // додати
});
    })();
  document.addEventListener('click', (e) => {
  if (
    mobileMenu.classList.contains('is-open') &&
    !mobileMenu.contains(e.target) &&
    !openMenuBtn.contains(e.target)
  ) {
    mobileMenu.classList.remove('is-open');
    document.body.style.overflow = '';
  }
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    mobileMenu.classList.remove('is-open');
    document.body.style.overflow = '';
  }
});
document.querySelectorAll('.mob-menu-item-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('is-open');
    document.body.style.overflow = '';
  });
});

