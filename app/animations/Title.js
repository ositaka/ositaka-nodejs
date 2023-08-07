import Animation from 'classes/Animation'

import { calculate, split } from 'utils/text'

export default class Title extends Animation {
  constructor({ element, elements }) {
    super({
      element,
      elements
    })

    split({ element: this.element, append: true })
    split({ element: this.element, append: true })

    this.elementLinesSpans = this.element.querySelectorAll('span span')
  }

  animateIn() {
    this.element.classList.add('in-view')

    this.element.querySelectorAll('span span').forEach((element, index) => {
      element.style.transitionDelay = `${index + index + index + index}0ms`
    })
  }

  animateOut() {
    this.element.classList.remove('in-view')
  }

  onResize() {
    this.elementLines = calculate(this.elementLinesSpans)
  }
}
