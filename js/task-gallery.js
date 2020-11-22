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
  const currentImageIndex = event.target.dataset.index;

  modalImageElement.setAttribute("src", originalImageSource);
  modalImageElement.setAttribute("alt", originalImageAlt);
  modalImageElement.setAttribute("data-index", currentImageIndex);

  modalContainer.classList.add("is-open");

  // Добавление слушателя события на window для закрытия модалки по клавише ESC
  window.addEventListener("keydown", onPressEscape);
  // Добавление слушателя события на window для перелистования изображение по клавишам "вправо" и "влево"
  window.addEventListener("keydown", slideImage);
}

// Функция для закрытия модалки по клику на кнопку закрытия
function closeModal() {
  modalImageElement.setAttribute("src", "");
  modalImageElement.setAttribute("alt", "");
  modalImageElement.setAttribute("data-index", "");
  modalContainer.classList.remove("is-open");

  // Удаление слушателей события с window
  window.removeEventListener("keydown", onPressEscape);
  window.removeEventListener("keydown", slideImage);
}

// Добавление слушателя события на контейнер галереи
galleryContainer.addEventListener("click", openModal);

// Добавление слушателя события на кнопку закрытия модалки
modalCloseBtn.addEventListener("click", closeModal);

// Дополнительные задания
// 1. Закрытие модального окна по клику на div.lightbox__overlay.
// Получение доступа к div.lightbox__overlay
const overlay = document.querySelector("div.lightbox__overlay");

//Добавление слушателя события на div.lightbox__overlay
overlay.addEventListener("click", closeModal);

// 2. Закрытие модального окна по нажатию клавиши ESC.
// Добавление слушателя события на window указано в функции в openModal. А в closeModal этот слушатель снимается.
// Функция для того, чтобы убрать класс "is-open" с модалки
function onPressEscape(event) {
  if (event.code === "Escape") {
    closeModal();
  }
}

// 3. "Пролистывание" изображений галереи в открытом модальном окне клавишами "влево" и "вправо".
// Функция, которая вызывает функцию подмены изображений в зависимости от того, какая клавиша была нажата
function slideImage(event) {
  // Доступ к длине коллекции изображений в галерее
  const galleryLength = document.getElementsByClassName("gallery__image")
    .length;
  // Доступ к currentIndex
  let currentIndex = +modalImageElement.dataset.index;

  if (event.key === "ArrowRight" && currentIndex < galleryLength - 1) {
    currentIndex += 1;
    showNewImage(currentIndex);
  }

  if (event.key === "ArrowLeft" && currentIndex > 0) {
    currentIndex -= 1;
    showNewImage(currentIndex);
  }
}

// Функция для подмены изображений при "перелистывании" галереи
function showNewImage(currentIndex) {
  modalImageElement.setAttribute("src", images[currentIndex].original);
  modalImageElement.setAttribute("alt", images[currentIndex].description);
  modalImageElement.setAttribute("data-index", currentIndex);
}
