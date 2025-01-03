// Вспомогательный класс для удобного создания типовых html элементов
export default class Elements {
  static create(parentEl, tag, classList = [], attributes = {}) {
    const element = document.createElement(tag);

    if (Array.isArray(classList))
    {
      classList.forEach(e => element.classList.add(e));
    } else if (typeof classList === 'string') {
      element.classList.add(classList);
    }

    for (let key in attributes) {
      if (key in element) {
        element[key] = attributes[key];
        continue;
      }
      console.error(`${element.tag} not contains property '${key}'`);
    }

    if (parentEl) {
      parentEl.append(element);
    }
    
    return element;
  }

  static createSvg(parentEl, width, height, href) {
    const svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgEl.setAttribute('width', width);
    svgEl.setAttribute('height', height);
    svgEl.setAttribute('aria-hidden', true);
    parentEl.append(svgEl);
    
    const useEl = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    useEl.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', href);
    svgEl.append(useEl);
    return svgEl;
  }

}