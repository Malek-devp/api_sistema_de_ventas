import { useState, useEffect, useCallback } from 'react'
import { Users as UsersIcon, Plus, Loader2 } from 'lucide-react'
import { usuariosApi } from '../api/usuarios'
import { rolesApi } from '../api/roles'
import { Table } from '../components/Table'
import { Modal } from '../components/Modal'
import { FormField, Input, Select } from '../components/FormField'

export function UsuariosPage() {
  const [usuarios, setUsuarios] = useState([])
  const [roles, setRoles] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editItem, setEditItem] = useState(null)
  const [form, setForm] = useState({ nombre: '', dni: '', id_rol: '' })
  const [saving, setSaving] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const [u, r] = await Promise.all([usuariosApi.getAll(), rolesApi.getAll()])
      setUsuarios(u)
      setRoles(r)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  function openCreate() {
    setEditItem(null)
    setForm({ nombre: '', dni: '', id_rol: roles[0]?.id?.toString() || '' })
    setModalOpen(true)
  }

  function openEdit(row) {
    setEditItem(row)
    setForm({ nombre: row.nombre, dni: row.dni, id_rol: row.id_rol?.toString() || '' })
    setModalOpen(true)
  }

  async function handleSave(e) {
    e.preventDefault()
    setSaving(true)
    try {
      const data = { nombre: form.nombre, dni: form.dni, id_rol: Number(form.id_rol) }
      if (editItem) {
        await usuariosApi.update(editItem.id, data)
      } else {
        await usuariosApi.create(data)
      }
      setModalOpen(false)
      await load()
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(row) {
    if (!window.confirm(`¿Eliminar usuario "${row.nombre}"?`)) return
    await usuariosApi.delete(row.id)
    await load()
  }

  const columns = [
    { key: 'id', label: 'ID', className: 'w-12 text-muted' },
    { key: 'nombre', label: 'Nombre' },
    { key: 'dni', label: 'DNI' },
    { key: 'rol_cargo', label: 'Rol', render: (val) => <span className="px-2 py-0.5 text-xs rounded-full bg-accent/10 text-accent">{val || '—'}</span> },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-500/10 rounded-lg"><UsersIcon className="w-6 h-6 text-amber-400" /></div>
          <div>
            <h1 className="text-2xl font-bold text-primary-text">Usuarios</h1>
            <p className="text-sm text-secondary-text">Gestión de usuarios del sistema</p>
          </div>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-hover transition text-sm font-medium cursor-pointer">
          <Plus className="w-4 h-4" /> Nuevo Usuario
        </button>
      </div>

      <div className="bg-surface rounded-xl border border-border">
        <Table columns={columns} data={usuarios} loading={loading} onEdit={openEdit} onDelete={handleDelete} />
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editItem ? 'Editar Usuario' : 'Nuevo Usuario'}>
        <form onSubmit={handleSave} className="space-y-4">
          <FormField label="Nombre" id="nombre">
            <Input id="nombre" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} required />
          </FormField>
          <FormField label="DNI" id="dni">
            <Input id="dni" value={form.dni} onChange={(e) => setForm({ ...form, dni: e.target.value })} required maxLength={8} />
          </FormField>
          <FormField label="Rol" id="id_rol">
            <Select id="id_rol" value={form.id_rol} onChange={(e) => setForm({ ...form, id_rol: e.target.value })} required>
              <option value="">Seleccionar...</option>
              {roles.map((r) => <option key={r.id} value={r.id}>{r.cargo}</option>)}
            </Select>
          </FormField>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 text-sm text-secondary-text hover:text-primary-text transition cursor-pointer">Cancelar</button>
            <button type="submit" disabled={saving} className="px-4 py-2 text-sm bg-accent text-white rounded-lg hover:bg-accent-hover disabled:opacity-50 transition cursor-pointer">
              {saving ? 'Guardando...' : editItem ? 'Actualizar' : 'Crear'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
