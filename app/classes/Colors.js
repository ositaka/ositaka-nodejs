import GSAP from 'gsap'

class Colors {
  change({
    backgroundColor,
    color
  }) {
    GSAP.to(document.getElementById('content'), {
      background: backgroundColor,
      color: color,
      duration: 0.5
    })

    document.documentElement.style.setProperty('--set-color-text',
      color === "#000000"
        ? color = "#FFFFFF"
        : color
    )

    document.documentElement.style.setProperty('--set-color-background',
      backgroundColor === "#FFFFFF"
        ? backgroundColor = "#000000"
        : backgroundColor
    )
  }
}

export const ColorsManager = new Colors()
