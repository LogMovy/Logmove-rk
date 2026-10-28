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

const daysList = [
  { id: 'Segunda-feira', short: 'SEG', label: 'Segunda-feira', tag: 'Alta demanda' },
  { id: 'Terça-feira', short: 'TER', label: 'Terça-feira', tag: 'Fluxo comercial' },
  { id: 'Quarta-feira', short: 'QUA', label: 'Quarta-feira', tag: 'Fluxo comercial' },
  { id: 'Quinta-feira', short: 'QUI', label: 'Quinta-feira', tag: 'Alta demanda' },
  { id: 'Sexta-feira', short: 'SEX', label: 'Sexta-feira', tag: 'Pico semanal' },
  { id: 'Sábado', short: 'SÁB', label: 'Sábado', tag: 'Plantão especial' },
  { id: 'Domingo', short: 'DOM', label: 'Domingo', tag: 'Flexível' },
]

const popularBanks = [
  '001 - Banco do Brasil',
  '260 - Nu Pagamentos (Nubank)',
  '341 - Itaú Unibanco',
  '237 - Bradesco',
  '104 - Caixa Econômica Federal',
  '033 - Santander',
  '077 - Banco Inter',
  '336 - Banco C6',
  '290 - PagBank',
  '380 - PicPay',
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
    <div
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
    </div>
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
        <div className="registration-intro">
          <div className="registration-eyebrow">
            <span className="eyebrow-pulse-dot" />
            <span>CADASTRO DE PARCEIRO LOGMOVY</span>
          </div>

          <h2>
            Seu próximo
            <br />
            passo <em>começa</em>
            <br />
            <em>por aqui.</em>
          </h2>

          <p>
            Preencha seus dados em poucos minutos, configure seus repasses via PIX e escolha quando quer estar na rua.
          </p>

          {/* Interactive 3D Three.js Telemetry Core */}
          <Registration3DScene
            step={step}
            completionScore={completionScore}
            activeDaysCount={data.days.length}
            submitted={submitted}
          />

          {/* Live Dynamic Partner Pass Preview Card */}
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

              {/* Mini Mercosul License Plate Live Preview */}
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

        {/* RIGHT COLUMN: DYNAMIC MULTI-STEP INTERACTIVE COCKPIT CARD */}
        <div className="registration-card">
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
                <div className="registration-progress-head">
                  <div>
                    <div className="reg-head-eyebrow">
                      <span>ETAPA {stepMeta[step].num} DE 04</span>
                      <span className="reg-head-dot">·</span>
                      <span className="reg-head-pct">{Math.round(completionScore * 100)}% completo</span>
                    </div>
                    <h3>{stepMeta[step].title}</h3>
                    <p className="reg-head-sub">{stepMeta[step].subtitle}</p>
                  </div>
                  <span className="registration-step-icon">{stepMeta[step].num}</span>
                </div>

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
                        <PremiumField
                          label="Instituição / Banco"
                          name="bank"
                          value={data.bank}
                          onChange={update}
                          placeholder="Ex: 260 - Nubank, Itaú, Inter..."
                          icon={<Landmark size={16} />}
                          list="logmovy-banks-list"
                          fullWidth
                        />
                        <datalist id="logmovy-banks-list">
                          {popularBanks.map((b) => (
                            <option key={b} value={b} />
                          ))}
                        </datalist>

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
                          <h4>Termos de uso — Cadastro de Parceiro LogMovy</h4>
                          <p>
                            Ao prosseguir, você solicita seu cadastro como profissional parceiro da{' '}
                            <strong>LogMovy</strong>. As informações fornecidas poderão ser usadas para
                            identificar você, analisar seu perfil e validar os dados e documentos informados.
                          </p>
                          <p>
                            O envio deste cadastro não garante aprovação, oferta de serviços, volume mínimo de
                            corridas ou renda. A disponibilidade de oportunidades depende da demanda e da
                            região.
                          </p>
                          <p>
                            Você define sua disponibilidade e decide se aceita cada oportunidade apresentada,
                            observando as condições informadas antes de confirmar o serviço. Benefícios e
                            serviços de terceiros, quando oferecidos, são opcionais e sujeitos a condições
                            próprias.
                          </p>
                          <p>
                            Você declara que os dados informados são verdadeiros e que tem autorização para
                            utilizar a conta bancária e a chave PIX cadastradas. Mantenha sua senha em sigilo e
                            comunique qualquer uso não autorizado.
                          </p>
                          <p>
                            Seus dados serão tratados para gestão do cadastro, validação e operação dos
                            repasses, conforme a legislação aplicável e o aviso de privacidade da LogMovy.
                            Você poderá solicitar informações sobre seus dados pelos canais de atendimento da
                            plataforma.
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
                            Li e aceito integralmente os termos de uso e a política de privacidade da{' '}
                            <strong>LogMovy</strong>. <b>*</b>
                          </span>
                        </label>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="registration-actions">
                    {step > 0 && (
                      <button type="button" className="registration-back" onClick={prev}>
                        <ArrowLeft size={16} />
                        <span>Voltar</span>
                      </button>
                    )}
                    <button type="submit" className="registration-next">
                      <span>{step === 3 ? 'Finalizar cadastro' : 'Continuar'}</span>
                      <span className="reg-next-icon-bubble">
                        {step === 3 ? <Check size={16} strokeWidth={3} /> : <ArrowRight size={16} />}
                      </span>
                    </button>
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
        </div>
      </div>
    </section>
  )
}
