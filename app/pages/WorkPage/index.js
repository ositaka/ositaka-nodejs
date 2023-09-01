import Page from 'classes/Page'
import Detection from 'classes/Detection'
import Prefix from 'prefix'
import { mapEach } from 'utils/dom'

export default class WorkPage extends Page {
  constructor() {
    super({
      id: 'work_page',
      element: '.work_page',
      elements: {
        wrapper: '.work_page__wrapper',
        navigation: '.navigation',
        title: '.work_page__title',
        parallax: '.work_page__full-screen__media video, .work_page__full-screen__media img',
        gallery: '.work_page__gallery__media picture > *',
        video: '.work_page__media__media video, .work_page__media__media img',
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
  }

  onResize() {
    super.onResize()
  }

  update() {
    super.update()

    if (Detection.isDesktop()) {
      if (this.elements.parallax || this.elements.gallery) {
        const parallax = this.elements.parallax
        const gallery = this.elements.gallery
        const video = this.elements.video

        mapEach(parallax, item => {
          item.style[this.transformPrefix] = `translate3d(0, ${(Math.floor(-item.offsetTop + this.scroll.current) * 0.33)}px, 0)`
          item.style.willChange = 'transform'
        })

        mapEach(gallery, item => {
          item.style[this.transformPrefix] = `translate3d(0, ${(Math.floor(-item.offsetTop + this.scroll.current) * 0.1)}px, 0)`
          item.style.willChange = 'transform'
          // item.style[this.transformPrefix] = `translate3d(0, ${(-(item.offsetTop - (item.offsetHeight / 4)) + this.scroll.current) * 0.15}px, 0)`
        })

        mapEach(video, item => {
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

