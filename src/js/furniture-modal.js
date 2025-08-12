const modalBackdrop = document.querySelector('.furniture-modal-backdrop');
const modal = document.querySelector('.furniture-modal');
export let selectedFurniture = null;
import { openModal } from './order-modal';

function closeModal() {
  modalBackdrop.classList.remove('is-open');
  document.body.classList.remove('no-scroll');
}

modal.addEventListener('click', event => {
  if (event.target.closest('.furniture-modal-button-close')) {
    closeModal();
  }
});

modalBackdrop.addEventListener('click', event => {
  if (event.target === modalBackdrop) {
    closeModal();
  }
});

modal.addEventListener('click', event => {
  if (event.target.closest('.furniture-modal-order-button')) {
    const orderButton = event.target.closest('.furniture-modal-order-button');
   
    const furnitureId = orderButton.dataset.furnitureId;
    const furnitureName = orderButton.dataset.furnitureName;
    const furniturePrice = orderButton.dataset.furniturePrice;
    closeModal();
    selectedFurniture = {
      modelId: furnitureId,
    };
    
    openModal();
  }
});

modal.addEventListener('click', (e) => {
  const colorItem = e.target.closest('.furniture-modal-colors-item');
  if (colorItem) {

    document.querySelectorAll('.furniture-modal-colors-item').forEach(item => {
      item.style.border = '';
      item.style.borderRadius = '';
    });


    colorItem.style.borderRadius = '64px';
    colorItem.style.border = '4px solid #6B0609';
  }
});

export function createRating(rate, max = 5) {
  const r = Number(rate) || 0;
  let html = '';

  for (let i = 0; i < max; i++) {
    const portion = Math.max(0, Math.min(1, r - i));
    const percent = Math.round(portion * 100);      
    const maskId = `star-mask-${i}-${Math.random().toString(36).slice(2, 7)}`;

    html += `
<li>
  <svg class="star" width="16" height="16" viewBox="0 0 32 32" aria-hidden="true">
    <defs>
      <mask id="${maskId}">
        <use href="./public/symbol-defs.svg#icon-star-full" fill="#fff"></use>
      </mask>
    </defs>

    <use href="./public/symbol-defs.svg#icon-star-full" fill="#dfdfdf"></use>

    <rect x="0" y="0" width="${percent}%" height="100%" fill="#6B0609" mask="url(#${maskId})"></rect>
  </svg>
</li>`;

  }
  return html;
}


export function createFurnitureCard(furniture) {
  try {
    if (furniture) {
      const markup = `
                <button class="furniture-modal-button-close" type="button" data-modal-close>
                    <svg>
                        <use href="./public/symbol-defs.svg#icon-x"></use>
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
