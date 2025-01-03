import ProductCard from "./ProductCard.js";
import Elements from "../Elements.js";

export default class DayProducts {

  constructor() {
    this.#createProductCards();
  }

  async #createProductCards() {
    const listEl = document.querySelector('.day-products__list');
    try {
      const response = await fetch('./data/data.json');
      let datas = await response.json();
      datas = datas.filter(data => data.goodsOfDay);
      datas.forEach(data => {
        const productCard = new ProductCard(data, true);
        const itemEl = Elements.create(listEl, 'li', ['day-products__item', 'swiper-slide']);
        itemEl.append(productCard.element);
      });
      this.#createSlider();
    }
    catch (error) {
      console.error(error);
    }
  }

  #createSlider() {
    new Swiper('.day-products__slider', {
      speed: 400,
      spaceBetween: 10,
      slidesPerView: 4,
      navigation: {
        nextEl: '.day-products__navigation-btn--next',
        prevEl: '.day-products__navigation-btn--prev',
      },
    });
  }

}