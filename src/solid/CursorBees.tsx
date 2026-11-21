import { onSettled } from 'solid-js'

type Point = { x: number; y: number }
type Flight = { origin: Point; start: number; duration: number; angle: number; side: number; reach: number }

function flightPoint(bee: Flight, pointer: Point, time: number): Point {
  const returnToPointer = time * time * (3 - 2 * time)
  const distance = Math.sin(Math.PI * time) * bee.reach
  const turn = bee.angle + bee.side * time * 4.6
  return {
    x: bee.origin.x + (pointer.x - bee.origin.x) * returnToPointer + Math.cos(turn) * distance,
    y: bee.origin.y + (pointer.y - bee.origin.y) * returnToPointer + Math.sin(turn) * distance,
  }
}

function drawBee(context: CanvasRenderingContext2D, bee: Flight, pointer: Point, now: number, time: number) {
  const position = flightPoint(bee, pointer, time)
  const tailStart = Math.max(0, time - .26)
  const fade = Math.min(1, time * 19, (1 - time) * 6)
  const heading = flightPoint(bee, pointer, Math.max(0, time - .018))
  const wingSpan = 2.8 + Math.abs(Math.sin(now * .052 + bee.angle)) * 2.5

  context.strokeStyle = '#ffc43d'
  context.lineWidth = 1.35
  context.lineCap = 'round'
  let last = flightPoint(bee, pointer, tailStart)
  for (let index = 1; index <= 10; index++) {
    const next = flightPoint(bee, pointer, tailStart + (time - tailStart) * index / 10)
    context.globalAlpha = fade * .69 * (index / 10) ** 1.7
    context.beginPath()
    context.moveTo(last.x, last.y)
    context.lineTo(next.x, next.y)
    context.stroke()
    last = next
  }

  context.save()
  context.translate(position.x, position.y)
  context.rotate(Math.atan2(position.y - heading.y, position.x - heading.x))
  context.globalAlpha = fade * .78
  context.fillStyle = '#ffe585'
  context.beginPath()
  context.ellipse(-1.3, -wingSpan * .72, 4.6, 2.4, .72, 0, Math.PI * 2)
  context.ellipse(-1.3, wingSpan * .72, 4.6, 2.4, -.72, 0, Math.PI * 2)
  context.fill()
  context.globalAlpha = fade
  context.fillStyle = '#ffcf38'
  context.beginPath()
  context.ellipse(-1.2, 0, 5.8, 3.4, 0, 0, Math.PI * 2)
  context.arc(4.4, 0, 2.5, 0, Math.PI * 2)
  context.fill()
  context.strokeStyle = '#c58211'
  context.lineWidth = 1.1
  context.beginPath()
  context.moveTo(-3, -2.2)
  context.quadraticCurveTo(-1.6, 0, -3, 2.2)
  context.moveTo(.2, -2.5)
  context.quadraticCurveTo(1.5, 0, .2, 2.5)
  context.stroke()
  context.strokeStyle = '#ffde59'
  context.beginPath()
  context.moveTo(5.3, -1.4)
  context.lineTo(7.3, -3.2)
  context.moveTo(5.3, 1.4)
  context.lineTo(7.3, 3.2)
  context.stroke()
  context.restore()
}

function followPointer(canvas: HTMLCanvasElement) {
  const drawingContext = canvas.getContext('2d')
  if (!drawingContext) return
  const context = drawingContext
  const motion = matchMedia('(prefers-reduced-motion: reduce)')
  let pointer: Point = { x: 0, y: 0 }
  let lastLaunch: Point | null = null
  let lastTime = -Infinity
  let side = 1
  let width = 0
  let height = 0
  let frame = 0
  const flights: Flight[] = []

  function draw(now: number) {
    frame = 0
    context.clearRect(0, 0, width, height)
    for (let index = flights.length - 1; index >= 0; index--) {
      const bee = flights[index]
      const time = (now - bee.start) / bee.duration
      if (time >= 1) flights.splice(index, 1)
      else drawBee(context, bee, pointer, now, Math.max(0, time))
    }
    if (flights.length) frame = requestAnimationFrame(draw)
  }

  function resize() {
    width = window.innerWidth
    height = window.innerHeight
    const scale = Math.min(devicePixelRatio || 1, 2)
    canvas.width = Math.round(width * scale)
    canvas.height = Math.round(height * scale)
    context.setTransform(scale, 0, 0, scale, 0, 0)
  }

  function move(event: PointerEvent) {
    if (motion.matches || (event.pointerType !== 'mouse' && event.pointerType !== 'pen')) return
    const previous = pointer
    pointer = { x: event.clientX, y: event.clientY }
    const now = performance.now()
    if (now - lastTime < 85 || (lastLaunch && Math.hypot(pointer.x - lastLaunch.x, pointer.y - lastLaunch.y) < 17)) return
    lastTime = now
    const angle = lastLaunch ? Math.atan2(pointer.y - previous.y, pointer.x - previous.x) : -Math.PI / 2
    lastLaunch = pointer
    side *= -1
    if (flights.length >= 12) flights.shift()
    flights.push({ origin: pointer, start: now, duration: 850 + Math.random() * 260, angle: angle + side * 1.25, side, reach: 42 + Math.random() * 34 })
    if (!frame) frame = requestAnimationFrame(draw)
  }

  function clear() {
    cancelAnimationFrame(frame)
    frame = 0
    flights.length = 0
    lastLaunch = null
    lastTime = -Infinity
    context.clearRect(0, 0, width, height)
  }

  resize()
  window.addEventListener('resize', resize)
  window.addEventListener('pointermove', move, { passive: true })
  motion.addEventListener('change', clear)
  return () => {
    clear()
    window.removeEventListener('resize', resize)
    window.removeEventListener('pointermove', move)
    motion.removeEventListener('change', clear)
  }
}

export default function CursorBees() {
  let canvas!: HTMLCanvasElement
  onSettled(() => followPointer(canvas))
  return <canvas ref={canvas} class="cursor-bees" aria-hidden="true" />
}
