'use client'

import React, { useRef, useEffect } from 'react'

interface Node {
  x: number
  y: number
  baseX: number
  baseY: number
  radius: number
  color: string
  pulsePhase: number
}

interface Connection {
  from: number
  to: number
  progress: number
  speed: number
  packetColor: string
}

export default function NetworkMotion({ className = '' }: { className?: string }) {
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

    // Network Waypoint Hubs (representing logistics points)
    const nodes: Node[] = [
      { x: 0.1, y: 0.2, baseX: 0.1, baseY: 0.2, radius: 4, color: '#8ce51b', pulsePhase: 0 },
      { x: 0.28, y: 0.15, baseX: 0.28, baseY: 0.15, radius: 3, color: '#09233f', pulsePhase: 1 },
      { x: 0.2, y: 0.45, baseX: 0.2, baseY: 0.45, radius: 4.5, color: '#8ce51b', pulsePhase: 2.5 },
      { x: 0.42, y: 0.35, baseX: 0.42, baseY: 0.35, radius: 3.5, color: '#38bdf8', pulsePhase: 1.8 },
      { x: 0.55, y: 0.18, baseX: 0.55, baseY: 0.18, radius: 4, color: '#09233f', pulsePhase: 3.2 },
      { x: 0.65, y: 0.48, baseX: 0.65, baseY: 0.48, radius: 4, color: '#8ce51b', pulsePhase: 0.5 },
      { x: 0.8, y: 0.28, baseX: 0.8, baseY: 0.28, radius: 3.5, color: '#38bdf8', pulsePhase: 2.1 },
      { x: 0.88, y: 0.55, baseX: 0.88, baseY: 0.55, radius: 4.5, color: '#8ce51b', pulsePhase: 4 },
      { x: 0.75, y: 0.78, baseX: 0.75, baseY: 0.78, radius: 3.5, color: '#09233f', pulsePhase: 1.2 },
      { x: 0.5, y: 0.82, baseX: 0.5, baseY: 0.82, radius: 4, color: '#8ce51b', pulsePhase: 2.8 },
      { x: 0.3, y: 0.75, baseX: 0.3, baseY: 0.75, radius: 3, color: '#38bdf8', pulsePhase: 0.9 },
      { x: 0.12, y: 0.85, baseX: 0.12, baseY: 0.85, radius: 4, color: '#8ce51b', pulsePhase: 3.5 },
    ]

    // Active courier routes between hubs
    const connections: Connection[] = [
      { from: 0, to: 1, progress: 0.1, speed: 0.005, packetColor: '#8ce51b' },
      { from: 1, to: 3, progress: 0.4, speed: 0.006, packetColor: '#38bdf8' },
      { from: 0, to: 2, progress: 0.7, speed: 0.004, packetColor: '#8ce51b' },
      { from: 2, to: 3, progress: 0.2, speed: 0.007, packetColor: '#8ce51b' },
      { from: 3, to: 4, progress: 0.8, speed: 0.005, packetColor: '#09233f' },
      { from: 3, to: 5, progress: 0.3, speed: 0.006, packetColor: '#8ce51b' },
      { from: 4, to: 6, progress: 0.5, speed: 0.004, packetColor: '#38bdf8' },
      { from: 6, to: 7, progress: 0.15, speed: 0.007, packetColor: '#8ce51b' },
      { from: 5, to: 7, progress: 0.6, speed: 0.005, packetColor: '#8ce51b' },
      { from: 7, to: 8, progress: 0.85, speed: 0.006, packetColor: '#38bdf8' },
      { from: 8, to: 9, progress: 0.35, speed: 0.005, packetColor: '#8ce51b' },
      { from: 9, to: 10, progress: 0.65, speed: 0.006, packetColor: '#8ce51b' },
      { from: 10, to: 11, progress: 0.25, speed: 0.007, packetColor: '#38bdf8' },
      { from: 2, to: 10, progress: 0.5, speed: 0.004, packetColor: '#8ce51b' },
      { from: 5, to: 9, progress: 0.9, speed: 0.005, packetColor: '#8ce51b' },
    ]

    let time = 0

    const render = () => {
      const width = canvas.width / dpr
      const height = canvas.height / dpr

      ctx.clearRect(0, 0, width, height)
      time += 0.02

      // 1. Draw connection links
      connections.forEach((conn) => {
        const n1 = nodes[conn.from]
        const n2 = nodes[conn.to]
        if (!n1 || !n2) return

        const x1 = n1.x * width
        const y1 = n1.y * height
        const x2 = n2.x * width
        const y2 = n2.y * height

        // Faint route line
        ctx.beginPath()
        ctx.strokeStyle = 'rgba(6, 40, 75, 0.06)'
        ctx.lineWidth = 1
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()

        // Moving courier pulse packet
        conn.progress += conn.speed
        if (conn.progress > 1) conn.progress = 0

        const curX = x1 + (x2 - x1) * conn.progress
        const curY = y1 + (y2 - y1) * conn.progress

        // Packet glow aura
        ctx.beginPath()
        ctx.arc(curX, curY, 3, 0, Math.PI * 2)
        ctx.fillStyle = conn.packetColor === '#8ce51b' ? 'rgba(140, 229, 27, 0.8)' : 'rgba(56, 189, 248, 0.7)'
        ctx.shadowColor = conn.packetColor
        ctx.shadowBlur = 8
        ctx.fill()
        ctx.shadowBlur = 0

        // Subtle packet trailing speed dash
        const tailX = curX - (x2 - x1) * 0.05
        const tailY = curY - (y2 - y1) * 0.05
        ctx.beginPath()
        ctx.moveTo(tailX, tailY)
        ctx.lineTo(curX, curY)
        ctx.strokeStyle = conn.packetColor === '#8ce51b' ? 'rgba(140, 229, 27, 0.5)' : 'rgba(56, 189, 248, 0.4)'
        ctx.lineWidth = 1.5
        ctx.stroke()
      })

      // 2. Draw Hub Nodes
      nodes.forEach((node) => {
        const nx = node.x * width
        const ny = node.y * height
        const pulse = Math.sin(time + node.pulsePhase)

        // Outer pulse radar ring
        if (node.color === '#8ce51b') {
          const ringRadius = node.radius + 6 + pulse * 4
          ctx.beginPath()
          ctx.arc(nx, ny, Math.max(0, ringRadius), 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(140, 229, 27, ${0.15 + pulse * 0.1})`
          ctx.lineWidth = 1
          ctx.stroke()
        }

        // Inner solid node core
        ctx.beginPath()
        ctx.arc(nx, ny, node.radius, 0, Math.PI * 2)
        ctx.fillStyle = node.color
        if (node.color === '#8ce51b') {
          ctx.shadowColor = 'rgba(140, 229, 27, 0.4)'
          ctx.shadowBlur = 6
        }
        ctx.fill()
        ctx.shadowBlur = 0

        // White center dot for hubs
        ctx.beginPath()
        ctx.arc(nx, ny, 1.2, 0, Math.PI * 2)
        ctx.fillStyle = '#ffffff'
        ctx.fill()
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
      className={`network-motion-canvas ${className}`}
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
