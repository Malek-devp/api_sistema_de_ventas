import { api } from './client'

export const usuariosApi = {
  getAll: () => api.get('/usuarios'),
  create: (data) => api.post('/usuarios/register', data),
  update: (id, data) => api.put(`/usuarios/${id}`, data),
  delete: (id) => api.delete(`/usuarios/${id}`),
}
