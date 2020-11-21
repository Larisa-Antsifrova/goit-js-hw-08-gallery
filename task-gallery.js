import images from "./gallery-items.js";

// Получение доступа к родительскому элементу всех лишек галереи
const galleryContainer = document.querySelector("ul.js-gallery");
// Получение доступа к элементу модального окна
const modalContainer = document.querySelector("div.lightbox");
// Получение доступа к кнопке закрытия модалки
const modalCloseBtn = document.querySelector(
  'button[data-action="close-lightbox"]'
);
// Функция для создания и рендера разметки по массиву данных и предоставленному шаблону.
function createGalleryMarkup(images) {
  return images
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
  <a
    class="gallery__link"
    href=${original}
  >
    <img
      class="gallery__image"
      src=${preview}
      data-source=${original}
      alt=${description}
    />
  </a>
</li>`;
    })
    .join("");
}

// Создание и рендер разметки по массиву данных и предоставленному шаблону.
const galleryMarkup = createGalleryMarkup(images);
// Добавление разметки всех лишек галереи в DOM
galleryContainer.insertAdjacentHTML("beforeend", galleryMarkup);

// Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
galleryContainer.addEventListener("click", openOriginalInModal);
// Функция, которая подменяет пути к оригинальным изображениям в окне модалки
function openOriginalInModal(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }

  const originalImageSource = event.target.dataset.source;
  const originalImageAlt = event.target.alt;
  const modalImageElement = modalContainer.querySelector(".lightbox__image");

  modalImageElement.setAttribute("src", originalImageSource);
  modalImageElement.setAttribute("alt", originalImageAlt);

  modalContainer.classList.add("is-open");
}

// Функция для закрытия модалки по клику на кнопку закрытия
function closeModal() {
  const modalImageElement = modalContainer.querySelector(".lightbox__image");
  modalImageElement.setAttribute("src", "");
  modalImageElement.setAttribute("alt", "");
  modalContainer.classList.remove("is-open");
}

// Добавление слушателя события на кнопку закрытия модалки
modalCloseBtn.addEventListener("click", closeModal);
