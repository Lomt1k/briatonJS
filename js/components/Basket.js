import BasketCard from "./BasketCard.js";
import Elements from "../Elements.js";

export default class Basket {
  #basketCountEl;
  #basketEl;
  #basketListEl;
  #basketEmptyEl;
  #basketCards = [];

  constructor() {
    const basketBtnEl = document.querySelector('#basket-btn');
    this.#basketCountEl = basketBtnEl.querySelector('#basket-count');
    this.#basketEl = document.querySelector('.basket');
    this.#basketListEl = this.#basketEl.querySelector('.basket__list');
    this.#basketEmptyEl = this.#basketEl.querySelector('.basket__empty-block');

    basketBtnEl.addEventListener('click', () => this.#toggle());
  }

  addProduct(data) {
    const listItemEl = Elements.create(this.#basketListEl, 'li');
    const card = new BasketCard(data);
    card.setupRemoveClick(() => {
      listItemEl.remove();
      this.#basketCards = this.#basketCards.filter(e => e != card);
      this.#refreshCount();
    });
    this.#basketCards.push(card);
    listItemEl.append(card.element);
    this.#refreshCount();
  }

  #toggle() {
    this.#basketEl.classList.toggle('basket--active');
  }

  #refreshCount() {
    const count = this.#basketCards.length;
    this.#basketCountEl.textContent = count;
    this.#basketEmptyEl.style.display = count > 0 ? 'none' : '';
  }
}