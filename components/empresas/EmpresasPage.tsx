'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  Building2,
  ArrowUpRight,
  ArrowRight,
  Check,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Clock,
  Zap,
  Users,
  Layers,
  MapPin,
  FileCheck2,
  Sparkles,
  HelpCircle,
  ChevronDown,
  PhoneCall,
  Bike,
  Briefcase,
  Store,
  PackageCheck,
  BarChart3,
  Lock,
} from 'lucide-react'
import BlurText from '@/components/reactbits/BlurText'
import ShinyText from '@/components/reactbits/ShinyText'
import SpotlightCard from '@/components/reactbits/SpotlightCard'
import CountUp from '@/components/reactbits/CountUp'
import Squares from '@/components/Squares'
import DeliveryMotion from '@/components/DeliveryMotion'
import NetworkMotion from '@/components/NetworkMotion'
import PremiumSelect, { SelectOption } from '@/components/PremiumSelect'

const segmentOptions: SelectOption[] = [
  {
    value: 'Restaurante / Delivery Gastronômico',
    label: 'Restaurante / Delivery Gastronômico',
    code: 'FOOD',
    short: 'Gastronomia',
    badge: 'Alta Demanda',
    color: '#06284b',
  },
  {
    value: 'Farmácia / Saúde & Bem-Estar',
    label: 'Farmácia / Saúde & Bem-Estar',
    code: 'MED',
    short: 'Farmácia',
    badge: 'Entrega Expressa',
    color: '#0e7490',
  },
  {
    value: 'E-commerce / Varejo Local',
    label: 'E-commerce / Varejo Local',
    code: 'SHOP',
    short: 'Varejo',
    badge: 'Last-Mile',
    color: '#4338ca',
  },
  {
    value: 'Autopeças / Distribuidora',
    label: 'Autopeças / Distribuidora',
    code: 'AUTO',
    short: 'Distribuição',
    badge: 'B2B Rápido',
    color: '#0f172a',
  },
  {
    value: 'Supermercado / Conveniência',
    label: 'Supermercado / Conveniência',
    code: 'MKT',
    short: 'Mercado',
    badge: 'Recorrente',
    color: '#15803d',
  },
  {
    value: 'Escritório / Malote & Documentos',
    label: 'Escritório / Malote & Documentos',
    code: 'DOC',
    short: 'Corporativo',
    badge: 'Segurança',
    color: '#334155',
  },
]

const whyHireData = [
  {
    num: '01',
    badge: 'Escala em Picos',
    title: 'Nunca mais perca vendas por falta de entregador',
    desc: 'Nos horários de almoço, jantar, dias de chuva ou datas sazonais, sua empresa acessa uma malha ativa de motoboys parceiros prontos para absorver sua demanda.',
    highlight: 'Operação elástica sob demanda',
    icon: Zap,
  },
  {
    num: '02',
    badge: 'Redução de Custos',
    title: 'Zero custo fixo com frota própria ociosa',
    desc: 'Elimine gastos com manutenção de veículos próprios, depreciação e ociosidade em horários de baixo movimento. Você aciona a logística conforme o ritmo real do seu negócio.',
    highlight: 'Eficiência financeira B2B',
    icon: TrendingUp,
  },
  {
    num: '03',
    badge: 'Triagem Rigorosa',
    title: 'Motoboys verificados e documentados',
    desc: 'Todos os condutores parceiros passam por validação de CNH categoria A com EAR, documentação da motocicleta, placa padrão Mercosul e cadastro bancário validado.',
    highlight: 'Parceiros homologados',
    icon: ShieldCheck,
  },
  {
    num: '04',
    badge: 'Segurança Jurídica',
    title: 'Modelo SaaS e Marketplace estruturado',
    desc: 'A LogMovy opera com contratos digitais claros de intermediação tecnológica, conectando sua empresa a profissionais autônomos independentes com rastreabilidade total.',
    highlight: 'Conformidade contratual',
    icon: FileCheck2,
  },
  {
    num: '05',
    badge: 'Formatos Flexíveis',
    title: 'Entregas avulsas, turnos dedicados ou híbrido',
    desc: 'Escolha o formato ideal: chame por corrida avulsa, reserve motoboys dedicados para o seu turno de pico ou combine uma base fixa com reforço sob demanda.',
    highlight: 'Adaptado à sua rotina',
    icon: Layers,
  },
  {
    num: '06',
    badge: 'Foco no seu Negócio',
    title: 'Tire a gestão de entregas das suas costas',
    desc: 'Enquanto sua equipe foca em produzir, vender e atender bem o cliente no balcão, a LogMovy cuida da conexão logística da coleta até a porta do consumidor.',
    highlight: 'Mais tempo para crescer',
    icon: BarChart3,
  },
]

