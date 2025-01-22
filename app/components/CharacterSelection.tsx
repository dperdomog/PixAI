'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

const characters = [
  { id: 1, name: 'Pixel Warrior', emoji: '⚔️' },
  { id: 2, name: 'Pixel Mage', emoji: '🧙' },
  { id: 3, name: 'Pixel Rogue', emoji: '🏹' },
  { id: 4, name: 'Pixel Healer', emoji: '💖' },
]

export default function CharacterSelection() {
  const [selectedCharacter, setSelectedCharacter] = useState<number | null>(null)

  return (
    <div className="mt-8">
      <h2 className="text-2xl pixel-text-minimal mb-4">Choose Your Character</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {characters.map((character) => (
          <Button
            key={character.id}
            onClick={() => setSelectedCharacter(character.id)}
            className={`h-24 pixel-text-minimal flex flex-col items-center justify-center ${
              selectedCharacter === character.id
                ? 'bg-white text-black'
                : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}
          >
            <span className="text-3xl mb-2">{character.emoji}</span>
            <span className="text-sm">{character.name}</span>
          </Button>
        ))}
      </div>
      {selectedCharacter && (
        <p className="mt-4 text-center pixel-text-minimal">
          You selected: {characters.find(c => c.id === selectedCharacter)?.name}
        </p>
      )}
    </div>
  )
}

