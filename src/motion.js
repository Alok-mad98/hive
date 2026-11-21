import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

export function connectScrolling() {
  const preference = matchMedia('(prefers-reduced-motion: reduce)')
  let lenis
  const attach = () => {
    lenis?.destroy()
    lenis = preference.matches ? undefined : new Lenis({
      autoRaf: true,
      lerp: .088,
      smoothWheel: true,
      syncTouch: false,
      anchors: { offset: -16 },
      stopInertiaOnNavigate: true,
      virtualScroll: ({ deltaY }) => {
        const root = document.scrollingElement
        const atFooter = root && root.scrollTop + root.clientHeight >= root.scrollHeight - 2
        // Let Stretchy Footer receive outward gestures without starting another eased scroll.
        return !(deltaY > 0 && atFooter)
      },
    })
  }
  attach()
  preference.addEventListener('change', attach)
  return () => {
    preference.removeEventListener('change', attach)
    lenis?.destroy()
  }
}

export function connectStory(story) {
  const preference = matchMedia('(prefers-reduced-motion: reduce)')
  const root = document.documentElement
  const chapters = [...story.querySelectorAll('.chapter')]
  let frame = 0
  function paint() {
    frame = 0
    const height = window.innerHeight
    const extent = story.getBoundingClientRect()
    const progress = Math.max(0, Math.min(1, -extent.top / Math.max(extent.height - height, 1)))
    const motion = preference.matches ? 0 : progress
    root.style.setProperty('--story-progress', motion.toFixed(4))
    root.style.setProperty('--glyph-shift', `${motion * -14}vh`)
    root.style.setProperty('--glyph-angle', `${motion * -13 - 7}deg`)

    for (const chapter of chapters) {
      const { top, height: chapterHeight } = chapter.getBoundingClientRect()
      const lead = Math.max(-1, Math.min(1, (height * .5 - top - chapterHeight * .5) / height))
      chapter.style.setProperty('--chapter-drift', preference.matches ? '0px' : `${lead * -42}px`)
    }
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
    root.style.removeProperty('--story-progress')
    root.style.removeProperty('--glyph-shift')
    root.style.removeProperty('--glyph-angle')
  }
}
