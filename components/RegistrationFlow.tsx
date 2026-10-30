'use client'

import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ShieldCheck,
  User,
  Landmark,
  Calendar,
  FileCheck2,
  Eye,
  EyeOff,
  Bike,
  Sparkles,
  Lock,
  Building2,
  CreditCard,
  Smartphone,
  Mail,
  KeyRound,
  Hash,
  FileText,
  BadgeCheck,
  AlertCircle,
} from 'lucide-react'
import Registration3DScene from '@/components/Registration3DScene'
import NetworkMotion from '@/components/NetworkMotion'
import PremiumSelect, { SelectOption } from '@/components/PremiumSelect'

const daysList = [
  { id: 'Segunda-feira', short: 'SEG', label: 'Segunda-feira', tag: 'Alta demanda' },
  { id: 'Terça-feira', short: 'TER', label: 'Terça-feira', tag: 'Fluxo comercial' },
  { id: 'Quarta-feira', short: 'QUA', label: 'Quarta-feira', tag: 'Fluxo comercial' },
  { id: 'Quinta-feira', short: 'QUI', label: 'Quinta-feira', tag: 'Alta demanda' },
  { id: 'Sexta-feira', short: 'SEX', label: 'Sexta-feira', tag: 'Pico semanal' },
  { id: 'Sábado', short: 'SÁB', label: 'Sábado', tag: 'Plantão especial' },
  { id: 'Domingo', short: 'DOM', label: 'Domingo', tag: 'Flexível' },
]

const popularBanks: SelectOption[] = [
  { value: '260 - Nu Pagamentos (Nubank)', label: 'Nubank (Nu Pagamentos)', code: '260', short: 'Conta Digital · PIX Instantâneo', badge: 'Popular', color: '#820ad1' },
  { value: '001 - Banco do Brasil', label: 'Banco do Brasil S.A.', code: '001', short: 'Banco Tradicional', color: '#0038a8' },
  { value: '341 - Itaú Unibanco', label: 'Itaú Unibanco S.A.', code: '341', short: 'Banco Tradicional', badge: 'Popular', color: '#ec7000' },
  { value: '104 - Caixa Econômica Federal', label: 'Caixa Econômica Federal', code: '104', short: 'Poupança / Caixa Tem', color: '#005ca9' },
  { value: '237 - Bradesco', label: 'Banco Bradesco S.A.', code: '237', short: 'Banco Tradicional', color: '#cc092f' },
  { value: '077 - Banco Inter', label: 'Banco Inter S.A.', code: '077', short: 'Conta Digital · Zero Taxa', badge: 'Digital', color: '#ff7a00' },
  { value: '033 - Santander', label: 'Banco Santander Brasil', code: '033', short: 'Banco Tradicional', color: '#ec0000' },
  { value: '336 - Banco C6', label: 'C6 Bank S.A.', code: '336', short: 'Conta Digital', badge: 'Digital', color: '#242424' },
  { value: '290 - PagBank', label: 'PagBank (PagSeguro)', code: '290', short: 'Conta Pagamento', badge: 'Digital', color: '#00a868' },
  { value: '380 - PicPay', label: 'PicPay Bank', code: '380', short: 'Carteira Digital', color: '#11c76f' },
  { value: '323 - Mercado Pago', label: 'Mercado Pago', code: '323', short: 'Conta Digital', color: '#009ee3' },
  { value: '756 - Sicoob', label: 'Sicoob (Cooperativa)', code: '756', short: 'Sistema Cooperativo', color: '#003641' },
  { value: '748 - Sicredi', label: 'Sicredi', code: '748', short: 'Sistema Cooperativo', color: '#3fa110' },
  { value: '403 - Cora', label: 'Cora Sociedade de Crédito', code: '403', short: 'Conta PJ / MEI', badge: 'Ideal MEI', color: '#fe3e6d' },
]

const initialData = {
  name: '',
  cpf: '',
  birthDate: '',
  email: '',
  phone: '',
  password: '',
  mei: '',
  plate: '',
  cnh: '',
  bank: '',
  agency: '',
  account: '',
  accountType: 'Conta corrente',
  holderCpf: '',
  pixType: 'CPF',
  pixKey: '',
  days: ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira'] as string[],
  acceptedTerms: false,
}

type RegistrationData = typeof initialData
type TextField = Exclude<keyof RegistrationData, 'days' | 'acceptedTerms'>

// Input Masks
function maskCPF(val: string) {
  const digits = val.replace(/\D/g, '').slice(0, 11)
  return digits
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
}

function maskCNPJ(val: string) {
  const digits = val.replace(/\D/g, '').slice(0, 14)
  return digits
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
}

