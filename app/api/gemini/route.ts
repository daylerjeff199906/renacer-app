// app/api/gemini/route.ts
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { prompt } = await req.json()

  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY
  const model = 'models/gemini-1.5-pro'
  const url = `https://generativelanguage.googleapis.com/v1beta/${model}:generateContent?key=${apiKey}`

  console.log('Gemini request URL:', url)

  const body = {
    contents: [
      {
        parts: [
          {
            text:
              `Eres un asistente emocional que brinda apoyo empático sin generar dependencia. ` +
              `No haces diagnósticos ni das consejos médicos. Sé calmado, motivador y reflexivo.\n\n` +
              `Usuario: ${prompt}`
          }
        ]
      }
    ]
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    console.log('Gemini request:', response)
    const data = await response.json()
    console.log('Gemini response:', data)
    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ??
      'No se pudo generar una respuesta.'

    return NextResponse.json({ text })
  } catch {
    return NextResponse.json(
      { error: 'Error al contactar con Gemini' },
      { status: 500 }
    )
  }
}
