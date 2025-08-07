const backdrop = document.querySelector('[data-order-modal-backdrop]');
const openModalBtn = document.querySelector('[data-order-modal-open]');
const closeModalBtn = document.querySelector('[data-order-modal-close]');
const form = document.querySelector('.order-modal-form');
const btnOrder = document.querySelector('.order-modal-btn');

btnOrder.disabled = true;

if (openModalBtn) {
  openModalBtn.addEventListener('click', openModal);
}
form.addEventListener('submit', handleSubmit);
document.addEventListener('keydown', handleEscape);
backdrop.addEventListener('click', closeModal);

function openModal() {
  backdrop.classList.add('is-open');
  document.body.classList.add('no-scroll');
}

function closeModal(event) {
  if (
    event.target !== closeModalBtn &&
    !closeModalBtn.contains(event.target) &&
    event.target !== backdrop
  ) {
    return;
  }
  backdrop.classList.remove('is-open');
  document.body.classList.remove('no-scroll');
}

function handleEscape(event) {
  if (event.key === 'Escape') {
    backdrop.classList.remove('is-open');
  }
}

function handleSubmit(event) {
  event.preventDefault();
  console.log('Форма відправлена');
  backdrop.classList.remove('is-open');
  form.reset();
}
