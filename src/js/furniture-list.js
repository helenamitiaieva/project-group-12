import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getFurnitures, getCategories } from './api.js';
import { createFurnitureCard } from './furniture-modal.js';

const categoriesList = document.querySelector('.list-categories');
const furnitureList = document.querySelector('.list-furniture');
const loader = document.querySelector('.loader');
const downloadButton = document.querySelector('.btn-download');

let categoryId = null;
let page = 1;
let totalPages = 0;
let currentFurnitures = []; // Сохраняем текущие данные о мебели

initFurniture();
initCategories();

async function initCategories() {
  try {
    const categories = await getCategories();
    const allCategoryMarkup = `
      <li class="item-category">
        <button type="button" data-bg-id="all" class="btn-category">Всі товари</button>
      </li>`;
    categoriesList.insertAdjacentHTML('beforeend', allCategoryMarkup);
    categories.forEach(({ _id, name }) => {
      const markup = `<li class="item-category">
        <button type="button" data-id="${_id}" data-bg-id="${_id}" class="btn-category">${name}</button>
        </li>`;
      categoriesList.insertAdjacentHTML('beforeend', markup);
    });
    const firstBtn = categoriesList.querySelector('button[data-bg-id="all"]');
    firstBtn.classList.add('active');
  } catch (error) {
    iziToast.error({
      message: 'Помилка при завантаженні категорії',
      position: 'topRight',
    });
  }
}
categoriesList.addEventListener('click', onCategoryClick);

async function onCategoryClick(event) {
  const btn = event.target.closest('.btn-category');
  if (!btn) return;

  const allButtons = categoriesList.querySelectorAll('.btn-category');
  allButtons.forEach(button => button.classList.remove('active'));

  btn.classList.add('active');
  categoryId = btn.dataset.id || null;
  page = 1;
  await initFurniture(categoryId);
}

async function initFurniture(categoryId, pageNum = 1, isLoadMore = false) {
  try {
    loader.classList.remove('hidden');
    downloadButton.classList.add('hidden');

    const { furnitures, totalItems, limit } = await getFurnitures({
      category: categoryId,
      page: pageNum,
      limit: 8,
    });

    totalPages = Math.ceil(totalItems / limit);
    page = pageNum;

    if (!isLoadMore) {
      furnitureList.innerHTML = '';
      currentFurnitures = []; // Очищаем при новой загрузке
    }

    // Добавляем новые товары к существующим
    currentFurnitures = [...currentFurnitures, ...furnitures];

    furnitures.forEach((furniture, index) => {
      const globalIndex = currentFurnitures.length - furnitures.length + index;
      const { _id, name, description, images, price, color } = furniture;
      const markup = `
        <li class="product-card">
          <img src="${images?.[0]}" alt="${description}" class="product-image" />
          <p class="product-title">${name}</p>
          <ul class="color-dots">
            <li class="dot" style="background-color:${color?.[0]}"></li>
            <li class="dot" style="background-color:${color?.[1]}"></li>
            <li class="dot" style="background-color:${color?.[2]}"></li>
          </ul>
          <p class="price">${price} грн</p>
          <button type="button" class="details-btn" data-index="${globalIndex}" data-id="${_id}">Детальніше</button>
        </li>`;
      furnitureList.insertAdjacentHTML('beforeend', markup);
    });

    if (page < totalPages) {
      downloadButton.classList.remove('hidden');
    } else {
      downloadButton.classList.add('hidden');
    }
  } catch (error) {
    iziToast.error({
      message: 'Помилка при завантаженні меблів',
      position: 'topRight',
    });
  } finally {
    loader.classList.add('hidden');
  }
}

downloadButton.addEventListener('click', async () => {
  page += 1;
  await initFurniture(categoryId, page, true);
});

furnitureList.addEventListener('click', event => {
  const detailsBtn = event.target.closest('.details-btn');
  if (!detailsBtn) return;

  //Знаходимо потрібний товар за індексом
  const furnitureIndex = parseInt(detailsBtn.dataset.index);
  if (isNaN(furnitureIndex) || !currentFurnitures[furnitureIndex]) return;

  //Відкриваємо модальне вікно
  const modalBackdrop = document.querySelector('.furniture-modal-backdrop');
  modalBackdrop.classList.add('is-open');
  document.body.classList.add('no-scroll');

  //Створюємо картку
  createFurnitureCard(currentFurnitures[furnitureIndex]);
});
