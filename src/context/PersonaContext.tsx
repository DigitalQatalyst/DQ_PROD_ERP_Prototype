import React, { createContext, useContext, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Persona, PersonaId } from '../types'
import { personas } from '../data/fixtures'

interface PersonaContextValue {
  activePersona: Persona
  personas: Persona[]
  switchPersona: (id: PersonaId) => void
}

const PersonaContext = createContext<PersonaContextValue | null>(null)

export function PersonaProvider({ children }: { children: React.ReactNode }) {
  const [activePersona, setActivePersona] = useState<Persona>(personas[0])
  const navigate = useNavigate()

  const switchPersona = useCallback(
    (id: PersonaId) => {
      const next = personas.find((p) => p.id === id)
      if (!next) return
      setActivePersona(next)
      navigate(next.landingRoute)
    },
    [navigate]
  )

  return (
    <PersonaContext.Provider value={{ activePersona, personas, switchPersona }}>
      {children}
    </PersonaContext.Provider>
  )
}

export function usePersona(): PersonaContextValue {
  const ctx = useContext(PersonaContext)
  if (!ctx) throw new Error('usePersona must be used inside PersonaProvider')
  return ctx
}
