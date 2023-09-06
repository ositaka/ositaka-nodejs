import NormalizeWheel from 'normalize-wheel';
import each from 'lodash/each';
import GSAP from 'gsap'

import Canvas from 'components/Canvas';
import Detection from 'classes/Detection'

// import Footer from 'components/Footer';
import Navigation from 'components/Navigation';
import Preloader from 'components/Preloader';

import Intro from 'pages/Intro';
import Home from 'pages/Home';
import About from 'pages/About';
import Archives from 'pages/Archives';
import Services from 'pages/Services';
import Work from 'pages/Work';
import WorkPage from 'pages/WorkPage';
import Contacts from 'pages/Contacts';

class App {
  constructor() {
    this.checkPerformance();
    this.createContent();

    this.createCanvas();
    this.createPreloader();
    this.createNavigation();
    // this.createFooter();
    this.createPages();
    this.createCursor();

    this.addEventListeners();
    this.addLinkListeners();
    this.addLogoAnimation();

    this.onResize();

    this.update();
    // this.menuStart();
  }

  checkPerformance() {
    // Check Device's Performance
    navigator.hardwareConcurrency <= 4 && navigator.userAgent.indexOf('Win') > 0 ?
      document.documentElement.classList.add('low-performance') :
      document.documentElement.classList.add('high-performance')
  }

  createNavigation() {
    this.navigation = new Navigation({
      template: this.template
    });
  }

  // createFooter() {
  //   this.footer = new Footer({
  //     // lang: this.lang
  //   });
  // }

  createPreloader() {
    this.preloader = new Preloader({
      canvas: this.canvas
    });

    this.preloader.once('completed', this.onPreloaded.bind(this));
  }

  createCanvas() {
    this.canvas = new Canvas({
      template: this.template
    });
  }

  createContent() {
    this.content = document.querySelector('.content');
    this.template = this.content.getAttribute('data-template');
  }

  createPages() {
    this.pages = {
      intro: new Intro(),
      home: new Home(),
      about: new About(),
      archives: new Archives(),
      services: new Services(),
      work: new Work(),
      work_page: new WorkPage(),
      contacts: new Contacts(),
    };

    this.page = this.pages[this.template];
    this.page.create();
  }

  createCursor() {
    if (Detection.isDesktop()) {
      this.cursor = document.querySelector('.cursor');
      this.cursorText = document.querySelector('.cursor__text');

      GSAP.set(this.cursor, { xPercent: -50, yPercent: -50 });

      let pos = { x: window.innerWidth / 2, y: 0 };
      var mouse = { x: pos.x, y: 0 };
      var cursorSpeed = 0.2;
      var fpms = 60 / 1000;

      var xSet = GSAP.quickSetter(this.cursor, 'x', 'px');
      var ySet = GSAP.quickSetter(this.cursor, 'y', 'px');

      window.onmousemove = (e) => {
        mouse.x = e.pageX;
        mouse.y = e.clientY;
      }

      GSAP.ticker.add((time, deltaTime) => {
        var delta = deltaTime * fpms;
        var dt = 1.0 - Math.pow(1.0 - cursorSpeed, delta);

        pos.x += (mouse.x - pos.x) * dt;
        pos.y += (mouse.y - pos.y) * dt;

        xSet(pos.x)
        ySet(pos.y)
        // ySet(pos.y - (window.pageYOffset + box.getBoundingClientRect().top))
      })
    }
  }

  /**
   * Events.
   */
  onPreloaded() {
    this.onResize();

    this.canvas.onPreloaded();

    this.page.show();
  }

  onPopState() {
    this.onChange({
      url: window.location.pathname,
      push: false
    });
  }

