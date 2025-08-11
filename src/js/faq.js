import Accordion from 'accordion-js';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.faq-item-container');
  if (!container) {
    console.warn('[FAQ] .faq-item-container не знайдено.');
    return;
  }

  container.classList.add('accordion-container');

  const items = Array.from(container.querySelectorAll('.faq-item'));
  console.log('[FAQ] знайдено елементів:', items.length);
  if (!items.length) return;

  items.forEach((item, idx) => {
    item.classList.add('ac');

    const btn = item.querySelector('.faq-question');
    const panel = item.querySelector('.faq-answer');

    if (!btn || !panel) {
      console.warn(`[FAQ] елемент #${idx} відсутній btn або panel`, { btn, panel });
      return;
    }

    if (!btn.parentElement.classList.contains('ac-header')) {
      const header = document.createElement('h3');
      header.className = 'ac-header';
      btn.replaceWith(header);
      header.appendChild(btn);
    } else {
      btn.parentElement.classList.add('ac-header');
    }

    btn.classList.add('ac-trigger');
    btn.setAttribute('type', 'button');

    panel.classList.add('ac-panel');
    panel.querySelectorAll('p').forEach(p => p.classList.add('ac-text'));
  });

  const acc = new Accordion('.accordion-container', {
    duration: 400,
    showMultiple: false,
    collapse: true,
    onlyChildNodes: true
  });

  console.log('[FAQ] Аккордеон ініціалізовано:', acc);
});
