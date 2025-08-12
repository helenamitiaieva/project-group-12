const modalBackdrop = document.querySelector('.furniture-modal-backdrop');
const modal = document.querySelector('.furniture-modal');
export let selectedFurniture = null;
import { openModal } from './order-modal';

function closeModal() {
  modalBackdrop.classList.remove('is-open');
  document.body.classList.remove('no-scroll');
  //   modal.innerHTML = `<button class="furniture-modal-button-close" type="button" data-modal-close>
  //         <svg>
  //           <use href="./public/symbol-defs.svg#icon-x"></use>
  //         </svg>
  //       </button>`;
}

modal.addEventListener('click', event => {
  if (event.target.closest('.furniture-modal-button-close')) {
    closeModal();
  }
});

// Закрытие по клику на backdrop
modalBackdrop.addEventListener('click', event => {
  if (event.target === modalBackdrop) {
    closeModal();
  }
});

// Обработчик для кнопки заказа
modal.addEventListener('click', event => {
  if (event.target.closest('.furniture-modal-order-button')) {
    const orderButton = event.target.closest('.furniture-modal-order-button');
    const furnitureId = orderButton.dataset.furnitureId;
    const furnitureName = orderButton.dataset.furnitureName;
    const furniturePrice = orderButton.dataset.furniturePrice;

    // Закрываем модалку мебели
    closeModal();
    selectedFurniture = {
      modelId: furnitureId,
      //додати color
    };
    openModal();

    // Открываем модалку заказа
    // openOrderModal(furnitureId, furnitureName, furniturePrice);
  }
});

// Функция для открытия модалки заказа
// function openOrderModal(furnitureId, furnitureName, furniturePrice) {
//   const orderModalBackdrop = document.querySelector(
//     '[data-order-modal-backdrop]'
//   );
//   if (orderModalBackdrop) {
//     orderModalBackdrop.classList.remove('hiden');
//     orderModalBackdrop.classList.add('is-open');

//     // Сохраняем данные о товаре для отправки заказа
//     window.selectedFurniture = {
//       id: furnitureId,
//       name: furnitureName,
//       price: furniturePrice,
//     };

//     // Блокируем скролл
//   }
// }

export function createRating(rating) {
  let markup = '';
  const fullStars = Math.floor(rating);
  const hasPartialStar = rating % 1 !== 0;

  // Повні зірки
  for (let i = 0; i < fullStars; i++) {
    markup += `<li>
            <svg width="16" height="16">
                <use href="./public/symbol-defs.svg#icon-star"></use>
            </svg>
        </li>`;
  }

  // Часткова зірка
  if (hasPartialStar) {
    const percentage = (rating % 1) * 100;
    markup += `<li>
            <svg width="16" height="16">
                <defs>
                    <linearGradient id="partial-${rating}">
                        <stop offset="${percentage}%" stop-color="black"/>
                        <stop offset="${percentage}%" stop-color="transparent"/>
                    </linearGradient>
                </defs>
                <use href="./public/symbol-defs.svg#icon-star" fill="url(#partial-${rating})"></use>
            </svg>
        </li>`;
  }

  // Пусті зірки
  const emptyStars = 5 - Math.ceil(rating);
  for (let i = 0; i < emptyStars; i++) {
    markup += `<li>
            <svg width="16" height="16" fill="transparent" stroke="black">
                <use href="./public/symbol-defs.svg#icon-star"></use>
            </svg>
        </li>`;
  }

  return markup;
}

export function createFurnitureCard(furniture) {
  try {
    if (furniture) {
      const markup = `
                <button class="furniture-modal-button-close" type="button" data-modal-close>
                    <svg width="16" height="16"> 
                        <use href="./public/icon.svg#icon-x"></use>
                    </svg>
                </button>
                <div id="images">
                    <img src="${
                      furniture.images?.[0] || ''
                    }" alt="product-image-1" class="furniture-modal-main-image">
                    <ul class="furniture-modal-sub-images-list">
                        <li class="furniture-modal-sub-images-item">
                            <img src="${
                              furniture.images?.[1] || ''
                            }" alt="product-image-2" class="furniture-modal-sub-images-image">
                        </li>
                        <li class="furniture-modal-sub-images-item">
                            <img src="${
                              furniture.images?.[2] || ''
                            }" alt="product-image-3" class="furniture-modal-sub-images-image">
                        </li>
                    </ul>
                </div>
                <div class="furniture-modal-content">
                    <h2 class="furniture-modal-title" id="name-product">${
                      furniture.name?.replace(/\\"/g, '') || 'Назва недоступна'
                    }</h2>
                    <p class="furniture-modal-text" id="type">${
                      furniture.type || 'Тип недоступний'
                    }</p>
                    <p class="furniture-modal-price" id="price">${
                      furniture.price || 'Ціна недоступна'
                    } грн</p>
                    <ul class="furniture-modal-rating-list" id="rating-list">
                        ${createRating(furniture.rate || 0)}
                    </ul>
                    <div style="margin-bottom: 24px;">
                        <p class="furniture-modal-text" id="color-subtitle">Колір</p>
                        <ul class="furniture-modal-colors-list" id="colors-list">
                            <li class="furniture-modal-colors-item" style="background-color: ${
                              furniture.color?.[0] || '#ccc'
                            };"></li>
                            <li class="furniture-modal-colors-item" style="background-color: ${
                              furniture.color?.[1] || '#ccc'
                            };"></li>
                            <li class="furniture-modal-colors-item" style="background-color: ${
                              furniture.color?.[2] || '#ccc'
                            };"></li>
                        </ul>
                    </div>
                    <p class="furniture-modal-text" id="description">${
                      furniture.description || 'Опис недоступний'
                    }</p>
                    <p class="furniture-modal-text" id="dimensions">Розміри: ${
                      furniture.sizes || 'Розміри недоступні'
                    }</p>
                    <button class="furniture-modal-order-button" type="button" id="order-button" data-order-modal-open data-furniture-id="${
                      furniture._id
                    }" data-furniture-name="${
        furniture.name
      }" data-furniture-price="${
        furniture.price
      }">Перейти до замовлення</button>
                </div>`;

      modal.innerHTML = markup;
    }
  } catch (error) {
    console.error('Помилка при завантаженні товару:', error);
    modal.innerHTML = `
            <button class="furniture-modal-button-close" type="button" data-modal-close>
                <svg>
                    <use href="./public/symbol-defs.svg#icon-x"></use>
                </svg>
            </button>
            <div>
                <h2 class="furniture-modal-title">Помилка</h2>
                <p class="furniture-modal-text">Не вдалося завантажити інформацію про товар</p>
            </div>`;
  }
}
