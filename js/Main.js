import MainMenu from "./components/MainMenu.js";
import Location from "./components/Location.js";
import Catalog from "./components/Catalog.js";
import Basket from "./components/Basket.js";
import Faq from "./components/Faq.js";
import DayProducts from "./components/DayProducts.js";
import QuestionsForm from "./components/QuestionsForm.js";

export default class Main {
  static #instance;
  #basket;

  constructor() {
    new MainMenu();
    new Location();
    new Catalog();
    this.#basket = new Basket();
    new Faq();
    new DayProducts();
    new QuestionsForm();
  }

  static get instance() {
    return Main.#instance ??= new Main();
  }

  get basket() {
    return this.#basket;
  }
  
}

window.addEventListener('DOMContentLoaded', () => Main.instance);