import ProductCard from "./ProductCard.js";

export default class ProductCardBuilder {
  static #allData;
  #datas = [];

  constructor() {
    if (!ProductCardBuilder.#allData) {
      console.error('Перед созданием экземпляра ProductCardBuilder необходимо вызвать ProductCardBuilder.loadAllData()');
    }
    this.#datas = ProductCardBuilder.#allData.slice();
  }

  applyFilters(filters, onlyAvailable) {
    this.#datas = this.#datas.filter(data => {
      const filtersCheck = ProductCardBuilder.#checkFilter(data, filters);
      const availabilityCheck = !onlyAvailable || ProductCardBuilder.#checkAvailable(data);
      return filtersCheck && availabilityCheck;
    });
    return this;
  }  

  applySort(sortType) {
    switch (sortType) {
      case 'price-min':
        this.#datas = this.#datas.sort((a, b) => a.price.new - b.price.new);
        break;
      case 'price-max':
        this.#datas = this.#datas.sort((a, b) => b.price.new - a.price.new);
        break;
      case 'rating-max':
        this.#datas = this.#datas.sort((a, b) => a.rating - b.rating);
        break;
    }
    return this;
  }

  getPage(page, pageSize) {
    const startIndex = page * pageSize;
    const endIndex = page * pageSize + pageSize;
    this.#datas = this.#datas.slice(startIndex, endIndex);
    return this;
  }

  buildCards() {
    return this.#datas.map(data => new ProductCard(data));
  }

  count() {
    return this.#datas.length;
  }

  static async loadAllData(callback) {
    if (!ProductCardBuilder.#allData) {
      try {
        const response = await fetch('./data/data.json');
        ProductCardBuilder.#allData = await response.json();
      }
      catch (error) {
        console.error(error);
      }
    }

    callback();
  }

  static #checkFilter(productData, filters) {
    return filters.size > 0
    ? [...filters].some(filter => productData.type.includes(filter))
    : true;
  }

  static #checkAvailable(productData) {
    const values = Object.values(productData.availability);
    return values.some(e => e > 0);
  }

}