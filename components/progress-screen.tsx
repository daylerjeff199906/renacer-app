'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  TrendingUp,
  Target,
  CheckCircle,
  Circle,
  Star,
  Calendar,
  Heart
} from 'lucide-react'

interface Challenge {
  id: string
  title: string
  description: string
  completed: boolean
  week: number
}

export default function ProgressScreen() {
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: '1',
      title: 'Escribe una carta de gratitud',
      description:
        'Escribe una carta a alguien importante en tu vida expresando tu gratitud',
      completed: true,
      week: 1
    },
    {
      id: '2',
      title: 'Camina 20 minutos al aire libre',
      description:
        'Dedica tiempo a caminar en la naturaleza o un parque cercano',
      completed: true,
      week: 1
    },
    {
      id: '3',
      title: 'Practica un acto de bondad',
      description:
        'Realiza una acción amable hacia otra persona sin esperar nada a cambio',
      completed: false,
      week: 2
    },
    {
      id: '4',
      title: 'Dedica tiempo a un hobby',
      description:
        'Invierte al menos 30 minutos en una actividad que realmente disfrutes',
      completed: false,
      week: 2
    }
  ])

  const currentWeek = 2
  const completedChallenges = challenges.filter((c) => c.completed).length
  const totalChallenges = challenges.length
  const progressPercentage = (completedChallenges / totalChallenges) * 100

  const toggleChallenge = (id: string) => {
    setChallenges((prev) =>
      prev.map((challenge) =>
        challenge.id === id
          ? { ...challenge, completed: !challenge.completed }
          : challenge
      )
    )
  }

  const currentWeekChallenges = challenges.filter((c) => c.week === currentWeek)
  const previousChallenges = challenges.filter((c) => c.week < currentWeek)

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex justify-center mb-2">
          <TrendingUp className="w-8 h-8 text-indigo-600" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800">Tu Progreso</h2>
        <p className="text-gray-600 text-sm mt-1">
          Pequeños pasos hacia el bienestar
        </p>
      </div>

      {/* Progress Overview */}
      <Card className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-100">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-medium text-gray-800">
              Progreso General
            </h3>
            <p className="text-gray-600 text-sm">Desafíos completados</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-indigo-600">
              {completedChallenges}/{totalChallenges}
            </div>
            <div className="text-sm text-indigo-500">
              {Math.round(progressPercentage)}%
            </div>
          </div>
        </div>

        <div className="bg-indigo-200 rounded-full h-3 mb-2">
          <div
            className="bg-indigo-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        <div className="flex items-center gap-2 text-sm text-indigo-700">
          <Star className="w-4 h-4" />
          <span>¡Cada paso cuenta en tu camino de crecimiento!</span>
        </div>
      </Card>

      {/* Current Week */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-medium text-gray-800">
            Semana {currentWeek}
          </h3>
        </div>

        <div className="space-y-3">
          {currentWeekChallenges.map((challenge) => (
            <Card key={challenge.id} className="p-4 border-indigo-100">
              <div className="flex items-start gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleChallenge(challenge.id)}
                  className="p-1 mt-1"
                >
                  {challenge.completed ? (
                    <CheckCircle className="w-6 h-6 text-emerald-600" />
                  ) : (
                    <Circle className="w-6 h-6 text-gray-400" />
                  )}
                </Button>

                <div className="flex-1">
                  <h4
                    className={`font-medium ${
                      challenge.completed
                        ? 'text-emerald-700 line-through'
                        : 'text-gray-800'
                    }`}
                  >
                    {challenge.title}
                  </h4>
                  <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                    {challenge.description}
                  </p>
                  {challenge.completed && (
                    <div className="flex items-center gap-1 mt-2">
                      <Star className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-600 text-sm font-medium">
                        ¡Completado!
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Previous Weeks */}
      {previousChallenges.length > 0 && (
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-gray-600" />
            Semanas anteriores
          </h3>

          <div className="space-y-3">
            {previousChallenges.map((challenge) => (
              <Card
                key={challenge.id}
                className="p-4 bg-gray-50 border-gray-200"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    {challenge.completed ? (
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-400" />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">
                        Semana {challenge.week}
                      </span>
                    </div>
                    <h4
                      className={`font-medium text-sm ${
                        challenge.completed
                          ? 'text-emerald-700 line-through'
                          : 'text-gray-700'
                      }`}
                    >
                      {challenge.title}
                    </h4>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Encouragement */}
      <Card className="p-6 bg-emerald-50 border-emerald-100 text-center">
        <div className="mb-3">
          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <Heart className="w-6 h-6 text-emerald-600" />
          </div>
          <h3 className="text-lg font-medium text-emerald-800">Recuerda</h3>
        </div>
        <p className="text-emerald-700 text-sm leading-relaxed">
          El progreso no siempre es lineal. Cada pequeño paso que das es
          valioso, incluso si algunos días son más difíciles que otros.
          <strong> Eres más fuerte de lo que crees.</strong>
        </p>
      </Card>
    </div>
  )
}
