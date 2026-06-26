import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { getSession, logout as apiLogout } from '../api/auth'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const checkSession = useCallback(async () => {
    try {
      const data = await getSession()
      setUser(data)
    } catch {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    checkSession()
  }, [checkSession])

  const loginSuccess = useCallback(() => {
    checkSession()
  }, [checkSession])

  const logout = useCallback(async () => {
    try {
      await apiLogout()
    } catch {
      // incluso si falla, limpiamos el estado
    }
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, loginSuccess, logout, isAdmin: user?.rol === 1 }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider')
  return ctx
}
