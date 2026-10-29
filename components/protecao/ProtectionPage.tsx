'use client'

import React, { useState } from 'react'
import { motion } from 'motion/react'
import {
  ShieldCheck,
  ArrowUpRight,
  ArrowRight,
  Check,
  CheckCircle2,
  Bike,
  FileSearch,
  FileCheck2,
  Sliders,
  PhoneCall,
  AlertTriangle,
  HelpCircle,
  ChevronDown,
  Sparkles,
  Lock,
  Wrench,
  MapPin,
  Clock,
  Flame,
  Shield,
} from 'lucide-react'
import BlurText from '@/components/reactbits/BlurText'
import ShinyText from '@/components/reactbits/ShinyText'
import SpotlightCard from '@/components/reactbits/SpotlightCard'
import CountUp from '@/components/reactbits/CountUp'
import Squares from '@/components/Squares'
import DeliveryMotion from '@/components/DeliveryMotion'
import NetworkMotion from '@/components/NetworkMotion'

const WHATSAPP_PROTECAO_URL =
  'https://wa.me/558399446461?text=' +
  encodeURIComponent(
    'Olá! Conheci a proteção veicular por meio do site da *LogMovy* e gostaria de falar com um consultor para entender melhor os benefícios, as coberturas e os valores dos planos disponíveis. Poderiam me ajudar?'
  )

const stepsData = [
  {
    num: 1,
    code: '01',
    tag: 'SEM COMPROMISSO',
    title: 'Solicite a cotação pela plataforma',
    lead: 'Você manifesta interesse em conhecer as opções de proteção veicular sem nenhuma obrigação de adesão.',
    details: [
      'A solicitação pode ser feita durante ou após o seu cadastro na LogMovy.',
      'A simples visualização na página ou no app não gera cobrança nem ativa cobertura.',
      'Caso prefira não solicitar, seu acesso às corridas e oportunidades segue 100% normal.',
    ],
    icon: FileSearch,
  },
  {
    num: 2,
    code: '02',
    tag: 'PERFIL DO VEÍCULO',
    title: 'Informe os dados da sua motocicleta',
    lead: 'O fornecedor especializado analisa as características reais da sua moto para dimensionar a proposta.',
    details: [
      'Marca, modelo, cilindrada e ano de fabricação da motocicleta.',
      'Placa Mercosul e confirmação de uso profissional em atividades de motofrete.',
      'Compartilhamento mínimo de dados (LGPD) exclusivamente para emissão da cotação.',
    ],
    icon: Bike,
  },
  {
    num: 3,
    code: '03',
    tag: 'PROPOSTA CLARA',
    title: 'Receba a proposta do fornecedor identificado',
    lead: 'Você recebe os valores de mensalidade, coberturas incluídas e a identificação completa da entidade responsável.',
    details: [
      'Apresentação transparente da tabela de coberturas (roubo, furto, colisão, assistência 24h, etc.).',
      'Identificação clara do fornecedor parceiro independente que garante o plano.',
      'Liberdade total para comparar, tirar dúvidas ou recusar a proposta.',
    ],
    icon: Sliders,
  },
  {
    num: 4,
    code: '04',
    tag: 'TRANSPARÊNCIA TOTAL',
    title: 'Confira o regulamento e as condições para motofrete',
    lead: 'Antes de assinar, você confere cada detalhe técnico para saber exatamente como sua proteção funciona na rua.',
    details: [
      'Verificação de elegibilidade expressa para uso remunerado (motofrete).',
      'Conferência de prazos de carência, valor de participação (cota/franquia) e limites.',
      'Leitura das hipóteses de exclusão, prazos de guincho e procedimentos de vistoria.',
    ],
    icon: FileCheck2,
  },
  {
    num: 5,
    code: '05',
    tag: 'CONTRATO PRÓPRIO',
    title: 'Contrate diretamente com o fornecedor',
    lead: 'A cobertura nasce exclusivamente da assinatura do instrumento próprio junto ao fornecedor especializado.',
    details: [
      'Assinatura de contrato autônomo e separado entre você e o fornecedor de proteção.',
      'Realização de vistoria (quando exigida pelo fornecedor) e confirmação de vigência.',
      'Gestão independente: o cancelamento futuro também não afeta sua conta na LogMovy.',
    ],
    icon: ShieldCheck,
  },
]

