'use client'

import React, { useRef, useEffect } from 'react'

export interface SquaresProps {
  direction?: 'diagonal' | 'up' | 'down' | 'left' | 'right'
  speed?: number
  borderColor?: string
  squareSize?: number
  hoverFillColor?: string
  className?: string
}

export default function Squares({
  direction = 'diagonal',
  speed = 0.5,
  borderColor = 'rgba(255, 255, 255, 0.1)',
  squareSize = 48,
  hoverFillColor = 'rgba(140, 229, 27, 0.22)',
  className = '',
}: SquaresProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const gridOffset = useRef({ x: 0, y: 0 })
  const mousePosition = useRef<{ x: number; y: number } | null>(null)
  const hoveredSquares = useRef<Map<string, { col: number; row: number; opacity: number }>>(new Map())

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number

    const updateCanvasSize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      const rect = parent.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
    }

    updateCanvasSize()

    const resizeObserver = new ResizeObserver(() => {
      updateCanvasSize()
    })

    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement)
    }

    const parent = canvas.parentElement || canvas

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mousePosition.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }

    const handleMouseLeave = () => {
      mousePosition.current = null
    }

    parent.addEventListener('mousemove', handleMouseMove)
    parent.addEventListener('mouseleave', handleMouseLeave)

    const draw = () => {
      const dpr = window.devicePixelRatio || 1
      const width = canvas.width / dpr
      const height = canvas.height / dpr

      ctx.clearRect(0, 0, width, height)

      // Calculate directional motion
      switch (direction) {
        case 'right':
          gridOffset.current.x = (gridOffset.current.x - speed + squareSize) % squareSize
          break
        case 'left':
          gridOffset.current.x = (gridOffset.current.x + speed) % squareSize
          break
        case 'up':
          gridOffset.current.y = (gridOffset.current.y + speed) % squareSize
          break
        case 'down':
          gridOffset.current.y = (gridOffset.current.y - speed + squareSize) % squareSize
          break
        case 'diagonal':
          gridOffset.current.x = (gridOffset.current.x - speed + squareSize) % squareSize
          gridOffset.current.y = (gridOffset.current.y - speed + squareSize) % squareSize
          break
      }

      const startX = Math.floor(gridOffset.current.x) - squareSize
      const startY = Math.floor(gridOffset.current.y) - squareSize

      // Register hovered cell
      if (mousePosition.current) {
        const mx = mousePosition.current.x
        const my = mousePosition.current.y

        if (mx >= 0 && mx <= width && my >= 0 && my <= height) {
          const col = Math.floor((mx - startX) / squareSize)
          const row = Math.floor((my - startY) / squareSize)
          const key = `${col},${row}`

          hoveredSquares.current.set(key, {
            col,
            row,
            opacity: 1,
          })
        }
      }

      // Draw hovered / trailing squares with smooth fade
      hoveredSquares.current.forEach((sq, key) => {
        const currentX = startX + sq.col * squareSize
        const currentY = startY + sq.row * squareSize

        // Fill square with fade
        ctx.fillStyle = `rgba(140, 229, 27, ${sq.opacity * 0.28})`
        ctx.fillRect(currentX, currentY, squareSize, squareSize)

        // Accent border for hovered square
        ctx.strokeStyle = `rgba(140, 229, 27, ${sq.opacity * 0.85})`
        ctx.lineWidth = 1.2
        ctx.strokeRect(currentX, currentY, squareSize, squareSize)

        // Fade out
        sq.opacity -= 0.025
        if (sq.opacity <= 0) {
          hoveredSquares.current.delete(key)
        }
      })

      // Draw regular grid lines
      ctx.lineWidth = 0.6
      ctx.strokeStyle = borderColor

      for (let x = startX; x < width + squareSize; x += squareSize) {
        for (let y = startY; y < height + squareSize; y += squareSize) {
          ctx.strokeRect(Math.round(x), Math.round(y), squareSize, squareSize)
        }
      }

      animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationFrameId)
      resizeObserver.disconnect()
      parent.removeEventListener('mousemove', handleMouseMove)
      parent.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [direction, speed, borderColor, squareSize, hoverFillColor])

  return (
    <canvas
      ref={canvasRef}
      className={`squares-canvas ${className}`}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%)',
      }}
    />
  )
}