const b2bStepsData = [
  {
    num: 1,
    code: '01',
    tag: 'CADASTRO RÁPIDO',
    title: 'Preencha o formulário corporativo nesta página',
    lead: 'Informe os dados básicos da sua empresa, segmento de atuação e o volume estimado de entregas diárias.',
    details: [
      'Leva menos de 2 minutos para registrar o perfil operacional do seu negócio.',
      'Você já escolhe se prefere atendimento sob demanda, turno dedicado ou modelo híbrido.',
      'Receba um protocolo corporativo imediato assim que concluir o envio.',
    ],
    icon: Building2,
  },
  {
    num: 2,
    code: '02',
    tag: 'DIAGNÓSTICO LOGÍSTICO',
    title: 'Alinhamento da sua operação com nosso time B2B',
    lead: 'Nossos especialistas analisam sua região, janelas de pico e raio de entrega para desenhar a melhor condição comercial.',
    details: [
      'Mapeamento dos horários críticos (almoço, jantar, madrugadas ou horário comercial).',
      'Definição transparente de taxas, raio de atendimento e SLA esperado.',
      'Sem burocracia desnecessária: tudo resolvido digitalmente.',
    ],
    icon: Briefcase,
  },
  {
    num: 3,
    code: '03',
    tag: 'ATIVAÇÃO DA CONTA',
    title: 'Liberação do acesso corporativo na plataforma',
    lead: 'Configuramos o perfil do seu estabelecimento na malha urbana da LogMovy para conectar seus pedidos aos parceiros.',
    details: [
      'Cadastro do endereço de coleta e regras específicas de retirada do seu estabelecimento.',
      'Orientação rápida para sua equipe de expedição ou caixa acionar corridas sem erro.',
      'Acesso aos motoboys parceiros ativos no seu quadrante logístico.',
    ],
    icon: Store,
  },
  {
    num: 4,
    code: '04',
    tag: 'OPERAÇÃO NO AR',
    title: 'Solicite entregas e escale conforme suas vendas',
    lead: 'Sua empresa passa a contar com uma rede ágil de motofrete profissional acompanhando cada etapa do pedido.',
    details: [
      'Acionamento rápido de entregadores parceiros verificados.',
      'Visibilidade de coleta, deslocamento e conclusão da entrega.',
      'Relatórios claros e previsibilidade financeira para o seu fechamento.',
    ],
    icon: PackageCheck,
  },
]

const companyFaqs = [
  [
    'Que tipo de empresa pode contratar a LogMovy?',
    'Atendemos negócios de todos os portes que precisam de agilidade urbana: restaurantes, hamburguerias, pizzarias, dark kitchens, farmácias, mercados, lojas de e-commerce, autopeças, distribuidoras e escritórios.',
  ],
  [
    'Posso contratar motoboys apenas para os horários de pico (ex: almoço ou noite)?',
    'Sim! Essa é uma das maiores vantagens da LogMovy. Você pode operar no modelo sob demanda, solicitar alocação para turnos específicos de pico ou montar uma operação híbrida.',
  ],
  [
    'Como a LogMovy verifica os motoboys parceiros que atendem minha empresa?',
    'Todos os entregadores passam por pré-cadastro rigoroso com verificação de CPF, CNH Categoria A com observação de atividade remunerada (EAR), dados da motocicleta, placa padrão Mercosul e aceite formal dos Termos Operacionais.',
  ],
  [
    'Existe quantidade mínima de entregas para cadastrar minha empresa?',
    'Não. Atendemos desde estabelecimentos que realizam até 20 entregas diárias e buscam profissionalizar sua logística até grandes operações com mais de 150 entregas por dia.',
  ],
  [
    'Quanto tempo leva após o preenchimento do formulário para começar a operar?',
    'Assim que você envia o formulário abaixo, nossa equipe comercial recebe o perfil da sua operação e entra em contato rapidamente pelo WhatsApp ou e-mail informado para concluir o alinhamento e ativar sua conta.',
  ],
]

const dailyVolumeChoices = [
  { id: 'Até 20/dia', label: 'Até 20 entregas/dia', sub: 'Operação inicial / compacta' },
  { id: '20 a 50/dia', label: '20 a 50 entregas/dia', sub: 'Fluxo constante diário' },
  { id: '50 a 150/dia', label: '50 a 150 entregas/dia', sub: 'Alto giro operacional' },
  { id: '+150/dia', label: 'Mais de 150 entregas/dia', sub: 'Operação de grande escala' },
]

const modalityChoices = [
  {
    id: 'Sob Demanda (Avulso)',
    title: 'Sob Demanda (Avulso)',
    desc: 'Acione entregadores conforme os pedidos saem.',
  },
  {
    id: 'Turno Dedicado',
    title: 'Turno Dedicado',
    desc: 'Profissionais alocados para os seus horários.',
  },
  {
    id: 'Operação Híbrida',
    title: 'Operação Híbrida',
    desc: 'Base dedicada + reforço imediato nos picos.',
  },
]

const shiftOptions = [
  'Manhã (08h–11h)',
  'Almoço (11h–15h)',
  'Tarde (15h–18h)',
  'Noite / Jantar (18h–23h)',
  'Finais de Semana',
]

