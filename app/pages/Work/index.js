import Page from 'classes/Page'
import Detection from 'classes/Detection'
import Prefix from 'prefix'

export default class Work extends Page {
    constructor() {
        super({
            id: 'work',
            element: '.work',
            elements: {
                wrapper: '.work__wrapper',
                navigation: '.navigation',
                workList: '.work__list',
                start: '.start__project__wrapper',
            },
            langs: {
                en: '#en',
                nl: '#nl',
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
            const height = innerHeight * 1.5
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

        function intersecting() {
            if (Detection.isDesktop()) {
                document.body.style.background = 'black'
                document.body.style.color = 'white'
                document.body.querySelector('.work__list').style.transition = 'opacity 0.3s ease-out'
                document.body.querySelector('.work__list').style.opacity = '0'
                document.body.querySelector('.overlay path').style.fill = 'white'
                document.body.querySelector('.menu__wrapper').style.background = 'black'
            } else {
                document.documentElement.style.background = 'black'
                document.documentElement.style.color = 'white'
                document.body.querySelector('.work__list').style.transition = 'opacity 0.2s ease-out'
                document.body.querySelector('.work__list').style.opacity = '0'
            }
        }

        function notIntersecting() {
            if (Detection.isDesktop()) {
                document.body.style.background = 'white'
                document.body.style.color = 'black'
                document.body.querySelector('.work__list').style.transition = 'opacity 0.3s ease-out'
                document.body.querySelector('.work__list').style.opacity = '1'
                document.body.querySelector('.overlay path').style.fill = 'black'
                document.body.querySelector('.menu__wrapper').style.background = 'white'
            } else {
                document.documentElement.style.background = 'white'
                document.documentElement.style.color = 'black'
                document.body.querySelector('.work__list').style.transition = 'opacity 0.2s ease-out'
                document.body.querySelector('.work__list').style.opacity = '1'
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

    update() {
        super.update()

        const invertedCol = document.querySelector(".work__list__col:last-child")

        if (Detection.isDesktop()) {
            invertedCol.style[this.transformPrefix] = `translate3d(0, ${Math.floor(-(invertedCol.clientHeight - window.innerHeight) + (this.scroll.current) * 2)}px, 0)`
            invertedCol.style.willChange = 'transform'
        }
    }

    onResize() {
        super.onResize()
    }

    destroy() {
        super.destroy()
    }
}
