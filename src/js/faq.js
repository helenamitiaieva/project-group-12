import Accordion from 'accordion-js';

document.addEventListener('DOMContentLoaded', () => {
const faqContainer = document.querySelector('.faq-item-container');

  if (!faqContainer) return;

  faqContainer.classList.add('accordion-container');

  const faqItems = faqContainer.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    item.classList.add('ac');

    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (!question || !answer) return;

    const header = document.createElement('h3');
    header.classList.add('ac-header');
    question.classList.add('ac-trigger');
    question.setAttribute('type', 'button');

    header.appendChild(question);
    item.insertBefore(header, answer);

    answer.classList.add('ac-panel');
    answer.querySelectorAll('p').forEach(p => p.classList.add('ac-text'));
  });

  new Accordion('.accordion-container', {
    duration: 400,
    showMultiple: false,
    collapse: true,
    openOnInit: [0]
  });
});
