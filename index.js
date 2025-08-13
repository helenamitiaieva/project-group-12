import{a as w,v as I,i as L,A as V,S as U,N as D,P as z}from"./assets/vendor-CxP3ww07.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function o(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(s){if(s.ep)return;s.ep=!0;const a=o(s);fetch(s.href,a)}})();(()=>{const e=document.querySelector(".js-menu-container"),t=document.querySelector(".mobile-menu-open-btn"),o=document.querySelector(".js-close-menu"),r=document.querySelector(".mob-menu"),s=document.querySelectorAll(".mob-menu-item-link"),a=document.querySelector(".header-scroll-button"),i=document.querySelector("#furniture");function n(){e.classList.add("is-open"),o.classList.remove("hiden-close"),o.classList.add("is-open"),t.classList.add("hiden"),r.classList.remove("display"),document.body.style.overflow="hidden"}function c(){e.classList.remove("is-open"),o.classList.remove("is-open"),t.classList.remove("hiden"),r.classList.add("display"),document.body.style.overflow=""}t.addEventListener("click",n),o.addEventListener("click",c),s.forEach(l=>{l.addEventListener("click",c)}),a&&i&&a.addEventListener("click",()=>{i.scrollIntoView({behavior:"smooth"}),e.classList.contains("is-open")&&c()}),document.addEventListener("keydown",l=>{l.key==="Escape"&&e.classList.contains("is-open")&&c()}),document.addEventListener("click",l=>{e.classList.contains("is-open")&&!e.contains(l.target)&&!t.contains(l.target)&&c(),e.classList.contains("is-open")&&(l.target.closest(".nav-list-item-link")&&c(),l.target.closest(".header-scroll-button")&&c())});let u=0;const m=document.querySelector("header");window.addEventListener("scroll",()=>{const l=window.pageYOffset;l>u&&l>100?m.classList.add("hide"):m.classList.remove("hide"),u=l})})();const $="https://furniture-store.b.goit.study/api";async function K({category:e=null,page:t=1,limit:o=8}={}){const r=new URLSearchParams({page:t,limit:o});e&&r.append("category",e);const{data:s}=await w.get(`${$}/furnitures`,{params:r});return s}async function _(){const{data:e}=await w.get(`${$}/categories`);return e}async function Y(e){const{data:t}=await w.post(`${$}/orders`,e);return t}async function G(){const{data:e}=await w.get(`${$}/feedbacks`);return e}const v=document.querySelector("[data-order-modal-backdrop]"),k=document.querySelector("[data-order-modal-open]"),P=document.querySelector("[data-order-modal-close]"),f=document.querySelector(".order-modal-form"),N=document.querySelector(".order-modal-btn");N.disabled=!0;k&&k.addEventListener("click",F);f.addEventListener("submit",W);document.addEventListener("keydown",Q);v.addEventListener("mousedown",x);const T=f.querySelectorAll("input[required]");T.forEach(e=>{e.addEventListener("input",J)});function J(){let e=!0;T.forEach(t=>{t.value.trim()===""&&(e=!1)}),N.disabled=!e}function F(){v.classList.add("is-open"),document.body.classList.add("no-scroll"),k&&(setTimeout(()=>{k.blur()},0),setTimeout(()=>{f.email.focus()},500))}function x(e){e&&e.type==="mousedown"&&e.target!==P&&!P.contains(e.target)&&e.target!==v||(v.classList.remove("is-open"),document.body.classList.remove("no-scroll"))}function Q(e){e.key==="Escape"&&x()}function W(e){e.preventDefault();const t=f.email.value.trim(),o=f.tel.value.trim().replace(/\D/g,""),r=f.text.value.trim(),s=e.target.email.closest(".order-input-wrap"),a=e.target.tel.closest(".order-input-wrap"),i=e.target.text.closest(".order-textarea-wrap");if(!I.isEmail(t)){s.setAttribute("data-error","Невалідний email"),e.target.email.classList.add("error");return}if(e.target.email.classList.remove("error"),s.removeAttribute("data-error"),!I.isMobilePhone(o,"uk-UA")){a.setAttribute("data-error","Невалідний телефон"),e.target.tel.classList.add("error");return}if(e.target.tel.classList.remove("error"),a.removeAttribute("data-error"),r!==""&&(r.length<5||r.length>256)){e.target.text.classList.add("error"),i.setAttribute("data-error","Коментар має містити від 5 до 256 символів");return}else e.target.text.classList.remove("error"),i.removeAttribute("data-error");Y({email:t,phone:o,color:"#1212ca",comment:r||"No comment",...R}).then(n=>{L.success({title:"OK",message:"Заявка створена успішно!",position:"topRight"}),x(),f.reset()}).catch(n=>{var u,m;const c=((m=(u=n.response)==null?void 0:u.data)==null?void 0:m.message)||n.message||"Unknown error";L.error({title:"Error",message:`Помилка при створенні заявки: ${c}`,position:"topRight"})})}const q=document.querySelector(".furniture-modal-backdrop"),b=document.querySelector(".furniture-modal");let R=null;function B(){q.classList.remove("is-open"),document.body.classList.remove("no-scroll")}b.addEventListener("click",e=>{e.target.closest(".furniture-modal-button-close")&&B()});q.addEventListener("click",e=>{e.target===q&&B()});b.addEventListener("click",e=>{if(e.target.closest(".furniture-modal-order-button")){const o=e.target.closest(".furniture-modal-order-button").dataset.furnitureId;B(),R={modelId:o},F()}});b.addEventListener("click",e=>{const t=e.target.closest(".furniture-modal-colors-item");t&&(document.querySelectorAll(".furniture-modal-colors-item").forEach(o=>{o.style.border="",o.style.borderRadius=""}),t.style.borderRadius="64px",t.style.border="4px solid #6B0609")});function X(e,t=5){const o=Number(e)||0;let r="";for(let s=0;s<t;s++){const a=Math.max(0,Math.min(1,o-s)),i=Math.round(a*100),n=`star-mask-${s}-${Math.random().toString(36).slice(2,7)}`;r+=`
<li>
  <svg class="star" width="16" height="16" viewBox="0 0 32 32" aria-hidden="true">
    <defs>
      <mask id="${n}">
        <use href="./symbol-defs.svg#icon-star-full" fill="#fff"></use>
      </mask>
    </defs>

    <use href="./symbol-defs.svg#icon-star-full" fill="#dfdfdf"></use>

    <rect x="0" y="0" width="${i}%" height="100%" fill="#6B0609" mask="url(#${n})"></rect>
  </svg>
