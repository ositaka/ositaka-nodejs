import GSAP from 'gsap'
import Prefix from 'prefix'

import each from 'lodash/each'
import map from 'lodash/map'
import { mapEach } from 'utils/dom'

import Arrow from 'animations/Arrow'
import Image from 'animations/Image'
import Label from 'animations/Label'
import Link from 'animations/Link'
// import Magnetic from 'animations/Magnetic'
import Paragraph from 'animations/Paragraph'
import Title from 'animations/Title'
import Chain from 'animations/Chain'
import Video from 'animations/Video'

import AsyncLoad from 'classes/AsyncLoad'
import { ColorsManager } from 'classes/Colors'
import Detection from 'classes/Detection'

// import { clamp, lerp } from 'utils/math'

export default class Page {
  constructor({ element, elements, id, }) {
    this.selector = element
    this.selectorChildren = {
      ...elements,

      animationsArrows: '[data-animation="arrow"]',
      animationsLabels: '[data-animation="label"]',
      animationsMagnetics: '[data-animation="magnetic"]',
      animationsParagraphs: '[data-animation="paragraph"]',
      animationsTitles: '[data-animation="title"]',
      animationsChain: '[data-animation="chain"]',
      animationsLinks: '[data-animation="link"]:not(.animation-created)',

      preloaders: '[data-src], video',
      fixed: '.is-fixed',
      // images: 'picture',
      videos: 'video',
    }

    this.lang = document.documentElement.lang

    this.id = id

    this.transformPrefix = Prefix('transform')
  }

  create() {
    if (Detection.isTouch()) {
      document.documentElement.classList.remove('desktop')
      document.documentElement.classList.add('touch')
    }

    this.animations = []

    this.element = document.querySelector(this.selector)
    this.elements = {}

    this.scroll = {
      current: 0,
      target: 0,
      last: 0,
      limit: 0
    }


    each(this.selectorChildren, (entry, key) => {
      if (entry instanceof window.HTMLElement || entry instanceof window.NodeList || Array.isArray(entry)) {
        this.elements[key] = entry
      } else {
        this.elements[key] = document.querySelectorAll(entry)

        if (this.elements[key].length === 0) {
          this.elements[key] = null
        } else if (this.elements[key].length === 1) {
          this.elements[key] = document.querySelector(entry)
        }
      }
    })

    this.createAnimations()
    this.createPrealoder()

    setTimeout(() => {
      this.cursor = document.querySelector('.cursor')
      this.cursorText = document.querySelector('.cursor__text')
      this.cursor.style.height = '1.5rem'
      this.cursor.style.width = '1.5rem'
      this.cursor.style.transitionDuration = '0.6s'
    }, 200);

    setTimeout(() => {
      document.documentElement.style.cursor = 'default'
    }, 1000);
  }

  createAnimations() {
    this.animations = []

    // Arrows.
    this.animationsArrows = map(this.elements.animationsArrows, element => {
      return new Arrow({
        element
      })
    })

    this.animations.push(...this.animationsArrows)

    // Titles.
    this.animationsTitles = map(this.elements.animationsTitles, (element, index) => {
      return new Title({
        element
      })
    })

    // Chain.
    this.animationsChain = map(this.elements.animationsChain, (element, index) => {
      return new Chain({
        element
      })
    })

    this.animations.push(...this.animationsChain)

    // Paragraphs.
    this.animationsParagraphs = map(this.elements.animationsParagraphs, element => {
      return new Paragraph({
        element
      })
    })

    this.animations.push(...this.animationsParagraphs)

    // Labels.
    this.animationsLabels = map(this.elements.animationsLabels, element => {
      return new Label({
        element
      })
    })

    this.animations.push(...this.animationsLabels)

    // Links
    this.animationsLinks = mapEach(this.elements.animationsLinks, (element, index) => {
      return new Link({
        element
      })

    })

    this.animations.push(...this.animationsLinks)

    // Magnetics
    // this.animationsMagnetics = mapEach(this.elements.animationsMagnetics, (element, index) => {
    //   return new Magnetic({
    //     element
    //   })
    // })

    // this.animations.push(...this.animationsMagnetics)


    // Images
    // this.images = mapEach(this.elements.images, (element, index) => {
    //   return new Image({
    //     element
    //   })
    // })

    // this.animations.push(...this.images)


    // Videos
    this.videos = mapEach(this.elements.videos, element => {
      return new Video({
        element
      })
    })

    this.animations.push(...this.videos)

  }


