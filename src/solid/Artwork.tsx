import { onSettled } from 'solid-js'

type Engine = { destroy(): void }
type Setup = () => Promise<(() => Engine | null)>

// Lazy-load canvas effects only when visible and motion is enabled.
function attachArt(node: HTMLElement, setup: Setup) {
  const preference = matchMedia('(prefers-reduced-motion: reduce)')
  let visible = false
  let generation = 0
  let active: Engine | null = null
  function update() {
    const ticket = ++generation
    if (!visible || preference.matches) {
      active?.destroy()
      active = null
      node.removeAttribute('data-ready')
      return
    }
    if (active) return
    void setup().then(start => {
      if (ticket !== generation) return
      active = start()
      if (active) node.setAttribute('data-ready', '')
    }).catch(() => {
      // The static art underneath remains visible when graphics are unavailable.
    })
  }
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting
    update()
  }, { rootMargin: '80px' })
  observer.observe(node)
  preference.addEventListener('change', update)
  return () => {
    generation++
    observer.disconnect()
    preference.removeEventListener('change', update)
    active?.destroy()
  }
}

const stillGlyphs = " .:+=*#%"
const asciiStill = Array.from({ length: 12 }, (_, y) =>
  Array.from({ length: 74 }, (_, x) => {
    const angle = x * .12 + y * .40
    const ridge = Math.sin(angle) * 2.25 + 5.5
    const distance = Math.abs(y - ridge)
    const strength = Math.max(0, 1 - distance / 4) * (.45 + .55 * Math.abs(Math.cos(x * .077)))
    return stillGlyphs[Math.round(strength * (stillGlyphs.length - 1))]
  }).join("")
).join("\n")

export function Specimen() {
  let field!: HTMLCanvasElement
  onSettled(() => attachArt(field, async () => {
    const { createAsciiFluid } = await import('../engines/ascii-fluid')
    return () => createAsciiFluid(field, {
      charset: " .·:;+x#@", theme: "dark", color: "#ffd471", backgroundColor: "#000000",
      cellSize: 9, brush: .85, force: 1.35, dissipation: .033, ambientInk: .54
    })
  }))
  return (
    <figure class="specimen" aria-label="Honeybee sculpture in amber and smoked glass">
      <div class="specimen-frame" aria-hidden="true">
        <div class="registration" />
        <img class="amber-bee" src="/hive-amber.webp" alt="" width="1120" height="1120" fetchpriority="high" />
        <i class="cross top-left" /><i class="cross top-right" /><i class="cross bottom-left" /><i class="cross bottom-right" />
      </div>
      <div class="ascii-stage" aria-hidden="true">
        <pre>{asciiStill}</pre>
        <canvas ref={field} class="ascii-field" data-slot="ascii-fluid" />
      </div>
      <figcaption><span>ASCII FLUID · MOVE TO STIR</span><span>Apis mellifera</span></figcaption>
    </figure>
  )
}

export function RingStudy() {
  let light!: HTMLCanvasElement
  let rays!: HTMLCanvasElement
  let rings!: HTMLDivElement
  onSettled(() => {
    const cleanup = [
      attachArt(light, async () => {
        const { createShaderGradient } = await import('../engines/shader-gradient')
        return () => createShaderGradient(light, { theme: 'dark', colors: ['#1a1b17','#201c15','#503919','#27261c'], grain: .4, intensity: .68, speed: .085, interactive: false })
      }),
      attachArt(rays, async () => {
        const { createRadiantLines } = await import('../engines/radiant-lines')
        return () => createRadiantLines(rays, { theme: 'dark', colors: ['#e0a846','#b07d47','#857253'], starCount: 175, displacement: .52 })
      }),
      attachArt(rings, async () => {
        const { createRingTower } = await import('../engines/ring-tower')
        return () => createRingTower(rings, { images: ['/band.svg'], rings: [
          { rotation: -28, tilt: 13, speed: .40 }, { rotation: 67, tilt: 17, speed: -.55 }, { rotation: 122, tilt: 14, speed: .65 }
        ], theme: 'dark', parallax: 9, backface: .68, draggable: false })
      })
    ]
    return () => cleanup.forEach(dispose => dispose())
  })
  return (
    <div class="ring-study" aria-hidden="true">
      <canvas class="shader-field" ref={light} data-slot="shader-gradient" />
      <canvas class="rays-field" ref={rays} data-slot="radiant-lines" />
      <div class="ring-object" ref={rings} data-slot="ring-tower" />
      <div class="ring-still"><i /><i /><i /></div>
    </div>
  )
}