const coveragesData = [
  {
    num: '01',
    title: 'Roubo e furto qualificado',
    desc: 'Proteção patrimonial para eventos de subtração da motocicleta, conforme limites e tabela previstos no regulamento do fornecedor.',
    badge: 'Patrimônio',
    icon: Lock,
  },
  {
    num: '02',
    title: 'Colisão e perda total',
    desc: 'Suporte para reparos em acidentes de trânsito ou indenização integral quando os danos superarem o percentual estipulado em contrato.',
    badge: 'Casco & Reparo',
    icon: Shield,
  },
  {
    num: '03',
    title: 'Incêndio decorrente de colisão',
    desc: 'Cobertura específica para danos materiais causados por fogo resultante de acidente coberto pelo plano do fornecedor.',
    badge: 'Segurança',
    icon: Flame,
  },
  {
    num: '04',
    title: 'Assistência 24 horas',
    desc: 'Atendimento emergencial dia e noite para panes secas, elétricas, mecânicas ou troca de pneus durante a sua rotina.',
    badge: 'Suporte 24/7',
    icon: Clock,
  },
  {
    num: '05',
    title: 'Abrangência nacional',
    desc: 'Cobertura em todo o território brasileiro segundo as regras de atendimento e rede credenciada da entidade responsável.',
    badge: 'Nacional',
    icon: MapPin,
  },
  {
    num: '06',
    title: 'Guincho em acidente ou pane',
    desc: 'Reboque especializado para levar sua motocicleta até a oficina ou local seguro, respeitando a quilometragem contratada.',
    badge: 'Socorro',
    icon: Wrench,
  },
]

const pricingFactors = [
  {
    code: 'FATOR 01',
    title: 'Modelo e cilindrada',
    desc: 'O índice de sinistralidade e o custo de reposição de peças variam conforme a marca, cilindrada e categoria da moto.',
  },
  {
    code: 'FATOR 02',
    title: 'Ano de fabricação',
    desc: 'O ano da motocicleta influencia tanto o enquadramento de aceitação quanto a faixa de mensalidade e vistoria.',
  },
  {
    code: 'FATOR 03',
    title: 'Valor de referência',
    desc: 'A cota de proteção é dimensionada proporcionalmente ao valor de mercado do veículo (como referência FIPE).',
  },
  {
    code: 'FATOR 04',
    title: 'Uso em motofrete',
    desc: 'Por rodar mais horas por dia em atividade remunerada, é essencial validar as condições específicas para profissionais.',
  },
]

const checklistItems = [
  {
    id: 'motofrete',
    title: 'Elegibilidade expressa para motofrete remunerado',
    desc: 'Confirme no documento do fornecedor que o uso comercial/profissional em entregas está expressamente contemplado.',
  },
  {
    id: 'carencia',
    title: 'Prazos de carência e ativação após vistoria',
    desc: 'Verifique a partir de qual data e horário cada cobertura passa a valer efetivamente após a vistoria e o pagamento.',
  },
  {
    id: 'participacao',
    title: 'Valor de participação obrigatória (franquia / cota)',
    desc: 'Consulte o percentual ou valor fixo que cabe ao associado/segurado em caso de acionamento para conserto de colisão.',
  },
  {
    id: 'guincho',
    title: 'Limites de quilometragem de guincho e número de acionamentos',
    desc: 'Saiba quantos quilômetros de reboque estão inclusos e quantas vezes por mês/ano a assistência 24h pode ser acionada.',
  },
  {
    id: 'exclusoes',
    title: 'Riscos excluídos e deveres de guarda do veículo',
    desc: 'Leia atentamente as situações não cobertas (ex: condutor não habilitado, modificações não informadas ou inadimplência).',
  },
  {
    id: 'sinistro',
    title: 'Documentos e prazos para aviso de sinistro',
    desc: 'Tenha clareza sobre o Boletim de Ocorrência, fotos, prazos de comunicação e canais oficiais 0800 do fornecedor.',
  },
]