function maskPhone(val: string) {
  const digits = val.replace(/\D/g, '').slice(0, 11)
  if (digits.length <= 2) return digits.length ? `(${digits}` : ''
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`
}

function maskPlate(val: string) {
  const clean = val.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 7)
  if (clean.length > 3) {
    return `${clean.slice(0, 3)}-${clean.slice(3)}`
  }
  return clean
}

function getPasswordStrength(pw: string) {
  if (!pw) return { score: 0, label: 'Mínimo 8 caracteres', color: '#94a3b8' }
  let s = 0
  if (pw.length >= 6) s++
  if (pw.length >= 8) s++
  if (/[A-Z]/.test(pw) || /[0-9]/.test(pw)) s++
  if (/[^A-Za-z0-9]/.test(pw) && pw.length >= 8) s++

  const map = [
    { score: 1, label: 'Muito curta', color: '#ef4444' },
    { score: 1, label: 'Fraca', color: '#f97316' },
    { score: 2, label: 'Boa', color: '#eab308' },
    { score: 3, label: 'Forte', color: '#8ce51b' },
    { score: 4, label: 'Blindada', color: '#65a30d' },
  ]
  return map[Math.min(s, 4)]
}

interface PremiumFieldProps {
  label: string
  name: TextField
  type?: string
  required?: boolean
  value: string
  onChange: (name: TextField, value: string) => void
  placeholder?: string
  icon?: React.ReactNode
  badge?: string
  rightSlot?: React.ReactNode
  list?: string
  fullWidth?: boolean
}

function PremiumField({
  label,
  name,
  type = 'text',
  required = true,
  value,
  onChange,
  placeholder,
  icon,
  badge,
  rightSlot,
  list,
  fullWidth = false,
}: PremiumFieldProps) {
  const [focused, setFocused] = useState(false)
  const isFilled = value.trim().length > 0

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ type: 'spring', stiffness: 420, damping: 22 }}
      className={`reg-premium-field ${focused ? 'is-focused' : ''} ${isFilled ? 'is-filled' : ''} ${
        fullWidth ? 'col-span-full' : ''
      }`}
    >
      <div className="reg-field-top">
        <label htmlFor={`field-${name}`} className="reg-field-label">
          {label}
          {required ? <b className="reg-req-star"> *</b> : <small className="reg-opt-tag"> (opcional)</small>}
        </label>
        {badge && <span className="reg-field-mini-badge">{badge}</span>}
      </div>

      <div className="reg-input-shell">
        {icon && <span className="reg-input-icon">{icon}</span>}
        <input
          id={`field-${name}`}
          name={name}
          type={type}
          required={required}
          value={value}
          list={list}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => onChange(name, e.target.value)}
          placeholder={placeholder}
          autoComplete={name === 'password' ? 'new-password' : 'off'}
        />
        {rightSlot ? (
          <div className="reg-input-right">{rightSlot}</div>
        ) : (
          isFilled &&
          required && (
            <span className="reg-valid-indicator" title="Preenchido">
              <Check size={13} strokeWidth={3} />
            </span>
          )
        )}
      </div>
    </motion.div>
  )
}

const stepMeta = [
  {
    num: '01',
    short: 'Perfil',
    title: 'Dados pessoais e veículo',
    subtitle: 'Identificação oficial para validação de segurança na plataforma.',
    icon: User,
  },
  {
    num: '02',
    short: 'Repasses',
    title: 'Dados bancários e PIX',
    subtitle: 'Configure onde você receberá os pagamentos das suas corridas.',
    icon: Landmark,
  },
  {
    num: '03',
    short: 'Agenda',
    title: 'Disponibilidade semanal',
    subtitle: 'Escolha os dias em que pretende rodar. Você pode alterar quando quiser.',
    icon: Calendar,
  },
  {
    num: '04',
    short: 'Termos',
    title: 'Revisão e confirmação',
    subtitle: 'Confira o resumo do seu perfil e aceite os termos de parceria LogMovy.',
    icon: FileCheck2,
  },
]

export default function RegistrationFlow() {
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState(1)
  const [data, setData] = useState<RegistrationData>(initialData)
  const [submitted, setSubmitted] = useState(false)
  const [daysError, setDaysError] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // Format and update field
  const update = (name: TextField, rawValue: string) => {
    let value = rawValue
    if (name === 'cpf' || name === 'holderCpf') value = maskCPF(rawValue)
    if (name === 'phone') value = maskPhone(rawValue)
    if (name === 'mei') value = maskCNPJ(rawValue)
    if (name === 'plate') value = maskPlate(rawValue)
    if (name === 'cnh') value = rawValue.replace(/\D/g, '').slice(0, 11)

    setData((current) => {
      const nextState = { ...current, [name]: value }
      // Auto-sync holderCPF or PIX CPF if empty
      if (name === 'cpf' && !current.holderCpf) {
        nextState.holderCpf = value
      }
      return nextState
    })
  }

  const handlePixTypeChange = (type: string) => {
    setData((current) => {
      let autoKey = current.pixKey
      if (type === 'CPF' && current.cpf) autoKey = current.cpf
      else if (type === 'Celular' && current.phone) autoKey = current.phone
      else if (type === 'E-mail' && current.email) autoKey = current.email
      else if (type === 'CNPJ' && current.mei) autoKey = current.mei
      return { ...current, pixType: type, pixKey: autoKey }
    })
  }

  const toggleDay = (day: string) => {
    setDaysError(false)
    setData((current) => ({
      ...current,
      days: current.days.includes(day)
        ? current.days.filter((item) => item !== day)
        : [...current.days, day],
    }))
  }

  const selectPresetDays = (preset: 'weekdays' | 'all' | 'weekend') => {
    setDaysError(false)
    if (preset === 'weekdays') {
      setData((c) => ({
        ...c,
        days: ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira'],
      }))
    } else if (preset === 'all') {
      setData((c) => ({ ...c, days: daysList.map((d) => d.id) }))
    } else {
      setData((c) => ({ ...c, days: ['Sexta-feira', 'Sábado', 'Domingo'] }))
    }
  }

  // Overall completion percentage for 3D telemetry & progress bar
  const completionScore = useMemo(() => {
    if (submitted) return 1
    let filled = 0
    const totalChecks = 13
    if (data.name.trim().length > 2) filled++
    if (data.cpf.length >= 14) filled++
    if (data.birthDate) filled++
    if (data.email.includes('@')) filled++
    if (data.phone.length >= 14) filled++
    if (data.password.length >= 8) filled++
    if (data.plate.length >= 7) filled++
    if (data.bank.trim().length > 1) filled++
    if (data.agency.trim().length > 1) filled++
    if (data.account.trim().length > 1) filled++
    if (data.pixKey.trim().length > 2) filled++
    if (data.days.length > 0) filled++
    if (data.acceptedTerms) filled++
    return Math.min(1, Math.max(0.08, filled / totalChecks))
  }, [data, submitted])

  const goToStep = (targetStep: number) => {
    if (targetStep < step) {
      setDirection(-1)
      setStep(targetStep)
    }
  }

  const next = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (step === 2 && data.days.length === 0) {
      setDaysError(true)
      return
    }
    if (step < 3) {
      setDirection(1)
      setStep((current) => current + 1)
    } else {
      setSubmitted(true)
    }
  }

  const prev = () => {
    if (step > 0) {
      setDirection(-1)
      setStep((current) => current - 1)
    }
  }

  const pwStrength = getPasswordStrength(data.password)
  const isMercosulPlate = /^[A-Z]{3}-[0-9][A-Z0-9][0-9]{2}$/.test(data.plate)

  return (
    <section className="registration-section section-pad">
      {/* Subtle animated urban network canvas in the background */}
      <NetworkMotion className="reg-bg-network" />

      <div className="registration-shell">
        {/* LEFT COLUMN: STICKY TELEMETRY, BRAND HEADLINE & 3D INTERACTIVE HUB */}
        <motion.div
          className="registration-intro"
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="registration-eyebrow"
            initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.03, y: -2 }}
          >
            <span className="eyebrow-pulse-dot" />
            <span>CADASTRO DE PARCEIRO LOGMOVY</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 22, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            Seu próximo
            <br />
            passo <em className="reg-em-animated">começa</em>
            <br />
            <em className="reg-em-animated">por aqui.</em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          >
            Preencha seus dados em poucos minutos, configure seus repasses via PIX e escolha quando quer estar na rua.
          </motion.p>

          {/* Interactive 3D Three.js Telemetry Core */}
          <Registration3DScene
            step={step}
            completionScore={completionScore}
            activeDaysCount={data.days.length}
            submitted={submitted}
          />

          {/* Live Dynamic Partner Pass Preview Card (Desktop) */}
          <motion.div
            className="reg-live-pass-card reg-desktop-only-block reg-pass-card-motion"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4, scale: 1.015 }}
          >
            <div className="cockpit-border-beam" />
            <div className="pass-card-header">
              <div className="pass-badge-left">
                <Bike size={15} className="pass-bike-icon" />
                <span>CREDENCIAL DE PARCEIRO</span>
              </div>
              <span className="pass-status-pill">
                <span className="pass-status-dot" />
                {submitted ? 'ATIVO' : `ETAPA 0${step + 1}/04`}
              </span>
            </div>

            <div className="pass-card-body">
              <div className="pass-info-col">
                <span className="pass-meta-label">CONDUTOR PARCEIRO</span>
                <strong className="pass-driver-name">
                  {data.name.trim() || 'Seu nome aparecerá aqui'}
                </strong>
                <span className="pass-sub-detail">
                  {data.cpf ? `CPF: ${data.cpf}` : 'CPF pendente'} ·{' '}
                  {data.days.length} {data.days.length === 1 ? 'dia/sem' : 'dias/sem'}
                </span>
              </div>

              {/* Mini Mercosul License Plate Live Preview */}
              <motion.div
                whileHover={{ scale: 1.05, rotate: -1 }}
                className={`mercosul-plate-mini ${isMercosulPlate ? 'is-valid' : ''}`}
              >
                <div className="plate-top-band">
                  <span>BRASIL</span>
                </div>
                <div className="plate-code">{data.plate || 'ABC-1D23'}</div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="registration-assurance reg-desktop-only-flex"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -2 }}
          >
            <div className="assurance-icon-box">
              <ShieldCheck size={17} />
            </div>
            <div>
              <strong>Ambiente criptografado ponta a ponta</strong>
              <span>Seus dados são usados exclusivamente para análise e repasses.</span>
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN: DYNAMIC MULTI-STEP INTERACTIVE COCKPIT CARD */}
        <motion.div
          className="registration-card"
          initial={{ opacity: 0, y: 28, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Top Ambient Glow Line */}
          <div
            className="reg-card-top-progress-glow"
            style={{ width: `${Math.round(completionScore * 100)}%` }}
          />

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success-screen"
                className="registration-success"
                role="status"
                initial={{ opacity: 0, scale: 0.95, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="success-emblem-ring">
                  <CheckCircle2 size={38} />
                </div>
                <span className="success-kicker-pill">PROTOCOLO #LMV-{Math.floor(100000 + Math.random() * 900000)}</span>
                <h3>Cadastro enviado com sucesso!</h3>
                <p>
                  Parabéns, <strong>{data.name.split(' ')[0] || 'Parceiro'}</strong>! Suas informações foram
                  registradas com segurança. Nossa equipe fará a validação cadastral para liberar seu acesso à malha{' '}
                  <strong>LogMovy</strong>.
                </p>

                <div className="success-summary-box">
                  <div className="summary-item">
                    <span>Veículo / Placa</span>
                    <strong>{data.plate || 'Informado'}</strong>
                  </div>
                  <div className="summary-item">
                    <span>Chave PIX ({data.pixType})</span>
                    <strong>{data.pixKey || 'Configurada'}</strong>
                  </div>
                  <div className="summary-item">
                    <span>Disponibilidade</span>
                    <strong>{data.days.length} dias selecionados</strong>
                  </div>
                </div>

                <button
                  type="button"
                  className="reg-btn-reset"
                  onClick={() => {
                    setData(initialData)
                    setStep(0)
                    setSubmitted(false)
                  }}
                >
                  <span>Preencher novo cadastro</span>
                  <ArrowRight size={16} />
                </button>
              </motion.div>
            ) : (
              <div key="form-flow">
                {/* Interactive Stepper Navigation Pills */}
                <div className="reg-stepper-bar" role="tablist" aria-label="Etapas do cadastro">
                  {stepMeta.map((item, idx) => {
                    const IconComponent = item.icon
                    const isCompleted = idx < step
                    const isCurrent = idx === step
                    return (
                      <button
                        key={item.num}
                        type="button"
                        role="tab"
                        aria-selected={isCurrent}
                        onClick={() => goToStep(idx)}
                        disabled={idx > step}
                        className={`reg-step-tab ${isCurrent ? 'is-current' : ''} ${
                          isCompleted ? 'is-completed' : ''
                        }`}
                      >
                        <span className="step-tab-bubble">
                          {isCompleted ? <Check size={13} strokeWidth={3} /> : <IconComponent size={14} />}
                        </span>
                        <span className="step-tab-text">
                          <small>ETAPA {item.num}</small>
                          <strong>{item.short}</strong>
                        </span>
                      </button>
                    )
                  })}
                </div>

                {/* Current Step Header */}
                <motion.div
                  key={`head-${step}`}
                  className="registration-progress-head"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div>
                    <div className="reg-head-eyebrow">
                      <span>ETAPA {stepMeta[step].num} DE 04</span>
                      <span className="reg-head-dot">·</span>
                      <span className="reg-head-pct">{Math.round(completionScore * 100)}% completo</span>
                    </div>
                    <h3>{stepMeta[step].title}</h3>
                    <p className="reg-head-sub">{stepMeta[step].subtitle}</p>
                  </div>
                  <motion.span
                    key={`badge-${step}`}
                    initial={{ scale: 0.85, rotate: -8 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 420, damping: 18 }}
                    className="registration-step-icon"
                  >
                    {stepMeta[step].num}
                  </motion.span>
                </motion.div>

                {/* Segmented Progress Bar */}
                <div className="registration-progress" aria-label={`Etapa ${step + 1} de 4`}>
                  {[0, 1, 2, 3].map((index) => (
                    <span
                      key={index}
                      className={index < step ? 'completed' : index === step ? 'active' : ''}
                    />
                  ))}
                </div>

                <form onSubmit={next} className="reg-dynamic-form">
                  <AnimatePresence mode="wait" custom={direction}>
                    {/* STEP 01: PERSONAL & VEHICLE DATA */}
                    {step === 0 && (
                      <motion.div
                        key="step-0"
                        custom={direction}
                        initial={{ opacity: 0, x: direction * 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: direction * -24 }}
                        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                        className="registration-fields"
                      >
                        <PremiumField
                          label="Nome completo"
                          name="name"
                          value={data.name}
                          onChange={update}
                          placeholder="Como está no seu documento"
                          icon={<User size={16} />}
                        />
                        <PremiumField
                          label="CPF"
                          name="cpf"
                          value={data.cpf}
                          onChange={update}
                          placeholder="000.000.000-00"
                          icon={<Hash size={16} />}
                          badge={data.cpf.length === 14 ? 'Formato válido' : undefined}
                        />
                        <PremiumField
                          label="Data de nascimento"
                          name="birthDate"
                          type="date"
                          value={data.birthDate}
                          onChange={update}
                          icon={<Calendar size={16} />}
                        />
                        <PremiumField
                          label="E-mail principal"
                          name="email"
                          type="email"
                          value={data.email}
                          onChange={update}
                          placeholder="voce@email.com"
                          icon={<Mail size={16} />}
                        />
                        <PremiumField
                          label="Celular / WhatsApp"
                          name="phone"
                          type="tel"
                          value={data.phone}
                          onChange={update}
                          placeholder="(00) 00000-0000"
                          icon={<Smartphone size={16} />}
                        />

                        {/* Password field with eye toggle and strength meter */}
                        <div className="reg-password-group">
                          <PremiumField
                            label="Crie sua senha"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            value={data.password}
                            onChange={update}
                            placeholder="Mínimo de 8 caracteres"
                            icon={<Lock size={16} />}
                            rightSlot={
                              <button
                                type="button"
                                className="reg-pw-toggle"
                                onClick={() => setShowPassword((v) => !v)}
                                tabIndex={-1}
                                aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                              >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                              </button>
                            }
                          />
                          <div className="pw-strength-bar-wrap">
                            <div className="pw-bars">
                              {[1, 2, 3, 4].map((lvl) => (
                                <span
                                  key={lvl}
                                  className="pw-bar-seg"
                                  style={{
                                    backgroundColor:
                                      pwStrength.score >= lvl ? pwStrength.color : '#e2e8f0',
                                  }}
                                />
                              ))}
                            </div>
                            <span className="pw-strength-label" style={{ color: pwStrength.color }}>
                              {pwStrength.label}
                            </span>
                          </div>
                        </div>

                        <PremiumField
                          label="Placa da moto"
                          name="plate"
                          value={data.plate}
                          onChange={update}
                          placeholder="ABC-1D23"
                          icon={<Bike size={16} />}
                          badge={isMercosulPlate ? 'Mercosul / OK' : 'Padrão ABC-1D23'}
                        />
                        <PremiumField
                          label="CNPJ MEI"
                          name="mei"
                          required={false}
                          value={data.mei}
                          onChange={update}
                          placeholder="00.000.000/0000-00"
                          icon={<Building2 size={16} />}
                        />
                        <PremiumField
                          label="Número de registro CNH"
                          name="cnh"
                          required={false}
                          value={data.cnh}
                          onChange={update}
                          placeholder="Somente números (opcional)"
                          icon={<FileText size={16} />}
                          fullWidth
                        />
                      </motion.div>
                    )}

                    {/* STEP 02: BANKING & PIX */}
                    {step === 1 && (
                      <motion.div
                        key="step-1"
                        custom={direction}
                        initial={{ opacity: 0, x: direction * 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: direction * -24 }}
                        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                        className="registration-fields"
                      >
                        <PremiumSelect
                          label="Instituição / Banco"
                          value={data.bank}
                          onChange={(val) => update('bank', val)}
                          options={popularBanks}
                          placeholder="Selecione seu banco ou pesquise pelo código..."
                          searchPlaceholder="Digite o nome ou código (ex: 260, Nubank, Itaú)..."
                          icon={<Landmark size={16} />}
                          badge="Busca rápida FEBRABAN"
                          fullWidth
                        />

                        <PremiumField
                          label="Agência"
                          name="agency"
                          value={data.agency}
                          onChange={update}
                          placeholder="Ex: 0001"
                          icon={<Building2 size={16} />}
                        />
                        <PremiumField
                          label="Conta com dígito"
                          name="account"
                          value={data.account}
                          onChange={update}
                          placeholder="Ex: 123456-7"
                          icon={<CreditCard size={16} />}
                        />

                        {/* Interactive Account Type Selector */}
                        <div className="reg-premium-field col-span-full">
                          <div className="reg-field-top">
                            <span className="reg-field-label">
                              Tipo de conta <b className="reg-req-star">*</b>
                            </span>
                          </div>
                          <div className="reg-segmented-pills">
                            {['Conta corrente', 'Conta poupança', 'Conta pagamento'].map((t) => (
                              <button
                                key={t}
                                type="button"
                                onClick={() => update('accountType', t)}
                                className={`reg-seg-pill ${data.accountType === t ? 'active' : ''}`}
                              >
                                <Check
                                  size={13}
                                  className={`seg-check ${data.accountType === t ? 'visible' : ''}`}
                                />
                                <span>{t}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        <PremiumField
                          label="CPF do titular da conta"
                          name="holderCpf"
                          value={data.holderCpf}
                          onChange={update}
                          placeholder="000.000.000-00"
                          icon={<User size={16} />}
                          badge={
                            data.holderCpf && data.holderCpf === data.cpf
                              ? 'Mesmo CPF do cadastro'
                              : undefined
                          }
                          fullWidth
                        />

                        {/* Interactive PIX Key Type Chips */}
                        <div className="reg-premium-field col-span-full">
                          <div className="reg-field-top">
                            <span className="reg-field-label">
                              Tipo de chave PIX <b className="reg-req-star">*</b>
                            </span>
                            <span className="reg-field-mini-badge">Preenchimento inteligente</span>
                          </div>
                          <div className="reg-pix-type-grid">
                            {['CPF', 'Celular', 'E-mail', 'CNPJ', 'Chave aleatória'].map((pt) => (
                              <button
                                key={pt}
                                type="button"
                                onClick={() => handlePixTypeChange(pt)}
                                className={`reg-pix-chip ${data.pixType === pt ? 'active' : ''}`}
                              >
                                {pt}
                              </button>
                            ))}
                          </div>
                        </div>

                        <PremiumField
                          label={`Chave PIX (${data.pixType || 'Selecione o tipo'})`}
                          name="pixKey"
                          value={data.pixKey}
                          onChange={update}
                          placeholder="Informe sua chave PIX ativa para repasses"
                          icon={<KeyRound size={16} />}
                          fullWidth
                        />

                        <div className="registration-inline-note">
                          <Sparkles size={15} />
                          <span>
                            Dica: Ao selecionar CPF, Celular ou E-mail acima, preenchemos automaticamente com os
                            dados informados na Etapa 01.
                          </span>
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 03: AVAILABILITY DAYS */}
                    {step === 2 && (
                      <motion.div
                        key="step-2"
                        custom={direction}
                        initial={{ opacity: 0, x: direction * 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: direction * -24 }}
                        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                        className="registration-days"
                      >
                        <div className="reg-days-toolbar">
                          <p>Escolha seus dias preferidos ou use um atalho rápido:</p>
                          <div className="reg-days-presets">
                            <button
                              type="button"
                              onClick={() => selectPresetDays('weekdays')}
                              className="preset-chip"
                            >
                              Seg a Sex
                            </button>
                            <button
                              type="button"
                              onClick={() => selectPresetDays('weekend')}
                              className="preset-chip"
                            >
                              Fim de semana
                            </button>
                            <button
                              type="button"
                              onClick={() => selectPresetDays('all')}
                              className="preset-chip"
                            >
                              Todos os dias
                            </button>
                          </div>
                        </div>

                        <div className="registration-day-grid">
                          {daysList.map((d) => {
                            const isSelected = data.days.includes(d.id)
                            return (
                              <label
                                key={d.id}
                                className={`registration-day ${isSelected ? 'selected' : ''}`}
                              >
                                <input
                                  type="checkbox"
                                  checked={isSelected}
                                  onChange={() => toggleDay(d.id)}
                                />
                                <span className="day-check">
                                  <Check size={13} strokeWidth={3} />
                                </span>
                                <div className="day-info-col">
                                  <strong>{d.label}</strong>
                                  <small>{d.tag}</small>
                                </div>
                                <span className="day-short-pill">{d.short}</span>
                              </label>
                            )
                          })}
                        </div>

                        <div className={`reg-days-summary-bar ${daysError ? 'is-error' : ''}`}>
                          {daysError ? (
                            <>
                              <AlertCircle size={16} />
                              <span>Selecione pelo menos 1 dia disponível para prosseguir.</span>
                            </>
                          ) : (
                            <>
                              <BadgeCheck size={16} />
                              <span>
                                <strong>{data.days.length} de 7 dias</strong> selecionados na sua escala
                                flexível.
                              </span>
                            </>
                          )}
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 04: REVIEW & TERMS */}
                    {step === 3 && (
                      <motion.div
                        key="step-3"
                        custom={direction}
                        initial={{ opacity: 0, x: direction * 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: direction * -24 }}
                        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                        className="registration-terms"
                      >
                        {/* Quick Review Grid before Accepting Terms */}
                        <div className="reg-review-grid">
                          <div className="review-mini-card">
                            <span>CONDUTOR & MOTO</span>
                            <strong>{data.name || 'Não informado'}</strong>
                            <small>
                              CPF: {data.cpf || '—'} · Placa: {data.plate || '—'}
                            </small>
                          </div>
                          <div className="review-mini-card">
                            <span> CONTA & CHAVE PIX</span>
                            <strong>{data.bank || 'Banco informado'}</strong>
                            <small>
                              PIX ({data.pixType}): {data.pixKey || '—'}
                            </small>
                          </div>
                        </div>

                        <div className="terms-scroll">
                          <div className="terms-doc-header">
                            <span className="terms-doc-badge">CONTRATO SaaS + MARKETPLACE · v1.1</span>
                            <h4>Contrato de Adesão e Licença de Uso da Plataforma LogMovy</h4>
                            <small>Profissional Parceiro / Motofretista · Foro de Campina Grande/PB</small>
                          </div>

                          <div className="terms-highlight-box">
                            <strong>RESUMO EXECUTIVO — REGRAS-CHAVE</strong>
                            <ul>
                              <li><strong>1. Autonomia:</strong> O Profissional Parceiro escolhe quando informar disponibilidade e se aceita ou não cada oportunidade antes do aceite.</li>
                              <li><strong>2. Sem jornada imposta:</strong> Não há obrigação de permanecer online, cumprir quantidade mínima de horas, frequência semanal ou percentual mínimo de aceites.</li>
                              <li><strong>3. Sem exclusividade:</strong> O profissional pode atender clientes próprios, empresas distintas e utilizar plataformas concorrentes.</li>
                              <li><strong>4. Aceite por serviço:</strong> Após aceitar uma oportunidade específica, nasce um compromisso civil/comercial limitado àquele serviço, com condições previamente apresentadas.</li>
                              <li><strong>5. Dados e segurança:</strong> Cadastro, documentos, localização quando necessária, histórico de serviços, pagamentos e logs são tratados conforme a LGPD e a Política de Privacidade.</li>
                              <li><strong>6. Proteção e Clube:</strong> Proteção veicular e Clube de Benefícios são ofertas facultativas, autônomas e sujeitas a condições próprias dos fornecedores.</li>
                              <li><strong>7. Cadastro gratuito:</strong> A adesão inicial à LogMovy não possui taxa de adesão. Serviços opcionais ou planos futuros somente poderão ser cobrados com informação prévia e aceite específico.</li>
                            </ul>
                          </div>

                          <h5>1. Objeto, Escopo e Natureza SaaS / Marketplace</h5>
                          <p>
                            Este contrato disciplina o cadastro e a licença de uso da plataforma <strong>LogMovy</strong>, em modalidade Software as a Service (SaaS), bem como o acesso a funcionalidades de marketplace destinadas a aproximar Empresas Parceiras e Profissionais Parceiros para oportunidades específicas de motofrete.
                          </p>
                          <p>
                            A LogMovy fornece infraestrutura tecnológica e ambiente digital de conexão e gestão de oportunidades. O serviço não constitui fornecimento de mão de obra, agência de trabalho temporário, vínculo empregatício automático ou terceirização operacional gerenciada.
                          </p>

                          <h5>2. A LogMovy não é Cooperativa, Associação ou Entidade de Classe</h5>
                          <p>
                            A LogMovy não se constitui como cooperativa de trabalho, sociedade cooperativa, associação, sindicato ou sociedade entre os profissionais cadastrados. O cadastro não gera quota-parte, capital cooperativo, assembleia, direito de voto societário, fundo comum ou rateio de sobras ou perdas. A relação é individual e contratual, limitada ao uso da tecnologia e aos serviços específicos aceitos.
                          </p>

                          <h5>3. Autonomia do Profissional e Ausência de Exclusividade</h5>
                          <p>
                            O Profissional Parceiro possui autonomia para organizar sua atividade, observados os compromissos que voluntariamente aceitar. Não há exclusividade perante a LogMovy ou as Empresas Parceiras, podendo atender clientes próprios, prestar serviços para terceiros e utilizar plataformas concorrentes.
                          </p>
                          <p>
                            Não existe obrigação de número mínimo de horas, dias ou serviços por semana, nem percentual mínimo de aceitação. Recusa antes do aceite não é infração e não gera advertência, multa ou bloqueio. A agenda de disponibilidade é manifestação de preferência, não ponto ou escala laboral obrigatória.
                          </p>

                          <h5>4. Ausência de Vínculo Empregatício Automático e Realidade Operacional</h5>
                          <p>
                            As Partes declaram a intenção de manter relação civil/comercial relacionada ao uso da tecnologia e às oportunidades individualmente aceitas. A LogMovy não garante salário, remuneração mínima periódica, quantidade de demandas, estabilidade, férias, 13º salário ou FGTS, e não exercerá poder disciplinar trabalhista, chefia hierárquica ou controle de jornada. Regras de segurança, integridade da plataforma e medidas contra fraude não equivalem a subordinação.
                          </p>

                          <h5>5. Elegibilidade, Cadastro e Documentação</h5>
                          <p>
                            O Profissional Parceiro deverá fornecer dados verdadeiros, manter habilitação (CNH) e documentação da motocicleta regulares e observar a Lei nº 12.009/2009, o Código de Trânsito Brasileiro, regulamentações do Contran e normas aplicáveis ao motofrete. Quando aplicável, deverá manter inscrição empresarial/MEI ativa e compatível com a atividade.
                          </p>
                          <p>
                            O acesso digital é individual e protegido por credenciais próprias, sendo vedada a cessão ou empréstimo de conta a terceiros.
                          </p>

                          <h5>6. Agenda Voluntária, Publicação, Aceite e Execução</h5>
                          <p>
                            Cada oportunidade apresentará, na medida aplicável, empresa demandante, atividade, região/local, data e janela prevista, valor ou critério de cálculo e condições essenciais à decisão. O Profissional somente ficará vinculado à oportunidade após manifestação inequívoca de aceite.
                          </p>
                          <p>
                            Depois do aceite, o profissional assume obrigação de diligência, pontualidade razoável, comunicação e execução do serviço específico. Cancelamentos posteriores ao aceite deverão ser comunicados imediatamente. O não comparecimento injustificado ou descumprimento grave de compromisso já aceito poderá repercutir em indicador de confiabilidade ou restrição contratual proporcional, sempre resguardado canal de contestação.
                          </p>

                          <h5>7. Avaliações, Confiabilidade e Repasses Financeiros</h5>
                          <p>
                            A plataforma poderá utilizar indicadores de qualidade e confiabilidade considerando conclusão de serviços aceitos e pontualidade, sem utilizar recusas anteriores ao aceite ou tempo offline como punição.
                          </p>
                          <p>
                            O valor de cada oportunidade será informado antes do aceite e os repasses serão realizados por meio dos dados bancários e chave PIX cadastrados pelo titular. A adesão inicial à plataforma é gratuita.
                          </p>

                          <h5>8. Relação com Empresas Parceiras e Responsabilidades</h5>
                          <p>
                            As Empresas Parceiras utilizam a plataforma para publicar demandas e contratar oportunidades específicas, sendo vedado utilizar a LogMovy para impor plantão compulsório ou exigir exclusividade. O profissional é responsável pela condução segura, equipamentos obrigatórios e regularidade do veículo.
                          </p>

                          <h5>9. Proteção Veicular e Clube de Benefícios (Facultativos)</h5>
                          <p>
                            A LogMovy poderá apresentar ofertas facultativas de proteção veicular, assistência 24h e Clube de Benefícios com descontos em oficinas, peças e serviços parceiros. A exibição não ativa cobertura automática: a adesão é totalmente opcional, depende de contratação própria junto ao fornecedor responsável e a não adesão não afeta o acesso, nota ou ranking no marketplace.
                          </p>

                          <h5>10. Privacidade, Proteção de Dados (LGPD) e Segurança</h5>
                          <p>
                            O tratamento de dados pessoais seguirá a Política de Privacidade LogMovy e a Lei nº 13.709/2018 (LGPD), abrangendo dados de identificação, CNH, veículo, disponibilidade, aceites, histórico financeiro, chave PIX, registros técnicos de acesso e localização (limitada ao necessário para oferta próxima, rota, comprovação de execução e prevenção a fraude).
                          </p>
                          <p>
                            A LogMovy não vende banco de dados pessoal a terceiros e preserva registros eletrônicos de aceite (data, hora, IP e versão contratual) como meio legítimo de prova e auditoria. O titular pode exercer seus direitos previstos na LGPD pelos canais de atendimento da plataforma.
                          </p>

                          <h5>11. Propriedade Intelectual, Suspensão, Vigência e Foro</h5>
                          <p>
                            O profissional recebe licença limitada, revogável e intransferível para uso legítimo da plataforma, sendo vedada fraude, criação de contas fictícias ou conduta ilícita. O usuário pode solicitar encerramento da conta a qualquer momento, respeitados compromissos já aceitos.
                          </p>
                          <p>
                            Este contrato entra em vigor na data do aceite eletrônico. Aplica-se a legislação brasileira, elegendo-se o foro de <strong>Campina Grande/PB</strong> para dirimir controvérsias civis/comerciais relacionadas a este instrumento.
                          </p>
                        </div>

                        <label className={`registration-consent ${data.acceptedTerms ? 'is-checked' : ''}`}>
                          <input
                            type="checkbox"
                            required
                            checked={data.acceptedTerms}
                            onChange={(e) =>
                              setData((current) => ({ ...current, acceptedTerms: e.target.checked }))
                            }
                          />
                          <span>
                            Li e compreendi o <strong>Contrato de Adesão e Licença de Uso da Plataforma LogMovy (v1.1)</strong>, declaro ciência da Política de Privacidade (LGPD), reconheço a natureza SaaS/Marketplace autônoma e confirmo que os dados informados são verdadeiros. <b>*</b>
                          </span>
                        </label>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="registration-actions">
                    {step > 0 && (
                      <motion.button
                        type="button"
                        className="registration-back"
                        onClick={prev}
                        whileHover={{ x: -3, scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <ArrowLeft size={16} />
                        <span>Voltar</span>
                      </motion.button>
                    )}
                    <motion.button
                      type="submit"
                      className="registration-next reg-next-shimmer-btn"
                      whileHover={{ y: -2, scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                    >
                      <span>{step === 3 ? 'Finalizar cadastro' : 'Continuar'}</span>
                      <span className="reg-next-icon-bubble">
                        {step === 3 ? <Check size={16} strokeWidth={3} /> : <ArrowRight size={16} />}
                      </span>
                      <span className="btn-shimmer" />
                    </motion.button>
                  </div>
                </form>

                <div className="reg-footer-meta">
                  <p className="registration-required">* Campos obrigatórios</p>
                  <span className="reg-security-badge">
                    <Lock size={11} /> Conexão segura SSL 256-bit
                  </span>
                </div>
              </div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* MOBILE BOTTOM STACK: PARTNER PASS & ASSURANCE BELOW FORM */}
        <div className="reg-mobile-bottom-widgets">
          <div className="reg-live-pass-card">
            <div className="pass-card-header">
              <div className="pass-badge-left">
                <Bike size={15} className="pass-bike-icon" />
                <span>CREDENCIAL DE PARCEIRO</span>
              </div>
              <span className="pass-status-pill">
                <span className="pass-status-dot" />
                {submitted ? 'ATIVO' : `ETAPA 0${step + 1}/04`}
              </span>
            </div>

            <div className="pass-card-body">
              <div className="pass-info-col">
                <span className="pass-meta-label">CONDUTOR PARCEIRO</span>
                <strong className="pass-driver-name">
                  {data.name.trim() || 'Seu nome aparecerá aqui'}
                </strong>
                <span className="pass-sub-detail">
                  {data.cpf ? `CPF: ${data.cpf}` : 'CPF pendente'} ·{' '}
                  {data.days.length} {data.days.length === 1 ? 'dia/sem' : 'dias/sem'}
                </span>
              </div>

              <div className={`mercosul-plate-mini ${isMercosulPlate ? 'is-valid' : ''}`}>
                <div className="plate-top-band">
                  <span>BRASIL</span>
                </div>
                <div className="plate-code">{data.plate || 'ABC-1D23'}</div>
              </div>
            </div>
          </div>

          <div className="registration-assurance">
            <div className="assurance-icon-box">
              <ShieldCheck size={17} />
            </div>
            <div>
              <strong>Ambiente criptografado ponta a ponta</strong>
              <span>Seus dados são usados exclusivamente para análise e repasses.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
