'use client'

import { useState, useCallback } from 'react'
import { Input } from '@/app/components/ui/input'
import { Button } from '@/app/components/ui/button'
import { Label } from '@/app/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import Image from 'next/image'
import axios from 'axios'
import { API_URL } from '@/app/config/api'

interface MemeUploaderProps {
  onMemeUploaded: (meme: { name: string; image: string; description?: string }) => void
}

export default function MemeUploader({ onMemeUploaded }: MemeUploaderProps) {
  const [memeName, setMemeName] = useState('')
  const [memeImage, setMemeImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleImageChange = (file: File | null) => {
    setError(null)
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file')
        return
      }
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB')
        return
      }
      setMemeImage(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    } else {
      setMemeImage(null)
      setPreviewUrl(null)
    }
  }

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    handleImageChange(file)
  }, [])

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (memeName && memeImage) {
      setIsLoading(true)
      try {
        const reader = new FileReader()
        reader.onloadend = async () => {
          const base64Image = (reader.result as string).split(',')[1]
          
          const response = await axios.post(`${API_URL}/analyze`, {
            image: base64Image,
            memeName: memeName
          })

          onMemeUploaded({
            name: memeName,
            image: reader.result as string,
            description: JSON.stringify(response.data.analysis)
          })

          setMemeName('')
          setMemeImage(null)
          setPreviewUrl(null)
        }
        reader.readAsDataURL(memeImage)
      } catch (error) {
        console.error('Error uploading meme:', error)
        setError('Error uploading meme. Please try again.')
        setIsLoading(false)
      }
    }
  }

  return (
    <Card className="bg-black border-white min-h-[500px] sm:min-h-[550px] md:min-h-[600px] max-w-[95%] sm:max-w-[90%] md:max-w-[800px] mx-auto">
      <CardHeader className="pb-2 sm:pb-3">
        <CardTitle className="text-lg sm:text-xl md:text-2xl pixel-text-minimal text-center text-white">
          Upload Your Meme Character
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleUpload} className="space-y-3 sm:space-y-4">
          <div>
            <Label htmlFor="meme-name" className="pixel-text-minimal mb-1 text-sm sm:text-base">Meme Name</Label>
            <Input
              id="meme-name"
              type="text"
              value={memeName}
              onChange={(e) => setMemeName(e.target.value)}
              className="bg-black border-white text-white pixel-text-minimal text-sm sm:text-base py-1.5 sm:py-2"
              placeholder="Enter your meme's name"
              required
              disabled={isLoading}
              minLength={2}
              maxLength={50}
            />
            <p className="text-xs text-gray-400 mt-1 pixel-text-minimal">
              2-50 characters
            </p>
          </div>

          <div className="flex-1">
            <Label className="pixel-text-minimal mb-1 text-sm sm:text-base">Meme Image</Label>
            <div 
              className={`relative border-2 border-dashed rounded-lg p-3 sm:p-4 text-center transition-colors min-h-[200px] sm:min-h-[250px] md:min-h-[300px] flex flex-col items-center justify-center ${
                isDragging ? 'border-white bg-gray-900' : 'border-gray-600 hover:border-white'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {previewUrl ? (
                <div className="relative w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 mx-auto mb-2">
                  <Image
                    src={previewUrl}
                    alt="Preview"
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className="text-gray-400 pixel-text-minimal text-sm sm:text-base mb-2">
                  Drag and drop your image here, or click to select
                </div>
              )}
              
              <Input
                id="meme-image"
                type="file"
                onChange={(e) => handleImageChange(e.target.files?.[0] || null)}
                className="opacity-0 absolute inset-0 w-full h-full cursor-pointer z-10 [&::-webkit-file-upload-button]:hidden"
                accept="image/*"
                required
                disabled={isLoading}
                style={{ 
                  WebkitAppearance: 'none', 
                  display: 'block', 
                  color: 'transparent',
                  width: '100%',
                  height: '100%'
                }}
              />
              
              {!previewUrl && (
                <div className="text-xs sm:text-sm text-gray-400 pixel-text-minimal">
                  Click or drag image here
                </div>
              )}
              
              {previewUrl && (
                <button
                  type="button"
                  onClick={() => handleImageChange(null)}
                  className="text-xs sm:text-sm text-gray-400 hover:text-white pixel-text-minimal mt-2"
                >
                  Remove image
                </button>
              )}
            </div>
            <p className="text-xs text-gray-400 mt-1 pixel-text-minimal">
              Maximum file size: 5MB
            </p>
          </div>

          {error && (
            <div className="text-red-500 pixel-text-minimal text-xs sm:text-sm">
              {error}
            </div>
          )}

          <Button 
            type="submit" 
            className={`w-full pixel-text-minimal relative py-1.5 sm:py-2 text-sm sm:text-base ${
              isLoading ? 'bg-gray-700' : 'bg-white text-black hover:bg-gray-200'
            }`}
            disabled={isLoading || !memeName || !memeImage}
          >
            {isLoading ? (
              <>
                <span className="opacity-0">Upload Meme</span>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white"></div>
                </div>
              </>
            ) : (
              'Upload Meme'
            )}
          </Button>
        </form>

        <div className="mt-3 sm:mt-4 space-y-2 border-t border-white pt-3">
          <Label className="pixel-text-minimal text-sm sm:text-base">Add the Token Address of your Meme to get DEFI Insights</Label>
          <Button 
            className="w-full bg-gray-700 text-white hover:bg-gray-600 pixel-text-minimal cursor-not-allowed opacity-70 py-1.5 sm:py-2 text-sm sm:text-base"
            disabled
          >
            Coming Soon
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