</li>`}return r}function Z(e){var t,o,r,s,a,i,n;try{if(e){const c=`
                <button class="furniture-modal-button-close" type="button" data-modal-close>
                    <svg>
                        <use href="./logo-w.svg#icon-x"></use>
                    </svg>
                </button>
                <div id="images">
                    <img src="${((t=e.images)==null?void 0:t[0])||""}" alt="product-image-1" class="furniture-modal-main-image">
                    <ul class="furniture-modal-sub-images-list">
                        <li class="furniture-modal-sub-images-item">
                            <img src="${((o=e.images)==null?void 0:o[1])||""}" alt="product-image-2" class="furniture-modal-sub-images-image">
                        </li>
                        <li class="furniture-modal-sub-images-item">
                            <img src="${((r=e.images)==null?void 0:r[2])||""}" alt="product-image-3" class="furniture-modal-sub-images-image">
                        </li>
                    </ul>
                </div>
                <div class="furniture-modal-content">
                    <h2 class="furniture-modal-title" id="name-product">${((s=e.name)==null?void 0:s.replace(/\\"/g,""))||"Назва недоступна"}</h2>
                    <p class="furniture-modal-text" id="type">${e.type||"Тип недоступний"}</p>
                    <p class="furniture-modal-price" id="price">${e.price||"Ціна недоступна"} грн</p>
                    <ul class="furniture-modal-rating-list" id="rating-list">
                        ${X(e.rate||0)}
                    </ul>
                    <div style="margin-bottom: 24px;">
                        <p class="furniture-modal-text" id="color-subtitle">Колір</p>
                        <ul class="furniture-modal-colors-list" id="colors-list">
                            <li class="furniture-modal-colors-item" style="background-color: ${((a=e.color)==null?void 0:a[0])||"#ccc"};"></li>
                            <li class="furniture-modal-colors-item" style="background-color: ${((i=e.color)==null?void 0:i[1])||"#ccc"};"></li>
                            <li class="furniture-modal-colors-item" style="background-color: ${((n=e.color)==null?void 0:n[2])||"#ccc"};"></li>
                        </ul>
                    </div>
                    <p class="furniture-modal-text" id="description">${e.description||"Опис недоступний"}</p>
                    <p class="furniture-modal-text" id="dimensions">Розміри: ${e.sizes||"Розміри недоступні"}</p>
                    <button class="furniture-modal-order-button" type="button" id="order-button" data-order-modal-open data-furniture-id="${e._id}" data-furniture-name="${e.name}" data-furniture-price="${e.price}">Перейти до замовлення</button>
                </div>`;b.innerHTML=c}}catch(c){console.error("Помилка при завантаженні товару:",c),b.innerHTML=`
            <button class="furniture-modal-button-close" type="button" data-modal-close>
                <svg>
                    <use href="./public/symbol-defs.svg#icon-x"></use>
                </svg>
            </button>
            <div>
                <h2 class="furniture-modal-title">Помилка</h2>
                <p class="furniture-modal-text">Не вдалося завантажити інформацію про товар</p>
            </div>`}}const g=document.querySelector(".list-categories"),E=document.querySelector(".list-furniture"),O=document.querySelector(".loader"),h=document.querySelector(".btn-download");let M=null,y=1,C=0,p=[];A();ee();async function ee(){try{const e=await _();g.insertAdjacentHTML("beforeend",`
      <li class="item-category">
        <button type="button" data-bg-id="all" class="btn-category">Всі товари</button>
      </li>`),e.forEach(({_id:r,name:s})=>{const a=`<li class="item-category">
        <button type="button" data-id="${r}" data-bg-id="${r}" class="btn-category">${s}</button>
        </li>`;g.insertAdjacentHTML("beforeend",a)}),g.querySelector('button[data-bg-id="all"]').classList.add("active")}catch{L.error({message:"Помилка при завантаженні категорії",position:"topRight"})}}g.addEventListener("click",te);async function te(e){const t=e.target.closest(".btn-category");if(!t)return;g.querySelectorAll(".btn-category").forEach(r=>r.classList.remove("active")),t.classList.add("active"),M=t.dataset.id||null,y=1,await A(M)}async function A(e,t=1,o=!1){try{O.classList.remove("hidden"),h.classList.add("hidden");const{furnitures:r,totalItems:s,limit:a}=await K({category:e,page:t,limit:8});C=Math.ceil(s/a),y=t,o||(E.innerHTML="",p=[]),p=[...p,...r],r.forEach((i,n)=>{const c=p.length-r.length+n,{_id:u,name:m,description:l,images:S,price:H,color:d}=i,j=`
        <li class="product-card">
          <img src="${S==null?void 0:S[0]}" alt="${l}" class="product-image" />
          <p class="product-title">${m}</p>
          <ul class="color-dots">
            <li class="dot" style="background-color:${d==null?void 0:d[0]}"></li>
            <li class="dot" style="background-color:${d==null?void 0:d[1]}"></li>
            <li class="dot" style="background-color:${d==null?void 0:d[2]}"></li>
          </ul>
          <p class="price">${H} грн</p>
          <button type="button" class="details-btn" data-index="${c}" data-id="${u}">Детальніше</button>
        </li>`;E.insertAdjacentHTML("beforeend",j)}),y<C?h.classList.remove("hidden"):h.classList.add("hidden")}catch{L.error({message:"Помилка при завантаженні меблів",position:"topRight"})}finally{O.classList.add("hidden")}}h.addEventListener("click",async()=>{y+=1,await A(M,y,!0)});E.addEventListener("click",e=>{const t=e.target.closest(".details-btn");if(!t)return;const o=parseInt(t.dataset.index);if(isNaN(o)||!p[o])return;document.querySelector(".furniture-modal-backdrop").classList.add("is-open"),document.body.classList.add("no-scroll"),Z(p[o])});document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".faq-item-container");if(!e)return;e.classList.add("accordion-container"),e.querySelectorAll(".faq-item").forEach(o=>{o.classList.add("ac");const r=o.querySelector(".faq-question"),s=o.querySelector(".faq-answer");if(!r||!s)return;const a=document.createElement("h3");a.classList.add("ac-header"),r.classList.add("ac-trigger"),r.setAttribute("type","button"),a.appendChild(r),o.insertBefore(a,s),s.classList.add("ac-panel"),s.querySelectorAll("p").forEach(i=>i.classList.add("ac-text"))}),new V(".accordion-container",{duration:400,showMultiple:!1,collapse:!0,openOnInit:[0]})});function se(e,t=5){const o=Number(e)||0;let r="";for(let s=0;s<t;s++){const a=Math.max(0,Math.min(1,o-s)),i=Math.round(a*100),n=`star-mask-${s}-${Math.random().toString(36).slice(2,7)}`;r+=`
<svg class="star" width="20" height="20" viewBox="0 0 32 32" aria-hidden="true">
  <defs>
    <mask id="${n}">
      <use href="./symbol-defs.svg#icon-star-full" fill="#fff"></use>
    </mask>
  </defs>

  <use href="./symbol-defs.svg#icon-star-full" fill="#dfdfdf"></use>

  <rect x="0" y="0" width="${i}%" height="100%" fill="#6B0609" mask="url(#${n})"></rect>
</svg>`}return r}function re(e){const t=document.getElementById("feedback-list");t.innerHTML=e.map(o=>{const r=Number(o.rate)||0;return`
      <div class="swiper-slide">
        <div class="feedback-item">
          <div class="feedback-stars" aria-label="Рейтинг: ${r} из 5">
            ${se(r)}
          </div>
          <p class="feedback-text">"${o.descr}"</p>
          <p class="feedback-author">${o.name}</p>
        </div>
      </div>
    `}).join("")}function oe(){return new U(".feedback-slider",{modules:[D,z],slidesPerView:1,spaceBetween:20,navigation:{nextEl:".feedback-btn.next",prevEl:".feedback-btn.prev"},pagination:{el:".feedback-pagination",clickable:!0},breakpoints:{768:{slidesPerView:2},1440:{slidesPerView:3}}})}async function ae(){try{const{feedbacks:e}=await G(),t=e.slice(0,10);re(t),oe()}catch(e){console.error("Помилка завантаження відгуків:",e)}}ae();
//# sourceMappingURL=index.js.map
