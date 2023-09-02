import Page from 'classes/Page'
import Detection from 'classes/Detection'
import Prefix from 'prefix'
import { mapEach } from 'utils/dom'

export default class Home extends Page {
  constructor() {
    super({
      id: 'home',
      element: '.home',
      elements: {
        wrapper: '.home__wrapper',
        navigation: '.navigation',
        parallax: '.home__hero__media picture > *, .home__projects__item__media > *',
        fixed: '.is-fixed',
        start: '.start__project__wrapper',
      },
      langs: {
        en: '#en',
        pt: '#pt',
      }
    })

    this.transformPrefix = Prefix('transform')
  }

  show() {
    super.show()

    if (Detection.isDesktop()) {
      const scroll = this.scroll
      const wrapper = this.elements.wrapper
      const height = innerHeight * 0.75
      const defaultTransition = wrapper.style.transition

      scroll.current = height
      scroll.last = height
      scroll.target = height

      setTimeout(() => {
        this.scroll.target = 0

        setTimeout(() => {
          wrapper.style.transition = defaultTransition
        }, 2000);

      }, 0);
    }

    setTimeout(() => {
      document.querySelector('.home__hero__media video').play()
    }, 600);
  }

  update() {
    super.update()

    if (Detection.isDesktop() && this.elements.parallax) {
      const parallax = this.elements.parallax

      mapEach(parallax, item => {
        item.style[this.transformPrefix] = `translate3d(0, ${Math.floor((-item.offsetTop + this.scroll.current - window.innerHeight / 2) * 0.2)}px, 0)`
        item.style.willChange = 'transform'
      })
    }
  }
}
