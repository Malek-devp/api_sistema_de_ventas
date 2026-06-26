import { Link } from '@tanstack/react-router'
import { useAuth } from '../context/AuthContext'
import { LayoutDashboard, Users, Package, ShoppingCart, TrendingUp, DollarSign, PlusCircle, Shield } from 'lucide-react'

export function DashboardPage() {
  const { user, isAdmin } = useAuth()

  const adminModules = [
    { icon: Users, label: 'Usuarios', desc: 'Gestiona los usuarios del sistema', to: '/usuarios', color: 'text-amber-400' },
    { icon: Shield, label: 'Roles', desc: 'Administra los roles y permisos', to: '/roles', color: 'text-purple-400' },
    { icon: Package, label: 'Productos', desc: 'Controla el catálogo de productos', to: '/productos', color: 'text-blue-400' },
  ]

  const userModules = [
    { icon: PlusCircle, label: 'Nueva Venta', desc: 'Registra una nueva venta', to: '/ventas/nueva', color: 'text-accent' },
  ]

  const adminModulesExtra = [
    { icon: ShoppingCart, label: 'Ventas', desc: 'Consulta el registro de ventas', to: '/ventas', color: 'text-emerald-400' },
  ]

  const modules = isAdmin ? [...adminModules, ...adminModulesExtra, ...userModules] : userModules

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-accent/10 rounded-lg">
          <LayoutDashboard className="w-6 h-6 text-accent" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-primary-text">Dashboard</h1>
          <p className="text-sm text-secondary-text">
            {isAdmin ? 'Panel de administración' : 'Panel de usuario'}
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-accent/10 to-cyan-500/10 rounded-2xl border border-accent/20 p-6">
        <div className="flex items-center gap-3 mb-1">
          <ShoppingCart className="w-6 h-6 text-accent" />
          <h2 className="text-lg font-semibold text-primary-text">Bienvenido, {user?.nombre}</h2>
        </div>
        <p className="text-secondary-text text-sm">
          {isAdmin
            ? 'Gestiona usuarios, roles, productos y ventas desde este panel.'
            : 'Registra nuevas ventas desde aquí.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Ventas hoy', value: '—', icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { label: 'Ingresos', value: '—', icon: DollarSign, color: 'text-blue-400', bg: 'bg-blue-500/10' },
          { label: 'Productos', value: '—', icon: Package, color: 'text-purple-400', bg: 'bg-purple-500/10' },
          { label: 'Usuarios', value: '—', icon: Users, color: 'text-amber-400', bg: 'bg-amber-500/10' },
        ].map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="bg-surface rounded-xl border border-border p-5 flex items-center gap-4 hover:border-accent/30 transition">
              <div className={`p-3 rounded-xl ${stat.bg}`}>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm text-secondary-text">{stat.label}</p>
                <p className="text-xl font-bold text-primary-text">{stat.value}</p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {modules.map((mod) => {
          const Icon = mod.icon
          return (
            <Link
              key={mod.to}
              to={mod.to}
              className="bg-surface rounded-xl border border-border p-5 flex items-center gap-4 hover:border-accent/30 hover:shadow-md hover:shadow-accent/5 transition cursor-pointer group"
            >
              <div className="p-3 rounded-xl bg-accent/5 group-hover:bg-accent/10 transition">
                <Icon className={`w-6 h-6 ${mod.color}`} />
              </div>
              <div>
                <p className="font-semibold text-primary-text">{mod.label}</p>
                <p className="text-sm text-secondary-text">{mod.desc}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
