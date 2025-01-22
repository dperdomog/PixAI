'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/app/components/ui/button'

const GRID_SIZE = 32
const PIXEL_SIZE = 10
const COLORS = ['#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#00FFFF', '#FF00FF']

interface PixelCanvasProps {
  onImageCreated: (imageData: string) => void
}

export default function PixelCanvas({ onImageCreated }: PixelCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [currentColor, setCurrentColor] = useState('#FFFFFF')

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = GRID_SIZE * PIXEL_SIZE
    canvas.height = GRID_SIZE * PIXEL_SIZE

    // Initialize canvas with a black background
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath()
      ctx.moveTo(i * PIXEL_SIZE, 0)
      ctx.lineTo(i * PIXEL_SIZE, canvas.height)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(0, i * PIXEL_SIZE)
      ctx.lineTo(canvas.width, i * PIXEL_SIZE)
      ctx.stroke()
    }
  }, [])

  const drawPixel = (x: number, y: number) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const pixelX = Math.floor(x / PIXEL_SIZE) * PIXEL_SIZE
    const pixelY = Math.floor(y / PIXEL_SIZE) * PIXEL_SIZE

    ctx.fillStyle = currentColor
    ctx.fillRect(pixelX, pixelY, PIXEL_SIZE, PIXEL_SIZE)
  }

  const handleInteraction = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing && e.type !== 'touchmove') return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = 'touches' in e 
      ? e.touches[0].clientX - rect.left 
      : (e as React.MouseEvent<HTMLCanvasElement>).clientX - rect.left
    const y = 'touches' in e 
      ? e.touches[0].clientY - rect.top 
      : (e as React.MouseEvent<HTMLCanvasElement>).clientY - rect.top

    drawPixel(x, y)
  }

  const handleClear = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  const handleSave = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const imageData = canvas.toDataURL('image/png')
    onImageCreated(imageData)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-center space-x-2 mb-4">
        {COLORS.map((color) => (
          <button
            key={color}
            className={`w-8 h-8 rounded-full ${currentColor === color ? 'ring-2 ring-white' : ''}`}
            style={{ backgroundColor: color }}
            onClick={() => setCurrentColor(color)}
          />
        ))}
      </div>
      <canvas
        ref={canvasRef}
        className="border border-white cursor-crosshair mx-auto"
        onMouseDown={() => setIsDrawing(true)}
        onMouseUp={() => setIsDrawing(false)}
        onMouseLeave={() => setIsDrawing(false)}
        onMouseMove={handleInteraction}
        onTouchStart={() => setIsDrawing(true)}
        onTouchEnd={() => setIsDrawing(false)}
        onTouchMove={handleInteraction}
      />
      <div className="flex justify-center space-x-4">
        <Button onClick={handleClear} className="bg-white text-black hover:bg-gray-200 pixel-text-minimal">
          Clear
        </Button>
        <Button onClick={handleSave} className="bg-white text-black hover:bg-gray-200 pixel-text-minimal">
          Save Meme
        </Button>
      </div>
    </div>
  )
}

