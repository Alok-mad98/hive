import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

export function connectScrolling() {
  const preference = matchMedia('(prefers-reduced-motion: reduce)')
  let lenis
  const attach = () => {
    lenis?.destroy()
    lenis = preference.matches ? undefined : new Lenis({
      autoRaf: true,
      lerp: .115,
      smoothWheel: true,
      syncTouch: false,
      anchors: { offset: -16 },
    })
  }
  attach()
  preference.addEventListener('change', attach)
  return () => {
    preference.removeEventListener('change', attach)
    lenis?.destroy()
  }
}

export function scrollArtwork(stage) {
  const preference = matchMedia('(prefers-reduced-motion: reduce)')
  let frame = 0
  function paint() {
    frame = 0
    const progress = preference.matches ? 0 : Math.max(0, Math.min(1, -stage.getBoundingClientRect().top / Math.max(stage.offsetHeight, 1)))
    stage.style.setProperty('--lift', (progress * 62).toFixed(2) + 'px')
    stage.style.setProperty('--drift', (progress * -28).toFixed(2) + 'px')
  }
  function schedule() {
    if (!frame) frame = requestAnimationFrame(paint)
  }
  paint()
  window.addEventListener('scroll', schedule, { passive: true })
  window.addEventListener('resize', schedule)
  preference.addEventListener('change', schedule)
  return () => {
    cancelAnimationFrame(frame)
    window.removeEventListener('scroll', schedule)
    window.removeEventListener('resize', schedule)
    preference.removeEventListener('change', schedule)
  }
}
