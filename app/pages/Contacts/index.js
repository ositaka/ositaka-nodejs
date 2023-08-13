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
                labels: '.contacts__form__project .field',
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

        const setLabelsActive = (element) => {
          element.addEventListener('input', (event) => {
            event.target.value.length !== 0
              ? element.parentNode.querySelector('span').classList.add('filled')
              : element.parentNode.querySelector('span').classList.remove('filled')
          })
        }

        this.elements.services.forEach((element) => serviceOptions(element))
        this.elements.budget.forEach((element) => budgetOptions(element))
        this.elements.delivery.forEach((element) => deliveryOptions(element))
        this.elements.labels.forEach((element) => setLabelsActive(element))

    }
}