function maskCnpj(v: string) {
  const d = v.replace(/\D/g, '').slice(0, 14)
  if (d.length <= 2) return d
  if (d.length <= 5) return `${d.slice(0, 2)}.${d.slice(2)}`
  if (d.length <= 8) return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5)}`
  if (d.length <= 12) return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8)}`
  return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8, 12)}-${d.slice(12)}`
}

function maskPhone(v: string) {
  const d = v.replace(/\D/g, '').slice(0, 11)
  if (d.length <= 2) return d
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}


interface B2BFieldProps {
  label: string
  name: string
  type?: string
  required?: boolean
  value: string
  onChange: (val: string) => void
  placeholder?: string
  badge?: string
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode']
  fullWidth?: boolean
}

function B2BPremiumField({
  label,
  name,
  type = 'text',
  required = true,
  value,
  onChange,
  placeholder,
  badge,
  inputMode,
  fullWidth = false,
}: B2BFieldProps) {
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
        <input
          id={`field-${name}`}
          name={name}
          type={type}
          inputMode={inputMode}
          required={required}
          value={value}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete="off"
        />
        {isFilled && required && (
          <span className="reg-valid-indicator" title="Preenchido">
            <Check size={13} strokeWidth={3} />
          </span>
        )}
      </div>
    </motion.div>
  )
}

interface B2BTextareaProps {
  label: string
  name: string
  required?: boolean
  value: string
  onChange: (val: string) => void
  placeholder?: string
  rows?: number
  fullWidth?: boolean
}

function B2BPremiumTextarea({
  label,
  name,
  required = false,
  value,
  onChange,
  placeholder,
  rows = 3,
  fullWidth = true,
}: B2BTextareaProps) {
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
      </div>

      <div className="reg-textarea-shell">
        <textarea
          id={`field-${name}`}
          name={name}
          rows={rows}
          value={value}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
        {isFilled && required && (
          <span className="reg-valid-indicator" title="Preenchido">
            <Check size={13} strokeWidth={3} />
          </span>
        )}
      </div>
    </motion.div>
  )
}

export default function EmpresasPage() {
  const [activeStage, setActiveStage] = useState<number>(1)
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  useEffect(() => {
    const handleScroll = () => {
      const triggerY = window.innerHeight * 0.36
      let closestStage = 1
      let minDistance = Infinity
      for (const st of b2bStepsData) {
        const el = document.getElementById(`emp-step-card-${st.num}`)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        const cardCenter = rect.top + rect.height / 2
        const dist = Math.abs(cardCenter - triggerY)
        if (dist < minDistance) {
          minDistance = dist
          closestStage = st.num
        }
      }
      setActiveStage((prev) => (prev !== closestStage ? closestStage : prev))
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Company Form State
  const [nomeFantasia, setNomeFantasia] = useState('')
  const [razaoSocial, setRazaoSocial] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [segmento, setSegmento] = useState('Restaurante / Delivery Gastronômico')
  const [cidadeUf, setCidadeUf] = useState('')
  const [responsavel, setResponsavel] = useState('')
  const [cargo, setCargo] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [email, setEmail] = useState('')
  const [volumeDiario, setVolumeDiario] = useState('20 a 50/dia')
  const [modalidade, setModalidade] = useState('Operação Híbrida')
  const [turnosPico, setTurnosPico] = useState<string[]>(['Almoço (11h–15h)', 'Noite / Jantar (18h–23h)'])
  const [observacoes, setObservacoes] = useState('')
  const [aceiteContato, setAceiteContato] = useState(true)
  const [submittedProtocol, setSubmittedProtocol] = useState<string | null>(null)

  const completionScore = useMemo(() => {
    let filled = 0
    if (nomeFantasia.trim()) filled++
    if (cnpj.trim().length >= 14) filled++
    if (cidadeUf.trim()) filled++
    if (segmento.trim()) filled++
    if (responsavel.trim()) filled++
    if (cargo.trim()) filled++
    if (whatsapp.trim().length >= 14) filled++
    if (email.trim() && email.includes('@')) filled++
    if (volumeDiario) filled++
    if (modalidade) filled++
    if (aceiteContato) filled++
    return filled / 11
  }, [nomeFantasia, cnpj, cidadeUf, segmento, responsavel, cargo, whatsapp, email, volumeDiario, modalidade, aceiteContato])


  const toggleShift = (shift: string) => {
    setTurnosPico((prev) =>
      prev.includes(shift) ? prev.filter((s) => s !== shift) : [...prev, shift]
    )
  }

  const handleCompanySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const randomCode = Math.floor(100000 + Math.random() * 900000)
    setSubmittedProtocol(`B2B-${randomCode}`)
  }

  return (
    <div className="prot-page-wrapper emp-page-wrapper">
      {/* =========================================================
          01. HERO SECTION B2B (DARK NAVY + REACT BITS + COMMAND COCKPIT)
         ========================================================= */}
      <section className="prot-hero section-dark">
        <DeliveryMotion />

        <div className="prot-hero-container">
          {/* Left Copy Column */}
          <div className="prot-hero-copy">
            <div className="prot-hero-badge">
              <span className="prot-live-dot" />
              <ShinyText
                text="LOGMOVY PARA EMPRESAS · LOGÍSTICA B2B INTELIGENTE"
                speed={3.5}
              />
            </div>

            <h1 className="prot-hero-title">
              <BlurText
                text="Sua empresa vende. A LogMovy entrega."
                highlightFromIndex={3}
                highlightClassName="prot-lime-word"
              />
            </h1>

            <p className="prot-hero-lead">
              Conecte seu negócio a uma malha ativa de motoboys parceiros verificados. Ganhe escala imediata nos horários de pico, reduza custos com frota ociosa e tenha previsibilidade do pedido até a porta do seu cliente.
            </p>

            <div className="prot-hero-pills">
              <div className="prot-pill-item">
                <CheckCircle2 size={15} className="prot-pill-icon" />
                <span>Motoboys Verificados</span>
              </div>
              <div className="prot-pill-item">
                <CheckCircle2 size={15} className="prot-pill-icon" />
                <span>Sob Demanda ou Turno Dedicado</span>
              </div>
              <div className="prot-pill-item">
                <CheckCircle2 size={15} className="prot-pill-icon" />
                <span>Zero Frota Ociosa</span>
              </div>
            </div>

            <div className="prot-hero-actions">
              <a href="#cadastro-empresa" className="prot-btn-primary">
                <span>Cadastrar minha empresa</span>
                <span className="prot-btn-bubble">
                  <ArrowUpRight size={17} />
                </span>
              </a>

              <a href="#por-que-contratar" className="prot-btn-secondary">
                <span>Por que contratar a LogMovy?</span>
                <ArrowRight size={16} />
              </a>
            </div>

            {/* CountUp Telemetry Strip */}
            <div className="prot-hero-stats">
              <div className="prot-stat-col">
                <strong className="prot-stat-num lime">
                  <CountUp to={100} duration={1200} suffix="%" />
                </strong>
                <span>Parceiros triados</span>
              </div>
              <div className="prot-stat-sep" />
              <div className="prot-stat-col">
                <strong className="prot-stat-num">
                  <CountUp to={3} duration={1000} prefix="0" />
                </strong>
                <span>Formatos de operação</span>
              </div>
              <div className="prot-stat-sep" />
              <div className="prot-stat-col">
                <strong className="prot-stat-num lime">
                  <CountUp to={24} duration={1300} suffix="/7" />
                </strong>
                <span>Malha conectada</span>
              </div>
            </div>
          </div>

          {/* Right Column: B2B Corporate Command Cockpit Card */}
          <div className="prot-cockpit-wrap">
            <div className="prot-cockpit-glow" />

            <div className="prot-cockpit-card">
              {/* Top Status Bar */}
              <div className="prot-cockpit-top">
                <div className="prot-cockpit-status">
                  <span className="prot-ping-wrap">
                    <span className="prot-ping-core" />
                    <span className="prot-ping-wave" />
                  </span>
                  <div>
                    <div className="prot-status-title">CENTRAL CORPORATIVA B2B</div>
                    <div className="prot-status-sub">Conexão Direta Empresa ↔ Entregador</div>
                  </div>
                </div>
                <span className="prot-optional-pill">ALTA ESCALA</span>
              </div>

              {/* Inner B2B Telemetry Card */}
              <div className="prot-cockpit-inner">
                <div className="prot-inner-head">
                  <div className="prot-vehicle-tag">
                    <Building2 size={15} className="prot-bike-lime" />
                    <span>OPERAÇÃO LOGÍSTICA PARA ESTABELECIMENTOS</span>
                  </div>
                  <span className="emp-live-sla-pill">SLA ATIVO</span>
                </div>

                {/* 4 Key B2B Pillars Inside Cockpit */}
                <div className="prot-inner-cov-grid">
                  <div className="prot-mini-cov">
                    <div className="mini-cov-icon">
                      <Zap size={14} />
                    </div>
                    <div>
                      <strong>Absorção de Pico</strong>
                      <span>Almoço, jantar e chuva</span>
                    </div>
                  </div>

                  <div className="prot-mini-cov">
                    <div className="mini-cov-icon">
                      <ShieldCheck size={14} />
                    </div>
                    <div>
                      <strong>CNH A + Mercosul</strong>
                      <span>Condutores validados</span>
                    </div>
                  </div>

                  <div className="prot-mini-cov">
                    <div className="mini-cov-icon">
                      <Layers size={14} />
                    </div>
                    <div>
                      <strong>Modelo Flexível</strong>
                      <span>Avulso, turno ou híbrido</span>
                    </div>
                  </div>

                  <div className="prot-mini-cov">
                    <div className="mini-cov-icon">
                      <TrendingUp size={14} />
                    </div>
                    <div>
                      <strong>Custo Inteligente</strong>
                      <span>Sem passivo de frota</span>
                    </div>
                  </div>
                </div>

                {/* Specs Strip */}
                <div className="prot-inner-specs">
                  <div className="prot-spec-item">
                    <span>ARQUITETURA</span>
                    <strong className="lime-text">SaaS + Marketplace</strong>
                  </div>
                  <div className="prot-spec-divider" />
                  <div className="prot-spec-item">
                    <span>TRIAGEM</span>
                    <strong>100% Documentada</strong>
                  </div>
                  <div className="prot-spec-divider" />
                  <div className="prot-spec-item">
                    <span>ADESÃO B2B</span>
                    <strong>Ativação Rápida</strong>
                  </div>
                </div>
              </div>

              {/* Bottom Chips Row */}
              <div className="prot-cockpit-bottom">
                <div className="prot-bottom-chip">
                  <div className="chip-icon-sphere lime">
                    <Store size={15} />
                  </div>
                  <div>
                    <strong>Para Todos os Segmentos</strong>
                    <span>Food, Farma, Varejo e Distribuição</span>
                  </div>
                </div>

                <div className="prot-bottom-chip">
                  <div className="chip-icon-sphere blue">
                    <Sparkles size={15} />
                  </div>
                  <div>
                    <strong>Gestão Centralizada</strong>
                    <span>Mais controle e menos improviso</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          02. POR QUE SUA EMPRESA PRECISA CONTRATAR A LOGMOVY (SPOTLIGHT CARDS)
         ========================================================= */}
      <section id="por-que-contratar" className="prot-coverages-section section-dark section-pad emp-why-section">
        <div className="prot-container">
          <div className="section-kicker light">
            <div className="kicker-pill dark-pill">
              <span className="kicker-live-dot" />
              <span className="kicker-text-desktop">DIFERENCIAIS COMPETITIVOS PARA O SEU NEGÓCIO</span>
              <span className="kicker-text-mobile">POR QUE CONTRATAR</span>
            </div>
            <span className="kicker-index light">01 / POR QUE A LOGMOVY</span>
          </div>

          <div className="prot-section-head light">
            <div>
              <h2 className="prot-section-title light">
                Por que sua empresa precisa
                <br />
                <span className="title-lime-glow">contratar a LogMovy hoje?</span>
              </h2>
            </div>
            <p className="prot-section-desc light">
              A entrega é o último contato da sua marca com o cliente. Substitua o improviso e a falta de entregadores por uma infraestrutura logística desenhada para performance B2B.
            </p>
          </div>

          <div className="prot-spotlight-grid">
            {whyHireData.map((reason) => {
              const ReasonIcon = reason.icon
              return (
                <SpotlightCard
                  key={reason.num}
                  className="prot-coverage-card emp-why-card"
                  spotlightColor="rgba(140, 229, 27, 0.22)"
                >
                  <div className="prot-cov-top">
                    <span className="prot-cov-num">{reason.num}</span>
                    <span className="prot-cov-badge">{reason.badge}</span>
                    <div className="prot-cov-icon">
                      <ReasonIcon size={18} />
                    </div>
                  </div>
                  <h3 className="prot-cov-title">{reason.title}</h3>
                  <p className="prot-cov-desc">{reason.desc}</p>
                  <div className="emp-why-footer-tag">
                    <Check size={13} />
                    <span>{reason.highlight}</span>
                  </div>
                </SpotlightCard>
              )
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          03. COMO FUNCIONA PARA EMPRESAS (STICKY DOSSIER + 4 ETAPAS)
         ========================================================= */}
      <section className="prot-steps-section section-light section-pad">
        <NetworkMotion />

        <div className="prot-container">
          <div className="section-kicker">
            <div className="kicker-pill">
              <span className="kicker-live-dot" />
              <span className="kicker-text-desktop">ONBOARDING CORPORATIVO EM 4 PASSOS</span>
              <span className="kicker-text-mobile">COMO FUNCIONA</span>
            </div>
            <span className="kicker-index">02 / JORNADA DA EMPRESA</span>
          </div>

          <div className="prot-section-head">
            <div>
              <h2 className="prot-section-title">
                Do cadastro à primeira coleta
                <br />
                sem <span className="prot-title-lime">burocracia operacional.</span>
              </h2>
            </div>
            <p className="prot-section-desc">
              Estruturamos um fluxo direto para que seu estabelecimento comece a operar com a malha de entregadores da LogMovy no menor tempo possível.
            </p>
          </div>

          <div className="prot-steps-layout">
            {/* Left Sticky Column: Interactive B2B Dossier Card */}
            <div className="prot-steps-sticky-col">
              {(() => {
                const currentStep =
                  b2bStepsData.find((s) => s.num === activeStage) || b2bStepsData[0]
                const CurrentIcon = currentStep.icon
                return (
                  <div className="prot-dossier-card">
                    <div className="prot-dossier-top">
                      <span className="prot-dossier-badge">
                        ETAPA {currentStep.code}/04 · FLUXO EMPRESAS
                      </span>
                      <span className="prot-dossier-tag">{currentStep.tag}</span>
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentStep.num}
                        className="prot-dossier-hero"
                        initial={{ opacity: 0, y: 8, filter: 'blur(3px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: -8, filter: 'blur(3px)' }}
                        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="prot-dossier-icon-sphere">
                          <CurrentIcon size={24} />
                        </div>
                        <div>
                          <h4>{currentStep.title}</h4>
                          <p>{currentStep.lead}</p>
                        </div>
                      </motion.div>
                    </AnimatePresence>

                    <div className="prot-dossier-progress-bar">
                      {b2bStepsData.map((s) => (
                        <span
                          key={s.num}
                          className={s.num <= activeStage ? 'filled' : ''}
                        />
                      ))}
                    </div>

                    <div className="prot-stage-pills-nav emp-four-cols">
                      {b2bStepsData.map((st) => (
                        <button
                          key={st.num}
                          type="button"
                          onClick={() => {
                            setActiveStage(st.num)
                            const el = document.getElementById(`emp-step-card-${st.num}`)
                            el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                          }}
                          className={`prot-stage-nav-btn ${activeStage === st.num ? 'active' : ''}`}
                        >
                          <span className="stage-nav-num">{st.code}</span>
                          <span className="stage-nav-label">{st.title.split(' ')[0]}</span>
                        </button>
                      ))}
                    </div>

                    <div className="prot-dossier-rule-box">
                      <ShieldCheck size={16} />
                      <span>
                        <strong>Operação Assistida:</strong> Nosso time acompanha a implantação inicial da sua empresa para calibrar o formato ideal de atendimento.
                      </span>
                    </div>
                  </div>
                )
              })()}
            </div>

            {/* Right Scrolling Column: The 4 Detailed B2B Step Cards */}
            <div className="prot-steps-cards-col">
              {b2bStepsData.map((st) => {
                const IconComp = st.icon
                const isActive = activeStage === st.num
                return (
                  <motion.article
                    id={`emp-step-card-${st.num}`}
                    key={st.num}
                    className={`prot-step-detail-card ${isActive ? 'is-active' : ''}`}
                    onViewportEnter={() => setActiveStage(st.num)}
                    viewport={{ amount: 0.55 }}
                    onClick={() => setActiveStage(st.num)}
                  >
                    <div className="prot-step-card-top">
                      <div className="prot-step-badge-group">
                        <span className="prot-step-num-pill">ETAPA {st.code}</span>
                        <span className="prot-step-tag-chip">{st.tag}</span>
                      </div>
                      <div className="prot-step-icon-box">
                        <IconComp size={20} />
                      </div>
                    </div>

                    <h3 className="prot-step-card-title">{st.title}</h3>
                    <p className="prot-step-card-lead">{st.lead}</p>

                    <ul className="prot-step-bullet-list">
                      {st.details.map((det) => (
                        <li key={det}>
                          <span className="prot-bullet-check">
                            <Check size={12} strokeWidth={3} />
                          </span>
                          <span>{det}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.article>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          04. FORMULÁRIO DE CADASTRO PARA EMPRESAS (#CADASTRO-EMPRESA)
         ========================================================= */}
      <section id="cadastro-empresa" className="emp-form-section section-light section-pad">
        <div className="prot-container">
          <div className="section-kicker">
            <div className="kicker-pill">
              <span className="kicker-live-dot" />
              <span className="kicker-text-desktop">CREDENCIAMENTO CORPORATIVO LOGMOVY</span>
              <span className="kicker-text-mobile">CADASTRO EMPRESA</span>
            </div>
            <span className="kicker-index">03 / CADASTRE SUA EMPRESA</span>
          </div>

          <div className="emp-form-layout">
            {/* Left Column: Live Corporate Credential Preview & Value Summary */}
            <div className="emp-form-sidebar">
              <div className="emp-sidebar-sticky">
                <span className="emp-sidebar-eyebrow">
                  <Sparkles size={13} /> PARCERIA CORPORATIVA B2B
                </span>
                <h2 className="emp-sidebar-title">
                  Cadastre sua empresa e{' '}
                  <span className="prot-title-lime">escale suas entregas.</span>
                </h2>
                <p className="emp-sidebar-desc">
                  Preencha os dados ao lado para que nosso time comercial configure o plano logístico sob medida para o seu volume e região.
                </p>

                {/* Live Updating Corporate Pass Card */}
                <motion.div
                  className="emp-live-pass-card"
                  whileHover={{ y: -4, scale: 1.015 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                >
                  <div className="cockpit-border-beam" />
                  <div className="emp-pass-top">
                    <div className="emp-pass-badge">
                      <Lock size={14} className="text-[#8ce51b]" />
                      <span>CREDENCIAL EMPRESA PARCEIRA</span>
                    </div>
                    <span className="emp-pass-status">
                      {submittedProtocol ? 'ENVIADO' : 'EM PREENCHIMENTO'}
                    </span>
                  </div>

                  <div className="emp-pass-body">
                    <span className="emp-pass-label">ESTABELECIMENTO / MARCA</span>
                    <h4 className="emp-pass-company">
                      {nomeFantasia.trim() || 'Nome da sua empresa aparecerá aqui'}
                    </h4>
                    <p className="emp-pass-sub">
                      {cnpj.trim() ? `CNPJ ${cnpj}` : 'CNPJ pendente'} · {segmento}
                    </p>

                    <div className="emp-pass-metrics-row">
                      <div className="emp-pass-metric">
                        <span>DEMANDA ESTIMADA</span>
                        <strong>{volumeDiario}</strong>
                      </div>
                      <div className="emp-pass-metric">
                        <span>FORMATO ESCOLHIDO</span>
                        <strong className="lime">{modalidade}</strong>
                      </div>
                    </div>

                    <div className="emp-pass-footer-strip">
                      <span>
                        Responsável: <strong>{responsavel.trim() || 'Não informado'}</strong>
                      </span>
                      <span>{cidadeUf.trim() || 'Brasil'}</span>
                    </div>
                  </div>
                </motion.div>

                {/* 3 Quick Guarantees */}
                <div className="emp-guarantees-list">
                  <motion.div className="emp-guarantee-item" whileHover={{ x: 4, scale: 1.01 }} transition={{ type: 'spring', stiffness: 400, damping: 24 }}>
                    <div className="emp-guarantee-icon">
                      <Check size={14} strokeWidth={3} />
                    </div>
                    <div>
                      <strong>Retorno comercial ágil</strong>
                      <span>Análise prioritária do perfil da sua operação.</span>
                    </div>
                  </motion.div>

                  <motion.div className="emp-guarantee-item" whileHover={{ x: 4, scale: 1.01 }} transition={{ type: 'spring', stiffness: 400, damping: 24 }}>
                    <div className="emp-guarantee-icon">
                      <Check size={14} strokeWidth={3} />
                    </div>
                    <div>
                      <strong>Sem taxa de adesão no pré-cadastro</strong>
                      <span>Solicite o diagnóstico da sua operação sem compromisso.</span>
                    </div>
                  </motion.div>

                  <motion.div className="emp-guarantee-item" whileHover={{ x: 4, scale: 1.01 }} transition={{ type: 'spring', stiffness: 400, damping: 24 }}>
                    <div className="emp-guarantee-icon">
                      <Check size={14} strokeWidth={3} />
                    </div>
                    <div>
                      <strong>Dados protegidos (LGPD)</strong>
                      <span>Informações utilizadas exclusivamente para proposta comercial B2B.</span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive B2B Registration Form Card */}
            <div className="emp-form-card-wrap">
              {submittedProtocol ? (
                <motion.div
                  className="emp-success-card"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="emp-success-icon-ring">
                    <CheckCircle2 size={38} />
                  </div>
                  <span className="emp-protocol-pill">PROTOCOLO {submittedProtocol}</span>
                  <h3>Solicitação corporativa recebida com sucesso!</h3>
                  <p>
                    Recebemos os dados da <strong>{nomeFantasia || 'sua empresa'}</strong>. Nosso time de expansão B2B da <strong>LogMovy</strong> entrará em contato com{' '}
                    <strong>{responsavel}</strong> pelo WhatsApp <strong>{whatsapp}</strong> para apresentar o plano operacional ideal.
                  </p>

                  <div className="emp-success-summary">
                    <div>
                      <span>EMPRESA / CNPJ</span>
                      <strong>
                        {nomeFantasia} ({cnpj})
                      </strong>
                    </div>
                    <div>
                      <span>SEGMENTO</span>
                      <strong>{segmento}</strong>
                    </div>
                    <div>
                      <span>DEMANDA & FORMATO</span>
                      <strong>
                        {volumeDiario} · {modalidade}
                      </strong>
                    </div>
                    <div>
                      <span>TURNOS DE PICO</span>
                      <strong>{turnosPico.join(', ') || 'Horário comercial'}</strong>
                    </div>
                  </div>

                  <div className="emp-success-actions">
                    <button
                      type="button"
                      className="emp-reset-btn"
                      onClick={() => setSubmittedProtocol(null)}
                    >
                      Editar dados enviados
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  className="emp-b2b-form registration-card"
                  onSubmit={handleCompanySubmit}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div
                    className="reg-card-top-progress-glow"
                    style={{ width: `${Math.round(completionScore * 100)}%` }}
                  />

                  <div className="emp-form-card-header">
                    <div>
                      <span className="emp-form-step-pill">FORMULÁRIO OFICIAL B2B</span>
                      <h3>Dados para credenciamento da empresa</h3>
                      <p>Informe os detalhes do seu negócio para receber nossa proposta operacional.</p>
                    </div>
                    <div className="emp-form-header-icon">
                      <Building2 size={22} />
                    </div>
                  </div>

                  {/* Bloco 1: Dados da Empresa */}
                  <div className="emp-form-block">
                    <div className="emp-block-title">
                      <span className="emp-block-num">01</span>
                      <span>Identificação da Empresa</span>
                    </div>

                    <div className="registration-fields">
                      <B2BPremiumField
                        label="Nome Fantasia / Marca"
                        name="nomeFantasia"
                        required
                        placeholder="Ex: Burger House / Drogaria Central"
                        value={nomeFantasia}
                        onChange={setNomeFantasia}
                      />

                      <B2BPremiumField
                        label="CNPJ"
                        name="cnpj"
                        required
                        inputMode="numeric"
                        placeholder="00.000.000/0000-00"
                        value={cnpj}
                        onChange={(v) => setCnpj(maskCnpj(v))}
                      />

                      <B2BPremiumField
                        label="Razão Social"
                        name="razaoSocial"
                        required={false}
                        placeholder="Razão social completa da empresa"
                        value={razaoSocial}
                        onChange={setRazaoSocial}
                      />

                      <B2BPremiumField
                        label="Cidade / UF da Operação"
                        name="cidadeUf"
                        required
                        placeholder="Ex: João Pessoa - PB / Aracaju - SE"
                        value={cidadeUf}
                        onChange={setCidadeUf}
                      />

                      <motion.div
                        whileHover={{ y: -2 }}
                        transition={{ type: 'spring', stiffness: 420, damping: 22 }}
                        className="col-span-full"
                      >
                        <PremiumSelect
                          label="Segmento de Atuação *"
                          value={segmento}
                          onChange={setSegmento}
                          options={segmentOptions}
                          placeholder="Selecione o segmento do seu negócio..."
                          searchPlaceholder="Buscar segmento ou digitar..."
                          badge="SETOR"
                          fullWidth
                        />
                      </motion.div>
                    </div>
                  </div>

                  {/* Bloco 2: Responsável pelo Contato */}
                  <div className="emp-form-block">
                    <div className="emp-block-title">
                      <span className="emp-block-num">02</span>
                      <span>Responsável pela Operação</span>
                    </div>

                    <div className="registration-fields">
                      <B2BPremiumField
                        label="Nome Completo do Responsável"
                        name="responsavel"
                        required
                        placeholder="Seu nome completo"
                        value={responsavel}
                        onChange={setResponsavel}
                      />

                      <B2BPremiumField
                        label="Cargo / Função"
                        name="cargo"
                        required
                        placeholder="Ex: Sócio-Proprietário / Gerente de Operações"
                        value={cargo}
                        onChange={setCargo}
                      />

                      <B2BPremiumField
                        label="WhatsApp Corporativo"
                        name="whatsapp"
                        type="tel"
                        inputMode="numeric"
                        required
                        placeholder="(00) 00000-0000"
                        value={whatsapp}
                        onChange={(v) => setWhatsapp(maskPhone(v))}
                      />

                      <B2BPremiumField
                        label="E-mail Corporativo"
                        name="email"
                        type="email"
                        required
                        placeholder="contato@suaempresa.com.br"
                        value={email}
                        onChange={setEmail}
                      />
                    </div>
                  </div>

                  {/* Bloco 3: Perfil da Demanda Logística */}
                  <div className="emp-form-block">
                    <div className="emp-block-title">
                      <span className="emp-block-num">03</span>
                      <span>Perfil Logístico & Demanda</span>
                    </div>

                    <div className="emp-sub-group">
                      <span className="emp-sub-label">Volume médio de entregas por dia *</span>
                      <div className="emp-volume-grid">
                        {dailyVolumeChoices.map((vol) => {
                          const active = volumeDiario === vol.id
                          return (
                            <motion.button
                              key={vol.id}
                              type="button"
                              whileHover={{ y: -2, scale: 1.01 }}
                              whileTap={{ scale: 0.98 }}
                              transition={{ type: 'spring', stiffness: 450, damping: 25 }}
                              onClick={() => setVolumeDiario(vol.id)}
                              className={`emp-choice-card ${active ? 'is-selected' : ''}`}
                            >
                              <div className="emp-choice-top">
                                <strong>{vol.label}</strong>
                                <span className="emp-choice-radio">
                                  {active && <span className="emp-choice-radio-dot" />}
                                </span>
                              </div>
                              <small>{vol.sub}</small>
                            </motion.button>
                          )
                        })}
                      </div>
                    </div>

                    <div className="emp-sub-group">
                      <span className="emp-sub-label">Modalidade de interesse *</span>
                      <div className="emp-modality-grid">
                        {modalityChoices.map((mod) => {
                          const active = modalidade === mod.id
                          return (
                            <motion.button
                              key={mod.id}
                              type="button"
                              whileHover={{ y: -2, scale: 1.01 }}
                              whileTap={{ scale: 0.98 }}
                              transition={{ type: 'spring', stiffness: 450, damping: 25 }}
                              onClick={() => setModalidade(mod.id)}
                              className={`emp-choice-card ${active ? 'is-selected' : ''}`}
                            >
                              <div className="emp-choice-top">
                                <strong>{mod.title}</strong>
                                <span className="emp-choice-radio">
                                  {active && <span className="emp-choice-radio-dot" />}
                                </span>
                              </div>
                              <small>{mod.desc}</small>
                            </motion.button>
                          )
                        })}
                      </div>
                    </div>

                    <div className="emp-sub-group">
                      <span className="emp-sub-label">Horários de maior pico de entregas</span>
                      <div className="emp-shifts-row">
                        {shiftOptions.map((shift) => {
                          const active = turnosPico.includes(shift)
                          return (
                            <motion.button
                              key={shift}
                              type="button"
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              transition={{ type: 'spring', stiffness: 450, damping: 24 }}
                              onClick={() => toggleShift(shift)}
                              className={`emp-shift-chip ${active ? 'active' : ''}`}
                            >
                              <Check size={12} className="shift-chip-check" />
                              <span>{shift}</span>
                            </motion.button>
                          )
                        })}
                      </div>
                    </div>

                    <B2BPremiumTextarea
                      label="Observações sobre sua operação"
                      name="observacoes"
                      required={false}
                      rows={3}
                      placeholder="Conte se possui múltiplos pontos de coleta, raio médio de entrega ou necessidades específicas..."
                      value={observacoes}
                      onChange={setObservacoes}
                      fullWidth
                    />
                  </div>

                  {/* Consent & Submit */}
                  <label className="emp-consent-row">
                    <input
                      type="checkbox"
                      required
                      checked={aceiteContato}
                      onChange={(e) => setAceiteContato(e.target.checked)}
                    />
                    <span>
                      Autorizo o time comercial da <strong>LogMovy</strong> a entrar em contato pelos canais informados para apresentação de proposta logística B2B, em conformidade com a LGPD.
                    </span>
                  </label>

                  <motion.button
                    type="submit"
                    className="emp-submit-btn"
                    whileHover={{ scale: 1.015, y: -2 }}
                    whileTap={{ scale: 0.985 }}
                    transition={{ type: 'spring', stiffness: 450, damping: 22 }}
                  >
                    <span>Solicitar contato comercial para minha empresa</span>
                    <span className="emp-submit-bubble">
                      <ArrowUpRight size={18} />
                    </span>
                  </motion.button>
                </motion.form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          05. FAQ PARA EMPRESAS
         ========================================================= */}
      <section className="faq section-light section-pad">
        <div className="prot-container">
          <div className="section-kicker">
            <div className="kicker-pill">
              <span className="kicker-live-dot" />
              <span className="kicker-text-desktop">DÚVIDAS CORPORATIVAS FREQUENTES</span>
              <span className="kicker-text-mobile">DÚVIDAS B2B</span>
            </div>
            <span className="kicker-index">04 / PERGUNTAS FREQUENTES</span>
          </div>

          <div className="faq-grid">
            <div className="faq-left-col">
              <div className="faq-subbadge">
                <HelpCircle size={13} className="subbadge-icon" />
                <span>Logística Corporativa</span>
              </div>
              <h2 className="faq-title">
                Dúvidas sobre a
                <br />
                <span className="title-navy-accent">contratação B2B.</span>
              </h2>
              <p className="faq-lead">
                Entenda como a LogMovy apoia estabelecimentos comerciais a escalarem suas entregas com segurança e agilidade.
              </p>

              <div className="faq-support-card">
                <div className="support-card-top">
                  <div className="support-icon-sphere">
                    <Building2 size={18} />
                  </div>
                  <div>
                    <h4 className="support-title">Pronto para cadastrar seu negócio?</h4>
                    <p className="support-desc">
                      Preencha o formulário corporativo acima em menos de 2 minutos e receba o diagnóstico para sua operação.
                    </p>
                  </div>
                </div>
                <a href="#cadastro-empresa" className="support-btn">
                  <span>Ir para o formulário de empresas</span>
                  <ArrowUpRight size={15} />
                </a>
              </div>
            </div>

            <div className="faq-accordion-col">
              {companyFaqs.map(([q, a], i) => {
                const isOpen = openFaq === i
                return (
                  <div key={q} className={`faq-item-card ${isOpen ? 'is-open' : ''}`}>
                    <button
                      type="button"
                      className="faq-question-btn"
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      aria-expanded={isOpen}
                    >
                      <div className="faq-question-left">
                        <span className="faq-index-tag">0{i + 1}</span>
                        <span className="faq-question-text">{q}</span>
                      </div>
                      <div className={`faq-toggle-bubble ${isOpen ? 'active' : ''}`}>
                        <ChevronDown size={18} className="faq-chevron" />
                      </div>
                    </button>

                    <div className="faq-answer-wrapper" style={{ display: isOpen ? 'block' : 'none' }}>
                      <div className="faq-answer-panel">
                        <div className="faq-answer-content">
                          <p>{a}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          06. FINAL CTA WITH REACT BITS SQUARES INTERACTIVE CANVAS
         ========================================================= */}
      <section className="final-cta section-dark">
        <Squares
          direction="diagonal"
          speed={0.4}
          borderColor="rgba(255, 255, 255, 0.07)"
          squareSize={52}
          hoverFillColor="rgba(140, 229, 27, 0.18)"
        />
        <div className="final-cta-glow" />

        <div className="final-cta-container">
          <div className="final-cta-badge">
            <span className="cta-live-dot" />
            <span>CONECTANDO NEGÓCIOS · MOVENDO OPORTUNIDADES</span>
          </div>

          <h2 className="final-cta-title">
            Sua logística mais rápida.
            <br />
            <span className="title-lime-glow">Seus clientes mais satisfeitos.</span>
          </h2>

          <p className="final-cta-lead">
            Cadastre sua empresa na LogMovy hoje mesmo ou indique nossa plataforma para motoboys parceiros da sua região.
          </p>

          <div className="final-cta-actions">
            <a href="#cadastro-empresa" className="final-cta-btn-primary group">
              <span>Cadastrar minha empresa agora</span>
              <span className="btn-icon-bubble">
                <ArrowUpRight size={17} />
              </span>
            </a>

            <a href="/cadastro" className="final-cta-btn-secondary">
              <span>Sou motoboy e quero me cadastrar</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

