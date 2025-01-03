export default class Location {
  #cityBtnEl;
  #cityNameEl;

  constructor() {
    this.#cityBtnEl = document.querySelector('.location__city');
    this.#cityNameEl = this.#cityBtnEl.querySelector('.location__city-name');
    this.#subscribeEvents();
  }

  toggleActive() {
    this.#cityBtnEl.classList.toggle('location__city--active');
  }

  #subscribeEvents() {
    this.#cityBtnEl.addEventListener('click', this.toggleActive.bind(this));

    const sublinks = document.querySelectorAll('.location__sublink');
    sublinks.forEach(e => e.addEventListener('click', this.#onSublinkClick.bind(this)));
  }

  #onSublinkClick(e) {
    this.#cityNameEl.textContent = e.currentTarget.textContent;
    this.toggleActive();
  }
}