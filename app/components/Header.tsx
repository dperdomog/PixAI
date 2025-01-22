'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '../components/ui/button'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'Docs', href: 'docs.pixaiterminal.com' },
    { name: 'X', href: 'https://x.com/_PixAI_' },
    { name: 'Github', href: 'https://github.com/Pixie548/PixAI' },
    { name: 'Telegram', href: 'https://t.me/pixai_portal', className: 'text-white hover:text-gray-300' },
  ]

  return (
    <header className="bg-black text-white py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-white text-xl pixel-text-minimal glitch-hover" data-text="PixAI">
            PixAI
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-white hover:text-gray-300 transition-colors pixel-text-minimal text-sm ${item.className || ''}`}
              >
                {item.name}
              </Link>
            ))}
            <Link href="/game" passHref>
              <Button className="bg-white text-black hover:bg-gray-200 pixel-text-minimal text-sm px-4 py-2">
                App
              </Button>
            </Link>
          </nav>

          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <nav className="mt-4 md:hidden">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block py-2 text-white hover:text-gray-300 transition-colors pixel-text-minimal text-sm ${item.className || ''}`}
                onClick={toggleMenu}
              >
                {item.name}
              </Link>
            ))}
            <Link href="/game" passHref>
              <Button 
                className="bg-white text-black hover:bg-gray-200 pixel-text-minimal text-sm px-4 py-2 w-full mt-2"
                onClick={toggleMenu}
              >
                App
              </Button>
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}

