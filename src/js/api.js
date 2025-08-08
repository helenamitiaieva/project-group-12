import axios from 'axios';
const BASE_URL = 'https://furniture-store.b.goit.study/api';

// Отримати список меблів
export async function getFurnitures({ category = null, page = 1, limit = 8 } = {}) {
  const params = new URLSearchParams({ page, limit });
  if (category) params.append('category', category);
  const { data } = await axios.get(`${BASE_URL}/furnitures`, { params });
  return data;
}
 
// Отримати меблі по ID
export async function getFurnitureById(id) {
  const { data } = await axios.get(`${BASE_URL}/furnitures/${id}`, {params});
  return data;
}

// Отримати список категорій
export async function getCategories({ category = null } = {}) {
    const params = category ? { category } : {};

  const { data } = await axios.get(`${BASE_URL}/categories`);
  return data;
}

// Створити замовлення
export async function createOrder(orderData) {
  const { data } = await axios.post(`${BASE_URL}/orders`, orderData);
  return data;
}

// Отримати всі відгуки
export async function getFeedbacks() {
  const { data } = await axios.get(`${BASE_URL}/feedbacks`);
  return data;
}

// Створити відгук
export async function createFeedback(feedbackData) {
  const { data } = await axios.post(`${BASE_URL}/feedbacks`, feedbackData);
  return data;
}