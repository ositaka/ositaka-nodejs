import Page from 'classes/Page'
import Detection from 'classes/Detection'
import Prefix from 'prefix'
import { mapEach } from 'utils/dom'

export default class Archives extends Page {
  constructor() {
    super({
      id: 'archives',
      element: '.archives',
      elements: {
        wrapper: '.archives__wrapper',
        navigation: '.navigation',
        title: '.archives__title',
        media: '.archives__media__media video, .archives__media__media img',
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
      const height = innerHeight * 1.35
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

  onResize() {
    super.onResize()
  }

  update() {
    super.update()

    if (Detection.isDesktop()) {
      if (this.elements.media) {
        const media = this.elements.media

        mapEach(media, item => {
          item.style[this.transformPrefix] = `translate3d(0, ${(Math.floor(-item.offsetTop + this.scroll.current) * 0.2)}px, 0)`
          item.style.willChange = 'transform'
        })
      }
    }

  }

  destroy() {
    super.destroy()
  }
}

