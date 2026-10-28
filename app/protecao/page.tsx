import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProtectionPage from '@/components/protecao/ProtectionPage'
import './protecao.css'

export const metadata: Metadata = {
  title: 'Proteção Veicular Facultativa | LOGMOVY',
  description:
    'Entenda cada etapa para consultar e contratar a proteção veicular facultativa oferecida por fornecedor parceiro especializado na LogMovy.',
}

export default function ProtecaoRoute() {
  return (
    <main>
      <Header />
      <ProtectionPage />
      <Footer />
    </main>
  )
}
