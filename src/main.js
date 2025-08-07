import './js/header.js';
import './js/hero.js';
import './js/furniture-list.js';
import './js/about-us.js';
import './js/faq.js';
import './js/feedback.js';
import './js/furniture-modal.js';
import './js/order-modal.js';
import './js/footer.js';

import { getFurnitures } from './js/api.js';
// Для перевiрки (приклад, щоб побачити data)
getFurnitures().then(data => console.log('Furnitures:', data));