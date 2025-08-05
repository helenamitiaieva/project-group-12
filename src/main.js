import { getFurnitures } from './js/api.js';
// Для перевiрки (приклад, щоб побачити data)
getFurnitures().then(data => console.log('Furnitures:', data));