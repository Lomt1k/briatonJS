export default class MainMenu {
  #mainMenuEl;
  #openButtonEl;
  #closeButtonEl;
  
  constructor() {
    this.#mainMenuEl = document.querySelector('.main-menu');
    this.#openButtonEl = document.querySelector('.header__catalog-btn');
    this.#closeButtonEl = this.#mainMenuEl.querySelector('.main-menu__close');
    this.#subscribeEvents();
  }

  show() {
    this.#mainMenuEl.classList.add('main-menu--active');
  }

  hide() {
    this.#mainMenuEl.classList.remove('main-menu--active');
  }

  #subscribeEvents() {
    this.#openButtonEl.addEventListener('click', this.show.bind(this));
    this.#closeButtonEl.addEventListener('click', this.hide.bind(this));
  }
}