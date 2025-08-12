(() => {
  const mobileMenu = document.querySelector('.js-menu-container');
  const openMenuBtn = document.querySelector('.mobile-menu-open-btn');
  const closeMenuBtn = document.querySelector('.js-close-menu');
  const menu = document.querySelector('.mob-menu');
  const menuLinks = document.querySelectorAll('.mob-menu-item-link');
  const scrollBtn = document.querySelector('.header-scroll-button');
  const targetSection = document.querySelector('#furniture');

  function openMobileMenu() {
    mobileMenu.classList.add('is-open');
    closeMenuBtn.classList.remove('hiden-close');
    closeMenuBtn.classList.add('is-open');
    openMenuBtn.classList.add('hiden');
    menu.classList.remove('display');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileMenu.classList.remove('is-open');
    closeMenuBtn.classList.remove('is-open');
    openMenuBtn.classList.remove('hiden');
    menu.classList.add('display');
    document.body.style.overflow = '';
  }

  // Відкриття меню
  openMenuBtn.addEventListener('click', openMobileMenu);

  // Закриття меню по кнопці
  closeMenuBtn.addEventListener('click', closeMobileMenu);

  // Закриття по кліку на посилання меню
  menuLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  if (scrollBtn && targetSection) {
    scrollBtn.addEventListener('click', () => {
      targetSection.scrollIntoView({ behavior: 'smooth' });
      if (mobileMenu.classList.contains('is-open')) {
        closeMobileMenu();
      }
    });
  }


  // Закриття по Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
      closeMobileMenu();
    }
  });

  // Закриття при кліку поза меню
  document.addEventListener('click', (e) => {
    if (
      mobileMenu.classList.contains('is-open') &&
      !mobileMenu.contains(e.target) &&
      !openMenuBtn.contains(e.target)
    ) {
      closeMobileMenu();
    }

    if (mobileMenu.classList.contains('is-open')) {
      if (e.target.closest('.nav-list-item-link')) {
        closeMobileMenu();
      }
      if (e.target.closest('.header-scroll-button')) {
        closeMobileMenu();
      }
    }
  });
})();
