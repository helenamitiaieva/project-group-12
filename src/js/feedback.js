import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { getFeedbacks } from './api.js';

/**
 * Малює 5 зірок із точним відсотком заповнення для кожної.
 * Напр., rate=3.75 -> 3 повні + 75% четвертої.
 */
function renderStarsPrecise(rate, max = 5) {
  const r = Number(rate) || 0;
  let html = '';

  for (let i = 0; i < max; i++) {
    const portion = Math.max(0, Math.min(1, r - i)); // 0..1
    const percent = Math.round(portion * 100);       // 0..100
    const maskId = `star-mask-${i}-${Math.random().toString(36).slice(2,7)}`;

    html += `
<svg class="star" width="20" height="20" viewBox="0 0 32 32" aria-hidden="true">
  <defs>
    <mask id="${maskId}">
      <use href="../img/symbol-defs.svg#icon-star" fill="#fff"></use>
    </mask>
  </defs>

  <use href="../img/symbol-defs.svg#icon-star" fill="#dfdfdf"></use>

  <rect x="0" y="0" width="${percent}%" height="100%" fill="#000" mask="url(#${maskId})"></rect>
</svg>`;
  }
  return html;
}

function renderFeedbacks(items) {
  const list = document.getElementById('feedback-list');
  list.innerHTML = items.map(f => {
    const score = Number(f.rate) || 0;
    return `
      <div class="swiper-slide">
        <div class="feedback-item">
          <div class="feedback-stars" aria-label="Рейтинг: ${score} из 5">
            ${renderStarsPrecise(score)}
          </div>
          <p class="feedback-text">"${f.descr}"</p>
          <p class="feedback-author">${f.name}</p>
        </div>
      </div>
    `;
  }).join('');
}

function initSwiper() {
  return new Swiper('.feedback-slider', {
    modules: [Navigation, Pagination],
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
      nextEl: '.feedback-btn.next',
      prevEl: '.feedback-btn.prev',
    },
    pagination: {
      el: '.feedback-pagination',
      clickable: true,
    },
    breakpoints: {
      768:  { slidesPerView: 2 },
      1200: { slidesPerView: 3 },
    },
  });
}

async function startFeedbackSection() {
  try {
    const { feedbacks } = await getFeedbacks();

    const first10 = feedbacks.slice(0, 10);
    renderFeedbacks(first10);
    initSwiper();
  } catch (e) {
    console.error('Помилка завантаження відгуків:', e);
  }
}

startFeedbackSection();