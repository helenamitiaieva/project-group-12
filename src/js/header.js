(() => {
  const mobileMenu = document.querySelector('.js-menu-container');
  const openMenuBtn = document.querySelector('.mobile-menu-open-btn');
  const closeMenuBtn = document.querySelector('.js-close-menu');
  const menu = document.querySelector('.mob-menu');
  const menuLinks = document.querySelectorAll('.mob-menu-item-link');
  function openMobileMenu() {
    mobileMenu.classList.add('is-open');
    closeMenuBtn.classList.remove('hiden-close');
    closeMenuBtn.classList.add('is-open');
    openMenuBtn.classList.add('hiden');
    menu.classList.remove('hiden-none');
    document.body.style.overflow = 'hidden';
  }
  function closeMobileMenu() {
    mobileMenu.classList.remove('is-open');
    closeMenuBtn.classList.remove('is-open');
    openMenuBtn.classList.remove('hiden');
    menu.classList.add('hiden-none');
    document.body.style.overflow = '';
  }
  openMenuBtn.addEventListener('click', openMobileMenu);
  closeMenuBtn.addEventListener('click', closeMobileMenu);
  menuLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
      closeMobileMenu();
    }
  });
  document.addEventListener('click', (e) => {
    if (
      mobileMenu.classList.contains('is-open') &&
      !mobileMenu.contains(e.target) &&
      !openMenuBtn.contains(e.target)
    ) {
      closeMobileMenu();
    }
  });
})();