'use client'

import { useState } from 'react'
import { Progress } from '@/app/components/ui/progress'

export default function Sidebar() {
  const [memesCreated, setMemesCreated] = useState(0)
  const [level, setLevel] = useState(1)

  // Simulated meme collection
  const memeCollection = [
    { name: 'Doge', rarity: 'Common' },
    { name: 'Grumpy Cat', rarity: 'Rare' },
    { name: 'Distracted Boyfriend', rarity: 'Uncommon' },
    { name: 'Rickroll', rarity: 'Legendary' },
  ]

  return (
    <div className="w-64 bg-gray-900 p-4 flex flex-col">
      <h2 className="text-xl pixel-text-minimal mb-4">Meme Master Stats</h2>
      <div className="mb-4">
        <p className="pixel-text-minimal text-sm mb-1">Level: {level}</p>
        <Progress value={33} className="h-2" />
      </div>
      <div className="mb-4">
        <p className="pixel-text-minimal text-sm mb-1">Memes Created: {memesCreated}</p>
      </div>
      <h3 className="text-lg pixel-text-minimal mb-2">Meme Collection</h3>
      <ul className="space-y-2 flex-grow overflow-y-auto">
        {memeCollection.map((meme, index) => (
          <li key={index} className="flex justify-between pixel-text-minimal text-sm">
            <span>{meme.name}</span>
            <span className="text-xs opacity-70">{meme.rarity}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <h3 className="text-lg pixel-text-minimal mb-2">Meme Quests</h3>
        <ul className="space-y-2">
          <li className="pixel-text-minimal text-sm">Create 10 original memes</li>
          <li className="pixel-text-minimal text-sm">Chat with 5 different memes</li>
          <li className="pixel-text-minimal text-sm">Collect a Legendary meme</li>
        </ul>
      </div>
    </div>
  )
}

