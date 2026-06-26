import { useState } from 'react'
import { useRouter } from '@tanstack/react-router'
import { LogIn, User, AlertCircle, Store } from 'lucide-react'
import { login } from '../api/auth'
import { useAuth } from '../context/AuthContext'

export function LoginPage() {
  const [dni, setDni] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { loginSuccess } = useAuth()
  const router = useRouter()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(dni)
      await loginSuccess()
      router.navigate({ to: '/' })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-base relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-cyan-500/5" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzYjgyZjYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')]" />

      <div className="relative w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-surface rounded-2xl mb-4 shadow-lg shadow-accent/10 border border-border">
            <Store className="w-8 h-8 text-accent" />
          </div>
          <h1 className="text-3xl font-bold text-primary-text">Sistema de Ventas</h1>
          <p className="text-secondary-text mt-1">Inicia sesión para continuar</p>
        </div>

        <div className="bg-surface rounded-2xl shadow-xl border border-border p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="dni" className="block text-sm font-medium text-secondary-text mb-1.5">
                Número de DNI
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                <input
                  id="dni"
                  type="text"
                  value={dni}
                  onChange={(e) => setDni(e.target.value)}
                  placeholder="Ingresa tu DNI"
                  required
                  maxLength={8}
                  className="w-full pl-10 pr-4 py-2.5 bg-elevated border border-border rounded-lg text-primary-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-danger bg-danger/10 border border-danger/20 rounded-lg px-4 py-2.5 text-sm">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-gradient-to-r from-accent to-cyan-500 text-white font-semibold rounded-lg hover:from-accent-hover hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition shadow-lg shadow-accent/20"
            >
              {loading ? 'Ingresando...' : 'Ingresar'}
            </button>
          </form>
        </div>

        <p className="text-center text-muted text-xs mt-6">
          &copy; {new Date().getFullYear()} Sistema de Ventas
        </p>
      </div>
    </div>
  )
}
