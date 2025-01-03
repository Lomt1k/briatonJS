import Elements from "../Elements.js";

export default class BasketCard {
  #data;
  #element;
  #onRemoveClick;

  constructor(data) {
    this.#data = data;
    
  }

  get element() {
    return this.#element ??= this.#createElement();
  }

  get id() {
    return this.#data.id;
  }

  setupRemoveClick(callback) {
    this.#onRemoveClick = callback;
  }

  #createElement() {
    const cardEl = Elements.create('', 'div', 'basket-card');
    const imgWrapEl = Elements.create(cardEl, 'div', 'basket-card__img-wrap');
    Elements.create(imgWrapEl, 'img', [], {
      width: 60,
      height: 60,
      src: this.#data.image,
      alt: this.#data.name
    });
    Elements.create(cardEl, 'span', 'basket-card__name', { textContent: this.#data.name });
    Elements.create(cardEl, 'span', 'basket-card__price', { textContent: this.#data.price.new });
    const closeBtnEl = Elements.create(cardEl, 'button', 'basket-card__close', { type: 'button' });
    closeBtnEl.addEventListener('click', () => this.#onRemoveClick());
    Elements.createSvg(closeBtnEl, 24, 24, 'images/sprite.svg#icon-close');

    return cardEl;
  }
}