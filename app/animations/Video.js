import Animation from 'classes/Animation'

export default class extends Animation {
  constructor({ element }) {
    super({
      element,
    })

  }

  animateIn() {
    this.element.classList.add('loaded')
    this.element?.play()
  }

  animateOut() {
    this.element?.pause()
  }

}
