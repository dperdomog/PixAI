'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/app/components/ui/button'

const GRID_SIZE = 50
const PIXEL_SIZE = 10

export default function GameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [currentColor, setCurrentColor] = useState('#ffffff')

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

  return (
    <div className="text-center mb-8">
      <h2 className="text-2xl pixel-text-minimal mb-4">PixAI World</h2>
      <canvas
        ref={canvasRef}
        className="border border-white cursor-crosshair mx-auto mb-4"
        onMouseDown={() => setIsDrawing(true)}
        onMouseUp={() => setIsDrawing(false)}
        onMouseLeave={() => setIsDrawing(false)}
        onMouseMove={handleInteraction}
        onTouchStart={() => setIsDrawing(true)}
        onTouchEnd={() => setIsDrawing(false)}
        onTouchMove={handleInteraction}
      />
      <div className="flex justify-center space-x-4 mb-4">
        <input
          type="color"
          value={currentColor}
          onChange={(e) => setCurrentColor(e.target.value)}
          className="w-10 h-10 border-none"
        />
        <Button onClick={handleClear} className="bg-white text-black hover:bg-gray-200 pixel-text-minimal">
          Clear Canvas
        </Button>
      </div>
      <p className="text-sm pixel-text-minimal">Create your PixAI world!</p>
    </div>
  )
}

