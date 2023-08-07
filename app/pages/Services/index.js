import Page from 'classes/Page'
import Detection from 'classes/Detection'
import Prefix from 'prefix'
import { mapEach } from 'utils/dom'

export default class Services extends Page {
  constructor() {
    super({
      id: 'services',
      element: '.services',
      elements: {
        wrapper: '.services__wrapper',
        navigation: '.navigation',
        parallax: '.services__item__media picture > *',
        start: '.start__project__wrapper',
      },
      langs: {
        en: '#en',
        pt: '#pt',
      }
    })

    this.transformPrefix = Prefix('transform')
  }

  create() {
    super.create()
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

  }

  update() {
    super.update()

    if (Detection.isDesktop()) {
      if (this.elements.parallax) {
        const parallax = this.elements.parallax

        mapEach(parallax, item => {
          item.style[this.transformPrefix] = `translate3d(0, ${(Math.floor(-item.offsetTop - (window.innerHeight / 2) + this.scroll.current) * 0.2)}px, 0)`
          item.style.willChange = 'transform'
        })
      }
    }

    function intersecting() {
      if (Detection.isDesktop()) {
        document.body.style.background = 'black'
        document.body.style.color = 'white'
        document.body.querySelector('.overlay path').style.fill = 'white'
        document.body.querySelector('.menu__wrapper').style.background = 'black'
      } else {
        document.documentElement.style.background = 'black'
        document.documentElement.style.color = 'white'
        document.body.querySelectorAll('.work__list__item').forEach((item) => {
          item.style.backgroundColor = "transparent"
        })
      }
    }

    function notIntersecting() {
      if (Detection.isDesktop()) {
        document.body.style.background = 'white'
        document.body.style.color = 'black'
        document.body.querySelector('.overlay path').style.fill = 'black'
        document.body.querySelector('.menu__wrapper').style.background = 'white'
      } else {
        document.documentElement.style.background = 'white'
        document.documentElement.style.color = 'black'
      }
    }

    const observer = new window.IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          intersecting()

        } else {
          notIntersecting()
        }
      })
    })

    observer.observe(this.elements.start)
  }

  destroy() {
    super.destroy()
  }
}