  async onChange({ url, push = true }) {
    this.canvas.onChangeStart(this.template, url);

    await this.page.hide();

    const request = await window.fetch(url);

    if (request.status === 200) {
      const html = await request.text();
      const div = document.createElement('div');

      if (push) {
        window.history.pushState({}, '', url);
      }

      div.innerHTML = html;

      const divContent = div.querySelector('.content');
      const langEN = div.querySelector('.langs #en') ? div.querySelector('.langs #en').href : '';
      const langPT = div.querySelector('.langs #pt') ? div.querySelector('.langs #pt').href : '';
      const menu = div.querySelector('.langs__list__link').innerHTML;
      // const menuLinks = Array.prototype.slice.call(div.querySelectorAll('.menu__item'));
      const siteurl = div.querySelector('.navigation__logo').href;
      const footerDiv = div.querySelector('.footer').innerHTML;
      const seo_title = div.querySelector('title').innerHTML;

      this.template = divContent.getAttribute('data-template');
      this.langEN = langEN;
      this.langPT = langPT;
      this.menu = menu;
      // this.menuLinks = menuLinks;
      this.siteurl = siteurl;
      this.footerDiv = footerDiv;
      this.seo_title = seo_title;

      this.navigation.onChange(this.template, this.langEN, this.langPT, this.menu, /* this.menuLinks, */ this.siteurl, this.seo_title);

      // this.footer.onChange(this.footerDiv);

      this.content.setAttribute('data-template', this.template);
      this.content.innerHTML = divContent.innerHTML;

      this.canvas.onChangeEnd(this.template);

      this.page = this.pages[this.template];
      this.page.create();

      this.onResize();

      this.page.show();

      this.addLinkListeners();
    }
    else {
      this.onChange({ url: this.lang === 'en' ? '/' : '/pt/' });
    }
  }

  onResize() {
    if (this.page && this.page.onResize) {
      this.page.onResize();
    }

    window.requestAnimationFrame((_) => {
      if (this.canvas && this.canvas.onResize) {
        this.canvas.onResize();
      }
    });
  }

  onTouchDown(event) {
    if (this.canvas && this.canvas.onTouchDown) {
      this.canvas.onTouchDown(event);
    }

    if (this.page && this.page.onTouchDown) {
      this.page.onTouchDown(event)
    }
  }

  onTouchMove(event) {
    if (this.canvas && this.canvas.onTouchMove) {
      this.canvas.onTouchMove(event);
    }

    if (this.page && this.page.onTouchMove) {
      this.page.onTouchMove(event)
    }
  }

  onTouchUp(event) {
    if (this.canvas && this.canvas.onTouchUp) {
      this.canvas.onTouchUp(event);
    }

    if (this.page && this.page.onTouchUp) {
      this.page.onTouchUp(event)
    }
  }

  onWheel(event) {
    const normalizedWheel = NormalizeWheel(event);

    if (this.canvas && this.canvas.onWheel) {
      this.canvas.onWheel(normalizedWheel);
    }

    if (this.page && this.page.onWheel) {
      this.page.onWheel(normalizedWheel);
    }
  }

  /**
   * Loop.
   */
  update() {
    if (this.page && this.page.update) {
      this.page.update();
    }

    if (this.canvas && this.canvas.update) {
      this.canvas.update(this.page.scroll);
    }

    this.frame = window.requestAnimationFrame(this.update.bind(this));
  }

  /***
   * Listeners.
   */
  addEventListeners() {
    window.addEventListener('popstate', this.onPopState.bind(this));
    window.addEventListener('onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll', this.onWheel.bind(this));

    window.addEventListener('mousedown', this.onTouchDown.bind(this));
    window.addEventListener('mousemove', this.onTouchMove.bind(this));
    window.addEventListener('mouseup', this.onTouchUp.bind(this));

    window.addEventListener('touchstart', this.onTouchDown.bind(this));
    window.addEventListener('touchmove', this.onTouchMove.bind(this));
    window.addEventListener('touchend', this.onTouchUp.bind(this));

    window.addEventListener('resize', this.onResize.bind(this));

    // isOnline = true;
    window.addEventListener('online', (event) => {
      var xhr = new XMLHttpRequest();
      xhr.open("POST", '/en/', true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify({
        isOnline: true
      }));

      // window.alert('You are back online. Congratulations!');
    });

    // isOnline = false;
    window.addEventListener('offline', (event) => {
      var xhr = new XMLHttpRequest();
      xhr.open("POST", '/en/', true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify({
        isOnline: false
      }));

      window.alert('You are offline. Please check your internet connection.');
    });
  }

