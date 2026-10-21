'use client'

import React, { useState, useEffect } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`header-wrapper ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="header-glass-bar">
        {/* Brand / Logo */}
        <a href="#inicio" className="premium-brand" aria-label="LOGMov início">
          <div className="brand-text">
            <span className="brand-log">LOG</span>
            <span className="brand-mov">MOV</span>
          </div>
          <span className="brand-tagline">LOGÍSTICA DE MOTOBOYS</span>
        </a>

        {/* Navigation Links */}
        <nav className="header-nav" aria-label="Navegação principal">
          <a href="#aplicativo" className="nav-item">
            <span>O aplicativo</span>
          </a>
          <a href="#como-funciona" className="nav-item">
            <span>Como funciona</span>
          </a>
          <a href="#beneficios" className="nav-item">
            <span>Benefícios</span>
          </a>
        </nav>

        {/* Header Right Actions */}
        <div className="header-actions">
          <a
            href="#cadastro"
            className="premium-header-cta group cursor-blocked"
            onClick={(e) => e.preventDefault()}
            title="Cadastro indisponível no momento"
            aria-disabled="true"
          >
            <span className="cta-shine" />
            <span className="cta-content">
              Cadastre-se
              <ArrowUpRight className="cta-icon" />
            </span>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="mobile-toggle"
            aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown Menu */}
      <div className={`mobile-dropdown ${mobileMenuOpen ? 'is-open' : ''}`}>
        <div className="mobile-dropdown-content">
          <nav className="mobile-nav-links">
            <a
              href="#aplicativo"
              className="mobile-nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>01.</span> O aplicativo
            </a>
            <a
              href="#como-funciona"
              className="mobile-nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>02.</span> Como funciona
            </a>
            <a
              href="#beneficios"
              className="mobile-nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>03.</span> Benefícios
            </a>
            <a
              href="#faq"
              className="mobile-nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>04.</span> Dúvidas frequentes
            </a>
          </nav>

          <a
            href="#cadastro"
            className="mobile-cta-btn cursor-blocked"
            onClick={(e) => {
              e.preventDefault()
              setMobileMenuOpen(false)
            }}
            title="Cadastro indisponível no momento"
            aria-disabled="true"
          >
            Cadastre-se como motoboy
            <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </header>
  )
}
