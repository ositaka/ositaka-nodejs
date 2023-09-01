
import Page from 'classes/Page'

export default class About extends Page {
  constructor() {
    super({
      id: 'about',
      element: '.about',
      elements: {
        wrapper: '.about__wrapper',
        navigation: '.navigation',
        title: '.about__hero__title',
        start: '.start__project__wrapper',
      },
      langs: {
        en: '#en',
        pt: '#pt',
      }
    })
  }

  update() {
    super.update()
  }

  destroy() {
    super.destroy()
  }
}