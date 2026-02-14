'use client'

import { useEffect, useRef } from 'react'

type Wave = {
  yRatio: number
  amplitude: number
  frequency: number
  speed: number
  phase: number
  width: number
  alpha: number
}

const WAVES: Wave[] = [
  { yRatio: 0.24, amplitude: 26, frequency: 0.01, speed: 0.42, phase: 0.0, width: 1.8, alpha: 0.26 },
  { yRatio: 0.38, amplitude: 22, frequency: 0.012, speed: 0.35, phase: 1.4, width: 1.5, alpha: 0.2 },
  { yRatio: 0.56, amplitude: 30, frequency: 0.009, speed: 0.28, phase: 2.2, width: 1.7, alpha: 0.18 },
  { yRatio: 0.74, amplitude: 24, frequency: 0.011, speed: 0.22, phase: 3.6, width: 1.4, alpha: 0.16 }
]

export function BackgroundWaveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let raf = 0
    let time = 0
    let width = 0
    let height = 0

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    const prefersReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const drawWave = (wave: Wave) => {
      const baseY = height * wave.yRatio
      ctx.beginPath()
      ctx.lineWidth = wave.width
      ctx.strokeStyle = `rgba(201, 151, 86, ${wave.alpha})`

      for (let x = -20; x <= width + 20; x += 8) {
        const y =
          baseY +
          Math.sin(x * wave.frequency + time * wave.speed + wave.phase) * wave.amplitude +
          Math.sin(x * wave.frequency * 0.45 - time * wave.speed * 0.62 + wave.phase * 1.7) * (wave.amplitude * 0.32)

        if (x <= -20) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }

      ctx.stroke()
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      for (const wave of WAVES) {
        drawWave(wave)
      }

      if (!prefersReduceMotion) {
        time += 0.016
      }

      raf = window.requestAnimationFrame(render)
    }

    resize()
    render()
    window.addEventListener('resize', resize)

    const onVisibilityChange = () => {
      if (document.hidden) {
        window.cancelAnimationFrame(raf)
      } else {
        render()
      }
    }
    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      window.cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [])

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-0" aria-hidden="true" />
}
