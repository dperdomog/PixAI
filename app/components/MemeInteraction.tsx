'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/app/components/ui/input'
import { Button } from '@/app/components/ui/button'
import Image from 'next/image'
import axios from 'axios'
import { API_URL } from '@/app/config/api'

interface MemeInteractionProps {
  meme: { 
    name: string
    image: string
    description?: string 
  }
}

export default function MemeInteraction({ meme }: MemeInteractionProps) {
  const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'meme' }[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const memeData = meme.description ? JSON.parse(meme.description) : null

  useEffect(() => {
    const getInitialMessage = async () => {
      setIsLoading(true)
      try {
        const response = await axios.post(`${API_URL}/chat`, {
          message: "Please introduce yourself",
          description: meme.description || '',
          memeName: meme.name
        })

        setMessages([{ 
          text: response.data.message, 
          sender: 'meme' 
        }])
      } catch (error) {
        console.error('Error getting initial message:', error)
        setMessages([{ 
          text: 'Hello! I am having some trouble right now, but please feel free to chat with me!', 
          sender: 'meme' 
        }])
      } finally {
        setIsLoading(false)
      }
    }

    getInitialMessage()
  }, [meme.name, meme.description])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (inputMessage.trim()) {
      setMessages([...messages, { text: inputMessage, sender: 'user' }])
      setInputMessage('')
      setIsLoading(true)

      try {
        const response = await axios.post(`${API_URL}/chat`, {
          message: inputMessage,
          description: meme.description || '',
          memeName: meme.name
        })

        setMessages(prev => [...prev, { 
          text: response.data.message, 
          sender: 'meme' 
        }])
      } catch (error) {
        console.error('Error in chat:', error)
        setMessages(prev => [...prev, { 
          text: 'Sorry, I had trouble responding. Please try again.', 
          sender: 'meme' 
        }])
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <div className="bg-gray-900 p-2 sm:p-4 rounded-lg flex flex-col h-[600px] gap-2 sm:gap-4">
      {/* Panel superior - Información del meme */}
      <div className="flex items-start space-x-4 border-b border-white pb-3 overflow-y-auto max-h-[200px] sm:max-h-[220px]">
        <div className="flex-shrink-0 text-center">
          <Image 
            src={meme.image} 
            alt={meme.name} 
            width={100}
            height={100}
            className="rounded-lg w-16 h-16 sm:w-20 sm:h-20" 
          />
          <h3 className="text-sm sm:text-base pixel-text-minimal mt-1">{meme.name}</h3>
        </div>
        
        {memeData && (
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left text-xs pr-2">
            <div>
              <h4 className="text-xs sm:text-sm pixel-text-minimal mb-1 text-gray-300">Appearance</h4>
              <ul className="list-disc list-inside pixel-text-minimal text-xs space-y-0.5">
                {memeData.appearanceTraits?.map((trait: string, index: number) => (
                  <li key={index} className="text-gray-400 break-words">{trait}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs sm:text-sm pixel-text-minimal mb-1 text-gray-300">Personality</h4>
              <p className="pixel-text-minimal text-xs text-gray-400 whitespace-pre-wrap break-words">{memeData.personality}</p>
            </div>

            <div>
              <h4 className="text-xs sm:text-sm pixel-text-minimal mb-1 text-gray-300">Joke Ideas</h4>
              <ul className="list-disc list-inside pixel-text-minimal text-xs space-y-0.5">
                {memeData.possibleJokes?.map((joke: string, index: number) => (
                  <li key={index} className="text-gray-400 break-words">{joke}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Panel inferior - Chat */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 overflow-y-auto mb-2 sm:mb-4 space-y-2 sm:space-y-4 p-2 border border-white rounded-lg">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`p-2 rounded max-w-[85%] sm:max-w-[80%] ${
                message.sender === 'user' ? 'bg-white text-black' : 'bg-gray-800 text-white'
              } pixel-text-minimal text-xs sm:text-sm`}>
                {message.sender === 'meme' && (
                  <div className="flex items-center mb-1 sm:mb-2">
                    <Image 
                      src={meme.image} 
                      alt={meme.name} 
                      width={24} 
                      height={24} 
                      className="mr-2 rounded w-5 h-5 sm:w-6 sm:h-6" 
                    />
                    <span className="font-bold text-xs">{meme.name}</span>
                  </div>
                )}
                {message.text}
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-grow bg-black border-white text-white pixel-text-minimal text-xs sm:text-sm"
            placeholder={isLoading ? "Waiting for response..." : "Type your message..."}
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            className="bg-white text-black hover:bg-gray-200 pixel-text-minimal text-xs sm:text-sm px-3 sm:px-4"
            disabled={isLoading}
          >
            Send
          </Button>
        </form>
      </div>
    </div>
  )
}

