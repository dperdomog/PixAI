'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function PixelHero() {
  const [copied, setCopied] = useState(false)
  const contractAddress = 'So11111111111111111111111111111111111111112'

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(contractAddress)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <div className="relative h-screen overflow-hidden bg-black">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-0VlZWq0apxNATZiRghWeqhPRQQFkut.png"
            alt="PixAI Art Japanese Street"
            fill
            className="object-cover object-center grayscale opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/70" />
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-20 flex items-center justify-center h-full px-4">
        <div className="text-center space-y-4 sm:space-y-6 md:space-y-8">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white pixel-text-minimal glitch-hover" data-text="PixAI">
            PixAI
          </h1>
          <p className="text-base sm:text-lg text-white pixel-text-minimal mt-2 sm:mt-4 max-w-md mx-auto px-4">
            The next generation meme interaction framework
          </p>
          <Link 
            href="/game" 
            className="inline-block mt-4 sm:mt-6 md:mt-8 px-6 sm:px-8 py-3 sm:py-4 bg-white text-black pixel-text-minimal text-sm hover:bg-gray-200 transition-colors border-2 border-white hover:border-gray-200"
          >
            Start
          </Link>
          <div 
            className="flex items-center justify-center space-x-2 cursor-pointer group"
            onClick={copyToClipboard}
          >
            <div className="border border-gray-700 rounded-full px-4 py-2 hover:border-gray-500 transition-colors bg-black/80 backdrop-blur-sm">
              <span className="text-xs sm:text-sm text-gray-300 pixel-text-minimal">ca: {contractAddress}</span>
              <span className="text-xs text-gray-500 pixel-text-minimal transition-opacity ml-2">
                {copied ? '✓ Copied!' : '(click to copy)'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

