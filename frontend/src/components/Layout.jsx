import { Link, Outlet, useRouter, useLocation } from '@tanstack/react-router'
import { useAuth } from '../context/AuthContext'
import { LayoutDashboard, Users, Package, ShoppingCart, PlusCircle, LogOut, UserCircle, Store, Shield } from 'lucide-react'

export function Layout() {
  const { user, logout, isAdmin } = useAuth()
  const router = useRouter()
  const location = useLocation()

  if (!user) return <Outlet />

  const navItems = [
    { to: '/', label: 'Dashboard', icon: LayoutDashboard, adminOnly: false },
    { to: '/usuarios', label: 'Usuarios', icon: Users, adminOnly: true },
    { to: '/roles', label: 'Roles', icon: Shield, adminOnly: true },
    { to: '/productos', label: 'Productos', icon: Package, adminOnly: true },
    { to: '/ventas', label: 'Ventas', icon: ShoppingCart, adminOnly: true },
    { to: '/ventas/nueva', label: 'Nueva Venta', icon: PlusCircle, adminOnly: false },
  ]

  async function handleLogout() {
    await logout()
    router.navigate({ to: '/login' })
  }

  return (
    <div className="min-h-screen flex flex-col bg-base">
      <header className="bg-surface border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="p-1.5 bg-gradient-to-br from-accent to-cyan-500 rounded-lg group-hover:shadow-md group-hover:shadow-accent/20 transition">
                <Store className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-primary-text hidden sm:block">Sistema de Ventas</span>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {navItems
                .filter((item) => !item.adminOnly || isAdmin)
                .map((item) => {
                  const Icon = item.icon
                  const isActive = location.pathname === item.to
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition ${
                        isActive
                          ? 'bg-accent/10 text-accent'
                          : 'text-secondary-text hover:text-primary-text hover:bg-surface-hover'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </Link>
                  )
                })}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm">
              <div className="p-1.5 bg-surface-hover rounded-full">
                <UserCircle className="w-5 h-5 text-secondary-text" />
              </div>
              <span className="hidden sm:block font-medium text-primary-text">{user.nombre}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-danger hover:text-red-400 hover:bg-danger/10 rounded-lg transition cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:block">Salir</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-6 w-full">
        <Outlet />
      </main>
    </div>
  )
}
