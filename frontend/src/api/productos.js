import { api } from './client'

export const productosApi = {
  getAll: () => api.get('/productos'),
  create: (data) => api.post('/productos/register', data),
  update: (id, data) => api.put(`/productos/${id}`, data),
  delete: (id) => api.delete(`/productos/${id}`),
}
