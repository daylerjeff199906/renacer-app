'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Heart, Sunrise } from 'lucide-react'

interface WelcomeScreenProps {
  onStart: () => void
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-purple-50 to-teal-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 text-center bg-white/80 backdrop-blur-sm border-green-100 shadow-lg">
        <div className="mb-6">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Heart className="w-16 h-16 text-emerald-600" />
              <Sunrise className="w-8 h-8 text-purple-500 absolute -top-2 -right-2" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Renacer</h1>
          <p className="text-gray-600 text-lg">Tu espacio seguro para crecer</p>
        </div>

        <div className="mb-8 space-y-4">
          <p className="text-gray-700 leading-relaxed">
            Cada día es una nueva oportunidad para florecer. Aquí encontrarás
            herramientas para acompañarte en tu camino hacia el bienestar
            emocional.
          </p>
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <p className="text-emerald-800 text-sm font-medium">
              💚 Sin registros • Sin dependencia • A tu ritmo
            </p>
          </div>
        </div>

        <Button
          onClick={onStart}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 text-lg font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
        >
          Comenzar mi camino
        </Button>

        <p className="text-xs text-gray-500 mt-6">
          Recuerda: Esta herramienta complementa, no reemplaza, la ayuda
          profesional
        </p>
      </Card>
    </div>
  )
}
