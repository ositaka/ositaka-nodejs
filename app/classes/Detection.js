class Detection {
  isPhone() {
    if (!this.isPhoneChecked) {
      this.isPhoneChecked = true

      this.isPhoneCheck = document.documentElement.classList.contains('phone')
    }

    return this.isPhoneCheck
  }

  isTablet() {
    if (!this.isTabletChecked) {
      this.isTabletChecked = true

      this.isTabletCheck = document.documentElement.classList.contains('tablet')
    }

    return this.isTabletCheck
  }

  isDesktop() {
    if (!this.isDesktopChecked) {
      this.isDesktopChecked = true

      this.isDesktopCheck = document.documentElement.classList.contains('desktop')
    }

    return this.isDesktopCheck
  }

  isLowPerformance() {
    if (!this.isLowPerformanceChecked) {
      this.isLowPerformanceChecked = true

      this.isLowPerformanceCheck = document.documentElement.classList.contains('low-performance')
    }

    return this.isLowPerformanceCheck
  }

  isTouch() {
    if (!this.isTouchChecked) {
      this.isTouchChecked = true

      this.isTouchCheck = navigator.maxTouchPoints > 0
    }

    return this.isTouchCheck
  }

  // is60fps() {
  //   if (!this.fpsChecked) {

  //     setTimeout(_ => {
  //       this.fpsChecked = true
  //       this.fpsCheck = document.documentElement.classList.contains('60fps')
  //     }, 2000)
  //   }

  //   return this.fpsCheck
  // }
}

const DetectionManager = new Detection()

export default DetectionManager
