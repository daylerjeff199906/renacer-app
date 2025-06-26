'use client'

import type React from 'react'
import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Send, Clock, Heart, Trash2 } from 'lucide-react'
import { useGemini } from '@/lib/gemini'

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: string
}

export default function ChatScreen() {
  // Cargar mensajes desde localStorage al inicializar
  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window !== 'undefined') {
      const savedMessages = localStorage.getItem('chatMessages')
      return savedMessages
        ? JSON.parse(savedMessages)
        : [
            {
              id: '1',
              text: 'Hola, me alegra que estés aquí. Este es tu espacio seguro para expresarte. ¿Cómo te sientes hoy?',
              isUser: false,
              timestamp: new Date().toISOString()
            }
          ]
    }
    return [
      {
        id: '1',
        text: 'Hola, me alegra que estés aquí. Este es tu espacio seguro para expresarte. ¿Cómo te sientes hoy?',
        isUser: false,
        timestamp: new Date().toISOString()
      }
    ]
  })

  const { generateText, loading, result } = useGemini()
  const [inputText, setInputText] = useState('')
  const [messageCount, setMessageCount] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedMessages = localStorage.getItem('chatMessages')
      return savedMessages ? JSON.parse(savedMessages).length : 1
    }
    return 1
  })
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const maxMessages = 15

  // Guardar mensajes en localStorage cuando cambian
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('chatMessages', JSON.stringify(messages))
    }
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputText.trim() || messageCount >= maxMessages) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date().toISOString()
    }

    setMessages((prev) => [...prev, userMessage])
    setInputText('')
    setMessageCount((prev: number) => prev + 1)

    try {
      await generateText(inputText)
    } catch (error) {
      console.error(error)
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        text: 'No pude conectarme con el servidor. Intenta más tarde.',
        isUser: false,
        timestamp: new Date().toISOString()
      }

      setMessages((prev) => [...prev, errorMessage])
      setMessageCount((prev: number) => prev + 1)
    }
  }

  // Efecto para manejar la respuesta de Gemini
  useEffect(() => {
    if (loading || !result) return

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: result,
      isUser: false,
      timestamp: new Date().toISOString()
    }

    setMessages((prev) => [...prev, botMessage])
    setMessageCount((prev: number) => prev + 1)
  }, [loading, result])

  // Función para limpiar el historial
  const clearHistory = () => {
    setMessages([
      {
        id: '1',
        text: 'Hola, me alegra que estés aquí. Este es tu espacio seguro para expresarte. ¿Cómo te sientes hoy?',
        isUser: false,
        timestamp: new Date().toISOString()
      }
    ])
    setMessageCount(1)
    if (typeof window !== 'undefined') {
      localStorage.removeItem('chatMessages')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col">
      {/* Session Limit Indicator */}
      <div className="p-4">
        <Card className="p-3 bg-purple-50 border-purple-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-purple-700 text-sm">
              <Clock className="w-4 h-4" />
              <span>Sesión actual</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-purple-600 font-medium text-sm">
                {messageCount}/{maxMessages} mensajes
              </div>
              <Button
                onClick={clearHistory}
                variant="ghost"
                size="sm"
                className="text-purple-600 hover:text-purple-800 p-2"
                title="Limpiar historial"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="mt-2 bg-purple-200 rounded-full h-2">
            <div
              className="bg-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(messageCount / maxMessages) * 100}%` }}
            />
          </div>
        </Card>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.isUser ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-2xl ${
                message.isUser
                  ? 'bg-emerald-500 text-white rounded-br-md'
                  : 'bg-white border border-green-100 text-gray-800 rounded-bl-md shadow-sm'
              }`}
            >
              {!message.isUser && (
                <div className="flex items-center gap-2 mb-1">
                  <Heart className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs text-emerald-600 font-medium">
                    Apoyo
                  </span>
                </div>
              )}
              <p
                className="text-sm leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: message.text
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\*(.*?)\*/g, '<em>$1</em>')
                    .replace(/\n/g, '<br />')
                }}
              />
              <p
                className={`text-xs mt-1 ${
                  message.isUser ? 'text-emerald-100' : 'text-gray-500'
                }`}
              >
                {new Date(message.timestamp).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] p-3 rounded-2xl bg-white border border-green-100 text-gray-800 rounded-bl-md shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                <Heart className="w-4 h-4 text-emerald-600" />
                <span className="text-xs text-emerald-600 font-medium">
                  Apoyo
                </span>
              </div>
              <p className="text-sm leading-relaxed">Escribiendo...</p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4">
        {messageCount >= maxMessages ? (
          <Card className="p-4 bg-amber-50 border-amber-200 text-center">
            <p className="text-amber-800 text-sm mb-2">
              Has alcanzado el límite de mensajes para esta sesión
            </p>
            <p className="text-amber-700 text-xs">
              Tómate un descanso y regresa cuando te sientas listo 💚
            </p>
          </Card>
        ) : (
          <div className="flex gap-2">
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Comparte lo que sientes..."
              className="flex-1 border-green-200 focus:border-emerald-400 focus:ring-emerald-400 rounded-xl"
              maxLength={200}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputText.trim() || loading}
              className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl px-4"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
