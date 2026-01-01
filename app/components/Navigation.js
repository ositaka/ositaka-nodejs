import GSAP from 'gsap'
import Component from 'classes/Component'

export default class Navigation extends Component {
  constructor({ template }) {
    super({
      element: '.navigation',
      elements: {
        menuLinks: '.menu__item',
        navigation: '.navigation',
        textCursor: '.cursor__text',
        textContacts: '.menu__contacts label',
        textFollow: '.menu__follow label',
        siteurl: '.navigation__logo'
      },
    })

    this.template = template

  }

  create() {
    super.create()

    // Set default English text
    this.elements.textContacts.innerHTML = 'get in touch'
    this.elements.textFollow.innerHTML = 'follow me on'

    // overlay (SVG path element)
    const overlayPath = document.querySelector('.overlay__path');

    const menuWrap = document.querySelector('.menu__wrapper');
    const menuItems = menuWrap.querySelectorAll('.menu__item, .menu__nav label');
    const menuSecondary = menuWrap.querySelectorAll('.menu__follow *, .menu__contacts *');

    const buttonMenu = document.querySelector('.button-menu');

    // big title elements
    const title = {
      main: document.querySelector('.navigation'),
      sub: document.querySelector('.content')
    };

    let isAnimating = false;
    let menuIsOpen = false;

    // opens the menu
    const openMenu = () => {

      if (isAnimating) return;
      isAnimating = true;

      GSAP.timeline({
      })
        .set(overlayPath, {
          attr: { d: 'M 0 100 V 100 Q 50 100 100 100 V 100 z' }
        })
        .to(overlayPath, {
          duration: 0.8,
          ease: 'power4.in',
          attr: { d: 'M 0 100 V 50 Q 50 100 100 50 V 100 z' }
        }, 0)
        .to(overlayPath, {
          duration: 0.2,
          ease: 'power2',
          attr: { d: 'M 0 100 V 0 Q 50 0 100 0 V 100 z' },
          onComplete: () => {
            menuWrap.classList.add('menu__wrapper--open');
          }
        })
        // title elements
        .to([title.main, title.sub], {
          duration: 0.8,
          ease: 'power3.in',
          y: -200,
          stagger: 0.05
        }, 0.2)

        // now reveal
        .set(menuItems, {
          opacity: 0
        })
        .set(menuSecondary, {
          opacity: 0
        })
        .set(overlayPath, {
          attr: { d: 'M 0 0 V 100 Q 50 100 100 100 V 0 z' }
        })
        .to(overlayPath, {
          duration: 0.2,
          ease: 'power2.in',
          attr: { d: 'M 0 0 V 50 Q 50 0 100 50 V 0 z' },
        })
        .to(overlayPath, {
          duration: 0.8,
          ease: 'power4',
          attr: { d: 'M 0 0 V 0 Q 50 0 100 0 V 0 z' },
          onComplete: () => { // fix "doubles" fast-clicks on menu opening
            isAnimating = false
            menuIsOpen = true
            buttonMenu.style.pointerEvents = "all"
            menuItems.forEach(item => {
              item.style.pointerEvents = "all"
            })
          }
        })
        // menu items translate animation
        .to(menuItems, {
          duration: 1.1,
          ease: 'power4',
          startAt: { y: 150 },
          y: 0,
          opacity: 1,
          stagger: 0.05
        }, '>-=1.1')
        .to(menuSecondary, {
          delay: 0.1,
          duration: 1.4,
          ease: 'power4',
          startAt: { y: 150 },
          y: 0,
          opacity: 1,
          stagger: 0.05
        }, '>-=1.1');

    }

    // closes the menu
    const closeMenu = () => {
      buttonMenu.classList.remove('opened')

      if (isAnimating) return;
      isAnimating = true;

      GSAP.timeline({
        onComplete: () => {
          isAnimating = false
          menuIsOpen = false

          buttonMenu.style.pointerEvents = "all"
          menuItems.forEach(item => {
            item.style.pointerEvents = "none"
          })
        }
      })
        .set(overlayPath, {
          attr: { d: 'M 0 0 V 0 Q 50 0 100 0 V 0 z' }
        })
        .to(overlayPath, {
          duration: 0.8,
          ease: 'power4.in',
          attr: { d: 'M 0 0 V 50 Q 50 100 100 50 V 0 z' }
        }, 0)
        .to(overlayPath, {
          duration: 0.2,
          ease: 'power2',
          attr: { d: 'M 0 0 V 100 Q 50 100 100 100 V 0 z' },
          onComplete: () => {
            menuWrap.classList.remove('menu__wrapper--open');
          }
        })
        // now reveal
        .set(overlayPath, {
          attr: { d: 'M 0 100 V 0 Q 50 0 100 0 V 100 z' }
        })
        .to(overlayPath, {
          duration: 0.2,
          ease: 'power2.in',
          attr: { d: 'M 0 100 V 50 Q 50 100 100 50 V 100 z' }
        })
        .to(overlayPath, {
          duration: 0.8,
          ease: 'power4',
          attr: { d: 'M 0 100 V 100 Q 50 100 100 100 V 100 z' }
        })
        // title elements
        .to([title.main, title.sub], {
          duration: 1.1,
          ease: 'power4',
          y: 0,
          stagger: -0.05
        }, '>-=1.1')
        // menu items translate animation
        .to(menuItems, {
          duration: 0.8,
          ease: 'power2.in',
          y: 100,
          opacity: 0,
          stagger: -0.05
        }, 0)
        .to(menuSecondary, {
          delay: 0.1,
          duration: 0.8,
          ease: 'power2.in',
          y: 100,
          opacity: 0,
          stagger: -0.05
        }, 0)
    }

    const toggleMenu = () => {
      !menuIsOpen ? openMenu() : closeMenu()
      buttonMenu.style.pointerEvents = "none"
    }

    // click on menu button
    buttonMenu.addEventListener('click', toggleMenu)

    menuItems.forEach(item => {
      item.addEventListener('click', closeMenu)
    })
  }

  onChange(template, seo_title) {
    this.template = template
    if (seo_title) {
      document.title = seo_title
    }
  }

}
