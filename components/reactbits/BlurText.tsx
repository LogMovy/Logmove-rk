'use client'

import React from 'react'
import { motion } from 'motion/react'

interface BlurTextProps {
  text: string
  className?: string
  highlightFromIndex?: number
  highlightClassName?: string
  delayStep?: number
}

export default function BlurText({
  text,
  className = '',
  highlightFromIndex,
  highlightClassName = '',
  delayStep = 0.07,
}: BlurTextProps) {
  const words = text.split(' ')

  return (
    <span className={`rb-blur-text ${className}`}>
      {words.map((word, idx) => {
        const isHighlighted = highlightFromIndex !== undefined && idx >= highlightFromIndex
        return (
          <motion.span
            key={`${word}-${idx}`}
            initial={{ filter: 'blur(10px)', opacity: 0, y: 12 }}
            whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              duration: 0.52,
              delay: idx * delayStep,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={`rb-blur-word ${isHighlighted ? highlightClassName : ''}`}
            style={{ display: 'inline-block', marginRight: '0.26em' }}
          >
            {word}
          </motion.span>
        )
      })}
    </span>
  )
}

