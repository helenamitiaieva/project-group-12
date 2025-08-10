

(() => {
  const mobileMenu = document.querySelector('.js-menu-container');
  const openMenuBtn = document.querySelector('.mobile-menu-open-btn');
  const closeMenuBtn = document.querySelector('.js-close-menu');
  const menuLinks = document.querySelectorAll('.nav-list-item-link');

  const openMenu = () => {
    mobileMenu.classList.add('is-open');
    openMenuBtn.classList.add('hiden');
    closeMenuBtn.classList.remove('hiden-close');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    mobileMenu.classList.remove('is-open');
    openMenuBtn.classList.remove('hiden');
    closeMenuBtn.classList.add('hiden-close');
    document.body.style.overflow = '';
  };

  openMenuBtn.addEventListener('click', openMenu);
  closeMenuBtn.addEventListener('click', closeMenu);

  // Закриття при кліку на посилання меню
  menuLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Закриття при кліку поза меню
  document.addEventListener('click', e => {
    if (
      mobileMenu.classList.contains('is-open') &&
      !mobileMenu.contains(e.target) &&
      !openMenuBtn.contains(e.target)
    ) {
      closeMenu();
    }
  });

  // Закриття по Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeMenu();
    }
  });
})();
