import { useState, useEffect, useCallback } from 'react'
import { Package, Plus } from 'lucide-react'
import { productosApi } from '../api/productos'
import { Table } from '../components/Table'
import { Modal } from '../components/Modal'
import { FormField, Input } from '../components/FormField'

export function ProductosPage() {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editItem, setEditItem] = useState(null)
  const [form, setForm] = useState({ marca: '', precio: '', stock: '', id_categoria: '' })
  const [saving, setSaving] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    try { setProductos(await productosApi.getAll()) } finally { setLoading(false) }
  }, [])

  useEffect(() => { load() }, [load])

  function openCreate() { setEditItem(null); setForm({ marca: '', precio: '', stock: '', id_categoria: '' }); setModalOpen(true) }

  function openEdit(row) {
    setEditItem(row)
    setForm({ marca: row.marca, precio: row.precio?.toString() || '', stock: row.stock?.toString() || '', id_categoria: row.id_categoria?.toString() || '' })
    setModalOpen(true)
  }

  async function handleSave(e) {
    e.preventDefault()
    setSaving(true)
    try {
      const data = { marca: form.marca, precio: Number(form.precio), stock: Number(form.stock), id_categoria: Number(form.id_categoria) }
      if (editItem) { await productosApi.update(editItem.id, data) }
      else { await productosApi.create(data) }
      setModalOpen(false); await load()
    } finally { setSaving(false) }
  }

  async function handleDelete(row) {
    if (!window.confirm(`¿Eliminar producto "${row.marca}"?`)) return
    await productosApi.delete(row.id); await load()
  }

  const columns = [
    { key: 'id', label: 'ID', className: 'w-12 text-muted' },
    { key: 'marca', label: 'Producto' },
    { key: 'precio', label: 'Precio', render: (val) => `S/ ${Number(val).toFixed(2)}` },
    { key: 'stock', label: 'Stock', render: (val) => <span className={`px-2 py-0.5 text-xs rounded-full ${Number(val) > 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-danger/10 text-danger'}`}>{val}</span> },
    { key: 'id_categoria', label: 'Categoría', render: (val) => <span className="text-secondary-text">{val || '—'}</span> },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/10 rounded-lg"><Package className="w-6 h-6 text-blue-400" /></div>
          <div>
            <h1 className="text-2xl font-bold text-primary-text">Productos</h1>
            <p className="text-sm text-secondary-text">Catálogo de productos</p>
          </div>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-hover transition text-sm font-medium cursor-pointer">
          <Plus className="w-4 h-4" /> Nuevo Producto
        </button>
      </div>
      <div className="bg-surface rounded-xl border border-border">
        <Table columns={columns} data={productos} loading={loading} onEdit={openEdit} onDelete={handleDelete} />
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editItem ? 'Editar Producto' : 'Nuevo Producto'}>
        <form onSubmit={handleSave} className="space-y-4">
          <FormField label="Producto" id="marca">
            <Input id="marca" value={form.marca} onChange={(e) => setForm({ ...form, marca: e.target.value })} required />
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Precio" id="precio">
              <Input id="precio" type="number" step="0.01" value={form.precio} onChange={(e) => setForm({ ...form, precio: e.target.value })} required />
            </FormField>
            <FormField label="Stock" id="stock">
              <Input id="stock" type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} required />
            </FormField>
          </div>
          <FormField label="ID Categoría" id="id_categoria">
            <Input id="id_categoria" type="number" value={form.id_categoria} onChange={(e) => setForm({ ...form, id_categoria: e.target.value })} required />
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
