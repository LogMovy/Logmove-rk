import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
})

export const metadata: Metadata = {
  title: 'LOGMOV  ',
  description: 'Conectando empresas e profissionais de motofrete. Sua rotina, sua moto, novas oportunidades.',
  icons: {
    icon: [
      { url: '/logmov-icon.png', sizes: '32x32', type: 'image/png' },
      { url: '/logmov-icon.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/logmov-icon.png',
    apple: '/logmov-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#06284b',
  userScalable: true,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={jakarta.variable}>
      <body className={`antialiased ${jakarta.className}`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

