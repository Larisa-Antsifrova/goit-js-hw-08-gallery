import images from "./gallery-items.js";
// Базовое задание: Создать галерею с возможностью клика по ее элементам и просмотра полноразмерного изображения в модальном окне.

// Получение доступов:
// к родительскому элементу всех лишек галереи
const galleryContainer = document.querySelector("ul.js-gallery");
// к контейнеру модального окна
const modalContainer = document.querySelector("div.lightbox");
// к кнопке закрытия модалки
const modalCloseBtn = document.querySelector(
  'button[data-action="close-lightbox"]'
);
// к элементу изображения в модалке
const modalImageElement = modalContainer.querySelector(".lightbox__image");

// Функция для создания и рендера разметки по массиву данных и по предоставленному шаблону
function createGalleryMarkup(imagesArray) {
  return imagesArray
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
  <a class="gallery__link" href=${original}>
    <img
      class="gallery__image"
      src=${preview}
      data-source=${original}
      alt=${description}/>
  </a>
</li>`;
    })
    .join("");
}

// Создание и рендер разметки по массиву данных
const galleryMarkup = createGalleryMarkup(images);

// Добавление разметки всех лишек галереи в DOM
galleryContainer.insertAdjacentHTML("beforeend", galleryMarkup);

// Реализация делегирования на галерее ul.js-gallery
// Функция, которая подменяет пути к оригинальным изображениям в окне модалки
function openOriginalInModal(event) {
  event.preventDefault();

  if (event.target.nodeName !== "IMG") {
    return;
  }

  const originalImageSource = event.target.dataset.source;
  const originalImageAlt = event.target.alt;

  modalImageElement.setAttribute("src", originalImageSource);
  modalImageElement.setAttribute("alt", originalImageAlt);

  modalContainer.classList.add("is-open");
}

// Функция для закрытия модалки по клику на кнопку закрытия
function closeModal() {
  modalImageElement.setAttribute("src", "");
  modalImageElement.setAttribute("alt", "");
  modalContainer.classList.remove("is-open");
}

// Добавление слушателя собития на контейнер галереи
galleryContainer.addEventListener("click", openOriginalInModal);

// Добавление слушателя события на кнопку закрытия модалки
modalCloseBtn.addEventListener("click", closeModal);
