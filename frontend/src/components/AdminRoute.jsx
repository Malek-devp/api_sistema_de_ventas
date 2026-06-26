import { useAuth } from '../context/AuthContext'
import { ShieldOff, Loader2 } from 'lucide-react'

export function AdminRoute({ children }) {
  const { isAdmin, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-base">
        <Loader2 className="w-8 h-8 text-accent animate-spin" />
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-3">
        <div className="p-4 bg-danger/10 rounded-full">
          <ShieldOff className="w-10 h-10 text-danger" />
        </div>
        <h2 className="text-xl font-semibold text-primary-text">Acceso denegado</h2>
        <p className="text-secondary-text text-sm">Solo los administradores pueden acceder a esta sección.</p>
      </div>
    )
  }

  return children
}
