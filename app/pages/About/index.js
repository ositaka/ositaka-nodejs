
import Page from 'classes/Page'
import Detection from 'classes/Detection'

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