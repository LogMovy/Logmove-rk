'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useInView } from 'motion/react'

interface CountUpProps {
  to: number
  from?: number
  duration?: number
  suffix?: string
  prefix?: string
  className?: string
}

export default function CountUp({
  to,
  from = 0,
  duration = 1400,
  suffix = '',
  prefix = '',
  className = '',
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const isInView = useInView(ref, { once: true, amount: 0.4 })
  const [val, setVal] = useState(from)

  useEffect(() => {
    if (!isInView) return
    let startTime: number | null = null
    let frameId: number

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setVal(Math.round(from + (to - from) * eased))
      if (progress < 1) {
        frameId = requestAnimationFrame(step)
      }
    }

    frameId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frameId)
  }, [isInView, from, to, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {val}
      {suffix}
    </span>
  )
}

