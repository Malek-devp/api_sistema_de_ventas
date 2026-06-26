import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router'
import { Layout } from './components/Layout'
import { ProtectedRoute } from './components/ProtectedRoute'
import { AdminRoute } from './components/AdminRoute'
import { LoginPage } from './pages/Login'
import { DashboardPage } from './pages/Dashboard'
import { UsuariosPage } from './pages/Usuarios'
import { RolesPage } from './pages/Roles'
import { ProductosPage } from './pages/Productos'
import { VentasPage } from './pages/Ventas'
import { NuevaVentaPage } from './pages/NuevaVenta'

const rootRoute = createRootRoute({ component: Layout })

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: LoginPage,
})

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => (<ProtectedRoute><DashboardPage /></ProtectedRoute>),
})

const usuariosRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/usuarios',
  component: () => (<ProtectedRoute><AdminRoute><UsuariosPage /></AdminRoute></ProtectedRoute>),
})

const rolesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/roles',
  component: () => (<ProtectedRoute><AdminRoute><RolesPage /></AdminRoute></ProtectedRoute>),
})

const productosRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/productos',
  component: () => (<ProtectedRoute><AdminRoute><ProductosPage /></AdminRoute></ProtectedRoute>),
})

const ventasRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/ventas',
  component: () => (<ProtectedRoute><VentasPage /></ProtectedRoute>),
})

const nuevaVentaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/ventas/nueva',
  component: () => (<ProtectedRoute><NuevaVentaPage /></ProtectedRoute>),
})

const routeTree = rootRoute.addChildren([
  loginRoute,
  dashboardRoute,
  usuariosRoute,
  rolesRoute,
  productosRoute,
  ventasRoute,
  nuevaVentaRoute,
])

export { routeTree }
