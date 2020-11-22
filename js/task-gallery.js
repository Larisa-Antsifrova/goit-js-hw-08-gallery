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
    .map(({ preview, original, description }, index) => {
      return `<li class="gallery__item">
  <a class="gallery__link" href=${original}>
    <img
      class="gallery__image"
      src=${preview}
      data-source=${original}
      data-index="${index}"
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
function openModal(event) {
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
galleryContainer.addEventListener("click", openModal);

// Добавление слушателя события на кнопку закрытия модалки
modalCloseBtn.addEventListener("click", closeModal);

// Дополнительные задания
// 1. Закрытие модального окна по клику на div.lightbox__overlay.
// Получение доступа к div.lightbox__overlay
const overlay = document.querySelector("div.lightbox__overlay");

//Добавление слушателя события на  div.lightbox__overlay
overlay.addEventListener("click", closeModal);

// 2. Закрытие модального окна по нажатию клавиши ESC.
// Функция для того, чтобы убрать класс "is-open" с модалки, если модалка сейчас открыта
function onPressEscape(event) {
  if (event.code === "Escape" && modalContainer.classList.contains("is-open")) {
    closeModal();
  }
}

// Добавление слушателя события на window
window.addEventListener("keydown", onPressEscape);

// 3. Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо".
// Доступ к длине коллекции изображений в галерее
const galleryLength = document.getElementsByClassName("gallery__image").length;

// Добавление слушателя события для получения индекса текущего изображения в модалке
galleryContainer.addEventListener("click", getCurrentIndex);

// Функция, которая достаёт индекс текущего изображения в модалке, а внутри понеслась!
function getCurrentIndex(event) {
  let currentIndex = +event.target.dataset.index;

  window.addEventListener("keydown", slideImage);

  function slideImage(event) {
    if (event.key === "ArrowRight" && currentIndex < galleryLength - 1) {
      currentIndex += 1;
      console.log(currentIndex);
      modalImageElement.setAttribute("src", images[currentIndex].original);
      modalImageElement.setAttribute("alt", images[currentIndex].description);
    }
    if (event.key === "ArrowLeft" && currentIndex > 0) {
      currentIndex -= 1;
      console.log(currentIndex);
      modalImageElement.setAttribute("src", images[currentIndex].original);
      modalImageElement.setAttribute("alt", images[currentIndex].description);
    }
  }
}
