import GSAP from 'gsap'
import Animation from 'classes/Animation'

export default class Arrow extends Animation {
  constructor({ element, elements }) {
    super({
      element,
      elements
    })
  }

  animateIn() {
    this.timelineIn = GSAP.timeline({
      delay: 0.5
    })

    this.timelineIn.fromTo(this.element, {
      autoAlpha: 0,
      delay: 2,
      scale: 1.5,
      x: '-100%',
    }, {
      autoAlpha: 1,
      delay: .5,
      duration: 1.5,
      ease: 'expo.out',
      scale: 1,
      x: '0%'
    })
  }

  animateOut() {
    GSAP.set(this.element, {
      autoAlpha: 0
    })
  }
}
