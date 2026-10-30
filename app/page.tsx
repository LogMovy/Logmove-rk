'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Menu,
  Plus,
  X,
  Building2,
  Bike,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  Sparkles,
  Calendar,
  Wallet,
  Navigation,
  Smartphone,
  UserCheck,
  HelpCircle,
  MessageSquare,
  ArrowUp,
  Mail,
  Shield,
} from 'lucide-react'
import DeliveryMotion from '@/components/DeliveryMotion'
import NetworkMotion from '@/components/NetworkMotion'
import Header from '@/components/Header'
import ShinyText from '@/components/reactbits/ShinyText'
import CountUp from '@/components/reactbits/CountUp'
import Squares from '@/components/Squares'

const logoUrl = '/logmov-icon.png'

const faqs = [
  ['Posso escolher os dias e horários em que vou trabalhar?', 'Sim. Você define sua disponibilidade no aplicativo, de acordo com a sua rotina.'],
  ['Consigo acompanhar meu financeiro e minhas corridas?', 'Sim. A área do motoboy reúne suas corridas e as informações financeiras dos serviços registrados.'],
  ['Como funciona a taxa de adesão gratuita?', 'Motoboys parceiros podem consultar as condições de gratuidade da taxa de adesão. Mensalidades e outros valores são informados antes da contratação.'],
  ['A LogMovy é uma empresa de proteção veicular?', 'Não. A LogMovy conecta você a oportunidades e facilita o acesso a benefícios oferecidos por fornecedores especializados.'],
  ['Preciso contratar a proteção para usar a plataforma?', 'Não. A proteção veicular e o Clube de Benefícios são optativos e independentes do acesso às oportunidades.'],
  ['A LogMovy garante serviços ou ganhos?', 'Não. A disponibilidade de propostas varia e não há garantia de renda ou volume de serviços.'],
]

function Brand({ light = false }: { light?: boolean }) {
  return <a href="#inicio" className={`brand ${light ? 'brand-light' : ''}`} aria-label="LogMovy início"><span>LOG</span><b>Movy</b><small>LOGÍSTICA DE MOTOBOYS</small></a>
}

