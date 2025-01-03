import ProductCardsBuilder from "./ProductCardsBuilder.js";
import Elements from "../Elements.js";

export default class Catalog {
  #rootEl;
  #listEl;
  #filters = new Set();
  #onlyAvailableProducts = false;
  #sortType = '';
  #currentPage = 0;

  static #pageSize = 6;

  constructor() {
    this.#rootEl = document.querySelector('.catalog');
    this.#listEl = this.#rootEl.querySelector('.catalog__list');
    this.#setupFilterEvents();
    this.#setupSortingEvents();
    ProductCardsBuilder.loadAllData(() => {
      this.#refreshProductCards();
      this.#refreshFilterCounters();
    });
  }

  #refreshProductCards() {
    this.#clearProductCards();

    const cardsBuilder = new ProductCardsBuilder()
    .applyFilters(this.#filters, this.#onlyAvailableProducts)
    .applySort(this.#sortType);

    const pagesCount = Math.ceil(cardsBuilder.count() / Catalog.#pageSize);
    this.#setPageCount(pagesCount);

    const currentPageCards = cardsBuilder
    .getPage(this.#currentPage, Catalog.#pageSize)
    .buildCards();

    currentPageCards.forEach(productCard => {
      const itemEl = Elements.create(this.#listEl, 'li', 'catalog__item');
      itemEl.append(productCard.element);
    });
  }

  #clearProductCards() {
    this.#listEl.innerHTML = '';
  }
  
  #setupFilterEvents() {
    const checkboxListEl = this.#rootEl.querySelector('.catalog-form__list-col');
    const checkboxEls = checkboxListEl.querySelectorAll('.custom-checkbox__field');
  
    checkboxEls.forEach(el => el.addEventListener('change', (e) => {
      if (e.currentTarget.checked) {
        this.#filters.add(e.currentTarget.value);
      } else {
        this.#filters.delete(e.currentTarget.value);
      }
      this.#currentPage = 0;
      this.#refreshProductCards();
    }));
  
    const resetBtn = this.#rootEl.querySelector('.catalog-form__reset');
    resetBtn.addEventListener('click', () => {
      checkboxEls.forEach(el => el.checked = false);
      this.#filters.clear();
      this.#refreshProductCards();
    });
  
    const radioEls = this.#rootEl.querySelectorAll('.custom-radio__field[name="status"]');
    radioEls.forEach(el => el.addEventListener('change', (e) => {
      this.#onlyAvailableProducts = e.currentTarget.value == 'instock';
      this.#refreshProductCards();
      this.#refreshFilterCounters();
    }));
  }
  
  #setupSortingEvents() {
    const selectEl = this.#rootEl.querySelector('.catalog__sort-select');
    this.#sortType = selectEl.value;
    selectEl.addEventListener('change', (e) => {
      this.#sortType = e.currentTarget.value;
      this.#currentPage = 0;
      this.#refreshProductCards();
    });
  }

  #refreshFilterCounters() {
    const checkboxListEl = this.#rootEl.querySelector('.catalog-form__list-col');
    const checkboxEls = checkboxListEl.querySelectorAll('.custom-checkbox');
    checkboxEls.forEach(e => this.#refreshFilterCounter(e));
  }
  
  #refreshFilterCounter(checkboxEl) {
    const type = checkboxEl.querySelector('.custom-checkbox__field').value;
    const filters = new Set([type]);
    const count = new ProductCardsBuilder()
    .applyFilters(filters, this.#onlyAvailableProducts)
    .count();
    checkboxEl.querySelector('.custom-checkbox__count').textContent = count;
  }

  #setPageCount(count) {
    const navigationEl = this.#rootEl.querySelector('.catalog__pagination');
    navigationEl.innerHTML = '';
    if (count < 2) {
      return;
    }

    for (let i = 0; i < count; i++) {
      const itemEl = Elements.create(navigationEl, 'li', 'catalog__pagination-item');
      const btnEl = Elements.create(itemEl, 'button', 'catalog__pagination-link', { type: 'button', textContent: i + 1 });
      btnEl.disabled = i === this.#currentPage;
      btnEl.addEventListener('click', () => {
        this.#currentPage = i;
        this.#refreshProductCards();
      });
    }
  }

}