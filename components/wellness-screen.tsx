"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Sparkles, Wind, Heart, Headphones, ArrowLeft, Play, Pause } from "lucide-react"

type WellnessMode = "menu" | "breathing" | "affirmations" | "meditation"

const affirmations = [
  "Soy capaz de superar cualquier desafío que se presente",
  "Merezco amor, respeto y felicidad",
  "Cada día me vuelvo más fuerte y resiliente",
  "Confío en mi capacidad para tomar buenas decisiones",
  "Soy valioso/a tal como soy",
  "Tengo el poder de crear cambios positivos en mi vida",
  "Mis sentimientos son válidos y los acepto",
  "Estoy en paz conmigo mismo/a",
]

const meditations = [
  {
    title: "Calma interior",
    duration: "5 min",
    description: "Encuentra tu centro y libera las tensiones del día",
  },
  {
    title: "Gratitud",
    duration: "3 min",
    description: "Conecta con las cosas buenas de tu vida",
  },
  {
    title: "Autocompasión",
    duration: "7 min",
    description: "Cultiva una relación amable contigo mismo/a",
  },
]

export default function WellnessScreen() {
  const [mode, setMode] = useState<WellnessMode>("menu")
  const [breathingActive, setBreathingActive] = useState(false)
  const [breathingPhase, setBreathingPhase] = useState<"inhale" | "hold" | "exhale">("inhale")
  const [currentAffirmation, setCurrentAffirmation] = useState(0)
  const [meditationActive, setMeditationActive] = useState(false)

  const startBreathing = () => {
    setBreathingActive(true)
    // Simple breathing cycle simulation
    const cycle = () => {
      setBreathingPhase("inhale")
      setTimeout(() => setBreathingPhase("hold"), 4000)
      setTimeout(() => setBreathingPhase("exhale"), 7000)
      setTimeout(() => {
        if (breathingActive) cycle()
      }, 11000)
    }
    cycle()
  }

  const stopBreathing = () => {
    setBreathingActive(false)
    setBreathingPhase("inhale")
  }

  const nextAffirmation = () => {
    setCurrentAffirmation((prev) => (prev + 1) % affirmations.length)
  }

  if (mode === "menu") {
    return (
      <div className="p-4 space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-2">
            <Sparkles className="w-8 h-8 text-teal-600" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800">Herramientas de Bienestar</h2>
          <p className="text-gray-600 text-sm mt-1">Elige una práctica para tu momento presente</p>
        </div>

        {/* Tools */}
        <div className="space-y-4">
          <Card
            className="p-6 cursor-pointer hover:shadow-md transition-shadow border-teal-100 hover:border-teal-200"
            onClick={() => setMode("breathing")}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                <Wind className="w-6 h-6 text-teal-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-800">Respiración Guiada</h3>
                <p className="text-gray-600 text-sm">Técnica 4-7-8 para calmar la mente</p>
              </div>
            </div>
          </Card>

          <Card
            className="p-6 cursor-pointer hover:shadow-md transition-shadow border-purple-100 hover:border-purple-200"
            onClick={() => setMode("affirmations")}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-800">Afirmaciones Positivas</h3>
                <p className="text-gray-600 text-sm">Fortalece tu diálogo interno</p>
              </div>
            </div>
          </Card>

          <Card
            className="p-6 cursor-pointer hover:shadow-md transition-shadow border-indigo-100 hover:border-indigo-200"
            onClick={() => setMode("meditation")}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                <Headphones className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-800">Mini Meditaciones</h3>
                <p className="text-gray-600 text-sm">Momentos de mindfulness guiado</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  if (mode === "breathing") {
    return (
      <div className="p-4 space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" onClick={() => setMode("menu")} className="p-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h2 className="text-xl font-semibold text-gray-800">Respiración Guiada</h2>
        </div>

        <Card className="p-8 text-center bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-100">
          <div className="mb-8">
            <div
              className={`w-32 h-32 mx-auto rounded-full border-4 border-teal-300 flex items-center justify-center transition-all duration-1000 ${
                breathingActive
                  ? breathingPhase === "inhale"
                    ? "scale-110 bg-teal-100"
                    : breathingPhase === "hold"
                      ? "scale-110 bg-teal-200"
                      : "scale-90 bg-teal-50"
                  : "bg-teal-50"
              }`}
            >
              <Wind className="w-12 h-12 text-teal-600" />
            </div>
          </div>

          {breathingActive ? (
            <div className="space-y-4">
              <h3 className="text-2xl font-medium text-teal-800 capitalize">
                {breathingPhase === "inhale" ? "Inhala" : breathingPhase === "hold" ? "Mantén" : "Exhala"}
              </h3>
              <p className="text-teal-600">
                {breathingPhase === "inhale" ? "4 segundos" : breathingPhase === "hold" ? "7 segundos" : "8 segundos"}
              </p>
              <Button onClick={stopBreathing} variant="outline" className="border-teal-300 text-teal-700">
                <Pause className="w-4 h-4 mr-2" />
                Pausar
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="text-xl font-medium text-gray-800">Técnica 4-7-8</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Inhala por 4 segundos, mantén por 7, exhala por 8. Esta técnica ayuda a reducir la ansiedad y promover
                la calma.
              </p>
              <Button onClick={startBreathing} className="bg-teal-600 hover:bg-teal-700 text-white">
                <Play className="w-4 h-4 mr-2" />
                Comenzar
              </Button>
            </div>
          )}
        </Card>
      </div>
    )
  }

  if (mode === "affirmations") {
    return (
      <div className="p-4 space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" onClick={() => setMode("menu")} className="p-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h2 className="text-xl font-semibold text-gray-800">Afirmaciones Positivas</h2>
        </div>

        <Card className="p-8 text-center bg-gradient-to-br from-purple-50 to-pink-50 border-purple-100">
          <div className="mb-6">
            <Heart className="w-16 h-16 mx-auto text-purple-600 mb-4" />
            <div className="bg-white/80 p-6 rounded-xl border border-purple-100">
              <p className="text-lg text-gray-800 leading-relaxed font-medium">"{affirmations[currentAffirmation]}"</p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-purple-600 text-sm">
              Afirmación {currentAffirmation + 1} de {affirmations.length}
            </p>
            <Button onClick={nextAffirmation} className="bg-purple-600 hover:bg-purple-700 text-white px-8">
              Siguiente afirmación
            </Button>
          </div>
        </Card>

        <Card className="p-4 bg-purple-50 border-purple-100">
          <p className="text-purple-800 text-sm text-center">
            💜 Repite cada afirmación en voz alta o mentalmente. Permítete sentir su verdad.
          </p>
        </Card>
      </div>
    )
  }

  if (mode === "meditation") {
    return (
      <div className="p-4 space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" onClick={() => setMode("menu")} className="p-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h2 className="text-xl font-semibold text-gray-800">Mini Meditaciones</h2>
        </div>

        <div className="space-y-4">
          {meditations.map((meditation, index) => (
            <Card key={index} className="p-6 border-indigo-100">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-medium text-gray-800">{meditation.title}</h3>
                <span className="text-sm text-indigo-600 bg-indigo-50 px-2 py-1 rounded">{meditation.duration}</span>
              </div>
              <p className="text-gray-600 text-sm mb-4">{meditation.description}</p>
              <Button
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                onClick={() => setMeditationActive(!meditationActive)}
              >
                <Headphones className="w-4 h-4 mr-2" />
                {meditationActive ? "Pausar" : "Comenzar"}
              </Button>
            </Card>
          ))}
        </div>

        <Card className="p-4 bg-indigo-50 border-indigo-100">
          <p className="text-indigo-800 text-sm text-center">
            🧘‍♀️ Encuentra un lugar cómodo y tranquilo. Estas meditaciones te guiarán paso a paso.
          </p>
        </Card>
      </div>
    )
  }

  return null
}
