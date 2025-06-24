'use client'
import { useState } from 'react'

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY

interface GeminiResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string
      }>
    }
  }>
}

export const useGemini = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [result, setResult] = useState<string>('')
  const [conversationHistory, setConversationHistory] = useState<
    Array<{
      role: string
      parts: { text: string }[]
    }>
  >([
    {
      role: 'user',
      parts: [
        {
          text:
            'Eres un asistente emocional que brinda apoyo empático sin generar dependencia. ' +
            'No haces diagnósticos ni das consejos médicos. Sé calmado, motivador y reflexivo.'
        }
      ]
    },
    {
      role: 'model',
      parts: [
        {
          text:
            'Entendido. Estoy aquí para ofrecerte un espacio seguro donde puedas expresar ' +
            'tus sentimientos. ¿Cómo te sientes hoy?'
        }
      ]
    }
  ])

  const generateText = async (prompt: string): Promise<void> => {
    setLoading(true)

    try {
      // Agregar el nuevo mensaje del usuario al historial
      const updatedHistory = [
        ...conversationHistory,
        {
          role: 'user',
          parts: [{ text: prompt }]
        }
      ]

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: updatedHistory
          })
        }
      )

      const data: GeminiResponse = await response.json()
      console.log('Response:', data)

      const modelResponse =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        'No se pudo generar texto'

      setResult(modelResponse)

      // Actualizar el historial con la respuesta del modelo
      setConversationHistory([
        ...updatedHistory,
        {
          role: 'model',
          parts: [{ text: modelResponse }]
        }
      ])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return { generateText, loading, result }
}
