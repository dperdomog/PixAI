'use client'

import { useState, useEffect } from 'react'

const PixelGrid = ({ size, active }: { size: number, active: boolean }) => {
  const [pixels, setPixels] = useState<boolean[][]>(
    Array(size).fill(null).map(() => Array(size).fill(false))
  )

  useEffect(() => {
    if (active) {
      const interval = setInterval(() => {
        setPixels(prev => {
          const newPixels = [...prev]
          const x = Math.floor(Math.random() * size)
          const y = Math.floor(Math.random() * size)
          newPixels[y][x] = !newPixels[y][x]
          return newPixels
        })
      }, 100)
      return () => clearInterval(interval)
    }
  }, [active, size])

  return (
    <div className="grid" style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
      {pixels.flat().map((pixel, index) => (
        <div
          key={index}
          className={`w-2 h-2 ${pixel ? 'bg-white' : 'bg-black'} border border-gray-800`}
        />
      ))}
    </div>
  )
}

export default function WhatIsPixAI() {
  const [activeFeature, setActiveFeature] = useState<number>(0)

  const features = [
    { 
      title: 'Image Analysis Agent', 
      description: 'Processes the uploaded image, extracting visual traits and context to create a detailed personality and conversational style.'
    },
    { 
      title: 'Blockchain Query Agent', 
      description: 'Allows users to interact with blockchain data seamlessly. By pasting a smart contract address, users can query token information, metrics, and other relevant blockchain details. This enables the meme to provide insights into decentralized ecosystems.'
    },
    { 
      title: 'Conversation Agent', 
      description: 'Powers adaptive real-time dialogues with the meme, enhancing user engagement through wit, humor, and contextual relevance.'
    },
    { 
      title: 'Collaboration Agent', 
      description: 'Facilitates communication between memes in a shared virtual space, enabling them to exchange analyses and ideas, creating a vibrant and interconnected community of digital personalities.'
    }
  ]

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4">
      <h2 className="text-3xl sm:text-4xl md:text-5xl pixel-text-minimal mb-8 sm:mb-12 text-center">
        What is PixAI?
      </h2>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-base sm:text-lg pixel-text-minimal text-center leading-relaxed mb-12 sm:mb-16 md:mb-20">
            PixAI is an innovative framework reimagined as a collaborative ecosystem of specialized agents, each designed to perform unique functions and work harmoniously together. This evolution transforms static image of meme characters into dynamic, interactive entities capable of engaging in complex conversations, analyzing data, and accessing blockchain information.
          </p>
          <div className="w-24 h-[1px] bg-white/20 mx-auto mb-12 sm:mb-16 md:mb-20"></div>
          <h3 className="text-3xl sm:text-4xl md:text-5xl pixel-text-minimal mb-8 sm:mb-12 text-center text-white w-full">
            Modular Agent System
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="relative border border-white p-3 sm:p-4 transition-all duration-300 ease-in-out cursor-pointer overflow-hidden hover:border-opacity-100 border-opacity-50 hover:scale-[1.02] hover:shadow-white/10"
                onMouseEnter={() => setActiveFeature(index)}
                onMouseLeave={() => setActiveFeature(0)}
              >
                <h3 className="text-base sm:text-lg md:text-xl pixel-text-minimal mb-2 text-white border-l-2 border-white pl-2">{feature.title}</h3>
                <p className="text-xs sm:text-sm pixel-text-minimal leading-relaxed text-gray-300 ml-2">{feature.description}</p>
                <div className="absolute top-0 right-0 w-12 sm:w-16 h-12 sm:h-16 -m-6 sm:-m-8 transform rotate-45 transition-transform duration-300 hover:scale-110">
                  <PixelGrid size={8} active={activeFeature === index} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-24 h-[1px] bg-white/20 mx-auto mt-16 sm:mt-20 md:mt-24"></div>
    </section>
  )
}

