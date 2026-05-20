import { Navigate } from 'react-router-dom'
import { usePersona } from '../context/PersonaContext'

export default function HomeRedirect() {
  const { activePersona } = usePersona()
  return <Navigate to={activePersona.landingRoute} replace />
}
