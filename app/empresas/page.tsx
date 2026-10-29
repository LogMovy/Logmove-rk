import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import EmpresasPage from '@/components/empresas/EmpresasPage'
import './empresas.css'

export const metadata: Metadata = {
  title: 'Para Empresas · Logística B2B de Motoboys | LOGMOVY',
  description:
    'Conecte sua empresa à malha inteligente de motoboys parceiros da LogMovy. Escala nos horários de pico, entregadores verificados e zero custo com frota ociosa.',
}

export default function EmpresasRoute() {
  return (
    <main>
      <Header />
      <EmpresasPage />
      <Footer />
    </main>
  )
}

