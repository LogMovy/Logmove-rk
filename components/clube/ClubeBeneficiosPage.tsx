'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  Sparkles,
  ArrowUpRight,
  ArrowRight,
  Check,
  CheckCircle2,
  Wrench,
  ShieldCheck,
  Clock,
  MapPin,
  PhoneCall,
  HelpCircle,
  ChevronDown,
  Award,
  Building2,
  ExternalLink,
  Layers,
  BadgePercent,
} from 'lucide-react'
import BlurText from '@/components/reactbits/BlurText'
import ShinyText from '@/components/reactbits/ShinyText'
import SpotlightCard from '@/components/reactbits/SpotlightCard'
import CountUp from '@/components/reactbits/CountUp'
import Squares from '@/components/Squares'
import DeliveryMotion from '@/components/DeliveryMotion'
import NetworkMotion from '@/components/NetworkMotion'

const WHATSAPP_CLUBE_URL =
  'https://wa.me/558399446461?text=' +
  encodeURIComponent(
    'Olá! Conheci o Clube de Benefícios (parceria VM Brasil) por meio do site da *LogMovy* e gostaria de falar com um consultor para entender melhor os descontos em oficinas parceiras, vantagens exclusivas e planos disponíveis. Poderiam me ajudar?'
  )

const VM_BRASIL_SITE_URL = 'https://vmbrasilse.com.br/'

const clubPerksData = [
  {
    num: '01',
    badge: 'Rede Credenciada',
    title: 'Parceria com Oficinas Parceiras Conceituadas',
    desc: 'A VM Brasil mantém parceria com oficinas parceiras selecionadas e conceituadas, garantindo atendimento qualificado e agilidade no tempo de reparo para quem depende do veículo.',
    highlight: 'Agilidade e confiança no reparo',
    icon: Wrench,
  },
  {
    num: '02',
    badge: 'Economia na Manutenção',
    title: 'Descontos em Serviços e Manutenção Preventiva',
    desc: 'Condições especiais e descontos exclusivos em serviços automotivos, alinhamento, revisão e manutenção preventiva na rede de oficinas parceiras.',
    highlight: 'Desconto direto em oficinas parceiras',
    icon: BadgePercent,
  },
  {
    num: '03',
    badge: 'Qualidade Garantida',
    title: 'Substituição com Peças 100% Originais',
    desc: 'Nos reparos realizados pelo plano da parceira, todas as peças substituídas são 100% originais, preservando a segurança, a durabilidade e o valor da sua moto.',
    highlight: '100% peças genuínas',
    icon: Award,
  },
  {
    num: '04',
    badge: 'Suporte na Rua 24/7',
    title: 'Auxílio Pneu Furado, Chaveiro e Pequenos Reparos',
    desc: 'Assistência 24 horas em todo o território nacional com socorro para pneu furado, chaveiro, pequenos reparos elétricos/mecânicos, táxi emergencial e auxílio hospedagem.',
    highlight: 'Assistência 24h em todo o Brasil',
    icon: Clock,
  },
  {
    num: '05',
    badge: 'Abrangência Nacional',
    title: 'Atendimento e Cobertura em Todo o País',
    desc: 'Suporte estruturado com cobertura nacional e atendimento humanizado para acompanhar sua rotina dentro e fora das corridas.',
    highlight: 'Suporte nacional integrado',
    icon: MapPin,
  },
  {
    num: '06',
    badge: 'Cobertura 100% FIPE',
    title: 'Proteção Completa e Vidros Plus',
    desc: 'Além dos benefícios em oficinas parceiras, você pode consultar planos com cobertura 100% Tabela FIPE contra roubo, furto, colisão, perda total, danos a terceiros e proteção óptica.',
    highlight: 'Diretrizes e transparência',
    icon: ShieldCheck,
  },
]

