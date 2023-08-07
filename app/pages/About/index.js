
import Page from 'classes/Page'
import Detection from 'classes/Detection'
import Typewritter from 'animations/Typewritter'

export default class About extends Page {
    constructor() {
        super({
            id: 'about',
            element: '.about',
            elements: {
                wrapper: '.about__wrapper',
                navigation: '.navigation',
                title: '.about__hero__title',
                typewritter: '.about__hero__title__list',
                start: '.start__project__wrapper',
            },
            langs: {
                en: '#en',
                nl: '#nl',
                pt: '#pt',
            }
        })
    }

    create() {
        super.create()

        if (this.elements.typewritter) {
            new Typewritter({
                text: this.elements.typewritter.textContent,
                time: 90
            })
        }

        // slideshow
        var current = 0,
            slides = document.querySelectorAll(".about__quotes__list__item");

        setInterval(function () {
            for (var i = 0; i < slides.length; i++) {
                slides[i].style.display = 'none';
            }
            current = (current != slides.length - 1) ? current + 1 : 0;
            slides[current].style.display = 'block';
        }, 9000);
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