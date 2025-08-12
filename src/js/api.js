import axios from 'axios';
const BASE_URL = 'https://furniture-store.b.goit.study/api';

export async function getFurnitures({ category = null, page = 1, limit = 8 } = {}) {
  const params = new URLSearchParams({ page, limit });
  if (category) params.append('category', category);
  const { data } = await axios.get(`${BASE_URL}/furnitures`, { params });
  return data;
}
 
export async function getFurnitureById(id) {
  const { data } = await axios.get(`${BASE_URL}/furnitures/${id}`);
  return data;
}

export async function getCategories() {
  const { data } = await axios.get(`${BASE_URL}/categories`);
  return data;
}

export async function createOrder(orderData) {
  const { data } = await axios.post(`${BASE_URL}/orders`, orderData);
  return data;
}

export async function getFeedbacks() {
  const { data } = await axios.get(`${BASE_URL}/feedbacks`);
  return data;
}

export async function createFeedback(feedbackData) {
  const { data } = await axios.post(`${BASE_URL}/feedbacks`, feedbackData);
  return data;
}