  addLinkListeners() {
    const links = document.querySelectorAll('a')

    each(links, link => {
      const isLocal = link.href.indexOf(window.location.origin) > -1
      const isOnPage = link.href.indexOf('#') > 0
      const isNotEmail = link.href.indexOf('mailto') === -1
      const isNotPhone = link.href.indexOf('tel') === -1
      const isPDF = link.href.indexOf('pdf') > 0

      if (isLocal && !isOnPage && !isPDF) {
        link.onclick = event => {
          event.preventDefault()

          this.onChange({
            url: link.href
          })

          const initSize = '1.5rem'

          this.cursor = document.querySelector('.cursor')
          this.cursorText = document.querySelector('.cursor__text');

          setTimeout(() => {
            this.cursor.style.height = '60rem'
            this.cursor.style.width = '60rem'
            this.cursor.style.transition = '1.5s cubic-bezier(0.19, 1, 0.22, 1)';
          }, 100);

          setTimeout(() => {
            this.cursor.style.height = initSize
            this.cursor.style.width = initSize
          }, 3600);

          this.cursor.style.transition = '1s cubic-bezier(0.22, 1, 1, 0)';

          document.documentElement.style.cursor = 'wait'
        }
      } else if (isOnPage) {
        link.onclick = event => {
          event.preventDefault()

          const destination = event.target.getAttribute('href')
          const destinationElement = document.querySelector(destination)

          this.page.scroll.target = destinationElement?.offsetTop
        }
      }
      else if (isNotEmail && isNotPhone) {
        link.rel = 'noopener'
        link.target = '_blank'
      }
    })
  }

  addLogoAnimation() {
    this.content = document.getElementById('content')
    this.logo = this.navigation.langs.siteurl
    this.logoIsAnimating = false;

    const hideLogo = () => {
      if (this.logoIsAnimating) return
      this.logoIsAnimating = true

      GSAP.timeline().to(document.querySelectorAll('.navigation__logo span'), {
        ease: 'expo.out',
        duration: 0.25,
        stagger: -0.075,
        scale: 0,
        x: '-100%',
        opacity: '0',
        onComplete: () => {
          this.logoIsAnimating = false
        }
      })
    }

    const showLogo = () => {
      if (this.logoIsAnimating) return
      this.logoIsAnimating = true

      GSAP.timeline().to(document.querySelectorAll('.navigation__logo span'), {
        ease: 'expo.out',
        duration: 0.5,
        stagger: 0.075,
        scale: 1,
        x: '0%',
        opacity: '1',
        onComplete: () => {
          this.logoIsAnimating = false
        }
      })
    }

    // mutation observer
    const config = { attributes: true }

    // Callback function to execute when mutations are observed
    const callback = (mutationList) => {
      for (const mutation of mutationList) {

        if (mutation.target.classList.contains('is-open--scroll')) {
          if (
            this.logo.classList.contains('was-shown') ||
            this.content.dataset.template === "work"
          ) return

          showLogo()
        }

        else if (mutation.target.classList.contains('is-open')) {
          if (
            this.logo.classList.contains('was-shown') ||
            this.content.dataset.template === "work"
          ) return

          showLogo()
        }

        else {
          hideLogo()
        }
      }
    }

    const observer = new MutationObserver(callback)
    observer.observe(this.logo, config);

    if (Detection.isDesktop()) {
      window.addEventListener('onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll', () => {
        setTimeout(() => {
          if (this.page.scroll.current > window.innerHeight * 0.3) {
            this.logo.classList.remove('is-open', 'is-open--scroll')
          }
          else {
            this.logo.classList.add('is-open--scroll')
            this.logo.classList.remove('was-shown')
          }
        }, 600)
      })

      this.logo.addEventListener('mouseenter', () => {
        this.logo.classList.add('is-open')
        this.logo.classList.remove('was-shown')
      })

      this.logo.addEventListener('mouseleave', () => {
        if (this.page.scroll.current > window.innerHeight / 3) {
          this.logo.classList.remove('is-open')
          this.logo.classList.add('was-shown')
        }
      })
    }

    else {
      window.addEventListener('scroll', () => {
        window.scrollY > 1
          ? this.logo.classList.remove('is-open')
          : this.logo.classList.add('is-open')
      })
    }
  }
}

new App();