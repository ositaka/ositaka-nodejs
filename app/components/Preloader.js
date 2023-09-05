import { Texture } from 'ogl'
import GSAP from 'gsap'
import Component from 'classes/Component'
import { split } from 'utils/text'

export default class Preloader extends Component {
  constructor({ canvas }) {
    super({
      element: '.preloader',
      elements: {
        title: '.preloader__text',
        logo: '.navigation__logo',
        navigation: '.button-menu, .langs a, .navigation__logo-lettering span',
        number: '.preloader__number',
        numberText: '.preloader__number__text',
        triangle: '.navigation__logo-triangle',
      }
    })

    this.canvas = canvas

    window.TEXTURES = {}

    split({
      element: this.elements.title,
      expression: '<br>'
    })

    split({
      element: this.elements.title,
      expression: '<br>'
    })

    this.elements.titleSpans = this.elements.title.querySelectorAll('span span')

    this.length = 0

    this.createLoader()
  }

  createLoader() {
    window.ASSETS.forEach(image => {
      const texture = new Texture(this.canvas.gl, {
        generateMipmaps: false
      })

      const media = new window.Image()

      media.crossOrigin = 'anonymous'
      media.src = image
      media.onload = _ => {
        texture.image = media

        this.onAssetLoaded()
      }

      window.TEXTURES[image] = texture
    })
  }

  onAssetLoaded(image) {
    this.length += 1

    const percent = this.length / window.ASSETS.length

    this.elements.numberText.innerHTML = `${Math.round(percent * 100)}%`

    if (percent === 1) {
      this.onLoaded()
    }
  }

  onLoaded() {
    return new Promise(resolve => {
      this.emit('completed')

      // this.animateOut = GSAP.timeline({
      //   delay: 2
      // })

      // this.animateOut.set(this.elements.navigation, {
      //   transform: 'translateY(-30vw)',
      // })

      // this.animateOut.to(this.elements.titleSpans, {
      //   // duration: 1.5,
      //   duration: 3,
      //   ease: 'expo.out',
      //   stagger: 0.5,
      //   y: '100%',

      //   // Move triangle animation
      //   onComplete: () => {
      //     this.elements.triangle.classList.remove('is-on-preloader')

      //     setTimeout(() => {
      //       this.elements.logo.classList.add('is-open')
      //       this.elements.triangle.classList.add('is-on-navigation')
      //     }, 1000)
      //   }
      // })

      // this.animateOut.to(this.elements.numberText, {
      //   // duration: 1.5,
      //   duration: 2.2,
      //   ease: 'expo.out',
      //   stagger: 0.1,
      //   y: '100%'
      // }, '-=1.4')

      // this.animateOut.to(this.element, {
      //   duration: 2.5,
      //   ease: 'expo.out',
      //   transform: 'translateY(-100%)'
      // }, '-=1')

      // this.animateOut.to(this.elements.navigation, {
      //   duration: 1.5,
      //   ease: 'expo.out',
      //   opacity: 1,
      //   stagger: 0.05,
      //   transform: 'translateY(0vw)',
      // })

      // this.animateOut.call(_ => {
      //   this.destroy()
      // })
      this.destroy()
    })
  }

  destroy() {
    this.element.parentNode.removeChild(this.element)
  }
}