const incidentSteps = [
  {
    step: 'PASSO 01',
    title: 'Garanta sua segurança pessoal',
    desc: 'Sinalize o local se houver acidente de trânsito e acione os serviços públicos de emergência (190 / 192) caso necessário.',
  },
  {
    step: 'PASSO 02',
    title: 'Acione o canal 24h do fornecedor',
    desc: 'Ligue imediatamente para a central de assistência 24h constante no seu contrato de proteção para solicitar guincho ou socorro.',
  },
  {
    step: 'PASSO 03',
    title: 'Registre o ocorrido e reúna documentos',
    desc: 'Providencie o Boletim de Ocorrência (em caso de roubo, furto ou colisão), fotos do local, CNH e documento da motocicleta.',
  },
  {
    step: 'PASSO 04',
    title: 'Acompanhe a análise direto com o fornecedor',
    desc: 'O processo de vistoria, oficina credenciada ou indenização é conduzido diretamente pela entidade responsável pelo seu plano.',
  },
]

const protectionFaqs = [
  [
    'Sou obrigado a contratar a proteção veicular para rodar na LogMovy?',
    'Não. A proteção veicular é 100% facultativa. Você pode se cadastrar, receber propostas e realizar corridas na LogMovy sem aderir a nenhum plano de proteção ou Clube de Benefícios.',
  ],
  [
    'Se eu não contratar ou cancelar depois, perco prioridade ou nota no app?',
    'De forma alguma. Conforme previsto no Contrato de Adesão v1.1 (Anexo II), a não adesão ou o cancelamento futuro não reduz sua nota, seu ranking nem sua elegibilidade no marketplace.',
  ],
  [
    'A LogMovy é uma seguradora ou associação de proteção veicular?',
    'Não. A LogMovy atua como plataforma tecnológica SaaS/Marketplace. A proteção veicular é oferecida e gerida por fornecedor parceiro independente e especializado, identificado na sua proposta.',
  ],
  [
    'Ver as coberturas nesta página já ativa a proteção para minha moto?',
    'Não. A exibição informativa de coberturas não ativa proteção. A cobertura somente nasce após você receber a cotação final, realizar a vistoria exigida e assinar o instrumento específico com o fornecedor.',
  ],
  [
    'Por que não há um preço único fixo divulgado para todas as motos?',
    'Porque a mensalidade e a participação variam de acordo com o modelo, cilindrada, ano de fabricação, valor da motocicleta e perfil de utilização em motofrete definidos pelo fornecedor.',
  ],
  [
    'Qual a diferença entre a Proteção Veicular e o Clube de Benefícios?',
    'A Proteção Veicular foca em eventos patrimoniais da moto (roubo, furto, colisão, guincho 24h) mediante contrato próprio com o fornecedor. Já o Clube de Benefícios reúne descontos em oficinas, peças, pneus e lojas parceiras para o dia a dia.',
  ],
]

