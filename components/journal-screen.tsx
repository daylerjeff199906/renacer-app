'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { BookOpen, Calendar, Heart, Star } from 'lucide-react'

interface JournalEntry {
  id: string
  date: Date
  mood: number
  note: string
  emoji: string
}

const moodOptions = [
  { value: 1, emoji: '😢', label: 'Muy triste', color: 'text-red-500' },
  { value: 2, emoji: '😔', label: 'Triste', color: 'text-orange-500' },
  { value: 3, emoji: '😐', label: 'Neutral', color: 'text-yellow-500' },
  { value: 4, emoji: '😊', label: 'Bien', color: 'text-green-500' },
  { value: 5, emoji: '😄', label: 'Muy bien', color: 'text-emerald-500' }
]

export default function JournalScreen() {
  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: '1',
      date: new Date(Date.now() - 86400000),
      mood: 4,
      note: 'Hoy fue un día productivo. Me sentí más tranquilo después de la caminata matutina.',
      emoji: '😊'
    },
    {
      id: '2',
      date: new Date(Date.now() - 172800000),
      mood: 3,
      note: 'Día regular, pero logré completar mis tareas pendientes.',
      emoji: '😐'
    }
  ])
  const [selectedMood, setSelectedMood] = useState<number | null>(null)
  const [note, setNote] = useState('')
  const [showHistory, setShowHistory] = useState(false)

  const handleSaveEntry = () => {
    if (selectedMood === null) return

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date(),
      mood: selectedMood,
      note: note.trim(),
      emoji: moodOptions.find((m) => m.value === selectedMood)?.emoji || '😐'
    }

    setEntries((prev) => [newEntry, ...prev])
    setSelectedMood(null)
    setNote('')
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex justify-center mb-2">
          <BookOpen className="w-8 h-8 text-purple-600" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800">
          Bitácora Emocional
        </h2>
        <p className="text-gray-600 text-sm mt-1">
          Registra cómo te sientes hoy
        </p>
      </div>

      {/* Today's Entry */}
      <Card className="p-6 bg-white border-purple-100 shadow-sm">
        <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-purple-600" />
          Hoy,{' '}
          {new Date().toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </h3>

        {/* Mood Selection */}
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-700 mb-3">
            ¿Cómo te sientes?
          </p>
          <div className="flex justify-between gap-2">
            {moodOptions.map((mood) => (
              <Button
                key={mood.value}
                variant={selectedMood === mood.value ? 'default' : 'outline'}
                onClick={() => setSelectedMood(mood.value)}
                className={`flex-1 h-16 flex flex-col items-center gap-1 ${
                  selectedMood === mood.value
                    ? 'bg-purple-100 border-purple-300 text-purple-700'
                    : 'hover:bg-purple-50 border-purple-200'
                }`}
              >
                <span className="text-2xl">{mood.emoji}</span>
                <span className="text-xs">{mood.value}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Note */}
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-700 mb-2">
            Notas libres (opcional)
          </p>
          <Textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="¿Qué pasó hoy? ¿Cómo te sentiste? Escribe lo que quieras recordar..."
            className="min-h-[100px] border-purple-200 focus:border-purple-400 focus:ring-purple-400 resize-none"
            maxLength={500}
          />
          <p className="text-xs text-gray-500 mt-1">
            {note.length}/500 caracteres
          </p>
        </div>

        <Button
          onClick={handleSaveEntry}
          disabled={selectedMood === null}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl"
        >
          <Heart className="w-4 h-4 mr-2" />
          Guardar entrada
        </Button>
      </Card>

      {/* History Toggle */}
      <div className="text-center">
        <Button
          variant="outline"
          onClick={() => setShowHistory(!showHistory)}
          className="border-purple-200 text-purple-700 hover:bg-purple-50"
        >
          {showHistory ? 'Ocultar historial' : 'Ver historial'}
        </Button>
      </div>

      {/* History */}
      {showHistory && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-800 flex items-center gap-2">
            <Star className="w-5 h-5 text-purple-600" />
            Entradas anteriores
          </h3>

          {entries.length === 0 ? (
            <Card className="p-6 text-center bg-purple-50 border-purple-100">
              <p className="text-purple-700">
                Aún no tienes entradas guardadas
              </p>
              <p className="text-purple-600 text-sm mt-1">
                ¡Comienza registrando cómo te sientes hoy!
              </p>
            </Card>
          ) : (
            <div className="space-y-3">
              {entries.map((entry) => (
                <Card key={entry.id} className="p-4 bg-white border-purple-100">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{entry.emoji}</span>
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          {entry.date.toLocaleDateString('es-ES', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </p>
                        <p className="text-xs text-gray-500">
                          Estado:{' '}
                          {
                            moodOptions.find((m) => m.value === entry.mood)
                              ?.label
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                  {entry.note && (
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {entry.note}
                    </p>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
