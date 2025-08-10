import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const feedbackList = document.getElementById('feedback-list');

// Фейкові дані для тесту
const fakeFeedbacks = [
  { rating: 4.7, text: "Дуже задоволена покупкою! Диван не тільки стильний, а й неймовірно зручний. Доставка була швидкою, все без жодної подряпини.", author: "Олена Коваль" },
  { rating: 3.6, text: "Замовляв шафу й ліжко — все приїхало раніше терміну. Якість перевершила очікування, збирання зайняло мінімум часу.", author: "Андрій Шевченко" },
  { rating: 4.1, text: "Нарешті знайшли меблі, які ідеально вписались у наш інтер’єр. Сайт зручний, підтримка завжди на зв’язку.", author: "Іванна Петренко" },
  { rating: 5, text: "Чудова якість і швидка доставка! Буду замовляти ще.", author: "Марина Левченко" },
  { rating: 4.3, text: "Дуже гарний сервіс і приємні менеджери!", author: "Петро Іванов" },
  { rating: 3.4, text: "Є дрібні зауваження, але загалом все добре.", author: "Світлана Кравчук" },
  { rating: 4.9, text: "Дуже задоволений покупкою!", author: "Дмитро Савченко" },
  { rating: 4.0, text: "Все швидко і якісно.", author: "Анна Кузьменко" },
  { rating: 3.8, text: "Меблі якісні, але доставка трохи затрималась.", author: "Ігор Ткаченко" },
  { rating: 4.5, text: "Дизайн меблів просто чудовий!", author: "Вікторія Шевченко" }
];

// Округлення оцінки
function roundRating(rating) {
  if (rating >= 3.3 && rating <= 3.7) return 3.5;
  if (rating >= 3.8 && rating <= 4.2) return 4;
  return Math.round(rating * 2) / 2;
}

// Рендер зірочок
function renderStars(rating) {
  const rounded = roundRating(rating);
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      `<svg width="20" height="20" fill="${i <= rounded ? '#ffb400' : '#ddd'}">
         <use href="#icon-star"></use>
       </svg>`
    );
  }
  return stars.join('');
}

// Рендер відгуків
function renderFeedbacks(feedbacks) {
  feedbackList.innerHTML = feedbacks.map(feedback => `
    <div class="swiper-slide">
      <div class="feedback-item">
        <div class="feedback-stars">${renderStars(feedback.rating)}</div>
        <p class="feedback-text">"${feedback.text}"</p>
        <p class="feedback-author">${feedback.author}</p>
      </div>
    </div>
  `).join('');
}

// Ініціалізація Swiper
function initSwiper() {
  new Swiper('.feedback-slider', {
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
      768: { slidesPerView: 2 },
      1200: { slidesPerView: 3 },
    },
  });
}

// Запуск
renderFeedbacks(fakeFeedbacks);
initSwiper();
