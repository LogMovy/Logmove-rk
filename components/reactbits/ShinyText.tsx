'use client'

import React from 'react'

interface ShinyTextProps {
  text: string
  disabled?: boolean
  speed?: number
  className?: string
}

export default function ShinyText({
  text,
  disabled = false,
  speed = 3.5,
  className = '',
}: ShinyTextProps) {
  return (
    <span
      className={`rb-shiny-text ${disabled ? 'is-disabled' : ''} ${className}`}
      style={{ animationDuration: `${speed}s` }}
    >
      {text}
    </span>
  )
}

