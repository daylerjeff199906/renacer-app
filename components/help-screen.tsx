"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Phone, Globe, AlertTriangle, Heart, ExternalLink } from "lucide-react"

interface EmergencyContact {
  name: string
  phone: string
  description: string
  available: string
  country: string
}

const emergencyContacts: EmergencyContact[] = [
  {
    name: "Línea de la Vida",
    phone: "01 800 911 2000",
    description: "Atención psicológica en crisis las 24 horas",
    available: "24/7",
    country: "México",
  },
  {
    name: "Teléfono de la Esperanza",
    phone: "717 003 717",
    description: "Apoyo emocional y prevención del suicidio",
    available: "24/7",
    country: "España",
  },
  {
    name: "Centro de Escucha",
    phone: "106",
    description: "Línea nacional de prevención del suicidio",
    available: "24/7",
    country: "Argentina",
  },
  {
    name: "CVV - Centro de Valorização da Vida",
    phone: "188",
    description: "Apoyo emocional y prevención del suicidio",
    available: "24/7",
    country: "Brasil",
  },
]

const professionalResources = [
  {
    title: "Psicólogos en línea",
    description: "Plataformas de terapia psicológica online",
    examples: ["BetterHelp", "Talkspace", "Psicología Online"],
  },
  {
    title: "Centros de salud mental",
    description: "Busca centros de atención psicológica en tu localidad",
    examples: ["Hospitales públicos", "Clínicas privadas", "Centros comunitarios"],
  },
  {
    title: "Grupos de apoyo",
    description: "Comunidades de personas con experiencias similares",
    examples: ["Grupos locales", "Comunidades online", "Organizaciones sin fines de lucro"],
  },
]

export default function HelpScreen() {
  const [selectedCountry, setSelectedCountry] = useState<string>("México")
  const countries = [...new Set(emergencyContacts.map((contact) => contact.country))]

  const filteredContacts = emergencyContacts.filter((contact) => contact.country === selectedCountry)

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex justify-center mb-2">
          <Phone className="w-8 h-8 text-rose-600" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800">Ayuda Profesional</h2>
        <p className="text-gray-600 text-sm mt-1">Recursos de apoyo cuando más los necesites</p>
      </div>

      {/* Emergency Alert */}
      <Card className="p-4 bg-red-50 border-red-200">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-red-800 mb-1">¿Necesitas ayuda inmediata?</h3>
            <p className="text-red-700 text-sm leading-relaxed">
              Si estás en crisis o tienes pensamientos de autolesión, contacta inmediatamente a los servicios de
              emergencia o las líneas de ayuda disponibles las 24 horas.
            </p>
          </div>
        </div>
      </Card>

      {/* Country Selection */}
      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-3">Líneas de emergencia</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {countries.map((country) => (
            <Button
              key={country}
              variant={selectedCountry === country ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCountry(country)}
              className={
                selectedCountry === country
                  ? "bg-rose-600 hover:bg-rose-700 text-white"
                  : "border-rose-200 text-rose-700 hover:bg-rose-50"
              }
            >
              {country}
            </Button>
          ))}
        </div>

        {/* Emergency Contacts */}
        <div className="space-y-3">
          {filteredContacts.map((contact, index) => (
            <Card key={index} className="p-4 border-rose-100">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-gray-800">{contact.name}</h4>
                <span className="text-xs bg-rose-100 text-rose-700 px-2 py-1 rounded">{contact.available}</span>
              </div>
              <p className="text-gray-600 text-sm mb-3">{contact.description}</p>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  className="bg-rose-600 hover:bg-rose-700 text-white"
                  onClick={() => window.open(`tel:${contact.phone}`, "_self")}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  {contact.phone}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Professional Resources */}
      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
          <Heart className="w-5 h-5 text-purple-600" />
          Recursos profesionales
        </h3>

        <div className="space-y-4">
          {professionalResources.map((resource, index) => (
            <Card key={index} className="p-4 border-purple-100">
              <h4 className="font-medium text-gray-800 mb-2">{resource.title}</h4>
              <p className="text-gray-600 text-sm mb-3">{resource.description}</p>
              <div className="space-y-1">
                {resource.examples.map((example, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-purple-700">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                    <span>{example}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Online Resources */}
      <Card className="p-4 bg-blue-50 border-blue-100">
        <div className="flex items-start gap-3">
          <Globe className="w-6 h-6 text-blue-600 mt-1" />
          <div>
            <h4 className="font-medium text-blue-800 mb-2">Recursos adicionales en línea</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-blue-700">
                <ExternalLink className="w-4 h-4" />
                <span>Organización Mundial de la Salud - Salud Mental</span>
              </div>
              <div className="flex items-center gap-2 text-blue-700">
                <ExternalLink className="w-4 h-4" />
                <span>Asociaciones de psicología de tu país</span>
              </div>
              <div className="flex items-center gap-2 text-blue-700">
                <ExternalLink className="w-4 h-4" />
                <span>Plataformas de meditación y mindfulness</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Important Note */}
      <Card className="p-6 bg-emerald-50 border-emerald-100 text-center">
        <Heart className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
        <h3 className="text-lg font-medium text-emerald-800 mb-2">Recuerda</h3>
        <p className="text-emerald-700 text-sm leading-relaxed">
          Buscar ayuda profesional es un acto de valentía y autocuidado. No estás solo/a en este camino. Hay personas
          capacitadas y dispuestas a acompañarte hacia el bienestar.
        </p>
      </Card>
    </div>
  )
}
