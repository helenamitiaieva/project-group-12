import axios from 'axios';
const baseUrl = 'https://furniture-store.b.goit.study/api/furnitures';

const modalBackdrop = document.querySelector('.furniture-modal-backdrop');
const modal = document.querySelector('.furniture-modal');
const closeButton = document.querySelector('.furniture-modal-button-close');
const detailsBtn = document.querySelector('.details-btn');

detailsBtn.addEventListener('click', () => {
  modalBackdrop.classList.add(is-open);
});


closeButton.addEventListener('click', () => {
    modalBackdrop.classList.remove('is-open');
    modal.innerHTML = `<button class="furniture-modal-button-close" type="button" data-modal-close>
    <svg>
      <use href="../img/icons.svg#icon-x"></use>
    </svg>
  </button>
`;
});

export async function getFurniture()
{
    try {
        const response = await axios.get(baseUrl);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
//тимчасові дані змінну потрибно створити при клику на кнопку "Детальніше"
const furnitures = await getFurniture();

export function createRating(rating) {
    let markup = '';
    const fullStars = Math.floor(rating);
    const hasPartialStar = rating % 1 !== 0;
    
    // Повні зірки
    for (let i = 0; i < fullStars; i++) {
        markup += `<li>
            <svg width="16" height="16">
                <use href="./img/icons.svg#icon-star"></use>
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
                <use href="./img/icons.svg#icon-star" fill="url(#partial-${rating})"></use>
            </svg>
        </li>`;
    }
    
    // Пусті зірки
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        markup += `<li>
            <svg width="16" height="16" fill="transparent" stroke="black">
                <use href="./img/icons.svg#icon-star"></use>
            </svg>
        </li>`;
    }
    
    return markup;
}

export function createFurnitureCard(furnitures, furnitureID) {
       const furniture = furnitures.find(item => item._id === furnitureID);
            if (furniture) {
                const markup = ` <div id="images">
                <img src="${furniture.image[0]}" alt="product-image-1" class="furniture-modal-main-image">
                <ul class="furniture-modal-sub-images-list">
                  <li class="furniture-modal-sub-images-item">
                    <img src="${furniture.image[1]}" alt="product-image-2" class="furniture-modal-sub-images-image">
                  </li>
                  <li class="furniture-modal-sub-images-item">
                    <img src="${furniture.image[2]}" alt="product-image-2" class="furniture-modal-sub-images-image">
                    </li>
                  </ul>
                </div>
               <div>
                 <h2 class="furniture-modal-title" id="name-product">${furniture.name.replace(/\\"/g, '')}</h2>
                 <p class="furniture-modal-text" id="type">${furniture.type}</p>
                 <p class="furniture-modal-price" id="price">${furniture.price}</p>
                 <ul class="furniture-modal-rating-list" id="rating-list">
                    ${createRating(furniture.rating)}
                  </ul>
                  <div style="margin-bottom: 24px;">
                    <p class="furniture-modal-text" id="color-subtitle">Колір</p>
                    <ul class="furniture-modal-colors-list" id="colors-list">
                      <li class="furniture-modal-colors-item" style="background-color: ${furniture.colors[0]};"></li>
                      <li class="furniture-modal-colors-item" style="background-color: ${furniture.colors[1]};"></li>
                      <li class="furniture-modal-colors-item" style="background-color: ${furniture.colors[2]};"></li>
                    </ul>
                  </div>
                  <p class="furniture-modal-text" id="description">${furniture.description}</p>
                  <p class="furniture-modal-text" id="dimensions">Розміри: ${furniture.sizes}</p>
                  <button class="furniture-modal-order-button" type="button" id="order-button">Перейти до замовлення</button>
               </div>`;
                modal.insertAdjacentHTML('beforeend', markup);
            }
    }
        