export default function Page() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [activeDays, setActiveDays] = useState<number[]>([0, 1, 2, 3, 4])

  const toggleAgendaDay = (idx: number) => {
    setActiveDays((prev) => (prev.includes(idx) ? prev.filter((d) => d !== idx) : [...prev, idx]))
  }
  const [cockpitTilt, setCockpitTilt] = useState({ rotateX: 0, rotateY: 0, spotX: 50, spotY: 50, active: false })

  const handleCockpitMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const pctX = (x / rect.width) * 100
    const pctY = (y / rect.height) * 100
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 6
    const rotateX = -((y - rect.height / 2) / (rect.height / 2)) * 6
    setCockpitTilt({ rotateX, rotateY, spotX: pctX, spotY: pctY, active: true })
  }

  const handleCockpitMouseLeave = () => {
    setCockpitTilt({ rotateX: 0, rotateY: 0, spotX: 50, spotY: 50, active: false })
  }

  return (
    <main>
      <Header />

      <section id="inicio" className="hero section-dark">
        <DeliveryMotion />
        
        {/* Left Column: Hero Content */}
        <div className="hero-copy">
          <motion.div
            className="hero-pill-badge"
            initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.03, y: -2 }}
          >
            <span className="live-dot" />
            <ShinyText
              text="Conexões que movem a cidade"
              speed={3.2}
              className="badge-text"
            />
          </motion.div>

          <h1 className="hero-headline">
            <motion.span
              className="headline-line"
              initial={{ opacity: 0, y: 26, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              Sua rotina. <span className="headline-lime headline-lime-pulse">Sua moto.</span>
            </motion.span>
            <motion.span
              className="headline-gradient headline-gradient-animated headline-line"
              initial={{ opacity: 0, y: 26, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.75, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              Novas oportunidades.
            </motion.span>
          </h1>

          <motion.p
            className="hero-text"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            Escolha os dias e horários em que deseja trabalhar, acompanhe suas corridas e consulte seu financeiro com total autonomia.
          </motion.p>

          <motion.div
            className="hero-highlights"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="highlight-item"
              whileHover={{ y: -3, scale: 1.04 }}
              transition={{ type: 'spring', stiffness: 400, damping: 18 }}
            >
              <CheckCircle2 size={15} className="highlight-icon" />
              <span>Autonomia de agenda</span>
            </motion.div>
            <motion.div
              className="highlight-item"
              whileHover={{ y: -3, scale: 1.04 }}
              transition={{ type: 'spring', stiffness: 400, damping: 18 }}
            >
              <CheckCircle2 size={15} className="highlight-icon" />
              <span>Controle financeiro</span>
            </motion.div>
            <motion.div
              className="highlight-item"
              whileHover={{ y: -3, scale: 1.04 }}
              transition={{ type: 'spring', stiffness: 400, damping: 18 }}
            >
              <CheckCircle2 size={15} className="highlight-icon" />
              <span>Benefícios optativos</span>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
          >
            <a
              className="hero-btn-primary"
              href="/cadastro"
            >
              <span>Quero me cadastrar</span>
              <span className="btn-icon-bubble">
                <ArrowUpRight size={17} />
              </span>
              <span className="btn-shimmer" />
            </a>
            <a className="hero-btn-secondary" href="#como-funciona">
              <span>Veja como funciona</span>
              <span className="btn-icon-bubble secondary">
                <ArrowDownRight size={17} />
              </span>
            </a>
          </motion.div>

          <motion.div
            className="hero-trust-bar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.58 }}
          >
            <span className="trust-indicator">⚡ Adesão gratuita</span>
            <span className="trust-dot">•</span>
            <span>Sem exclusividade</span>
            <span className="trust-dot">•</span>
            <span>Validação simples</span>
          </motion.div>
        </div>

        {/* Right Column: Hero Interactive Cockpit App Card */}
        <motion.div
          className="hero-cockpit-wrap"
          initial={{ opacity: 0, y: 28, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Ambient Glow Aura */}
          <div className="cockpit-ambient-glow" />

          {/* Floating Motoboy Emblem Badge with glow */}
          <div className="cockpit-emblem-float">
            <img src={logoUrl} alt="LogMovy Motociclista" className="cockpit-emblem-img" />
          </div>

          {/* Smartphone / Cockpit Glass Card */}
          <div
            className="cockpit-card cockpit-card-interactive"
            onMouseMove={handleCockpitMouseMove}
            onMouseLeave={handleCockpitMouseLeave}
            style={{
              transform: cockpitTilt.active
                ? `perspective(1000px) rotateX(${cockpitTilt.rotateX}deg) rotateY(${cockpitTilt.rotateY}deg) translateY(-4px)`
                : undefined,
            }}
          >
            {/* Dynamic Cursor Spotlight Overlay */}
            <div
              className="cockpit-spotlight-overlay"
              style={{
                opacity: cockpitTilt.active ? 1 : 0,
                background: `radial-gradient(360px circle at ${cockpitTilt.spotX}% ${cockpitTilt.spotY}%, rgba(140, 229, 27, 0.16), transparent 65%)`,
              }}
            />

            {/* Animated Border Scanline */}
            <div className="cockpit-border-beam" />

            {/* Card Top: Live Mode Bar */}
            <div className="cockpit-top-bar">
              <div className="cockpit-status">
                <span className="status-ping-wrap">
                  <span className="status-dot-core" />
                  <span className="status-dot-wave" />
                </span>
                <div>
                  <div className="status-title">MODO ONLINE</div>
                  <div className="status-sub">Disponível para corridas</div>
                </div>
              </div>
              <div className="cockpit-signal-wrap">
                <span className="signal-bars signal-bars-animated">
                  <span className="s-bar s1" />
                  <span className="s-bar s2" />
                  <span className="s-bar s3" />
                </span>
                <span className="gps-pill">GPS 5G</span>
              </div>
            </div>

            {/* Route In Progress Card */}
            <div className="cockpit-route-card">
              <div className="route-card-meta">
                <span className="route-tag route-tag-pulse">CORRIDA DISPONÍVEL</span>
                <span className="route-timer">Há 2 min</span>
              </div>

              <div className="route-flow">
                <div className="flow-step">
                  <div className="step-dot origin" />
                  <div className="step-info">
                    <span className="step-label">PONTO DE COLETA</span>
                    <strong className="step-name">Centro Logístico · Galpão 04</strong>
                  </div>
                </div>

                <div className="flow-connector">
                  <div className="flow-line">
                    <span className="flow-line-laser" />
                  </div>
                  <div className="flow-bike-icon">
                    <Bike size={13} />
                  </div>
                </div>

                <div className="flow-step">
                  <div className="step-dot dest" />
                  <div className="step-info">
                    <span className="step-label">ENTREGA FINAL</span>
                    <strong className="step-name">Av. das Nações, 1420</strong>
                  </div>
                </div>
              </div>

              {/* Payout & Route Specs */}
              <div className="route-specs-grid">
                <div className="spec-col highlight">
                  <span className="spec-label">VALOR ESTIMADO</span>
                  <span className="spec-val-lime">
                    R$ <CountUp to={38} duration={1100} />,50
                  </span>
                </div>
                <div className="spec-sep" />
                <div className="spec-col">
                  <span className="spec-label">DISTÂNCIA</span>
                  <span className="spec-val">4.2 km</span>
                </div>
                <div className="spec-sep" />
                <div className="spec-col">
                  <span className="spec-label">ESTIMATIVA</span>
                  <span className="spec-val">~14 min</span>
                </div>
              </div>
            </div>

            {/* Bottom Metrics inside Card */}
            <div className="cockpit-metrics-row">
              <motion.div
                className="metric-chip"
                whileHover={{ y: -2, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 400, damping: 18 }}
              >
                <div className="metric-icon-wrap lime-bg">
                  <TrendingUp size={14} />
                </div>
                <div>
                  <div className="metric-val">
                    R$ <CountUp to={284} duration={1300} />,00
                  </div>
                  <div className="metric-label">Ganhos de hoje</div>
                </div>
              </motion.div>
              <motion.div
                className="metric-chip"
                whileHover={{ y: -2, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 400, damping: 18 }}
              >
                <div className="metric-icon-wrap blue-bg">
                  <ShieldCheck size={14} />
                </div>
                <div>
                  <div className="metric-val">Ativo</div>
                  <div className="metric-label">Clube parceiro</div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Floating Pill: Deliveries Counter */}
          <motion.div
            className="satellite-pill top-right"
            whileHover={{ scale: 1.06, y: -3 }}
          >
            <span className="sat-dot" />
            <span>
              <strong>
                +<CountUp to={1200} duration={1500} />
              </strong>{' '}
              entregas hoje
            </span>
          </motion.div>

          {/* Floating Pill: Flexibility */}
          <motion.div
            className="satellite-pill bottom-left"
            whileHover={{ scale: 1.06, y: -3 }}
          >
            <Clock size={13} className="sat-icon" />
            <span>Você define seus dias e horas</span>
          </motion.div>
        </motion.div>

        {/* Hero Bottom Bar: Connected Ecosystem */}
        <motion.div
          className="hero-bottom-ecosystem"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="ecosystem-title">ECOSSISTEMA LOGMOVY:</div>
          <div className="ecosystem-badges">
            <motion.div
              className="eco-badge"
              whileHover={{ y: -2, scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 400, damping: 18 }}
            >
              <Building2 size={14} className="eco-icon" />
              <span>EMPRESAS COM DEMANDA</span>
            </motion.div>
            <div className="eco-connector eco-connector-pulse">
              <ArrowRight size={13} className="connector-arrow" />
            </div>
            <motion.div
              className="eco-badge highlight"
              whileHover={{ y: -2, scale: 1.04 }}
              transition={{ type: 'spring', stiffness: 400, damping: 18 }}
            >
              <Bike size={15} className="eco-icon lime" />
              <span>MOTOBOYS PARCEIROS</span>
            </motion.div>
            <div className="eco-connector plus eco-connector-pulse">
              <Plus size={13} />
            </div>
            <motion.div
              className="eco-badge"
              whileHover={{ y: -2, scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 400, damping: 18 }}
            >
              <ShieldCheck size={14} className="eco-icon" />
              <span>BENEFÍCIOS OPTATIVOS</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Organic Section Transition Curve to Section 01 */}
        <div className="hero-bottom-curve" aria-hidden="true">
          <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none">
            <path d="M0,15 C480,55 960,55 1440,15 L1440,60 L0,60 Z" />
          </svg>
        </div>
      </section>

      <section id="aplicativo" className="intro section-light section-pad">
        {/* Dynamic Motion Canvas */}
        <NetworkMotion />

        {/* Ambient Glows */}
        <div className="intro-ambient-glow glow-1" />
        <div className="intro-ambient-glow glow-2" />

        {/* Section Kicker */}
        <motion.div
          className="section-kicker"
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <div className="kicker-pill">
            <span className="kicker-live-dot" />
            <span className="kicker-text-desktop">PLATAFORMA & TECNOLOGIA</span>
            <span className="kicker-text-mobile">PLATAFORMA</span>
          </div>
          <span className="kicker-index">01 / A LOGMOVY</span>
        </motion.div>

        {/* Main Grid: Headline & Value Proposition */}
        <div className="intro-grid">
          <motion.div
            className="intro-headline-col"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="intro-title">
              Do encontro certo<br />
              à próxima <span className="title-lime-accent">oportunidade.</span>
            </h2>

            {/* Micro Live Network Status Card */}
            <motion.div
              className="intro-status-card"
              whileHover={{ y: -3, scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              <div className="status-card-icon-wrap">
                <Bike size={18} className="status-bike-icon" />
              </div>
              <div className="status-card-content">
                <div className="status-card-title">Malha Urbana Integrada</div>
                <div className="status-card-desc">Conexão inteligente entre demanda de empresas e a disponibilidade de motoboys parceiros.</div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="intro-copy-col"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="lead">
              A LogMovy é uma plataforma de conexão entre empresas e profissionais de motofrete.
            </p>
            <p className="intro-body-text">
              Reúne oportunidades e facilita o encontro entre a demanda de quem precisa movimentar seu negócio e a disponibilidade de quem trabalha sobre duas rodas, com transparência total e autonomia de decisão.
            </p>

            <div className="intro-cta-row">
              <motion.a
                className="intro-btn-action"
                href="#como-funciona"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              >
                <span>Entenda como funciona</span>
                <span className="action-circle">
                  <ArrowUpRight size={16} />
                </span>
              </motion.a>
              <span className="intro-note">✓ Sem taxa oculta • Acesso direto</span>
            </div>
          </motion.div>
        </div>

        {/* 3 Premium Interactive Motion Promise Cards */}
        <div className="intro-cards-grid">
          {/* Card 1: Mais Conexão */}
          <motion.div
            className="intro-card group"
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -10, transition: { type: 'spring', stiffness: 350, damping: 20 } }}
          >
            <div className="card-top-meta">
              <span className="card-number">01</span>
              <span className="card-chip">REDE EM TEMPO REAL</span>
              <div className="card-arrow-wrap">
                <ArrowUpRight size={16} />
              </div>
            </div>
            <div className="card-icon-sphere">
              <Building2 size={22} className="sphere-icon" />
            </div>
            <h3 className="card-title">Mais Conexão</h3>
            <p className="card-text">
              Acesso facilitado a pedidos e serviços de diversos estabelecimentos e negócios que demandam entregas rápidas na sua região.
            </p>
            <div className="card-bottom-bar">
              <div className="card-metric-tag">
                <span className="metric-dot" />
                <span>Demanda contínua</span>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Mais Possibilidades */}
          <motion.div
            className="intro-card group highlight-card"
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -12, transition: { type: 'spring', stiffness: 350, damping: 20 } }}
          >
            <div className="card-top-meta">
              <span className="card-number">02</span>
              <span className="card-chip highlight">AUTONOMIA TOTAL</span>
              <div className="card-arrow-wrap highlight">
                <ArrowUpRight size={16} />
              </div>
            </div>
            <div className="card-icon-sphere lime">
              <Bike size={22} className="sphere-icon" />
            </div>
            <h3 className="card-title">Mais Possibilidades</h3>
            <p className="card-text">
              Você escolhe os dias e horários em que deseja atuar. Mais autonomia para conciliar seus compromissos e decidir quando ligar o app.
            </p>
            <div className="card-bottom-bar">
              <div className="card-metric-tag">
                <span className="metric-dot lime" />
                <span>Horários flexíveis</span>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Mais Movimento */}
          <motion.div
            className="intro-card group"
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -10, transition: { type: 'spring', stiffness: 350, damping: 20 } }}
          >
            <div className="card-top-meta">
              <span className="card-number">03</span>
              <span className="card-chip">FLUXO ATIVO</span>
              <div className="card-arrow-wrap">
                <ArrowUpRight size={16} />
              </div>
            </div>
            <div className="card-icon-sphere">
              <TrendingUp size={22} className="sphere-icon" />
            </div>
            <h3 className="card-title">Mais Movimento</h3>
            <p className="card-text">
              Acompanhe suas corridas e seus ganhos pelo aplicativo, mantendo o controle total do seu planejamento financeiro.
            </p>
            <div className="card-bottom-bar">
              <div className="card-metric-tag">
                <span className="metric-dot" />
                <span>Controle financeiro</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="como-funciona" className="app-section section-dark section-pad">
        {/* Ambient Glows & Tech Grid Background */}
        <div className="app-ambient-glow glow-top" />
        <div className="app-ambient-glow glow-bottom" />

        {/* Section Kicker */}
        <motion.div
          className="section-kicker light"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="kicker-pill dark-pill">
            <span className="kicker-live-dot" />
            <span className="kicker-text-desktop">CONTROLE TOTAL NO APP</span>
            <span className="kicker-text-mobile">CONTROLE NO APP</span>
          </div>
          <span className="kicker-index light">02 / ROTINA</span>
        </motion.div>

        {/* Section Header */}
        <div className="app-heading">
          <motion.div
            className="app-heading-main"
            initial={{ opacity: 0, x: -28, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="app-title">
              Sua agenda.<br />
              <span className="title-lime-glow headline-lime-pulse">Suas corridas.</span><br />
              Seu controle.
            </h2>
          </motion.div>

          <motion.div
            className="app-heading-side"
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="app-lead">
              A LogMovy acompanha sua rotina antes, durante e depois de cada serviço.
            </p>
            <p className="app-subtext">
              Uma ferramenta transparente e sem burocracia, criada para você gerenciar seus horários, validar corridas e monitorar seus rendimentos com total independência.
            </p>
            <motion.div
              className="app-telemetry-pill"
              whileHover={{ scale: 1.03, y: -2 }}
              transition={{ type: 'spring', stiffness: 400, damping: 18 }}
            >
              <span className="telemetry-dot" />
              <span>Sincronização instantânea com a plataforma</span>
            </motion.div>
          </motion.div>
        </div>

        {/* 3 Interactive "App Cockpit" Feature Cards */}
        <div className="feature-cockpits-grid">
          {/* Card 01: AGENDA */}
          <motion.div
            className="feature-cockpit-card group cockpit-motion-card"
            initial={{ opacity: 0, y: 38 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -10, transition: { type: 'spring', stiffness: 340, damping: 20 } }}
          >
            <div className="cockpit-top-header">
              <span className="cockpit-number">01 / AGENDA</span>
              <motion.div
                className="cockpit-icon-bubble"
                whileHover={{ rotate: 8, scale: 1.1 }}
              >
                <Calendar size={18} />
              </motion.div>
            </div>

            <h3 className="cockpit-title">
              Você escolhe<br />
              <span className="cockpit-title-highlight">dias e horários.</span>
            </h3>

            <p className="cockpit-body">
              Defina no aplicativo os dias e horários em que deseja trabalhar. Organize sua disponibilidade conforme sua rotina e avalie as oportunidades antes de aceitar.
            </p>

            {/* Interactive Agenda Mockup Widget */}
            <div className="cockpit-widget agenda-widget">
              <div className="widget-header">
                <span className="widget-label">ESCALA SEMANAL ATIVA</span>
                <span className="widget-badge lime">100% Livre</span>
              </div>
              <div className="week-days-row">
                {['S', 'T', 'Q', 'Q', 'S', 'S', 'D'].map((d, i) => {
                  const isDayActive = activeDays.includes(i)
                  return (
                    <motion.div
                      key={i}
                      onClick={() => toggleAgendaDay(i)}
                      whileHover={{ y: -3, scale: 1.07 }}
                      whileTap={{ scale: 0.93 }}
                      className={`week-day-pill week-day-interactive ${isDayActive ? 'active' : ''}`}
                      title="Clique para alternar disponibilidade"
                    >
                      <span className="day-name">{d}</span>
                      <span className="day-indicator" />
                    </motion.div>
                  )
                })}
              </div>
              <div className="shift-status-row">
                <Clock size={12} className="shift-icon" />
                <span>Turno flexível: <strong>Você no comando</strong></span>
              </div>
            </div>

            <ul className="cockpit-checklist">
              <motion.li whileHover={{ x: 4 }}>
                <div className="check-bubble"><Check size={12} /></div>
                <span>Minha disponibilidade</span>
              </motion.li>
              <motion.li whileHover={{ x: 4 }}>
                <div className="check-bubble"><Check size={12} /></div>
                <span>Dias escolhidos por você</span>
              </motion.li>
              <motion.li whileHover={{ x: 4 }}>
                <div className="check-bubble"><Check size={12} /></div>
                <span>Horários definidos por você</span>
              </motion.li>
            </ul>
          </motion.div>

          {/* Card 02: FINANCEIRO (Highlight Center Card) */}
          <motion.div
            className="feature-cockpit-card group highlight-card cockpit-motion-card"
            initial={{ opacity: 0, y: 38 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -12, transition: { type: 'spring', stiffness: 340, damping: 20 } }}
          >
            <div className="cockpit-border-beam" />
            <div className="cockpit-top-header">
              <span className="cockpit-number highlight">02 / FINANCEIRO</span>
              <motion.div
                className="cockpit-icon-bubble lime"
                whileHover={{ rotate: -8, scale: 1.1 }}
              >
                <Wallet size={18} />
              </motion.div>
            </div>

            <h3 className="cockpit-title">
              Seu financeiro<br />
              <span className="cockpit-title-highlight">em um só lugar.</span>
            </h3>

            <p className="cockpit-body">
              Acesse sua área financeira para consultar os ganhos e acompanhar as informações financeiras dos serviços registrados no aplicativo com clareza.
            </p>

            {/* Interactive Finance Mockup Widget */}
            <div className="cockpit-widget finance-widget">
              <div className="widget-header">
                <span className="widget-label">EXTRATO CONSOLIDADO</span>
              </div>
              <div className="finance-balance-wrap">
                <div className="finance-amount-row">
                  <span className="finance-currency">R$</span>
                  <span className="finance-val">
                    <CountUp to={284} duration={1400} />,00
                  </span>
                  <span className="finance-trend">Hoje</span>
                </div>
                <div className="finance-mini-bar">
                  <motion.div
                    className="finance-progress-fill finance-progress-shimmer"
                    initial={{ width: '0%' }}
                    whileInView={{ width: '75%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
              </div>
              <div className="payout-note-row">
                <TrendingUp size={12} className="shift-icon lime" />
                <span>Extrato individual de cada entrega</span>
              </div>
            </div>

            <ul className="cockpit-checklist">
              <motion.li whileHover={{ x: 4 }}>
                <div className="check-bubble lime"><Check size={12} /></div>
                <span>Meu financeiro</span>
              </motion.li>
              <motion.li whileHover={{ x: 4 }}>
                <div className="check-bubble lime"><Check size={12} /></div>
                <span>Consulta de ganhos detalhada</span>
              </motion.li>
              <motion.li whileHover={{ x: 4 }}>
                <div className="check-bubble lime"><Check size={12} /></div>
                <span>Informações dos serviços</span>
              </motion.li>
            </ul>
          </motion.div>

          {/* Card 03: CORRIDAS */}
          <motion.div
            className="feature-cockpit-card group cockpit-motion-card"
            initial={{ opacity: 0, y: 38 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -10, transition: { type: 'spring', stiffness: 340, damping: 20 } }}
          >
            <div className="cockpit-top-header">
              <span className="cockpit-number">03 / CORRIDAS</span>
              <motion.div
                className="cockpit-icon-bubble"
                whileHover={{ rotate: 12, scale: 1.1 }}
              >
                <Navigation size={18} />
              </motion.div>
            </div>

            <h3 className="cockpit-title">
              Acompanhe<br />
              <span className="cockpit-title-highlight">cada corrida.</span>
            </h3>

            <p className="cockpit-body">
              Consulte suas corridas e acompanhe o andamento dos serviços pelo aplicativo, com rotas transparentes, endereços mapeados e histórico completo.
            </p>

            {/* Interactive Route Mockup Widget */}
            <div className="cockpit-widget route-widget">
              <div className="widget-header">
                <span className="widget-label">DISPATCH & NAVEGAÇÃO</span>
                <span className="widget-badge blue">GPS Ativo</span>
              </div>
              <div className="route-mini-flow">
                <div className="route-step-item">
                  <span className="route-node-dot origin" />
                  <span className="route-step-txt">Coleta: <strong>Centro Logístico</strong></span>
                </div>
                <div className="route-step-connector route-step-connector-animated">
                  <span className="route-step-laser" />
                </div>
                <div className="route-step-item">
                  <span className="route-node-dot dest route-dest-pulse" />
                  <span className="route-step-txt">Entrega: <strong>Av. das Nações</strong></span>
                </div>
              </div>
              <div className="route-metrics-chip">
                <span>4.2 km · ~14 min</span>
                <strong className="chip-price">
                  R$ <CountUp to={38} duration={1200} />,50
                </strong>
              </div>
            </div>

            <ul className="cockpit-checklist">
              <motion.li whileHover={{ x: 4 }}>
                <div className="check-bubble"><Check size={12} /></div>
                <span>Minhas corridas</span>
              </motion.li>
              <motion.li whileHover={{ x: 4 }}>
                <div className="check-bubble"><Check size={12} /></div>
                <span>Acompanhamento dos serviços</span>
              </motion.li>
              <motion.li whileHover={{ x: 4 }}>
                <div className="check-bubble"><Check size={12} /></div>
                <span>Consulta das corridas e rotas</span>
              </motion.li>
            </ul>
          </motion.div>
        </div>
      </section>

      <section id="como-comecar" className="steps section-light section-pad">
        {/* Ambient Tech Lighting & Grid Background */}
        <div className="steps-ambient-glow glow-1" />
        <div className="steps-ambient-glow glow-2" />

        {/* Section Kicker */}
        <div className="section-kicker">
          <div className="kicker-pill">
            <span className="kicker-live-dot" />
            <span className="kicker-text-desktop">PASSO A PASSO TRANSPARENTE</span>
            <span className="kicker-text-mobile">PASSO A PASSO</span>
          </div>
          <span className="kicker-index">03 / COMO COMEÇAR</span>
        </div>

        {/* Section Heading & Top Action */}
        <div className="steps-heading">
          <div className="steps-heading-main">
            <h2 className="steps-title">
              Do cadastro<br />
              <span className="title-lime-accent">ao compromisso.</span>
            </h2>
          </div>

          <div className="steps-heading-action">
            <a
              className="steps-cta-btn"
              href="/cadastro"
            >
              <span>Cadastre-se como motoboy</span>
              <div className="steps-cta-icon">
                <ArrowUpRight size={17} />
              </div>
            </a>
            <span className="steps-cta-hint">Adesão gratuita para motoboys parceiros</span>
          </div>
        </div>

        {/* 4 Interactive Stepper Cards */}
        <div className="step-list">
          {[
            {
              num: '01 /',
              title: 'Apresente seu perfil',
              text: 'Informe seus dados e envie a documentação necessária para validação segura na plataforma.',
              chip: 'Validação rápida',
              icon: UserCheck,
            },
            {
              num: '02 /',
              title: 'Escolha dias e horários',
              text: 'Defina sua disponibilidade no app e consulte oportunidades, valores e condições com total clareza.',
              chip: '100% Flexível',
              icon: Clock,
            },
            {
              num: '03 /',
              title: 'Escolha e aceite',
              text: 'Decida quais oportunidades fazem sentido para sua rotina, sem nenhuma obrigação de aceitar.',
              chip: 'Sem obrigação',
              icon: CheckCircle2,
            },
            {
              num: '04 /',
              title: 'Acompanhe pelo app',
              text: 'Cumpra os compromissos aceitos, acompanhe suas corridas e consulte seu financeiro.',
              chip: 'Controle total',
              icon: Smartphone,
            },
          ].map((step) => {
            const StepIcon = step.icon
            return (
              <div className="step-card group" key={step.num}>
                <div className="step-left-cluster">
                  <span className="step-number">{step.num}</span>
                  <div className="step-icon-sphere">
                    <StepIcon size={20} />
                  </div>
                </div>

                <div className="step-content">
                  <div className="step-title-row">
                    <h3 className="step-title">{step.title}</h3>
                    <span className="step-chip">{step.chip}</span>
                  </div>
                  <p className="step-desc">{step.text}</p>
                </div>

                <div className="step-action-col">
                  <div className="step-arrow-bubble">
                    <ArrowUpRight size={18} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Fine Print Note Card */}
        <div className="steps-fine-print-card">
          <div className="fine-print-icon-wrap">
            <ShieldCheck size={18} />
          </div>
          <p className="fine-print-text">
            <strong>Informação importante:</strong> O cadastro depende de validação documental. A disponibilidade de propostas varia de acordo com a demanda na região; não há garantia de renda fixa ou de volume mínimo de serviços.
          </p>
        </div>
      </section>

      <section id="beneficios" className="benefits section-lime section-pad">
        {/* Ambient Subtle Glows */}
        <div className="benefits-ambient-glow glow-1" />
        <div className="benefits-ambient-glow glow-2" />

        {/* Section Kicker */}
        <motion.div
          className="section-kicker lime-kicker"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="kicker-pill lime-pill">
            <span className="kicker-live-dot dark" />
            <span className="kicker-text-desktop">DIFERENCIAIS PARA SUA ROTINA</span>
            <span className="kicker-text-mobile">DIFERENCIAIS</span>
          </div>
          <span className="kicker-index lime-index">04 / ESCOLHAS SUAS</span>
        </motion.div>

        {/* Section Heading */}
        <div className="benefit-heading">
          <motion.div
            className="benefit-heading-main"
            initial={{ opacity: 0, x: -28, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="benefit-title">
              O movimento é seu.<br />
              <span className="title-navy-italic">A escolha também.</span>
            </h2>
          </motion.div>

          <motion.div
            className="benefit-heading-side"
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="benefit-lead">
              Proteção veicular e Clube de Benefícios são escolhas suas. Você só adere se aceitar as condições de cada benefício.
            </p>
            <motion.div
              className="benefit-tag-pill"
              whileHover={{ scale: 1.03, y: -2 }}
              transition={{ type: 'spring', stiffness: 400, damping: 18 }}
            >
              <span className="benefit-pill-dot" />
              <span>Totalmente optativo · Sem vínculo obrigatório</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Two Grand Benefit Cards */}
        <div className="benefit-cards">
          {/* Card 1: Proteção Veicular (Frosted Glass Light) */}
          <motion.article
            className="benefit-card light-benefit-card group benefit-motion-card"
            initial={{ opacity: 0, y: 38 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -10, transition: { type: 'spring', stiffness: 340, damping: 20 } }}
          >
            <div className="benefit-card-top">
              <span className="card-tag dark">BENEFÍCIO OPTATIVO</span>
              <motion.div
                className="benefit-icon-sphere dark"
                whileHover={{ rotate: 10, scale: 1.12 }}
              >
                <ShieldCheck size={20} />
              </motion.div>
            </div>

            <h3 className="benefit-card-title">
              Proteção para<br />
              sua moto.
            </h3>

            <p className="benefit-card-text">
              A LogMovy facilita o acesso a informações sobre proteção veicular oferecida por fornecedor especializado, com contratação própria e separada.
            </p>

            <ul className="benefit-mini-perks dark">
              <motion.li whileHover={{ x: 5 }}>
                <div className="perk-check dark"><Check size={12} /></div>
                <span>Contratação própria e independente</span>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <div className="perk-check dark"><Check size={12} /></div>
                <span>Fornecedor especializado no setor</span>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <div className="perk-check dark"><Check size={12} /></div>
                <span>Não obrigatório para rodar na LogMovy</span>
              </motion.li>
            </ul>

            <a className="benefit-action-link dark" href="/protecao">
              <span>Como consultar a proteção</span>
              <div className="benefit-link-bubble dark">
                <ArrowUpRight size={16} />
              </div>
            </a>
          </motion.article>

          {/* Card 2: Clube de Benefícios (Deep Navy Glass Luxury) */}
          <motion.article
            className="benefit-card dark-benefit-card group benefit-motion-card"
            initial={{ opacity: 0, y: 38 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -10, transition: { type: 'spring', stiffness: 340, damping: 20 } }}
          >
            <div className="cockpit-border-beam" />
            <div className="benefit-card-top">
              <span className="card-tag lime">CLUBE DE BENEFÍCIOS</span>
              <motion.div
                className="benefit-icon-sphere lime"
                whileHover={{ rotate: -10, scale: 1.12 }}
              >
                <Sparkles size={20} />
              </motion.div>
            </div>

            <h3 className="benefit-card-title light">
              Sua rotina.<br />
              <span className="title-lime-glow headline-lime-pulse">Mais vantagens.</span>
            </h3>

            <p className="benefit-card-text light">
              Descontos e condições especiais em oficinas, peças, serviços e lojas parceiras para acompanhar você também fora das entregas do dia a dia.
            </p>

            <ul className="benefit-mini-perks light">
              <motion.li whileHover={{ x: 5 }}>
                <div className="perk-check lime"><Check size={12} /></div>
                <span>Descontos especiais em oficinas parceiras</span>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <div className="perk-check lime"><Check size={12} /></div>
                <span>Economia em peças, pneus e manutenção</span>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <div className="perk-check lime"><Check size={12} /></div>
                <span>Vantagens que vão além das corridas</span>
              </motion.li>
            </ul>

            <a className="benefit-action-link lime" href="/clube-beneficios">
              <span>Conheça o clube</span>
              <div className="benefit-link-bubble lime">
                <ArrowUpRight size={16} />
              </div>
            </a>
          </motion.article>
        </div>

        {/* Protection Coverage Grid */}
        <motion.div
          className="protection-grid-wrap"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="protection-header">
            <div className="protection-title-row">
              <span className="protection-badge">COBERTURAS DISPONÍVEIS</span>
              <h4 className="protection-headline">O que pode fazer parte do plano</h4>
            </div>
            <span className="protection-subtitle">Consulte limites e regulamento do fornecedor</span>
          </div>

          <div className="protection-cards-grid">
            {[
              { num: '01', title: 'Roubo e furto' },
              { num: '02', title: 'Colisão e perda total' },
              { num: '03', title: 'Incêndio por colisão' },
              { num: '04', title: 'Assistência 24 horas' },
              { num: '05', title: 'Abrangência nacional' },
              { num: '06', title: 'Guincho em acidente' },
            ].map((item, idx) => (
              <motion.div
                className="protection-item-card group"
                key={item.num}
                initial={{ opacity: 0, y: 18, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: 0.1 + idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="protection-item-num">{item.num}</span>
                <span className="protection-item-title">{item.title}</span>
                <div className="protection-check-bubble">
                  <Check size={12} />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Fine Print Note Card */}
        <motion.div
          className="benefits-fine-print-card"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -2 }}
        >
          <div className="fine-print-icon-wrap dark">
            <ShieldCheck size={18} />
          </div>
          <p className="benefits-fine-print-text">
            <strong>Condições gerais:</strong> Itens sujeitos à proposta, elegibilidade e regulamento do fornecedor parceiro. Consulte limites, carências, participações e exclusões, inclusive as condições específicas para uso em serviços de motofrete.
          </p>
        </motion.div>
      </section>

      <section id="faq" className="faq section-light section-pad">
        {/* Ambient Subtle Glows */}
        <div className="faq-ambient-glow glow-1" />
        <div className="faq-ambient-glow glow-2" />

        {/* Section Kicker */}
        <div className="section-kicker">
          <div className="kicker-pill">
            <span className="kicker-live-dot" />
            <span className="kicker-text-desktop">TRANSPARÊNCIA TOTAL</span>
            <span className="kicker-text-mobile">DÚVIDAS</span>
          </div>
          <span className="kicker-index">05 / TUDO ÀS CLARAS</span>
        </div>

        {/* Two-Column Grid: Sticky Head on Left, Accordion Cards on Right */}
        <div className="faq-grid">
          {/* Left Column: Heading & Support Helper Card */}
          <div className="faq-left-col">
            
            <h2 className="faq-title">
              Antes de seguir,<br />
              <span className="title-lime-accent">tire suas dúvidas.</span>
            </h2>

            <p className="faq-lead">
              Separamos as principais perguntas feitas por motoboys parceiros para você entender como funciona a rotina, os pagamentos e a autonomia no app.
            </p>

            {/* Support Helper Card */}
            <div className="faq-support-card">
              <div className="support-card-top">
                <div className="support-icon-wrap">
                  <MessageSquare size={18} />
                </div>
                <div className="support-badge">SUPORTE RÁPIDO</div>
              </div>
              <h4 className="support-title">Ainda tem alguma dúvida?</h4>
              <p className="support-desc">
                Nossa equipe de suporte e onboarding está pronta para esclarecer qualquer ponto sobre seu pré-cadastro.
              </p>
              <a
                className="support-btn cursor-blocked"
                href="#suporte"
                onClick={(e) => e.preventDefault()}
                title="Atendimento indisponível no momento"
                aria-disabled="true"
              >
                <span>Falar com nosso time</span>
                <ArrowUpRight size={15} />
              </a>
            </div>
          </div>

          {/* Right Column: Premium Accordion Cards List */}
          <div className="faq-accordion-col">
            <div className="faq-list">
              {faqs.map(([question, answer], i) => {
                const isOpen = openFaq === i
                const formattedNum = (i + 1).toString().padStart(2, '0')
                return (
                  <div className={`faq-card group ${isOpen ? 'is-open' : ''}`} key={question}>
                    <button
                      className="faq-question-btn"
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      aria-expanded={isOpen}
                    >
                      <div className="faq-question-left">
                        <span className="faq-index-tag">{formattedNum}</span>
                        <span className="faq-question-text">{question}</span>
                      </div>
                      <div className={`faq-toggle-bubble ${isOpen ? 'active' : ''}`}>
                        {isOpen ? <X size={15} /> : <Plus size={15} />}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="faq-answer-panel">
                        <div className="faq-answer-content">
                          <p>{answer}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="final-cta section-dark">
        {/* Interactive Moving Squares Canvas */}
        <Squares
          direction="diagonal"
          speed={0.4}
          borderColor="rgba(255, 255, 255, 0.07)"
          squareSize={52}
          hoverFillColor="rgba(140, 229, 27, 0.18)"
        />

        {/* Ambient Tech Glows */}
        <div className="final-cta-ambient-glow glow-top" />
        <div className="final-cta-ambient-glow glow-bottom" />

        <div className="final-cta-container">
          {/* Heading */}
          <motion.h2
            className="final-cta-title"
            initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            O próximo movimento<br />
            <span className="final-cta-gradient-glow">começa com uma conexão.</span>
          </motion.h2>

          <motion.p
            className="final-cta-lead"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            Faça parte da plataforma que valoriza seu corre diário com transparência nas rotas, repasses claros e autonomia total para definir seus horários.
          </motion.p>

          {/* Value Highlights Pill Row */}
          <motion.div
            className="final-cta-perks"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="cta-perk-item"
              whileHover={{ y: -3, scale: 1.04 }}
              transition={{ type: 'spring', stiffness: 400, damping: 18 }}
            >
              <CheckCircle2 size={15} className="perk-icon-lime" />
              <span>Sem taxa de adesão</span>
            </motion.div>
            <motion.div
              className="cta-perk-item"
              whileHover={{ y: -3, scale: 1.04 }}
              transition={{ type: 'spring', stiffness: 400, damping: 18 }}
            >
              <CheckCircle2 size={15} className="perk-icon-lime" />
              <span>Acesso imediato às oportunidades</span>
            </motion.div>
            <motion.div
              className="cta-perk-item"
              whileHover={{ y: -3, scale: 1.04 }}
              transition={{ type: 'spring', stiffness: 400, damping: 18 }}
            >
              <CheckCircle2 size={15} className="perk-icon-lime" />
              <span>Clube de benefícios optativo</span>
            </motion.div>
          </motion.div>

          {/* Action Buttons Row */}
          <motion.div
            className="final-cta-actions"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <a
              className="final-cta-btn-primary group"
              href="/cadastro"
            >
              <span>Fazer meu pré-cadastro</span>
              <span className="btn-icon-bubble">
                <ArrowUpRight size={17} />
              </span>
              <span className="btn-shimmer" />
            </a>

            <a className="final-cta-btn-secondary" href="#faq">
              <HelpCircle size={16} />
              <span>Dúvidas frequentes</span>
            </a>
          </motion.div>

          {/* Telemetry Status Strip */}
          <motion.div
            className="final-cta-telemetry-strip"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="telemetry-strip-item">
              <div className="strip-item-val">
                <CountUp to={100} duration={1200} suffix="%" />
              </div>
              <div className="strip-item-desc">Autonomia de horários</div>
            </div>
            <div className="telemetry-strip-divider" />
            <div className="telemetry-strip-item">
              <div className="strip-item-val lime">R$ 0</div>
              <div className="strip-item-desc">Custo de inscrição</div>
            </div>
            <div className="telemetry-strip-divider" />
            <div className="telemetry-strip-item">
              <div className="strip-item-val">Ágil</div>
              <div className="strip-item-desc">Suporte ao parceiro</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-grid">
            {/* Col 1: Brand & Proposition */}
            <div className="footer-col-brand">
              <a href="#inicio" className="premium-brand footer-brand" aria-label="LogMovy início">
                <div className="brand-text">
                  <span className="brand-log">LOG</span>
                  <span className="brand-mov">MOVY</span>
                </div>
                <span className="brand-tagline">LOGÍSTICA DE MOTOBOYS</span>
              </a>
              <p className="footer-brand-desc">
                Conectando negócios. Movendo oportunidades. A plataforma de logística de motoboys feita para quem vive a rua com autonomia.
              </p>
              <div className="footer-live-badge">
                <span className="footer-live-dot" />
                <span>Operação Ativa · 2026</span>
              </div>
            </div>

            {/* Col 2: Navegação */}
            <div className="footer-col-nav">
              <h4 className="footer-col-title">NAVEGAÇÃO</h4>
              <ul className="footer-links-list">
                <li><a href="#inicio">Início</a></li>
                <li><a href="#visao-geral">O Aplicativo</a></li>
                <li><a href="#como-funciona">Como Funciona</a></li>
                <li><a href="#beneficios">Benefícios</a></li>
                <li><a href="#faq">Perguntas Frequentes</a></li>
              </ul>
            </div>

            {/* Col 3: Para o Motoboy */}
            <div className="footer-col-nav">
              <h4 className="footer-col-title">PARA O PARCEIRO</h4>
              <ul className="footer-links-list">
                <li>
                  <a
                    href="/cadastro"
                    className="footer-link-highlight"
                  >
                    Meu pré-cadastro ↗
                  </a>
                </li>
                <li>
                  <a
                    href="#area-administrativa"
                    onClick={(e) => e.preventDefault()}
                    aria-disabled="true"
                    title="Área administrativa indisponível no momento"
                    className="cursor-blocked footer-link-blocked"
                  >
                    <span>Área administrativa</span>
                    <span className="footer-soon-badge">EM BREVE</span>
                  </a>
                </li>
                <li><a href="#beneficios">Clube de Benefícios</a></li>
                <li><a href="#faq">Dúvidas Frequentes</a></li>
              </ul>
            </div>

            {/* Col 4: Contato & Suporte */}
            <div className="footer-col-nav">
              <h4 className="footer-col-title">SUPORTE & CONTATO</h4>
              <p className="footer-contact-desc">
                Precisa de ajuda ou quer tirar dúvidas sobre seu cadastro?
              </p>
              <div className="footer-security-note">
                <Shield size={13} className="security-icon" />
                <span>Dados protegidos com criptografia</span>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="footer-bottom-bar">
            <div className="footer-bottom-left">
              <small>© 2026 LogMovy · Logística de Motoboys. Todos os direitos reservados.</small>
              <div className="footer-legal-links">
                <a href="#">Termos de Uso</a>
                <span className="legal-dot">·</span>
                <a href="#">Privacidade</a>
              </div>
            </div>

            <a href="#inicio" className="footer-back-to-top" aria-label="Voltar ao início">
              <span>Voltar ao topo</span>
              <ArrowUp size={14} />
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}

function Feature({ number, title, body, items }: { number: string; title: React.ReactNode; body: string; items: string[] }) { return <article className="feature"><span className="feature-number">{number}</span><h3>{title}</h3><p>{body}</p><ul>{items.map(item => <li key={item}><Check />{item}</li>)}</ul></article> }
