import { api } from './client'

export const ventasApi = {
  getAll: () => api.get('/ventas'),
  getById: (id) => api.get(`/ventas/${id}`),
  create: (data) => api.post('/ventas/register', data),
  update: (id, data) => api.put(`/ventas/${id}`, data),
  delete: (id) => api.delete(`/ventas/${id}`),
}

export const detalleApi = {
  getAll: () => api.get('/detalle'),
  create: (data) => api.post('/detalle/register', data),
  update: (id, data) => api.put(`/detalle/${id}`, data),
  delete: (id) => api.delete(`/detalle/${id}`),
}
