import each from 'lodash/each'
import Animation from 'classes/Animation'
import { calculate, split } from 'utils/text'

export default class extends Animation {
  constructor({ element }) {
    const lines = []
    const paragraphs = element.querySelectorAll('h1, h2, p')


    if (paragraphs.length !== 0) {
      each(paragraphs, element => {
        split({ element })
        split({ element })

        lines.push(...element.querySelectorAll('span span'))
      })
    } else {
      split({ element })
      split({ element })

      lines.push(...element.querySelectorAll('span span'))
    }

    super({
      element,
      elements: {
        lines
      }
    })

    this.onResize()

    if ('IntersectionObserver' in window) {
      this.animateOut()
    }
  }

  animateIn() {
    super.animateIn()

    each(this.lines, (line, lineIndex) => {
      each(line, word => {
        word.style.transition = `transform 1.5s ${lineIndex * 0.06}s cubic-bezier(0.19, 1, 0.22, 1)`
        word.style[this.transformPrefix] = 'translate3d(0, 0, 0)'
      })
    })
  }

  animateOut() {
    super.animateOut()

    each(this.lines, line => {
      each(line, word => {
        word.style.transition = `transform 0s`
        word.style[this.transformPrefix] = 'translate3d(0, 100%, 0)'
      })
    })
  }

  onResize() {
    this.lines = calculate(this.elements.lines)
  }
}