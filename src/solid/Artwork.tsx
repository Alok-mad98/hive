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

const glyphs = ' .:;=+*#@'
const stillCurrent = Array.from({ length: 84 }, (_, row) =>
  Array.from({ length: 182 }, (_, column) => {
    const x = (column - 105) / 75
    const y = (row - 42) / 34
    const flow = y + Math.sin(x * 2.3 + y * .4) * .52
    const filament = Math.sin(flow * 12 + Math.cos(x * 4) * 2.4 + x * 1.5)
    const envelope = Math.exp(-Math.abs(flow) * 1.7 - Math.abs(x) * .55)
    const grain = .7 + .3 * Math.sin(row * 81.1 + column * 37.9)
    const density = Math.max(0, filament) ** 2 * envelope * grain
    return glyphs[Math.round(density * (glyphs.length - 1))]
  }).join("")
).join("\n")

export function StoryField() {
  let field!: HTMLCanvasElement
  onSettled(() => attachArt(field, async () => {
    const { createAsciiFluid } = await import('../engines/ascii-fluid')
    return () => createAsciiFluid(field, {
      charset: ' .:;+x#@', theme: 'dark', color: '#dca457', backgroundColor: '#000000',
      cellSize: 12, brush: .78, force: 1.13, dissipation: .043, ambientInk: .33
    })
  }))
  return (
    <div class="story-field" aria-hidden="true">
      <pre class="story-glyphs">{stillCurrent}</pre>
      <canvas ref={field} class="ascii-field" data-slot="ascii-fluid" />
      <div class="story-wash" />
    </div>
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
