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
  const [conversationContext, setConversationContext] = useState<string>('')

  const generateText = async (prompt: string): Promise<void> => {
    setLoading(true)

    try {
      // Construir el contexto de la conversación
      const fullPrompt = conversationContext
        ? `${conversationContext}\n\nUsuario: ${prompt}`
        : `Eres un asistente emocional que brinda apoyo empático sin generar dependencia.
           No haces diagnósticos ni das consejos médicos. Sé calmado, motivador y reflexivo.
           Responde en español.\n\nUsuario: ${prompt}`

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: fullPrompt }]
              }
            ]
          })
        }
      )

      const data: GeminiResponse = await response.json()
      const responseText =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        'No se pudo generar texto'

      setResult(responseText)
      // Actualizar el contexto con la conversación más reciente
      setConversationContext(`${fullPrompt}\n\nAsistente: ${responseText}`)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return { generateText, loading, result }
}