const clubStepsData = [
  {
    num: 1,
    code: '01',
    tag: 'PARCERIA OFICIAL',
    title: 'Conheça o ecossistema da parceira VM Brasil',
    lead: 'O Clube de Benefícios da LogMovy é operado de forma terceirizada pela VM Brasil, especialista em proteção veicular e vantagens automotivas.',
    details: [
      'Acesso a uma rede estruturada de oficinas parceiras conceituadas, descontos em manutenção e assistência 24h.',
      'Parceria pensada para reduzir o custo operacional de quem roda todos os dias.',
      'Consulta livre e informativa: conhecer o clube não gera nenhuma cobrança automática.',
    ],
    icon: Building2,
  },
  {
    num: 2,
    code: '02',
    tag: 'ATENDIMENTO DIRETO',
    title: 'Fale com o consultor pelo WhatsApp dedicado',
    lead: 'Com um clique você inicia conversa direto com a equipe responsável pelo Clube de Benefícios e Proteção Veicular.',
    details: [
      'Canal direto pelo número +55 83 9944-6461 com mensagem já preenchida para agilizar seu atendimento.',
      'Tire dúvidas sobre as oficinas parceiras credenciadas disponíveis na sua região.',
      'Consulte as condições atualizadas para utilizar os descontos e assistências.',
    ],
    icon: PhoneCall,
  },
  {
    num: 3,
    code: '03',
    tag: 'REGRAS CLARAS',
    title: 'Confira a elegibilidade e as condições do plano',
    lead: 'Cada benefício, desconto em oficina parceira ou assistência possui regras claras definidas diretamente pela VM Brasil.',
    details: [
      'Verifique quais benefícios fazem parte de cada modalidade de plano da VM Brasil.',
      'Confirme a disponibilidade regional das oficinas parceiras antes de realizar o serviço.',
      'Avalie valores, carências e condições específicas para veículos utilizados em motofrete.',
    ],
    icon: Layers,
  },
  {
    num: 4,
    code: '04',
    tag: '100% FACULTATIVO',
    title: 'Adira se quiser, sem impacto no app LogMovy',
    lead: 'Você tem total liberdade para aderir ou não ao Clube de Benefícios e aos planos da parceira terceirizada.',
    details: [
      'Contratação e gestão feitas diretamente com a VM Brasil, sem intermediação financeira da LogMovy.',
      'Conforme o Contrato de Adesão v1.1 (Anexo II), aderir ou recusar nunca afeta seu ranking ou suas corridas.',
      'Atendimento rápido pelo WhatsApp para solicitar 2ª via de boleto, acionar assistência ou consultar oficinas parceiras.',
    ],
    icon: Sparkles,
  },
]

const assistanceGridData = [
  {
    title: 'Auxílio Pneu Furado',
    desc: 'Suporte emergencial para troca de pneu ou deslocamento até a borracharia mais próxima.',
    tag: 'Assistência 24h',
  },
  {
    title: 'Auxílio Pequenos Reparos',
    desc: 'Socorro para panes elétricas ou mecânicas leves que possam ser solucionadas no local.',
    tag: 'Socorro Rápido',
  },
  {
    title: 'Auxílio Chaveiro',
    desc: 'Atendimento especializado em caso de perda, quebra de chave ou travamento do veículo.',
    tag: 'Emergência',
  },
  {
    title: 'Guincho em Acidente ou Pane',
    desc: 'Reboque disponível 24h em todo o território nacional conforme limites do plano contratado.',
    tag: 'Nacional',
  },
  {
    title: 'Táxi & Auxílio Hospedagem',
    desc: 'Transporte alternativo ou suporte de estadia caso o imprevisto ocorra longe da sua residência.',
    tag: 'Mobilidade',
  },
  {
    title: 'Vidros Plus & Faróis',
    desc: 'Condições especiais para reparo ou troca de faróis, lanternas e retrovisores previstos no plano.',
    tag: 'Peças & Óptica',
  },
  {
    title: 'Danos a Terceiros',
    desc: 'Cobertura adicional para proteger você em caso de acidentes envolvendo outros veículos.',
    tag: 'Segurança Extra',
  },
  {
    title: 'Carro Reserva & Auxílio Funeral',
    desc: 'Benefícios complementares disponíveis no portfólio da VM Brasil conforme modalidade escolhida.',
    tag: 'Suporte Integral',
  },
]

