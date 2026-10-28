'use client'

import React, { useState, useRef, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Check, ChevronDown, Search, Sparkles, X } from 'lucide-react'

export interface SelectOption {
  value: string
  label: string
  code?: string
  short?: string
  badge?: string
  color?: string
}

interface PremiumSelectProps {
  label: string
  value: string
  onChange: (value: string) => void
  options: SelectOption[]
  placeholder?: string
  searchPlaceholder?: string
  required?: boolean
  icon?: React.ReactNode
  badge?: string
  fullWidth?: boolean
  allowCustom?: boolean
}

export default function PremiumSelect({
  label,
  value,
  onChange,
  options,
  placeholder = 'Selecione uma opção...',
  searchPlaceholder = 'Buscar pelo nome ou código...',
  required = true,
  icon,
  badge,
  fullWidth = false,
  allowCustom = true,
}: PremiumSelectProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [highlightIdx, setHighlightIdx] = useState(0)

  const rootRef = useRef<HTMLDivElement | null>(null)
  const searchInputRef = useRef<HTMLInputElement | null>(null)
  const listRef = useRef<HTMLDivElement | null>(null)

  const selectedOption = useMemo(
    () => options.find((o) => o.value === value || o.label === value),
    [options, value]
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return options
    return options.filter(
      (opt) =>
        opt.label.toLowerCase().includes(q) ||
        opt.value.toLowerCase().includes(q) ||
        (opt.code && opt.code.toLowerCase().includes(q)) ||
        (opt.short && opt.short.toLowerCase().includes(q))
    )
  }, [options, query])

  // Close when clicking outside
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleOutside)
    }
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [open])

  // Focus search input when opening
  useEffect(() => {
    if (open) {
      setQuery('')
      setHighlightIdx(0)
      requestAnimationFrame(() => {
        searchInputRef.current?.focus()
      })
    }
  }, [open])

  const handleSelect = (val: string) => {
    onChange(val)
    setOpen(false)
    setQuery('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault()
        setOpen(true)
      }
      return
    }

    if (e.key === 'Escape') {
      e.preventDefault()
      setOpen(false)
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlightIdx((prev) => Math.min(prev + 1, Math.max(0, filtered.length - 1)))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlightIdx((prev) => Math.max(prev - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (filtered[highlightIdx]) {
        handleSelect(filtered[highlightIdx].value)
      } else if (allowCustom && query.trim()) {
        handleSelect(query.trim())
      }
    }
  }

  const isFilled = value.trim().length > 0

  return (
    <div
      ref={rootRef}
      className={`reg-premium-field reg-custom-select-wrap ${open ? 'is-focused is-open' : ''} ${
        isFilled ? 'is-filled' : ''
      } ${fullWidth ? 'col-span-full' : ''}`}
      onKeyDown={handleKeyDown}
    >
      <div className="reg-field-top">
        <label className="reg-field-label" onClick={() => setOpen((v) => !v)}>
          {label}
          {required ? (
            <b className="reg-req-star"> *</b>
          ) : (
            <small className="reg-opt-tag"> (opcional)</small>
          )}
        </label>
        {badge && <span className="reg-field-mini-badge">{badge}</span>}
      </div>

      {/* Hidden native input for HTML5 required validation */}
      <input
        type="text"
        tabIndex={-1}
        required={required}
        value={value}
        onChange={() => {}}
        className="reg-select-hidden-input"
        aria-hidden="true"
      />

      {/* Custom Trigger Button */}
      <button
        type="button"
        className="reg-input-shell reg-select-trigger"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {icon && <span className="reg-input-icon">{icon}</span>}

        <div className="reg-select-value-area">
          {selectedOption ? (
            <div className="reg-selected-item-pill">
              {selectedOption.code && (
                <span
                  className="reg-bank-code-badge"
                  style={
                    selectedOption.color
                      ? { backgroundColor: `${selectedOption.color}18`, color: selectedOption.color }
                      : undefined
                  }
                >
                  {selectedOption.code}
                </span>
              )}
              <span className="reg-selected-label-text">{selectedOption.label}</span>
              {selectedOption.badge && (
                <span className="reg-selected-tag">{selectedOption.badge}</span>
              )}
            </div>
          ) : isFilled ? (
            <span className="reg-selected-label-text">{value}</span>
          ) : (
            <span className="reg-select-placeholder">{placeholder}</span>
          )}
        </div>

        <div className="reg-select-right-icons">
          {isFilled && (
            <span
              role="button"
              tabIndex={-1}
              className="reg-select-clear-btn"
              title="Limpar seleção"
              onClick={(e) => {
                e.stopPropagation()
                onChange('')
              }}
            >
              <X size={13} />
            </span>
          )}
          {isFilled && !open && (
            <span className="reg-valid-indicator reg-select-check" title="Selecionado">
              <Check size={12} strokeWidth={3} />
            </span>
          )}
          <span className={`reg-select-chevron ${open ? 'rotated' : ''}`}>
            <ChevronDown size={16} />
          </span>
        </div>
      </button>

      {/* Animated Floating Glassmorphism Popover Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="reg-select-popover"
            role="listbox"
          >
            {/* Live Search Header inside Popover */}
            <div className="reg-select-search-box">
              <Search size={14} className="search-box-icon" />
              <input
                ref={searchInputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setHighlightIdx(0)
                }}
                placeholder={searchPlaceholder}
                className="reg-select-search-input"
              />
              {query && (
                <button
                  type="button"
                  className="search-clear-mini"
                  onClick={() => setQuery('')}
                  aria-label="Limpar busca"
                >
                  <X size={12} />
                </button>
              )}
            </div>

            {/* Options Scroll List */}
            <div ref={listRef} className="reg-select-options-list">
              {filtered.length > 0 ? (
                filtered.map((opt, idx) => {
                  const isSelected = opt.value === value || opt.label === value
                  const isHighlighted = idx === highlightIdx
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onMouseEnter={() => setHighlightIdx(idx)}
                      onClick={() => handleSelect(opt.value)}
                      className={`reg-select-option-row ${isSelected ? 'is-selected' : ''} ${
                        isHighlighted ? 'is-highlighted' : ''
                      }`}
                    >
                      {opt.code && (
                        <span
                          className="opt-code-pill"
                          style={
                            opt.color
                              ? {
                                  backgroundColor: `${opt.color}15`,
                                  color: opt.color,
                                  borderColor: `${opt.color}30`,
                                }
                              : undefined
                          }
                        >
                          {opt.code}
                        </span>
                      )}

                      <div className="opt-main-text">
                        <strong>{opt.label}</strong>
                        {opt.short && <small>{opt.short}</small>}
                      </div>

                      {opt.badge && <span className="opt-side-tag">{opt.badge}</span>}

                      <span className={`opt-check-circle ${isSelected ? 'visible' : ''}`}>
                        <Check size={12} strokeWidth={3} />
                      </span>
                    </button>
                  )
                })
              ) : (
                <div className="reg-select-empty">
                  <p>Nenhum banco encontrado para &ldquo;{query}&rdquo;</p>
                  {allowCustom && query.trim().length > 1 && (
                    <button
                      type="button"
                      className="reg-select-use-custom-btn"
                      onClick={() => handleSelect(query.trim())}
                    >
                      <Sparkles size={13} />
                      <span>Usar &ldquo;{query.trim()}&rdquo; mesmo assim</span>
                    </button>
                  )}
                </div>
              )}
            </div>

            <div className="reg-select-popover-footer">
              <span>↑↓ para navegar · Enter para selecionar · Esc para fechar</span>
              <strong>{filtered.length} instituições</strong>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

