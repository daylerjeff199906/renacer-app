export const getOpenRouterResponse = async (
  userInput: string
): Promise<string> => {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ prompt: userInput })
  })

  const data = await res.json()
  return data.text ?? 'No se obtuvo respuesta del modelo.'
}