const clubFaqs = [
  [
    'Quem opera o Clube de Benefícios da LogMovy?',
    'O nosso Clube de Benefícios e Proteção Veicular é terceirizado e operado pela parceira oficial VM Brasil (VM Brasil - Associação de Proteção Veicular, CNPJ 39.698.938/0001-62, site oficial vmbrasilse.com.br).',
  ],
  [
    'Quais são os principais benefícios oferecidos pela parceria com a VM Brasil?',
    'A VM Brasil oferece vantagens como descontos e condições especiais em oficinas parceiras conceituadas, reposição com peças 100% originais, assistência 24h em todo o Brasil (pneu furado, chaveiro, pequenos reparos, guincho) e planos de proteção com cobertura de até 100% da Tabela FIPE.',
  ],
  [
    'Sou obrigado a participar do Clube de Benefícios para receber corridas na LogMovy?',
    'Não! A participação no Clube de Benefícios ou a contratação de qualquer plano da VM Brasil é 100% opcional (facultativa). A não adesão não reduz sua nota, seu ranking nem a oferta de entregas na plataforma LogMovy.',
  ],
  [
    'Como faço para consultar as oficinas parceiras e os descontos disponíveis?',
    'Basta clicar no botão de atendimento desta página para falar no WhatsApp com um consultor dedicado. Ele explicará como funciona a adesão junto à VM Brasil e quais oficinas parceiras atendem na sua região.',
  ],
  [
    'Posso conhecer o site oficial da parceira VM Brasil antes de falar com o consultor?',
    'Sim! Prezamos pela transparência total. Você pode acessar https://vmbrasilse.com.br/ a qualquer momento para conhecer a estrutura, as diretrizes e todos os detalhes institucionais da nossa parceira.',
  ],
]

