import { useAuth } from '../context/AuthContext'
import { Loader2 } from 'lucide-react'

export function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-base">
        <Loader2 className="w-8 h-8 text-accent animate-spin" />
      </div>
    )
  }

  if (!user) {
    window.location.href = '/login'
    return null
  }

  return children
}
