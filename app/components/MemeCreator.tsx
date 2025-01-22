'use client'

import { useState } from 'react'
import { Input } from '@/app/components/ui/input'
import { Button } from '@/app/components/ui/button'
import { Label } from '@/app/components/ui/label'
import PixelCanvas from './PixelCanvas'

interface MemeCreatorProps {
  onMemeCreated: (meme: { name: string; image: string }) => void
}

export default function MemeCreator({ onMemeCreated }: MemeCreatorProps) {
  const [memeName, setMemeName] = useState('')
  const [memeImage, setMemeImage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (memeName && memeImage) {
      onMemeCreated({ name: memeName, image: memeImage })
      setMemeName('')
      setMemeImage('')
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl pixel-text-minimal mb-4">Create Your Pixel Meme</h2>
      <PixelCanvas onImageCreated={setMemeImage} />
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="meme-name" className="pixel-text-minimal">Meme Name</Label>
          <Input
            id="meme-name"
            type="text"
            value={memeName}
            onChange={(e) => setMemeName(e.target.value)}
            className="bg-black border-white text-white pixel-text-minimal"
            required
          />
        </div>
        <Button type="submit" className="w-full bg-white text-black hover:bg-gray-200 pixel-text-minimal">
          Create Meme
        </Button>
      </form>
    </div>
  )
}

