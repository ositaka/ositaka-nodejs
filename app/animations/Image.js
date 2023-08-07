import Animation from 'classes/Animation'

export default class extends Animation {
  constructor({ element }) {
    super({
      element,
    })

  }

  animateIn() {
    this.element.classList.add('shown')
    this.element.style.transition = 'transform 1.5s cubic-bezier(0, 0.85, 0.15, 1)'
    this.element.style.transform = 'scale3d(1, 1, 1)'
  }

  animateOut() {
    if (this.element.classList.contains('shown')) {
      this.element.style.transform = 'scale3d(1, 1, 1)'
    }
    this.element.style.transition = '0'
    this.element.style.transform = 'scale3d(0.8, 0.1, 1)'
  }

}
