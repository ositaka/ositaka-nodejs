import GSAP from 'gsap'

class Colors {
  change({
    backgroundColor,
    color
  }) {
    GSAP.to(document.getElementById('content'), {
      background: backgroundColor,
      color: color,
      duration: 1.5
    })
  }
}

export const ColorsManager = new Colors()
