import './globals.css'
import './styles/animations.css'
import { Press_Start_2P } from 'next/font/google'

const pressStart2P = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: 'PixAI ',
  description: 'Welcome to PixAI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={pressStart2P.className}>
      <body>{children}</body>
    </html>
  )
}