  createPrealoder() {
    this.preloaders = mapEach(this.elements.preloaders, element => {
      return new AsyncLoad({ element })
    })
  }

  /**
   * Animations.
   */
  show(animation) {
    return new Promise(resolve => {
      ColorsManager.change({
        backgroundColor: this.element.getAttribute('background'),
        color: this.element.getAttribute('color')
      })

      if (animation) {
        this.animationIn = animation
      } else {
        this.animationIn = GSAP.timeline()

        this.animationIn.fromTo(this.element, {
          autoAlpha: 0
        }, {
          autoAlpha: 1,
          duration: 0.3
        })
      }

      this.animationIn.call(_ => {
        this.addEventListeners()

        resolve()
      })

      if (Detection.isPhone() || Detection.isTablet() || Detection.isLowPerformance() || Detection.isTouch()) {
        window.scrollTo(2, 0)
      }

      // Expanding cursor
      if (Detection.isDesktop()) {
        this.links = document.querySelectorAll('button, a.navigation__logo, .menu a, a:not(a.home__projects__item, a.work__list__item, a.services__projects__item)')
        this.linksProjects = document.querySelectorAll('a.home__projects__item, a.work__list__item, a.services__projects__item')
        this.cursor = document.querySelector('.cursor')
        this.cursorText = document.querySelector('.cursor__text')
        this.cursorText.innerHTML = ""

        const initSize = '1.5rem'
        const hoverSize = '12rem'
        const hoverSizeProjects = '16rem'

        setTimeout(() => {
          this.cursorText.style.scale = '0'
        }, 1200);

        mapEach(this.links, link => {
          link.onmouseenter = () => {
            this.cursor.style.height = hoverSize
            this.cursor.style.width = hoverSize
          }

          link.onmouseleave = () => {
            this.cursor.style.height = initSize
            this.cursor.style.width = initSize
          }

          link.addEventListener('click', _ => {
            this.cursor.style.height = initSize
            this.cursor.style.width = initSize
            this.cursorText.innerHTML = ''
          })
        })

        mapEach(this.linksProjects, link => {
          link.onmouseenter = () => {
            this.cursor.classList.add('cursor__hover')
            link.style.cursor = 'none'

            this.cursorText.innerHTML = document.documentElement.lang === "en" ? "view" : "ver"
            this.cursor.style.height = hoverSizeProjects
            this.cursor.style.width = hoverSizeProjects
            this.cursorText.style.scale = '1'
            this.cursorText.style.opacity = '1'
          }

          link.onmouseleave = () => {
            this.cursor.classList.remove('cursor__hover')
            this.cursorText.innerHTML = ''

            this.cursor.style.height = initSize
            this.cursor.style.width = initSize

            this.cursorText.style.scale = '0'
            this.cursorText.style.opacity = '0'
          }

          link.addEventListener('click', _ => {
            this.cursor.classList.remove('cursor__hover')

            this.cursor.style.height = initSize
            this.cursor.style.width = initSize

            this.cursorText.style.scale = '0'
            this.cursorText.style.opacity = '0'
            this.cursorText.innerHTML = ''
          })
        })
      }
    })
  }

  hide() {
    return new Promise(resolve => {
      this.destroy()

      this.animationOut = GSAP.timeline()

      this.animationOut.to(this.element, {
        autoAlpha: 0,
        duration: 1.2,
        ease: 'expo.out',
        transform: `${Detection.isDesktop() ? 'translateY(-10%) scale(0.8)' : 'translateY(10%)'}`,
        onComplete: resolve
      })
    })
  }

  /**
   * Events.
   */
  onResize() {
    if (!this.elements.wrapper) return

    window.requestAnimationFrame(_ => {
      this.scroll.limit = this.elements.wrapper.clientHeight - window.innerHeight

      each(this.animations, animation => {
        animation.onResize && animation.onResize()
      })
    })
  }

