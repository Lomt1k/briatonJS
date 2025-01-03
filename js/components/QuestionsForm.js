import Popup from "./Popup.js";

export default class QuestionsForm {
  #formEl;

  constructor() {
    this.#formEl = document.querySelector('#questions_form');
    this.#createValidator();
  }

  #createValidator() {
    const validator = new JustValidate(this.#formEl);
    validator
    .addField('#name', [
      {
        rule: 'required',
        errorMessage: 'Данное поле обязательно для заполнения'
      },
      {
        rule: 'minLength',
        value: 3,
        errorMessage: 'Длина имени должна быть не менее 3 символов'
      },
      {
        rule: 'maxLength',
        value: 20,
        errorMessage: 'Длина имени должна быть не более 20 символов'
      },
    ])
    .addField('#email', [
      {
        rule: 'required',
        errorMessage: 'Данное поле обязательно для заполнения'
      },
      {
        rule: 'email',
        errorMessage: 'Некорректно указан email'
      },
    ])
    .addField('#agree', [
      {
        rule: 'required',
        errorMessage: 'Обязательный пункт'
      }
    ])
    .onSuccess(() => this.#onSubmit());
  }

  async #onSubmit() {
    const formData = new FormData();
    formData.append('name', this.#formEl.querySelector('#name').value);
    formData.append('email', this.#formEl.querySelector('#email').value);

    try {
      const response = await fetch('https://httpbin.org/post', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        Popup.show('Заявка принята', 'Наши специалисты свяжутся с вами в ближайшее время');
      } else {
        Popup.showError(response.errorMessage);
      }
    }
    catch (error) {
      Popup.showError(error);
    }
  }
}