import Elements from "../Elements.js";

export default class Popup {
  constructor(title, text, secondaryText = '') {
    const popupEl = Elements.create(document.body, 'div', 'popup');
    const contentEl = Elements.create(popupEl, 'div', 'popup__content');
    Elements.create(contentEl, 'h4', 'popup__heading', { textContent: title });
    Elements.create(contentEl, 'p', 'popup__text', { textContent: text });
    const closeBtn = Elements.create(contentEl, 'button', 'popup__close', { type: 'button' });
    Elements.createSvg(closeBtn, 40, 40, '../../images/sprite.svg#icon-close');
    closeBtn.addEventListener('click', () => popupEl.remove());

    if (secondaryText) {
      Elements.create(contentEl, 'p', 'popup__text', { textContent: secondaryText });
    }
  }

  static show(title, text) {
    new Popup(title, text);
  }

  static showError(text) {
    new Popup('Упс', 'Что-то пошло не так...', text);
  }
}