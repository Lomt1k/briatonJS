export default class Faq {
  #rootEl;
  #activeAccordionEl = null;

  constructor() {
    this.#rootEl = document.querySelector('.faq');
    this.#setupAccordion();
  }

  #setupAccordion() {
    const buttonEls = this.#rootEl.querySelectorAll('.accordion__btn');
    buttonEls.forEach(buttonEl =>
      buttonEl.addEventListener('click', () => this.#onAccordionClick(buttonEl)));
  }

  #onAccordionClick(accordionEl) {
    this.#activeAccordionEl?.classList.remove('accordion__btn--active');
    if (this.#activeAccordionEl == accordionEl) {
      this.#activeAccordionEl = null;
      return;
    }

    accordionEl.classList.add('accordion__btn--active');
    this.#activeAccordionEl = accordionEl;
  }
  
}