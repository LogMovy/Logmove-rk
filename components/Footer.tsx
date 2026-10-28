import React from 'react'
import { ArrowUp, Shield } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Col 1: Brand & Proposition */}
          <div className="footer-col-brand">
            <a href="/#inicio" className="premium-brand footer-brand" aria-label="LogMovy início">
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
              <li><a href="/#inicio">Início</a></li>
              <li><a href="/#aplicativo">O Aplicativo</a></li>
              <li><a href="/#como-funciona">Como Funciona</a></li>
              <li><a href="/#beneficios">Benefícios</a></li>
              <li><a href="/#faq">Perguntas Frequentes</a></li>
            </ul>
          </div>

          {/* Col 3: Para o Motoboy */}
          <div className="footer-col-nav">
            <h4 className="footer-col-title">PARA O PARCEIRO</h4>
            <ul className="footer-links-list">
              <li>
                <a href="/cadastro" className="footer-link-highlight">
                  Meu pré-cadastro ↗
                </a>
              </li>
              <li><a href="/protecao">Proteção Veicular</a></li>
              <li><a href="/#beneficios">Clube de Benefícios</a></li>
              <li><a href="/#faq">Dúvidas Frequentes</a></li>
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
              <a href="/cadastro">Termos de Uso</a>
              <span className="legal-dot">·</span>
              <a href="/cadastro">Privacidade</a>
            </div>
          </div>

          <a href="#" className="footer-back-to-top" aria-label="Voltar ao início">
            <span>Voltar ao topo</span>
            <ArrowUp size={14} />
          </a>
        </div>
      </div>
    </footer>
  )
}
