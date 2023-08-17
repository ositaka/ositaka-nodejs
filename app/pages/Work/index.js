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
                // start: '.start__project__wrapper',
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