  onTouchDown(event) {
    if (!Detection.isPhone() || !Detection.isTablet() || !Detection.isLowPerformance() || !Detection.isTouch()) return

    this.isDown = true

    this.scroll.position = this.scroll.current
    this.start = event.touches ? event.touches[0].clientY : event.clientY
  }

  onTouchMove(event) {
    if (!Detection.isPhone() || !Detection.isTablet() || !Detection.isLowPerformance() || !Detection.isTouch() || !this.isDown) return

    const y = event.touches ? event.touches[0].clientY : event.clientY
    const distance = (this.start - y) * 3

    this.scroll.target = this.scroll.position + distance
  }

  onTouchUp(event) {
    if (!Detection.isPhone() || !Detection.isTablet() || !Detection.isLowPerformance() || !Detection.isTouch()) return

    this.isDown = false
  }

  onWheel(normalized) {
    const speed = normalized.pixelY

    this.scroll.target += speed

    if (!this.elements.wrapper) return

    window.requestAnimationFrame(_ => {
      this.scroll.limit = this.elements.wrapper.clientHeight - window.innerHeight
    })

    return speed
  }


  /**
   * Loop.
   */
  update() {

    // Desktop scroll
    if (!Detection.isPhone() || !Detection.isTablet() || !Detection.isLowPerformance() || !Detection.isTouch()) {
      this.scroll.target = GSAP.utils.clamp(0, this.scroll.limit, this.scroll.target)
      this.scroll.current = GSAP.utils.interpolate(this.scroll.current, this.scroll.target, 0.1)

      this.rotateTriangle()
    }

    // Touch scroll
    if (Detection.isPhone() || Detection.isTablet() || Detection.isLowPerformance() || Detection.isTouch()) {
      window.onscroll = () => {
        this.rotateTriangle()
      }
    }

    if (this.scroll.current < 0.01) {
      this.scroll.current = 0
    }

    /**
     * Controlling the scroll with the Keyboard 
     */
    if (this.elements.wrapper) {

      /** Check for Key Presses */
      // check if keypress is outside of any input/textarea element first
      document.body.onkeydown = (event) => {
        // scroll down
        if (event.target.matches('input') || event.target.matches('textarea') ? false : event.key === ' ' && !event.shiftKey) {
          this.scroll.target = this.scroll.target + window.innerHeight
        }
        // scroll up
        if (event.target.matches('input') || event.target.matches('textarea') ? false : event.key === ' ' && event.shiftKey) {
          this.scroll.target = this.scroll.target - window.innerHeight
        }
        if (event.target.matches('input') || event.target.matches('textarea') ? false : event.key === 'ArrowDown') {
          this.scroll.target = this.scroll.target + window.innerHeight / 3
        }
        if (event.target.matches('input') || event.target.matches('textarea') ? false : event.key === 'ArrowUp') {
          this.scroll.target = this.scroll.target - window.innerHeight / 3
        }
      }

      this.elements.wrapper.style[this.transformPrefix] = `translate3d(0, -${Math.floor(this.scroll.current)}px, 0)`
      this.elements.wrapper.style.willChange = `transform`
    }

    // how to "fix" elements on scroll
    if (this.elements.fixed && !Detection.isLowPerformance()) {
      if (this.elements.fixed.length > 1) {
        each(this.elements.fixed, (element) => {
          element.style[this.transformPrefix] = `translate3d(0, ${this.scroll.current}px, 0)`
        })
      } else {
        this.elements.fixed.style[this.transformPrefix] = `translate3d(0, ${this.scroll.current}px, 0)`
      }
    }

  }

  rotateTriangle() {
    let triangle = document.querySelector('.navigation__logo-triangle')

    // old preloader
    // if (!triangle.classList.contains('is-on-navigation')) return

    if (Detection.isPhone() || Detection.isTablet() || Detection.isLowPerformance() || Detection.isTouch()) {
      triangle.style.rotate = `${Number(window.scrollY / 3)}deg`
    }
    else {
      triangle.style.rotate = `${Number(this.scroll.current / 3)}deg`
    }
    triangle.style.transition = `rotate 0s`
  }

  /**
   * Listeners.
   */
  addEventListeners() {
  }

  removeEventListeners() {
  }

  /**
   * Destroy.
   */
  destroy() {
    this.removeEventListeners()
  }
}
