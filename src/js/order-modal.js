// import validator from 'validator';
// import iziToast from 'izitoast';
// import 'izitoast/dist/css/iziToast.min.css';
// import { createOrder } from './api';

// const backdrop = document.querySelector('[data-order-modal-backdrop]');
// const openModalBtn = document.querySelector('[data-order-modal-open]');
// const closeModalBtn = document.querySelector('[data-order-modal-close]');
// const form = document.querySelector('.order-modal-form');
// const btnOrder = document.querySelector('.order-modal-btn');

// btnOrder.disabled = true;

// if (openModalBtn) {
//   openModalBtn.addEventListener('click', openModal);
// }

// form.addEventListener('submit', handleSubmit);
// document.addEventListener('keydown', handleEscape);
// backdrop.addEventListener('mousedown', closeModal);

// const requiredInputs = form.querySelectorAll('input[required]');

// requiredInputs.forEach(input => {
//   input.addEventListener('input', checkInputs);
// });

// function checkInputs() {
//   let allValid = true;

//   requiredInputs.forEach(input => {
//     if (input.value.trim() === '') {
//       allValid = false;
//     }
//   });

//   btnOrder.disabled = !allValid;
// }

// export function openModal() {
//   backdrop.classList.add('is-open');
//   document.body.classList.add('no-scroll');

//   if (openModalBtn) {
//     openModalBtn.setAttribute('aria-expanded', 'false');
//     setTimeout(() => {
//       openModalBtn.blur();
//     }, 0);
//     setTimeout(() => {
//       form.email.focus();
//     }, 500);
//   }
// }

// export function closeModal(event) {
//   if (
//     event &&
//     event.target !== closeModalBtn &&
//     !closeModalBtn.contains(event.target) &&
//     event.target !== backdrop
//   ) {
//     return;
//   }
//   backdrop.classList.remove('is-open');
//   document.body.classList.remove('no-scroll');
//   openModalBtn.setAttribute('aria-expanded', 'true');
//   setTimeout(() => {
//     openModalBtn.focus();
//   }, 0);
// }

// function handleEscape(event) {
//   if (event.key === 'Escape') {
//     closeModal();
//   }
// }

// function handleSubmit(event) {
//   event.preventDefault();

//   const email = form.email.value.trim();
//   const tel = form.tel.value.trim().replace(/\D/g, '');
//   const comment = form.text.value.trim();
//   const emailParent = event.target.email.closest('.order-input-wrap');
//   const telParent = event.target.tel.closest('.order-input-wrap');
//   const commentParent = event.target.text.closest('.order-textarea-wrap');

//   if (!validator.isEmail(email)) {
//     emailParent.setAttribute('data-error', 'Невалідний email');
//     event.target.email.classList.add('error');
//     return;
//   }

//   event.target.email.classList.remove('error');
//   emailParent.removeAttribute('data-error');

//   if (!validator.isMobilePhone(tel, 'uk-UA')) {
//     telParent.setAttribute('data-error', 'Невалідний телефон');
//     event.target.tel.classList.add('error');
//     return;
//   }

//   event.target.tel.classList.remove('error');
//   telParent.removeAttribute('data-error');

//   if (comment !== '' && (comment.length < 5 || comment.length > 256)) {
//     event.target.text.classList.add('error');
//     commentParent.setAttribute(
//       'data-error',
//       'Коментар має містити від 5 до 256 символів'
//     );
//     return;
//   } else {
//     event.target.text.classList.remove('error');
//     commentParent.removeAttribute('data-error');
//   }

//   createOrder({
//     email,
//     phone: tel,
//     modelId: '682f9bbf8acbdf505592ac36',
//     color: '#1212ca',
//     comment: comment || 'No comment',
//   })
//     .then(response => {
//       iziToast.success({
//         title: 'OK',
//         message: `Заявка створена успішно!`,
//         position: 'topRight',
//       });
//       closeModal();
//       form.reset();
//     })
//     .catch(error => {
//       const message =
//         error.response?.data?.message || error.message || 'Unknown error';
//       iziToast.error({
//         title: 'Error',
//         message: `Помилка при створенні заявки: ${message}`,
//         position: 'topRight',
//       });
//     });
// }
