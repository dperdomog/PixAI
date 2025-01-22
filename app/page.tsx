'use client'

import Header from './components/Header'
import Footer from './components/Footer'
import PixAIHero from './components/PixAIHero'
import WhatIsPixAI from './components/WhatIsPixAI'
import HowItWorks from './components/HowItWorks'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />
      <main className="flex-grow">
        <PixAIHero />
        <WhatIsPixAI />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  )
}