export default function ProtectionPage() {
  const [activeStage, setActiveStage] = useState<number>(1)
  const [checkedList, setCheckedList] = useState<string[]>(['motofrete', 'carencia'])
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const toggleCheck = (id: string) => {
    setCheckedList((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const checkProgress = Math.round((checkedList.length / checklistItems.length) * 100)

  return (
    <div className="prot-page-wrapper">
      {/* =========================================================
          01. HERO SECTION (DARK NAVY + 3D SHIELD + REACT BITS BLURTEXT)
         ========================================================= */}
      <section className="prot-hero section-dark">
        <DeliveryMotion />

        <div className="prot-hero-container">
          {/* Left Copy Column */}
          <div className="prot-hero-copy">
            <div className="prot-hero-badge">
              <span className="prot-live-dot" />
              <ShinyText
                text="BENEFÍCIO FACULTATIVO · CONTRATAÇÃO SEPARADA"
                speed={3.5}
              />
            </div>

            <h1 className="prot-hero-title">
              <BlurText
                text="Sua moto protegida. A escolha é sua."
                highlightFromIndex={3}
                highlightClassName="prot-lime-word"
              />
            </h1>

            <p className="prot-hero-lead">
              A <strong>LogMovy</strong> facilita o acesso a informações e cotações de proteção veicular oferecida por fornecedor especializado, com total transparência e contratação independente.
            </p>

            <div className="prot-hero-pills">
              <div className="prot-pill-item">
                <CheckCircle2 size={15} className="prot-pill-icon" />
                <span>100% Opcional</span>
              </div>
              <div className="prot-pill-item">
                <CheckCircle2 size={15} className="prot-pill-icon" />
                <span>Não afeta seu ranking</span>
              </div>
              <div className="prot-pill-item">
                <CheckCircle2 size={15} className="prot-pill-icon" />
                <span>Fornecedor especializado</span>
              </div>
            </div>

            <div className="prot-hero-actions">
              <a
                href={WHATSAPP_PROTECAO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="prot-btn-primary"
              >
                <span>Falar com consultor da proteção</span>
                <span className="prot-btn-bubble">
                  <ArrowUpRight size={17} />
                </span>
              </a>

              <a href="#etapas-protecao" className="prot-btn-secondary">
                <span>Ver cada etapa</span>
                <ArrowRight size={16} />
              </a>
            </div>

            {/* CountUp Telemetry Strip */}
            <div className="prot-hero-stats">
              <div className="prot-stat-col">
                <strong className="prot-stat-num lime">
                  <CountUp to={6} duration={1100} prefix="0" />
                </strong>
                <span>Coberturas possíveis</span>
              </div>
              <div className="prot-stat-sep" />
              <div className="prot-stat-col">
                <strong className="prot-stat-num">
                  <CountUp to={24} duration={1300} suffix="h" />
                </strong>
                <span>Assistência disponível</span>
              </div>
              <div className="prot-stat-sep" />
              <div className="prot-stat-col">
                <strong className="prot-stat-num lime">
                  <CountUp to={5} duration={1100} prefix="0" />
                </strong>
                <span>Etapas transparentes</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Interactive Protection Cockpit Card */}
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
                    <div className="prot-status-title">CENTRAL DE PROTEÇÃO</div>
                    <div className="prot-status-sub">Simulação & Cobertura Facultativa</div>
                  </div>
                </div>
                <span className="prot-optional-pill">100% OPCIONAL</span>
              </div>

              {/* Inner Vehicle & Coverage Summary Card */}
              <div className="prot-cockpit-inner">
                <div className="prot-inner-head">
                  <div className="prot-vehicle-tag">
                    <Bike size={15} className="prot-bike-lime" />
                    <span>PERFIL MOTOFRETE · USO COMERCIAL</span>
                  </div>
                  <div className="prot-plate-badge">
                    <span className="plate-band">BR</span>
                    <strong>ABC-1D23</strong>
                  </div>
                </div>

                {/* 4 Key Coverage Pills Inside Cockpit */}
                <div className="prot-inner-cov-grid">
                  <div className="prot-mini-cov">
                    <div className="mini-cov-icon">
                      <Lock size={14} />
                    </div>
                    <div>
                      <strong>Roubo e Furto</strong>
                      <span>Indenização conforme plano</span>
                    </div>
                  </div>

                  <div className="prot-mini-cov">
                    <div className="mini-cov-icon">
                      <Shield size={14} />
                    </div>
                    <div>
                      <strong>Colisão & PT</strong>
                      <span>Reparo de casco e danos</span>
                    </div>
                  </div>

                  <div className="prot-mini-cov">
                    <div className="mini-cov-icon">
                      <Clock size={14} />
                    </div>
                    <div>
                      <strong>Assistência 24h</strong>
                      <span>Socorro elétrico / mecânico</span>
                    </div>
                  </div>

                  <div className="prot-mini-cov">
                    <div className="mini-cov-icon">
                      <Wrench size={14} />
                    </div>
                    <div>
                      <strong>Guincho & Reboque</strong>
                      <span>Atendimento nacional</span>
                    </div>
                  </div>
                </div>

                {/* Specs Strip */}
                <div className="prot-inner-specs">
                  <div className="prot-spec-item">
                    <span>CONTRATAÇÃO</span>
                    <strong className="lime-text">Direto c/ Fornecedor</strong>
                  </div>
                  <div className="prot-spec-divider" />
                  <div className="prot-spec-item">
                    <span>IMPACTO NO APP</span>
                    <strong>Zero no Ranking</strong>
                  </div>
                  <div className="prot-spec-divider" />
                  <div className="prot-spec-item">
                    <span>ADESÃO</span>
                    <strong>Sem vínculo forçado</strong>
                  </div>
                </div>
              </div>

              {/* Bottom Chips Row */}
              <div className="prot-cockpit-bottom">
                <div className="prot-bottom-chip">
                  <div className="chip-icon-sphere lime">
                    <ShieldCheck size={15} />
                  </div>
                  <div>
                    <strong>Fornecedor Especializado</strong>
                    <span>Instrumento e regulamento próprios</span>
                  </div>
                </div>

                <div className="prot-bottom-chip">
                  <div className="chip-icon-sphere blue">
                    <Sparkles size={15} />
                  </div>
                  <div>
                    <strong>Liberdade de Escolha</strong>
                    <span>Cancele ou adira quando quiser</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          02. COMO FUNCIONA — 5 ETAPAS EXPLICADAS (STICKY 3D + TIMELINE)
         ========================================================= */}
      <section id="etapas-protecao" className="prot-steps-section section-light section-pad">
        <NetworkMotion />

        <div className="prot-container">
          <div className="section-kicker">
            <div className="kicker-pill">
              <span className="kicker-live-dot" />
              <span className="kicker-text-desktop">PASSO A PASSO TRANSPARENTE</span>
              <span className="kicker-text-mobile">COMO FUNCIONA</span>
            </div>
            <span className="kicker-index">01 / AS 5 ETAPAS</span>
          </div>

          <div className="prot-section-head">
            <div>
              <h2 className="prot-section-title">
                Como funciona a consulta
                <br />e a <span className="prot-title-lime">contratação em 5 etapas.</span>
              </h2>
            </div>
            <p className="prot-section-desc">
              Explicamos cada fase do processo para que você tenha total segurança jurídica e operacional antes de tomar qualquer decisão.
            </p>
          </div>

          <div className="prot-steps-layout">
            {/* Left Sticky Column (Desktop Only): Interactive Step Dossier Card */}
            <div className="prot-steps-sticky-col">
              {(() => {
                const currentStep = stepsData.find((s) => s.num === activeStage) || stepsData[0]
                const CurrentIcon = currentStep.icon
                return (
                  <div className="prot-dossier-card">
                    <div className="prot-dossier-top">
                      <span className="prot-dossier-badge">RESUMO DA ETAPA {currentStep.code}/05</span>
                      <span className="prot-dossier-tag">{currentStep.tag}</span>
                    </div>

                    <div className="prot-dossier-hero">
                      <div className="prot-dossier-icon-sphere">
                        <CurrentIcon size={24} />
                      </div>
                      <div>
                        <h4>{currentStep.title}</h4>
                        <p>{currentStep.lead}</p>
                      </div>
                    </div>

                    <div className="prot-dossier-progress-bar">
                      {stepsData.map((s) => (
                        <span
                          key={s.num}
                          className={s.num <= activeStage ? 'filled' : ''}
                        />
                      ))}
                    </div>

                    <div className="prot-stage-pills-nav">
                      {stepsData.map((st) => (
                        <button
                          key={st.num}
                          type="button"
                          onClick={() => {
                            setActiveStage(st.num)
                            const el = document.getElementById(`prot-step-card-${st.num}`)
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
                        <strong>Garantia de Autonomia:</strong> A simples cotação não gera cobrança. A cobertura só passa a valer após a assinatura do contrato próprio com o fornecedor.
                      </span>
                    </div>
                  </div>
                )
              })()}
            </div>

            {/* Right Scrolling Column: The 5 Detailed Step Cards */}
            <div className="prot-steps-cards-col">
              {stepsData.map((st) => {
                const IconComp = st.icon
                const isActive = activeStage === st.num
                return (
                  <motion.article
                    id={`prot-step-card-${st.num}`}
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
          03. COBERTURAS POSSÍVEIS (REACT BITS SPOTLIGHT CARDS)
         ========================================================= */}
      <section className="prot-coverages-section section-dark section-pad">
        <div className="prot-container">
          <div className="section-kicker light">
            <div className="kicker-pill dark-pill">
              <span className="kicker-live-dot" />
              <span className="kicker-text-desktop">ITENS QUE PODEM COMPOR O PLANO</span>
              <span className="kicker-text-mobile">COBERTURAS</span>
            </div>
            <span className="kicker-index light">02 / COBERTURAS POSSÍVEIS</span>
          </div>

          <div className="prot-section-head light">
            <div>
              <h2 className="prot-section-title light">
                O que pode fazer parte
                <br />
                <span className="title-lime-glow">da sua proteção veicular.</span>
              </h2>
            </div>
            <p className="prot-section-desc light">
              Os itens abaixo exemplificam as coberturas divulgadas pelos fornecedores parceiros. A existência e a extensão reais dependem do contrato e regulamento de cada fornecedor.
            </p>
          </div>

          <div className="prot-spotlight-grid">
            {coveragesData.map((cov) => {
              const CovIcon = cov.icon
              return (
                <SpotlightCard
                  key={cov.num}
                  className="prot-coverage-card"
                  spotlightColor="rgba(140, 229, 27, 0.22)"
                >
                  <div className="prot-cov-top">
                    <span className="prot-cov-num">{cov.num}</span>
                    <span className="prot-cov-badge">{cov.badge}</span>
                    <div className="prot-cov-icon">
                      <CovIcon size={18} />
                    </div>
                  </div>
                  <h3 className="prot-cov-title">{cov.title}</h3>
                  <p className="prot-cov-desc">{cov.desc}</p>
                </SpotlightCard>
              )
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          04. O QUE INFLUENCIA O VALOR + 05. CHECKLIST ANTES DE CONTRATAR
         ========================================================= */}
      <section className="prot-factors-section section-light section-pad">
        <div className="prot-container">
          <div className="section-kicker">
            <div className="kicker-pill">
              <span className="kicker-live-dot" />
              <span className="kicker-text-desktop">CRITÉRIOS DE COTAÇÃO & CONFERÊNCIA</span>
              <span className="kicker-text-mobile">CRITÉRIOS</span>
            </div>
            <span className="kicker-index">03 / COTAÇÃO & CHECKLIST</span>
          </div>

          {/* Factors Sub-block */}
          <div className="prot-factors-block">
            <div className="prot-factors-header">
              <h2 className="prot-section-title">
                O que influencia o valor
                <br />
                <span className="prot-title-lime">da sua mensalidade.</span>
              </h2>
              <p className="prot-section-desc">
                Cada motocicleta e rotina têm características próprias. Por isso, o fornecedor calcula a cotação individualmente com base em 4 pilares:
              </p>
            </div>

            <div className="prot-factors-grid">
              {pricingFactors.map((f) => (
                <div key={f.code} className="prot-factor-card">
                  <span className="prot-factor-code">{f.code}</span>
                  <h4>{f.title}</h4>
                  <p>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Pre-Contract Checklist (Anexo II Rules) */}
          <div className="prot-checklist-box">
            <div className="prot-checklist-head">
              <div>
                <span className="prot-checklist-eyebrow">
                  <Sparkles size={13} /> GUIA DE SEGURANÇA DO PARCEIRO (ANEXO II)
                </span>
                <h3>Checklist: O que conferir antes de assinar com o fornecedor</h3>
                <p>
                  Marque os itens abaixo quando estiver analisando uma proposta para garantir que você conferiu todas as regras essenciais:
                </p>
              </div>

              <div className="prot-checklist-meter">
                <div className="meter-top">
                  <span>Itens conferidos</span>
                  <strong>
                    {checkedList.length}/{checklistItems.length} ({checkProgress}%)
                  </strong>
                </div>
                <div className="meter-bar-bg">
                  <div className="meter-bar-fill" style={{ width: `${checkProgress}%` }} />
                </div>
              </div>
            </div>

            <div className="prot-checklist-grid">
              {checklistItems.map((item) => {
                const isChecked = checkedList.includes(item.id)
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleCheck(item.id)}
                    className={`prot-check-card ${isChecked ? 'is-checked' : ''}`}
                  >
                    <span className="prot-check-box">
                      <Check size={13} strokeWidth={3} />
                    </span>
                    <div className="prot-check-text">
                      <strong>{item.title}</strong>
                      <small>{item.desc}</small>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          06. EM CASO DE OCORRÊNCIA / SINISTRO (4 PASSOS)
         ========================================================= */}
      <section className="prot-incident-section section-light">
        <div className="prot-container">
          <div className="prot-incident-shell">
            <div className="prot-incident-header">
              <div className="prot-incident-badge">
                <PhoneCall size={14} />
                <span>PROCEDIMENTO PADRÃO DE ACIONAMENTO</span>
              </div>
              <h3>Como agir em caso de pane, colisão, roubo ou furto</h3>
              <p>
                Caso você tenha contratado um plano junto ao fornecedor parceiro, o atendimento de emergência e a regulação de sinistro acontecem diretamente com a central do fornecedor:
              </p>
            </div>

            <div className="prot-incident-grid">
              {incidentSteps.map((inc, idx) => (
                <div key={inc.step} className="prot-incident-step-card">
                  <div className="inc-step-top">
                    <span className="inc-step-pill">{inc.step}</span>
                    {idx < incidentSteps.length - 1 && (
                      <ArrowRight size={15} className="inc-step-arrow" />
                    )}
                  </div>
                  <h4>{inc.title}</h4>
                  <p>{inc.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          07. FAQ ESPECÍFICO DA PROTEÇÃO VEICULAR
         ========================================================= */}
      <section className="faq section-light section-pad">
        <div className="prot-container">
          <div className="section-kicker">
            <div className="kicker-pill">
              <span className="kicker-live-dot" />
              <span className="kicker-text-desktop">TRANSPARÊNCIA CONTRATUAL</span>
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
                Perguntas sobre a
                <br />
                <span className="title-navy-accent">proteção veicular.</span>
              </h2>
              <p className="faq-lead">
                Respostas diretas baseadas no Contrato de Adesão v1.1 da LogMovy sobre autonomia, opcionalidade e regras do fornecedor.
              </p>

              <div className="faq-support-card">
                <div className="support-card-top">
                  <div className="support-icon-sphere">
                    <PhoneCall size={18} />
                  </div>
                  <div>
                    <h4 className="support-title">Quer cotar para sua moto?</h4>
                    <p className="support-desc">
                      Fale diretamente no WhatsApp (+55 83 9944-6461) com um consultor da proteção veicular para tirar dúvidas e simular seu plano.
                    </p>
                  </div>
                </div>
                <a
                  href={WHATSAPP_PROTECAO_URL}
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
              {protectionFaqs.map(([q, a], i) => {
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
          08. FINAL CTA WITH REACT BITS SQUARES INTERACTIVE CANVAS
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
            <span>AUTONOMIA E TRANSPARÊNCIA LOGMOVY</span>
          </div>

          <h2 className="final-cta-title">
            Sua rotina na rua.
            <br />
            <span className="title-lime-glow">Suas escolhas no comando.</span>
          </h2>

          <p className="final-cta-lead">
            Fale agora pelo WhatsApp (+55 83 9944-6461) diretamente com um consultor da proteção veicular para conhecer coberturas, benefícios e valores para a sua moto.
          </p>

          <div className="final-cta-actions">
            <a
              href={WHATSAPP_PROTECAO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="final-cta-btn-primary group"
            >
              <span>Falar com consultor no WhatsApp</span>
              <span className="btn-icon-bubble">
                <ArrowUpRight size={17} />
              </span>
            </a>

            <a href="/#beneficios" className="final-cta-btn-secondary">
              <span>Voltar para a página inicial</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
