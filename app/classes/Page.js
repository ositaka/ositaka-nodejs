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

    this.id = id

    this.transformPrefix = Prefix('transform')
  }

  create() {
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
      this.cursorText = document.querySelector('.cursor__text');
      this.cursor.style.height = '1.5rem'
      this.cursor.style.width = '1.5rem'
      this.cursor.style.transitionDuration = '0.6s'
    }, 200);

    setTimeout(() => {
      document.documentElement.style.cursor = 'default'
    }, 1000);

    // responsive video
    function responsiveVideo(window, undefined) {
      function videoSourceSet(options, elements) {
        options = Object.assign({}, { resize: false, resizeDelay: 50 }, options);
        if (elements === undefined) { elements = document.getElementsByTagName('video'); }
        var regex = /^\s*(.+)\s+(\d+)([wh])?\s*$/;
        function getSourceSets(def) {
          var sources = [];
          var parts = def.split(',');
          for (var i in parts) {
            var result;
            if (result = parts[i].match(regex)) {
              sources.push({ width: parseInt(result[2]), src: result[1], });
            }
          }
          return sources;
        }

        function selectSource(srcsrt, screenWidth) {
          var sources = getSourceSets(srcsrt);
          var selectedDiff = null;
          var source = null;

          for (var i in sources) {
            var candidate = sources[i];
            var candidateDiff = candidate.width - screenWidth;
            if (source === null ||
              (selectedDiff < 0 && candidateDiff >= 0) ||
              (candidateDiff < 0 && candidateDiff > selectedDiff) ||
              (candidateDiff >= 0 && candidateDiff < selectedDiff)
            ) { selectedDiff = candidateDiff; source = candidate.src; }
          }
          return source;
        }

        function init(elements) {
          for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            if (element.tagName == 'VIDEO' && element.hasAttribute('srcset')) {
              var srcset = element.getAttribute('srcset');
              if (srcset) {
                var selectedSource = selectSource(srcset, window.innerWidth);
                if (selectedSource !== element.src) {
                  element.src = selectedSource;

                  // fix intersecObserver
                  var playPromise = element.play()

                  if (playPromise !== undefined) {
                    playPromise.then(_ => {
                      element.pause();
                    })
                      .catch(error => { error = null });
                  }
                }
              }
            }
          }
        }
        init(elements);

        if (options.resize) {
          var resizeDelayTimeout = null;
          window.onresize = function() {
            if (resizeDelayTimeout !== null) {
              clearTimeout(resizeDelayTimeout);
            }
            resizeDelayTimeout = setTimeout(function () {
              init(elements);
            }, options.resizeDelay);
          };
        }
      }
      window.videoSourceSet = videoSourceSet;
    }

    responsiveVideo(window);
    videoSourceSet({ resize: true, resizeDelay: 1000 });

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
    this.videos = mapEach(this.elements.videos, (element, index) => {
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
        backgroundColor: this.element.getAttribute('data-background'),
        color: this.element.getAttribute('data-color')
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

      if (Detection.isPhone() || Detection.isTablet() || Detection.isLowPerformance()) {
        window.scrollTo(2, 0)
      }



      this.links = document.querySelectorAll('button, a.navigation__logo, .menu a, a:not(a.home__projects__item, a.work__list__item, a.services__projects__item)')
      this.linksProjects = document.querySelectorAll('a.home__projects__item, a.work__list__item, a.services__projects__item')
      this.cursor = document.querySelector('.cursor')
      this.cursorText = document.querySelector('.cursor__text')

      const initSize = '1.5rem'
      const hoverSize = '5rem'
      const hoverSizeProjects = '12rem'

      setTimeout(() => {
        this.cursorText.innerHTML = 'view'
      }, 600);

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

          this.cursor.style.height = hoverSizeProjects
          this.cursor.style.width = hoverSizeProjects
          this.cursorText.style.display = 'block'
        }

        link.onmouseleave = () => {
          this.cursor.classList.remove('cursor__hover')

          this.cursor.style.height = initSize
          this.cursor.style.width = initSize

          this.cursorText.style.display = 'none'
        }

        link.addEventListener('click', _ => {
          this.cursor.classList.remove('cursor__hover')

          this.cursor.style.height = initSize
          this.cursor.style.width = initSize

          this.cursorText.style.display = 'none'
          this.cursorText.innerHTML = ''
        })
      })
    })
  }

  hide() {
    return new Promise(resolve => {
      this.destroy()


      this.animationOut = GSAP.timeline()

      this.animationOut.to(this.element, {
        autoAlpha: 0,
        duration: 0.2,
        ease: 'expo.out',
        transform: 'translateY(10%)',
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
    if (!Detection.isPhone() || !Detection.isTablet() || !Detection.isLowPerformance()) return

    this.isDown = true

    this.scroll.position = this.scroll.current
    this.start = event.touches ? event.touches[0].clientY : event.clientY
  }

  onTouchMove(event) {
    if (!Detection.isPhone() || !Detection.isTablet() || Detection.isLowPerformance() || !this.isDown) return

    const y = event.touches ? event.touches[0].clientY : event.clientY
    const distance = (this.start - y) * 3

    this.scroll.target = this.scroll.position + distance
  }

  onTouchUp(event) {
    if (!Detection.isPhone() || !Detection.isTablet() || !Detection.isLowPerformance()) return

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
    if (Detection.isPhone() || Detection.isTablet() || Detection.isLowPerformance()) {
      this.scroll.target = this.scroll.target // 
    } else {
      this.scroll.target = GSAP.utils.clamp(0, this.scroll.limit, this.scroll.target)
      this.scroll.current = GSAP.utils.interpolate(this.scroll.current, this.scroll.target, 0.1)
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
