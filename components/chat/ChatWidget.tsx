'use client'

import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/components/auth/AuthContext'

interface ChatMessage {
  id: string
  content: string
  sender_id: string
  created_at: string
  message_type: 'text' | 'voice'
}

export function ChatWidget() {
  const { user } = useAuth()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || !user) return

    setLoading(true)
    try {
      // For demo purposes - real implementation would use actual chat rooms
      const newMessage: ChatMessage = {
        id: Math.random().toString(),
        content: input,
        sender_id: user.id,
        created_at: new Date().toISOString(),
        message_type: 'text'
      }
      
      setMessages([...messages, newMessage])
      setInput('')
    } catch (err) {
      console.error('[v0] Error sending message:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed bottom-24 right-4 w-80 h-96 bg-white border-2 border-primary rounded-lg flex flex-col shadow-lg z-40">
      <div className="bg-primary text-white p-3 rounded-t-lg font-bold">চ্যাট</div>
      
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-2 rounded-lg ${
              msg.sender_id === user?.id
                ? 'bg-primary text-white ml-auto max-w-xs'
                : 'bg-secondary text-foreground mr-auto max-w-xs'
            }`}
          >
            {msg.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="border-t p-2 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="বার্তা..."
          className="flex-1 px-2 py-1 border border-accent/20 rounded-lg text-sm"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-opacity-90 disabled:opacity-50"
        >
          পাঠান
        </button>
      </form>
    </div>
  )
}
