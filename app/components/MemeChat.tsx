'use client'

import { useState } from 'react'
import { Input } from '@/app/components/ui/input'
import { Button } from '@/app/components/ui/button'

export default function MemeChat() {
  const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'meme' }[]>([])
  const [inputMessage, setInputMessage] = useState('')

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputMessage.trim()) {
      setMessages([...messages, { text: inputMessage, sender: 'user' }])
      setInputMessage('')
      // Simular respuesta del meme
      setTimeout(() => {
        setMessages(prev => [...prev, { text: 'I am a meme!', sender: 'meme' }])
      }, 1000)
    }
  }

  return (
    <div className="border border-white p-6 w-full md:w-1/2 flex flex-col h-[500px]">
      <h2 className="text-2xl pixel-text-minimal mb-4">Chat with Your Meme</h2>
      <div className="flex-grow overflow-y-auto mb-4 space-y-2">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-2 rounded ${
              message.sender === 'user' ? 'bg-white text-black ml-auto' : 'bg-gray-800 text-white'
            } inline-block max-w-[80%] pixel-text-minimal text-sm`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="flex">
        <Input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className="flex-grow bg-black border-white text-white pixel-text-minimal mr-2"
          placeholder="Type your message..."
        />
        <Button type="submit" className="bg-white text-black hover:bg-gray-200 pixel-text-minimal">
          Send
        </Button>
      </form>
    </div>
  )
}

