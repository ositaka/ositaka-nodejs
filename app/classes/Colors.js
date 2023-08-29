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

    document.documentElement.style.setProperty('--set-color-text', color);
    document.documentElement.style.setProperty('--set-color-background', backgroundColor);

  }
}

export const ColorsManager = new Colors()
