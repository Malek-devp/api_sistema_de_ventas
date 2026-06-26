import { api } from './client'

export async function login(dni) {
  return api.post('/usuarios/login', { dni })
}

export async function getSession() {
  return api.get('/usuarios/dashboard')
}

export async function logout() {
  return api.post('/usuarios/logout')
} 
