import { useState, useEffect, useCallback } from 'react'
import { Shield, Plus } from 'lucide-react'
import { rolesApi } from '../api/roles'
import { Table } from '../components/Table'
import { Modal } from '../components/Modal'
import { FormField, Input } from '../components/FormField'

export function RolesPage() {
  const [roles, setRoles] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editItem, setEditItem] = useState(null)
  const [form, setForm] = useState({ cargo: '' })
  const [saving, setSaving] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    try { setRoles(await rolesApi.getAll()) } finally { setLoading(false) }
  }, [])

  useEffect(() => { load() }, [load])

  function openCreate() { setEditItem(null); setForm({ cargo: '' }); setModalOpen(true) }

  function openEdit(row) { setEditItem(row); setForm({ cargo: row.cargo }); setModalOpen(true) }

  async function handleSave(e) {
    e.preventDefault()
    setSaving(true)
    try {
      if (editItem) { await rolesApi.update(editItem.id, form) }
      else { await rolesApi.create(form) }
      setModalOpen(false); await load()
    } finally { setSaving(false) }
  }

  async function handleDelete(row) {
    if (!window.confirm(`¿Eliminar rol "${row.cargo}"?`)) return
    await rolesApi.delete(row.id); await load()
  }

  const columns = [
    { key: 'id', label: 'ID', className: 'w-12 text-muted' },
    { key: 'cargo', label: 'Cargo' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-500/10 rounded-lg"><Shield className="w-6 h-6 text-purple-400" /></div>
          <div>
            <h1 className="text-2xl font-bold text-primary-text">Roles</h1>
            <p className="text-sm text-secondary-text">Gestión de roles del sistema</p>
          </div>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-hover transition text-sm font-medium cursor-pointer">
          <Plus className="w-4 h-4" /> Nuevo Rol
        </button>
      </div>
      <div className="bg-surface rounded-xl border border-border">
        <Table columns={columns} data={roles} loading={loading} onEdit={openEdit} onDelete={handleDelete} />
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editItem ? 'Editar Rol' : 'Nuevo Rol'}>
        <form onSubmit={handleSave} className="space-y-4">
          <FormField label="Cargo" id="cargo">
            <Input id="cargo" value={form.cargo} onChange={(e) => setForm({ cargo: e.target.value })} required />
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
