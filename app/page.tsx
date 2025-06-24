'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Heart,
  MessageCircle,
  BookOpen,
  Sparkles,
  TrendingUp,
  Phone
} from 'lucide-react'
import WelcomeScreen from '@/components/welcome-screen'
import ChatScreen from '@/components/chat-screen'
import JournalScreen from '@/components/journal-screen'
import WellnessScreen from '@/components/wellness-screen'
import ProgressScreen from '@/components/progress-screen'

type Screen = 'welcome' | 'chat' | 'journal' | 'wellness' | 'progress' | 'help'

export default function RenacerApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome')

  const navigationItems = [
    {
      id: 'chat',
      icon: MessageCircle,
      label: 'Conversación',
      color: 'text-emerald-600'
    },
    {
      id: 'journal',
      icon: BookOpen,
      label: 'Bitácora',
      color: 'text-purple-600'
    },
    {
      id: 'wellness',
      icon: Sparkles,
      label: 'Bienestar',
      color: 'text-teal-600'
    },
    {
      id: 'progress',
      icon: TrendingUp,
      label: 'Progreso',
      color: 'text-indigo-600'
    },
    { id: 'help', icon: Phone, label: 'Ayuda', color: 'text-rose-600' }
  ]

  if (currentScreen === 'welcome') {
    return <WelcomeScreen onStart={() => setCurrentScreen('chat')} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-purple-50 to-teal-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-green-100 px-4 py-3">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-emerald-600" />
            <h1 className="text-xl font-semibold text-gray-800">Renacer</h1>
          </div>
          <div className="text-sm text-gray-600">Tu espacio seguro</div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto pb-20">
        {currentScreen === 'chat' && <ChatScreen />}
        {currentScreen === 'journal' && <JournalScreen />}
        {currentScreen === 'wellness' && <WellnessScreen />}
        {currentScreen === 'progress' && <ProgressScreen />}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-green-100">
        <div className="max-w-md mx-auto px-4 py-2">
          <div className="flex justify-around">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = currentScreen === item.id
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentScreen(item.id as Screen)}
                  className={`flex flex-col items-center gap-1 h-auto py-2 px-3 ${
                    isActive
                      ? 'bg-green-50 text-emerald-700'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      isActive ? 'text-emerald-600' : item.color
                    }`}
                  />
                  <span className="text-xs font-medium">{item.label}</span>
                </Button>
              )
            })}
          </div>
        </div>
      </nav>
    </div>
  )
}
