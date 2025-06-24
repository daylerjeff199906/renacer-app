// lib/chatgpt.ts
export const getChatGPTResponse = async (
  userInput: string
): Promise<string> => {
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            'Eres un asistente emocional que brinda apoyo empático sin generar dependencia. No haces diagnósticos ni das consejos médicos. Sé calmado, motivador y reflexivo.'
        },
        {
          role: 'user',
          content: userInput
        }
      ],
      temperature: 0.7
    })
  })

  console.log('ChatGPT request:', response)
  const data = await response.json()
  console.log('ChatGPT response:', data)
  return (
    data.choices?.[0]?.message?.content ??
    'Lo siento, no pude responder esta vez.'
  )
}
