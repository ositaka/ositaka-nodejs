import Page from 'classes/Page'

export default class Contacts extends Page {
    constructor() {
        super({
            id: 'contacts',
            element: '.contacts',
            elements: {
                wrapper: '.contacts__wrapper',
                navigation: '.navigation',
                title: '.contacts__title',
                services: '.contacts__form__options__services li',
                budget: '.contacts__form__options__budget li',
                delivery: '.contacts__form__options__delivery li',
                submit: '.contacts__form__button',
            },
            langs: {
                en: '#en',
                pt: '#pt',
            }
        })
    }

    show() {
        super.show()

        const serviceOptions = (element) => {
            element.addEventListener('click', () => {
                element.classList.toggle('selected')
                element.querySelector('input').checked = !element.querySelector('input').checked
            })
        }

        const budgetOptions = (element) => {
            element.addEventListener('click', () => {
                this.elements.budget.forEach((checkebox) => {
                    checkebox.classList.remove('selected')
                    checkebox.querySelector('input').checked = false
                })
                element.classList.toggle('selected')
                element.querySelector('input').checked = !element.querySelector('input').checked
            })
        }

        const deliveryOptions = (element) => {
            element.addEventListener('click', () => {
                this.elements.delivery.forEach((checkebox) => {
                    checkebox.classList.remove('selected')
                    checkebox.querySelector('input').checked = false
                })
                element.classList.toggle('selected')
                element.querySelector('input').checked = !element.querySelector('input').checked
            })
        }

        this.elements.services.forEach((element) => serviceOptions(element))
        this.elements.budget.forEach((element) => budgetOptions(element))
        this.elements.delivery.forEach((element) => deliveryOptions(element))


        /***
         * Accordion
         **/
        const faqsItems = document.querySelectorAll('.contacts__faqs__list__item');

        faqsItems.forEach((element) => {
            element.querySelector('.contacts__faqs__list__item__title').addEventListener('click', () => {
                element.classList.toggle('active')
            })
        })

    }
}
