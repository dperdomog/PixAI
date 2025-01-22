import Header from '../components/Header'
import Footer from '../components/Footer'
import GameInterface from '../components/GameInterface'

export default function GamePage() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />
      <main className="flex-grow">
        <GameInterface />
      </main>
      <Footer />
    </div>
  )
}

