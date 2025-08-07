import validator from 'validator';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

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
backdrop.addEventListener('mousedown', closeModal);

openModal();

function openModal() {
  backdrop.classList.add('is-open');
  document.body.classList.add('no-scroll');

  const requiredInputs = form.querySelectorAll('input[required]');

  requiredInputs.forEach(input => {
    input.addEventListener('input', checkInputs);
  });

  function checkInputs() {
    let allValid = true;

    requiredInputs.forEach(input => {
      if (input.value.trim() === '') {
        allValid = false;
      }
    });

    btnOrder.disabled = !allValid;
  }
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

  const email = form.email.value.trim();
  const tel = form.tel.value.trim().replace(/\D/g, '');
  const comment = form.text.value.trim();

  if (!validator.isEmail(email)) {
    iziToast.error({
      title: 'Помилка',
      message: `Невалідний email`,
      position: 'topRight',
    });
    return;
  }

  if (!validator.isMobilePhone(tel, 'uk-UA')) {
    iziToast.error({
      title: 'Помилка',
      message: `Невалідний номер телефону`,
      position: 'topRight',
    });
    return;
  }

  console.log({
    email,
    tel,
    comment,
  });

  backdrop.classList.remove('is-open');
  form.reset();
}
