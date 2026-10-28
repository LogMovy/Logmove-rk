import type { Metadata } from 'next'
import Header from '@/components/Header'
import RegistrationFlow from '@/components/RegistrationFlow'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Cadastro de parceiro | LOGMOVY',
  description: 'Faça seu cadastro como motoboy parceiro da LogMovy.',
}

export default function CadastroPage() {
  return (
    <main className="registration-page">
      <Header />
      <RegistrationFlow />
      <Footer />
    </main>
  )
}
