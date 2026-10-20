'use client'

import { useState } from 'react'
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
} from 'lucide-react'
import DeliveryMotion from '@/components/DeliveryMotion'
import Header from '@/components/Header'

const logoUrl = '/logmov-icon.png'

const faqs = [
  ['Posso escolher os dias e horários em que vou trabalhar?', 'Sim. Você define sua disponibilidade no aplicativo, de acordo com a sua rotina.'],
  ['Consigo acompanhar meu financeiro e minhas corridas?', 'Sim. A área do motoboy reúne suas corridas e as informações financeiras dos serviços registrados.'],
  ['Como funciona a taxa de adesão gratuita?', 'Motoboys parceiros podem consultar as condições de gratuidade da taxa de adesão. Mensalidades e outros valores são informados antes da contratação.'],
  ['A LOGMov é uma empresa de proteção veicular?', 'Não. A LOGMov conecta você a oportunidades e facilita o acesso a benefícios oferecidos por fornecedores especializados.'],
  ['Preciso contratar a proteção para usar a plataforma?', 'Não. A proteção veicular e o Clube de Benefícios são optativos e independentes do acesso às oportunidades.'],
  ['A LOGMov garante serviços ou ganhos?', 'Não. A disponibilidade de propostas varia e não há garantia de renda ou volume de serviços.'],
]

function Brand({ light = false }: { light?: boolean }) {
  return <a href="#inicio" className={`brand ${light ? 'brand-light' : ''}`} aria-label="LOGMov início"><span>LOG</span><b>Mov</b><small>LOGÍSTICA DE MOTOBOYS</small></a>
}

