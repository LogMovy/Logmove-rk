'use client'

import React, { useRef, useEffect } from 'react'

interface SpeedBeam {
  x: number
  y: number
  length: number
  speed: number
  width: number
  opacity: number
  color: string
}

interface DeliveryNode {
  x: number
  y: number
  targetX: number
  targetY: number
  progress: number
  speed: number
}

export default function DeliveryMotion({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      const rect = parent.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
    }

    resize()
    const resizeObserver = new ResizeObserver(() => resize())
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement)
    }

    // Initialize speed beams (motocycle headlights & neon speed trails)
    const beamsCount = 28
    const beams: SpeedBeam[] = []
    const limeColors = [
      'rgba(140, 229, 27, 0.85)',
      'rgba(140, 229, 27, 0.65)',
      'rgba(140, 229, 27, 0.45)',
      'rgba(255, 255, 255, 0.75)',
      'rgba(180, 245, 80, 0.6)',
    ]

    const initBeams = () => {
      const width = canvas.width / dpr
      const height = canvas.height / dpr
      beams.length = 0
      for (let i = 0; i < beamsCount; i++) {
        beams.push({
          x: Math.random() * width,
          y: Math.random() * height,
          length: Math.random() * 140 + 60,
          speed: Math.random() * 3.5 + 2.5,
          width: Math.random() * 2 + 1,
          opacity: Math.random() * 0.6 + 0.3,
          color: limeColors[Math.floor(Math.random() * limeColors.length)],
        })
      }
    }
    initBeams()

    // Delivery route courier packets (simulating orders moving along urban routes)
    const routePackets: DeliveryNode[] = [
      { x: 0.1, y: 0.3, targetX: 0.45, targetY: 0.5, progress: 0, speed: 0.006 },
      { x: 0.2, y: 0.75, targetX: 0.55, targetY: 0.35, progress: 0.3, speed: 0.007 },
      { x: 0.6, y: 0.25, targetX: 0.9, targetY: 0.65, progress: 0.6, speed: 0.005 },
      { x: 0.35, y: 0.85, targetX: 0.8, targetY: 0.4, progress: 0.1, speed: 0.008 },
    ]

    // Render loop
    const render = () => {
      const width = canvas.width / dpr
      const height = canvas.height / dpr

      ctx.clearRect(0, 0, width, height)

      // 1. Draw Delivery Routes & Moving Packets (Rotas expressas de entrega)
      routePackets.forEach((packet) => {
        const startX = packet.x * width
        const startY = packet.y * height
        const endX = packet.targetX * width
        const endY = packet.targetY * height

        // Draw faint dotted path line
        ctx.beginPath()
        ctx.setLineDash([4, 8])
        ctx.strokeStyle = 'rgba(140, 229, 27, 0.12)'
        ctx.lineWidth = 1
        ctx.moveTo(startX, startY)
        ctx.lineTo(endX, endY)
        ctx.stroke()
        ctx.setLineDash([])

        // Waypoint points
        ctx.fillStyle = 'rgba(140, 229, 27, 0.35)'
        ctx.beginPath()
        ctx.arc(startX, startY, 2.5, 0, Math.PI * 2)
        ctx.arc(endX, endY, 2.5, 0, Math.PI * 2)
        ctx.fill()

        // Traveling courier light pulse
        packet.progress += packet.speed
        if (packet.progress > 1) packet.progress = 0

        const curX = startX + (endX - startX) * packet.progress
        const curY = startY + (endY - startY) * packet.progress

        // Glowing pulse head
        ctx.shadowColor = '#8ce51b'
        ctx.shadowBlur = 10
        ctx.fillStyle = '#8ce51b'
        ctx.beginPath()
        ctx.arc(curX, curY, 3, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0

        // Small pulse tail
        const tailX = curX - (endX - startX) * 0.04
        const tailY = curY - (endY - startY) * 0.04
        ctx.strokeStyle = 'rgba(140, 229, 27, 0.6)'
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(tailX, tailY)
        ctx.lineTo(curX, curY)
        ctx.stroke()
      })

      // 2. Draw Fast Speed Beams (Feixes de luz de velocidade / farol de moto na pista)
      beams.forEach((beam) => {
        beam.x += beam.speed
        if (beam.x - beam.length > width) {
          beam.x = -beam.length
          beam.y = Math.random() * height
          beam.speed = Math.random() * 3.5 + 2.5
        }

        const gradient = ctx.createLinearGradient(
          beam.x - beam.length,
          beam.y,
          beam.x,
          beam.y
        )
        gradient.addColorStop(0, 'rgba(140, 229, 27, 0)')
        gradient.addColorStop(0.7, beam.color.replace(/[\d.]+\)$/, `${beam.opacity * 0.6})`))
        gradient.addColorStop(1, beam.color.replace(/[\d.]+\)$/, `${beam.opacity})`))

        ctx.strokeStyle = gradient
        ctx.lineWidth = beam.width
        ctx.lineCap = 'round'

        ctx.beginPath()
        ctx.moveTo(beam.x - beam.length, beam.y)
        ctx.lineTo(beam.x, beam.y)
        ctx.stroke()

        // Glowing head of the beam
        if (beam.width > 1.5) {
          ctx.fillStyle = '#ffffff'
          ctx.beginPath()
          ctx.arc(beam.x, beam.y, beam.width * 0.9, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      animationId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationId)
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`delivery-motion-canvas ${className}`}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}
