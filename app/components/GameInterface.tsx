'use client'

import { useState } from 'react'
import MemeUploader from './MemeUploader'
import MemeInteraction from './MemeInteraction'
import LoadingWindow from './LoadingWindow'

export default function GameInterface() {
  const [currentMeme, setCurrentMeme] = useState<{
    name: string
    image: string
    description?: string
  } | null>(null)
  const [showLoading, setShowLoading] = useState(false)

  const handleMemeUpload = (meme: {
    name: string
    image: string
    description?: string
  }) => {
    setCurrentMeme(meme)
    setShowLoading(true)
    setTimeout(() => {
      setShowLoading(false)
    }, 1500)
  }

  const handleReset = () => {
    setCurrentMeme(null)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {!currentMeme && (
        <MemeUploader onMemeUploaded={handleMemeUpload} />
      )}

      {showLoading && <LoadingWindow onComplete={() => setShowLoading(false)} />}

      {currentMeme && !showLoading && (
        <div className="w-full max-w-[1000px] mx-auto p-6 border-2 border-white rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl pixel-text-minimal text-white">
              Chat with {currentMeme.name}
            </h2>
            <button 
              onClick={handleReset}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded text-white"
            >
              New Meme
            </button>
          </div>
          <MemeInteraction meme={currentMeme} />
        </div>
      )}
    </div>
  )
}

