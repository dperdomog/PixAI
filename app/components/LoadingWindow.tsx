import { useState, useEffect } from 'react'
import { Button } from '@/app/components/ui/button'

interface LoadingWindowProps {
  onComplete: () => void
}

export default function LoadingWindow({ onComplete }: LoadingWindowProps) {
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval)
          setIsLoading(false)
          return 100
        }
        return prevProgress + 5
      })
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="pixel-loading-container w-4/5 sm:w-auto">
        {isLoading ? (
          <>
            <div className="pixel-loading-bar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress} role="progressbar">
              <div style={{ width: `${progress}%` }} className="h-full bg-white"></div>
            </div>
            <div className="pixel-loading-percentage text-xs sm:text-sm" aria-live="polite">{progress}%</div>
          </>
        ) : (
          <div className="pixel-message show">
            <p className="mb-4 text-sm sm:text-base">Meme added to your MemeDex!</p>
            <Button 
              onClick={onComplete} 
              className="bg-white text-black hover:bg-gray-200 pixel-text-minimal text-xs sm:text-sm"
            >
              Go to MemeDex
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

