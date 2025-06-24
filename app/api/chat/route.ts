// app/api/chat/route.ts
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { prompt } = await req.json()

  const response = await fetch(
    'https://openrouter.ai/api/v1/chat/completions',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'X-Title': 'Mi App Emocional', // Opcional
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o',
        messages: [
          {
            role: 'system',
            content:
              'Eres un asistente emocional que brinda apoyo empático sin generar dependencia. No haces diagnósticos médicos. Sé calmado, motivador y reflexivo.'
          },
          {
            role: 'user',
            content: prompt
          }
        ]
      })
    }
  )

  const data = await response.json()
  console.log('OpenRouter response:', data)
  const text = data?.choices?.[0]?.message?.content

  return NextResponse.json({ text: text ?? 'No se obtuvo respuesta.' })
}