export default function Page() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <main>
      <Header />

      <section id="inicio" className="hero section-dark">
        <DeliveryMotion />
        
        {/* Left Column: Hero Content */}
        <div className="hero-copy">
          <div className="hero-pill-badge">
            <span className="live-dot" />
            <span className="badge-text">Conexões que movem a cidade</span>
            <Sparkles size={13} className="badge-sparkle" />
          </div>

          <h1 className="hero-headline">
            Sua rotina. <span className="headline-lime">Sua moto.</span>
            <br />
            <span className="headline-gradient">Novas oportunidades.</span>
          </h1>

          <p className="hero-text">
            Escolha os dias e horários em que deseja trabalhar, acompanhe suas corridas e consulte seu financeiro em tempo real com total autonomia.
          </p>

          <div className="hero-highlights">
            <div className="highlight-item">
              <CheckCircle2 size={15} className="highlight-icon" />
              <span>Autonomia de agenda</span>
            </div>
            <div className="highlight-item">
              <CheckCircle2 size={15} className="highlight-icon" />
              <span>Controle financeiro</span>
            </div>
            <div className="highlight-item">
              <CheckCircle2 size={15} className="highlight-icon" />
              <span>Benefícios optativos</span>
            </div>
          </div>

          <div className="hero-actions">
            <a className="hero-btn-primary" href="#cadastro">
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
          </div>

          <div className="hero-trust-bar">
            <span className="trust-indicator">⚡ Adesão gratuita</span>
            <span className="trust-dot">•</span>
            <span>Sem vínculo de exclusividade</span>
            <span className="trust-dot">•</span>
            <span>Validação simples</span>
          </div>
        </div>

        {/* Right Column: Hero Interactive Cockpit App Card */}
        <div className="hero-cockpit-wrap">
          {/* Ambient Glow Aura */}
          <div className="cockpit-ambient-glow" />

          {/* Floating Motoboy Emblem Badge with glow */}
          <div className="cockpit-emblem-float">
            <img src={logoUrl} alt="LOGMov Motociclista" className="cockpit-emblem-img" />
          </div>

          {/* Smartphone / Cockpit Glass Card */}
          <div className="cockpit-card">
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
                <span className="signal-bars">
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
                <span className="route-tag">CORRIDA DISPONÍVEL</span>
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
                  <div className="flow-line" />
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
                  <span className="spec-val-lime">R$ 38,50</span>
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
              <div className="metric-chip">
                <div className="metric-icon-wrap lime-bg">
                  <TrendingUp size={14} />
                </div>
                <div>
                  <div className="metric-val">R$ 284,00</div>
                  <div className="metric-label">Ganhos de hoje</div>
                </div>
              </div>
              <div className="metric-chip">
                <div className="metric-icon-wrap blue-bg">
                  <ShieldCheck size={14} />
                </div>
                <div>
                  <div className="metric-val">Ativo</div>
                  <div className="metric-label">Clube parceiro</div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Pill: Deliveries Counter */}
          <div className="satellite-pill top-right">
            <span className="sat-dot" />
            <span><strong>+1.200</strong> entregas hoje</span>
          </div>

          {/* Floating Pill: Flexibility */}
          <div className="satellite-pill bottom-left">
            <Clock size={13} className="sat-icon" />
            <span>Você define seus dias e horas</span>
          </div>
        </div>

        {/* Hero Bottom Bar: Connected Ecosystem */}
        <div className="hero-bottom-ecosystem">
          <div className="ecosystem-title">ECOSSISTEMA LOGMOV:</div>
          <div className="ecosystem-badges">
            <div className="eco-badge">
              <Building2 size={14} className="eco-icon" />
              <span>EMPRESAS COM DEMANDA</span>
            </div>
            <div className="eco-connector">
              <ArrowRight size={13} />
            </div>
            <div className="eco-badge highlight">
              <Bike size={15} className="eco-icon lime" />
              <span>MOTOBOYS PARCEIROS</span>
            </div>
            <div className="eco-connector plus">
              <Plus size={13} />
            </div>
            <div className="eco-badge">
              <ShieldCheck size={14} className="eco-icon" />
              <span>BENEFÍCIOS OPTATIVOS</span>
            </div>
          </div>
        </div>
      </section>

      <section id="aplicativo" className="intro section-light section-pad">
        <div className="section-kicker"><span>LOGMOV</span><span>01 / A LOGMOV</span></div>
        <div className="intro-grid"><h2>Do encontro certo<br />à próxima <span>oportunidade.</span></h2><div><p className="lead">A LOGMov é uma plataforma de conexão entre empresas e profissionais de motofrete.</p><p>Reúne oportunidades e facilita o encontro entre a demanda de quem precisa movimentar seu negócio e a disponibilidade de quem trabalha sobre duas rodas.</p><a className="text-link" href="#como-funciona">Entenda a LOGMov <ArrowUpRight /></a></div></div>
        <div className="promise-row"><div><strong>↗</strong><span>MAIS CONEXÃO</span></div><div><strong>↗</strong><span>MAIS POSSIBILIDADES</span></div><div><strong>↗</strong><span>MAIS MOVIMENTO</span></div></div>
      </section>

      <section id="como-funciona" className="app-section section-dark section-pad"><div className="section-kicker light"><span>SEU DIA A DIA NO APLICATIVO</span><span>02 / ROTINA</span></div><div className="app-heading"><h2>Sua agenda.<br /><em>Suas corridas.</em><br />Seu controle.</h2><p>A LOGMov acompanha sua rotina antes, durante e depois de cada serviço.</p></div><div className="feature-grid"><Feature number="01 / AGENDA" title={<>Você escolhe<br /><em>dias e horários.</em></>} body="Defina no aplicativo os dias e horários em que deseja trabalhar. Organize sua disponibilidade conforme sua rotina e avalie as oportunidades antes de aceitar." items={['Minha disponibilidade', 'Dias escolhidos por você', 'Horários definidos por você']} /><Feature number="02 / FINANCEIRO" title={<>Seu financeiro<br /><em>em um só lugar.</em></>} body="Acesse sua área financeira para consultar os ganhos e acompanhar as informações financeiras dos serviços registrados no aplicativo." items={['Meu financeiro', 'Consulta de ganhos', 'Informações dos serviços']} /><Feature number="03 / CORRIDAS" title={<>Acompanhe<br /><em>cada corrida.</em></>} body="Consulte suas corridas e acompanhe o andamento dos serviços pelo aplicativo." items={['Minhas corridas', 'Acompanhamento dos serviços', 'Consulta das corridas']} /></div></section>

      <section id="cadastro" className="steps section-light section-pad"><div className="section-kicker"><span>03 / SIMPLES DE ENTENDER</span><span>COMO COMEÇAR</span></div><div className="steps-heading"><h2>Do cadastro<br /><span>ao compromisso.</span></h2><a className="button button-dark" href="mailto:cadastro@logmov.com.br">Cadastre-se como motoboy <ArrowUpRight /></a></div><div className="step-list">{[['01 /','Apresente seu perfil','Informe seus dados e a documentação necessária para validação.'],['02 /','Escolha dias e horários','Defina sua disponibilidade no app e consulte oportunidades, valores e condições.'],['03 /','Escolha e aceite','Decida quais oportunidades fazem sentido para você, sem obrigação de aceitar.'],['04 /','Acompanhe pelo app','Cumpra os compromissos aceitos, acompanhe suas corridas e consulte seu financeiro.']].map(([num, title, text]) => <div className="step" key={num}><span>{num}</span><div><h3>{title}</h3><p>{text}</p></div><ArrowUpRight /></div>)}</div><p className="fine-print">O cadastro depende de validação. A disponibilidade de propostas varia; não há garantia de renda ou de volume de serviços.</p></section>

      <section id="beneficios" className="benefits section-lime section-pad"><div className="section-kicker"><span>04 / DIFERENCIAIS PARA SUA ROTINA</span><span>ESCOLHAS SUAS</span></div><div className="benefit-heading"><h2>O movimento é seu.<br /><em>A escolha também.</em></h2><p>Proteção veicular e Clube de Benefícios são escolhas suas. Você só adere se aceitar as condições de cada benefício.</p></div><div className="benefit-cards"><article><span className="card-tag">BENEFÍCIO OPTATIVO</span><h3>Proteção para<br />sua moto.</h3><p>A LOGMov facilita o acesso a informações sobre proteção veicular oferecida por fornecedor especializado, com contratação própria e separada.</p><a className="text-link" href="#faq">Como consultar a proteção <ArrowUpRight /></a></article><article className="dark-card"><span className="card-tag">CLUBE DE BENEFÍCIOS</span><h3>Sua rotina.<br /><em>Mais vantagens.</em></h3><p>Descontos e condições especiais em oficinas, peças, serviços e lojas parceiras para acompanhar você também fora das entregas.</p><a className="text-link light" href="#faq">Conheça o clube <ArrowUpRight /></a></article></div><div className="protection-list"><span>O QUE PODE FAZER PARTE DO PLANO</span>{['Roubo e furto','Colisão e perda total','Incêndio por colisão','Assistência 24 horas','Abrangência nacional','Guincho em acidente'].map((item, i) => <div key={item}><b>0{i + 1}</b>{item}</div>)}</div><p className="fine-print">Itens sujeitos à proposta, elegibilidade e regulamento do fornecedor. Consulte limites, carências, participações e exclusões, inclusive as condições para uso em motofrete.</p></section>

      <section id="faq" className="faq section-light section-pad"><div className="section-kicker"><span>05 / TUDO ÀS CLARAS</span><span>PERGUNTAS FREQUENTES</span></div><h2>Antes de seguir,<br /><span>tire suas dúvidas.</span></h2><div className="faq-list">{faqs.map(([question, answer], i) => <div className={`faq-item ${openFaq === i ? 'open' : ''}`} key={question}><button onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i}><span>{question}</span>{openFaq === i ? <X /> : <Plus />}</button>{openFaq === i && <p>{answer}</p>}</div>)}</div></section>

      <section className="final-cta section-dark section-pad"><p className="eyebrow lime">LOGÍSTICA QUE CONECTA PESSOAS</p><h2>O próximo movimento<br /><em>começa com uma conexão.</em></h2><a className="button button-lime" href="#cadastro">Fazer meu pré-cadastro <ArrowUpRight /></a></section>
      <footer className="footer"><Brand /><p>Conectando negócios. Movendo oportunidades.</p><div><a href="#cadastro">Meu pré-cadastro</a><a href="#">Área administrativa</a><a href="#">Termos de Uso</a><a href="#">Privacidade</a></div><small>© 2026 LOGMov · Logística de motoboys</small></footer>
    </main>
  )
}

function Feature({ number, title, body, items }: { number: string; title: React.ReactNode; body: string; items: string[] }) { return <article className="feature"><span className="feature-number">{number}</span><h3>{title}</h3><p>{body}</p><ul>{items.map(item => <li key={item}><Check />{item}</li>)}</ul></article> }
