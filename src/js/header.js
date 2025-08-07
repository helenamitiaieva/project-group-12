(() => {
  const mobileMenu = document.querySelector('.js-menu-container');
  const openMenuBtn = document.querySelector('.mobile-menu-open-btn');
  const closeMenuBtn = document.querySelector('.js-close-menu');

  openMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.add('is-open');
  });

  closeMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.remove('is-open');
  });
})();
