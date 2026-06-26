import { api } from './client'

export const rolesApi = {
  getAll: () => api.get('/roles'),
  create: (data) => api.post('/roles/register', data),
  update: (id, data) => api.put(`/roles/${id}`, data),
  delete: (id) => api.delete(`/roles/${id}`),
}
