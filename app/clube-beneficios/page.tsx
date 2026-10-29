import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ClubeBeneficiosPage from '@/components/clube/ClubeBeneficiosPage'
import './clube.css'

export const metadata: Metadata = {
  title: 'Clube de Benefícios (Parceria VM Brasil) | LOGMOVY',
  description:
    'Conheça o Clube de Benefícios da LogMovy em parceria oficial com a VM Brasil: descontos em oficinas parceiras, peças 100% originais, vantagens exclusivas e assistência 24h em todo o Brasil.',
}

export default function ClubeBeneficiosRoute() {
  return (
    <main>
      <Header />
      <ClubeBeneficiosPage />
      <Footer />
    </main>
  )
}