export default function ClubeBeneficiosPage() {
  const [activeStage, setActiveStage] = useState<number>(1)
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  useEffect(() => {
    const handleScroll = () => {
      const triggerY = window.innerHeight * 0.36
      let closestStage = 1
      let minDistance = Infinity
      for (const st of clubStepsData) {
        const el = document.getElementById(`club-step-card-${st.num}`)
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

  return (
    <div className="prot-page-wrapper club-page-wrapper">
      {/* =========================================================
          01. HERO SECTION (DARK NAVY + REACT BITS + VM BRASIL COCKPIT CARD)
         ========================================================= */}
      <section className="prot-hero section-dark">
        <DeliveryMotion />

        <div className="prot-hero-container">
          {/* Left Copy Column */}
          <div className="prot-hero-copy">
            <div className="prot-hero-badge">
              <span className="prot-live-dot" />
              <ShinyText
                text="CLUBE DE BENEFÍCIOS · PARCERIA OFICIAL VM BRASIL"
                speed={3.5}
              />
            </div>

            <h1 className="prot-hero-title">
              <BlurText
                text="Sua rotina na rua. Mais vantagens no bolso."
                highlightFromIndex={4}
                highlightClassName="prot-lime-word"
              />
            </h1>

            <p className="prot-hero-lead">
              O Clube de Benefícios da <strong>LogMovy</strong> é operado em parceria oficial com a{' '}
              <strong>VM Brasil</strong>, reunindo descontos em oficinas parceiras conceituadas, peças 100% originais e assistência 24h nacional para quem vive sobre duas rodas.
            </p>

            <div className="prot-hero-pills">
              <div className="prot-pill-item">
                <CheckCircle2 size={15} className="prot-pill-icon" />
                <span>Parceira Oficial: VM Brasil</span>
              </div>
              <div className="prot-pill-item">
                <CheckCircle2 size={15} className="prot-pill-icon" />
                <span>Oficinas Parceiras Credenciadas</span>
              </div>
              <div className="prot-pill-item">
                <CheckCircle2 size={15} className="prot-pill-icon" />
                <span>Adesão 100% Opcional</span>
              </div>
            </div>

            <div className="prot-hero-actions">
              <a
                href={WHATSAPP_CLUBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="prot-btn-primary"
              >
                <span>Falar com consultor do Clube</span>
                <span className="prot-btn-bubble">
                  <ArrowUpRight size={17} />
                </span>
              </a>

              <a href="#vantagens-clube" className="prot-btn-secondary">
                <span>Conhecer os benefícios</span>
                <ArrowRight size={16} />
              </a>
            </div>

            {/* CountUp Telemetry Strip */}
            <div className="prot-hero-stats">
              <div className="prot-stat-col">
                <strong className="prot-stat-num lime">
                  <CountUp to={100} duration={1200} suffix="%" />
                </strong>
                <span>Peças originais</span>
              </div>
              <div className="prot-stat-sep" />
              <div className="prot-stat-col">
                <strong className="prot-stat-num">
                  <CountUp to={24} duration={1300} suffix="h" />
                </strong>
                <span>Assistência nacional</span>
              </div>
              <div className="prot-stat-sep" />
              <div className="prot-stat-col">
                <strong className="prot-stat-num lime">
                  <CountUp to={6} duration={1100} prefix="0" />
                </strong>
                <span>Frentes de benefícios</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Interactive VM Brasil Partner Cockpit Card */}
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
                    <div className="prot-status-title">CLUBE LOGMOVY × VM BRASIL</div>
                    <div className="prot-status-sub">Ecossistema Terceirizado de Vantagens</div>
                  </div>
                </div>
                <span className="prot-optional-pill">PARCEIRO OFICIAL</span>
              </div>

              {/* Inner Partner Benefits Card */}
              <div className="prot-cockpit-inner">
                <div className="prot-inner-head">
                  <div className="prot-vehicle-tag">
                    <Sparkles size={15} className="prot-bike-lime" />
                    <span>REDE CREDENCIADA & BENEFÍCIOS ATIVOS</span>
                  </div>
                  <a
                    href={VM_BRASIL_SITE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="club-partner-domain-pill"
                  >
                    <span>vmbrasilse.com.br</span>
                    <ExternalLink size={11} />
                  </a>
                </div>

                {/* 4 Key VM Brasil Highlights Inside Cockpit */}
                <div className="prot-inner-cov-grid">
                  <div className="prot-mini-cov">
                    <div className="mini-cov-icon">
                      <Wrench size={14} />
                    </div>
                    <div>
                      <strong>Oficinas Parceiras</strong>
                      <span>Rede credenciada de confiança</span>
                    </div>
                  </div>

                  <div className="prot-mini-cov">
                    <div className="mini-cov-icon">
                      <BadgePercent size={14} />
                    </div>
                    <div>
                      <strong>Descontos em Serviços</strong>
                      <span>Economia na manutenção</span>
                    </div>
                  </div>

                  <div className="prot-mini-cov">
                    <div className="mini-cov-icon">
                      <Award size={14} />
                    </div>
                    <div>
                      <strong>Peças 100% Originais</strong>
                      <span>Qualidade de fábrica</span>
                    </div>
                  </div>

                  <div className="prot-mini-cov">
                    <div className="mini-cov-icon">
                      <Clock size={14} />
                    </div>
                    <div>
                      <strong>Assistência 24 Horas</strong>
                      <span>Suporte em todo o Brasil</span>
                    </div>
                  </div>
                </div>

                {/* Specs Strip */}
                <div className="prot-inner-specs">
                  <div className="prot-spec-item">
                    <span>OPERADORA DO CLUBE</span>
                    <strong className="lime-text">VM Brasil</strong>
                  </div>
                  <div className="prot-spec-divider" />
                  <div className="prot-spec-item">
                    <span>TABELA DE COBERTURA</span>
                    <strong>Até 100% FIPE</strong>
                  </div>
                  <div className="prot-spec-divider" />
                  <div className="prot-spec-item">
                    <span>VÍNCULO NO APP</span>
                    <strong>100% Facultativo</strong>
                  </div>
                </div>
              </div>

              {/* Bottom Chips Row */}
              <div className="prot-cockpit-bottom">
                <div className="prot-bottom-chip">
                  <div className="chip-icon-sphere lime">
                    <Clock size={15} />
                  </div>
                  <div>
                    <strong>Socorro 24h Nacional</strong>
                    <span>Pneu, chaveiro, guincho e reparos</span>
                  </div>
                </div>

                <div className="prot-bottom-chip">
                  <div className="chip-icon-sphere blue">
                    <ShieldCheck size={15} />
                  </div>
                  <div>
                    <strong>Diretrizes & Credibilidade</strong>
                    <span>Atendimento rápido e humanizado</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          02. VANTAGENS REAIS DO CLUBE (SPOTLIGHT CARDS — PARCERIA VM BRASIL)
         ========================================================= */}
      <section id="vantagens-clube" className="prot-coverages-section section-dark section-pad club-spotlight-section">
        <div className="prot-container">
          <div className="section-kicker light">
            <div className="kicker-pill dark-pill">
              <span className="kicker-live-dot" />
              <span className="kicker-text-desktop">BENEFÍCIOS OFERECIDOS PELA PARCEIRA VM BRASIL</span>
              <span className="kicker-text-mobile">VANTAGENS DO CLUBE</span>
            </div>
            <span className="kicker-index light">01 / ECOSSISTEMA DE VANTAGENS</span>
          </div>

          <div className="prot-section-head light">
            <div>
              <h2 className="prot-section-title light">
                Por que conhecer o Clube
                <br />
                <span className="title-lime-glow">operado pela VM Brasil?</span>
              </h2>
            </div>
            <p className="prot-section-desc light">
              Nosso Clube de Benefícios é terceirizado com a <strong>VM Brasil</strong> para entregar estrutura de oficinas parceiras, reposição com peças genuínas, descontos em manutenção e suporte 24h.
            </p>
          </div>

          <div className="prot-spotlight-grid">
            {clubPerksData.map((perk) => {
              const PerkIcon = perk.icon
              return (
                <SpotlightCard
                  key={perk.num}
                  className="prot-coverage-card club-perk-card"
                  spotlightColor="rgba(140, 229, 27, 0.22)"
                >
                  <div className="prot-cov-top">
                    <span className="prot-cov-num">{perk.num}</span>
                    <span className="prot-cov-badge">{perk.badge}</span>
                    <div className="prot-cov-icon">
                      <PerkIcon size={18} />
                    </div>
                  </div>
                  <h3 className="prot-cov-title">{perk.title}</h3>
                  <p className="prot-cov-desc">{perk.desc}</p>
                  <div className="club-perk-footer-tag">
                    <Check size={13} />
                    <span>{perk.highlight}</span>
                  </div>
                </SpotlightCard>
              )
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          03. COMO FUNCIONA A PARCERIA (STICKY DOSSIER + 4 ETAPAS)
         ========================================================= */}
      <section className="prot-steps-section section-light section-pad">
        <NetworkMotion />

        <div className="prot-container">
          <div className="section-kicker">
            <div className="kicker-pill">
              <span className="kicker-live-dot" />
              <span className="kicker-text-desktop">COMO APROVEITAR NA PRÁTICA</span>
              <span className="kicker-text-mobile">PASSO A PASSO</span>
            </div>
            <span className="kicker-index">02 / COMO FUNCIONA</span>
          </div>

          <div className="prot-section-head">
            <div>
              <h2 className="prot-section-title">
                Como funciona o acesso
                <br />
                ao <span className="prot-title-lime">Clube de Benefícios.</span>
              </h2>
            </div>
            <p className="prot-section-desc">
              Entenda em 4 passos simples como consultar as vantagens oferecidas pela VM Brasil e utilizar os benefícios com total autonomia.
            </p>
          </div>

          <div className="prot-steps-layout">
            {/* Left Sticky Column: Interactive Step Dossier Card */}
            <div className="prot-steps-sticky-col">
              {(() => {
                const currentStep =
                  clubStepsData.find((s) => s.num === activeStage) || clubStepsData[0]
                const CurrentIcon = currentStep.icon
                return (
                  <div className="prot-dossier-card">
                    <div className="prot-dossier-top">
                      <span className="prot-dossier-badge">
                        PASSO {currentStep.code}/04 · PARCERIA VM BRASIL
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
                      {clubStepsData.map((s) => (
                        <span
                          key={s.num}
                          className={s.num <= activeStage ? 'filled' : ''}
                        />
                      ))}
                    </div>

                    <div className="prot-stage-pills-nav club-four-cols">
                      {clubStepsData.map((st) => (
                        <button
                          key={st.num}
                          type="button"
                          onClick={() => {
                            setActiveStage(st.num)
                            const el = document.getElementById(`club-step-card-${st.num}`)
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
                        <strong>Transparência LogMovy:</strong> O Clube de Benefícios é terceirizado e operado pela <strong>VM Brasil</strong>. A adesão é opcional e independente das suas entregas.
                      </span>
                    </div>
                  </div>
                )
              })()}
            </div>

            {/* Right Scrolling Column: The 4 Detailed Step Cards */}
            <div className="prot-steps-cards-col">
              {clubStepsData.map((st) => {
                const IconComp = st.icon
                const isActive = activeStage === st.num
                return (
                  <motion.article
                    id={`club-step-card-${st.num}`}
                    key={st.num}
                    className={`prot-step-detail-card ${isActive ? 'is-active' : ''}`}
                    onViewportEnter={() => setActiveStage(st.num)}
                    viewport={{ amount: 0.55 }}
                    onClick={() => setActiveStage(st.num)}
                  >
                    <div className="prot-step-card-top">
                      <div className="prot-step-badge-group">
                        <span className="prot-step-num-pill">PASSO {st.code}</span>
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
          04. ASSISTÊNCIA 24H COMPLETA + CREDENCIAL DO PARCEIRO VM BRASIL
         ========================================================= */}
      <section className="prot-factors-section section-light section-pad">
        <div className="prot-container">
          <div className="section-kicker">
            <div className="kicker-pill">
              <span className="kicker-live-dot" />
              <span className="kicker-text-desktop">SUPORTE 24 HORAS E ESTRUTURA DA PARCEIRA</span>
              <span className="kicker-text-mobile">ASSISTÊNCIA 24H</span>
            </div>
            <span className="kicker-index">03 / SERVIÇOS & PARCEIRA</span>
          </div>

          <div className="prot-factors-block">
            <div className="prot-factors-header">
              <h2 className="prot-section-title">
                Assistências e serviços
                <br />
                <span className="prot-title-lime">disponíveis na VM Brasil.</span>
              </h2>
              <p className="prot-section-desc">
                Confira o portfólio de assistências 24 horas e coberturas oferecidas pela nossa parceira para manter sua rotina sempre em movimento:
              </p>
            </div>

            <div className="club-assistance-grid">
              {assistanceGridData.map((item) => (
                <div key={item.title} className="club-assist-card">
                  <div className="club-assist-top">
                    <span className="club-assist-tag">{item.tag}</span>
                    <div className="club-assist-check">
                      <Check size={13} strokeWidth={3} />
                    </div>
                  </div>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Official Third-Party Partner Identification Banner (VM Brasil) */}
          <div className="club-partner-showcase-card">
            <div className="club-partner-left">
              <div className="club-partner-eyebrow">
                <Building2 size={14} />
                <span>IDENTIFICAÇÃO DO PARCEIRO TERCEIRIZADO OFICIAL</span>
              </div>
              <h3>VM Brasil — Associação de Proteção Veicular</h3>
              <p>
                Em total conformidade com a transparência da <strong>LogMovy</strong>, informamos que o Clube de Benefícios e as opções de proteção veicular são operados por{' '}
                <strong>VM Brasil - Associação de Proteção Veicular</strong> (CNPJ 39.698.938/0001-62). Condições, descontos em oficinas parceiras e coberturas seguem o regulamento próprio da entidade.
              </p>

              <div className="club-partner-meta-pills">
                <span>✓ Peças 100% Originais</span>
                <span>✓ Oficinas Parceiras Credenciadas</span>
                <span>✓ Descontos em Manutenção</span>
                <span>✓ Cobertura Nacional 24h</span>
              </div>
            </div>

            <div className="club-partner-right">
              <a
                href={WHATSAPP_CLUBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="club-partner-cta-primary"
              >
                <span>Falar com consultor no WhatsApp</span>
                <ArrowUpRight size={16} />
              </a>

              <a
                href={VM_BRASIL_SITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="club-partner-cta-secondary"
              >
                <span>Visitar site oficial (vmbrasilse.com.br)</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          05. FAQ DO CLUBE DE BENEFÍCIOS
         ========================================================= */}
      <section className="faq section-light section-pad">
        <div className="prot-container">
          <div className="section-kicker">
            <div className="kicker-pill">
              <span className="kicker-live-dot" />
              <span className="kicker-text-desktop">TRANSPARÊNCIA SOBRE O CLUBE</span>
              <span className="kicker-text-mobile">DÚVIDAS</span>
            </div>
            <span className="kicker-index">04 / PERGUNTAS FREQUENTES</span>
          </div>

          <div className="faq-grid">
            <div className="faq-left-col">
              <div className="faq-subbadge">
                <HelpCircle size={13} className="subbadge-icon" />
                <span>Tire suas dúvidas</span>
              </div>
              <h2 className="faq-title">
                Perguntas sobre o
                <br />
                <span className="title-navy-accent">Clube de Benefícios.</span>
              </h2>
              <p className="faq-lead">
                Tudo às claras sobre como funciona a parceria terceirizada com a VM Brasil, os descontos em oficinas parceiras e a sua liberdade de escolha na LogMovy.
              </p>

              <div className="faq-support-card">
                <div className="support-card-top">
                  <div className="support-icon-sphere">
                    <PhoneCall size={18} />
                  </div>
                  <div>
                    <h4 className="support-title">Quer ativar ou consultar benefícios?</h4>
                    <p className="support-desc">
                      Fale diretamente no WhatsApp com um consultor dedicado para conhecer os descontos e planos da VM Brasil.
                    </p>
                  </div>
                </div>
                <a
                  href={WHATSAPP_CLUBE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="support-btn"
                >
                  <span>Chamar consultor no WhatsApp</span>
                  <ArrowUpRight size={15} />
                </a>
              </div>
            </div>

            <div className="faq-accordion-col">
              {clubFaqs.map(([q, a], i) => {
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
            <span>CLUBE DE BENEFÍCIOS · LOGMOVY & VM BRASIL</span>
          </div>

          <h2 className="final-cta-title">
            Mais economia na oficina.
            <br />
            <span className="title-lime-glow">Mais tranquilidade na pista.</span>
          </h2>

          <p className="final-cta-lead">
            Fale agora pelo WhatsApp com um consultor para conhecer todos os benefícios, oficinas parceiras e condições especiais da VM Brasil.
          </p>

          <div className="final-cta-actions">
            <a
              href={WHATSAPP_CLUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="final-cta-btn-primary group"
            >
              <span>Falar com consultor no WhatsApp</span>
              <span className="btn-icon-bubble">
                <ArrowUpRight size={17} />
              </span>
            </a>

            <a href="/protecao" className="final-cta-btn-secondary">
              <span>Conhecer também a Proteção Veicular</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
