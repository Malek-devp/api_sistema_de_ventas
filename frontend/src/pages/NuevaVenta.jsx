import { useState, useEffect, useCallback } from 'react'
import { useRouter } from '@tanstack/react-router'
import { PlusCircle, Trash2, ShoppingCart, CheckCircle, Loader2, ArrowLeft } from 'lucide-react'
import { ventasApi, detalleApi } from '../api/ventas'
import { productosApi } from '../api/productos'
import { usuariosApi } from '../api/usuarios'
import { FormField, Input, Select } from '../components/FormField'
import { Modal } from '../components/Modal'

export function NuevaVentaPage() {
  const router = useRouter()
  const [productos, setProductos] = useState([])
  const [usuarios, setUsuarios] = useState([])
  const [step, setStep] = useState('form') // form | success
  const [saving, setSaving] = useState(false)
  const [resultVenta, setResultVenta] = useState(null)

  const [form, setForm] = useState({
    id_usuario: '',
    fecha: new Date().toISOString().slice(0, 16),
    subtotal: '',
    igv: '',
    total: '',
  })

  const [detalles, setDetalles] = useState([
    { producto_id: '', precio_unitario: '', cantidad: '1' },
  ])

  const load = useCallback(async () => {
    try {
      const [p, u] = await Promise.all([productosApi.getAll(), usuariosApi.getAll()])
      setProductos(p)
      setUsuarios(u)
    } catch {}
  }, [])

  useEffect(() => { load() }, [load])

  function addDetalle() {
    setDetalles([...detalles, { producto_id: '', precio_unitario: '', cantidad: '1' }])
  }

  function removeDetalle(i) {
    if (detalles.length <= 1) return
    setDetalles(detalles.filter((_, idx) => idx !== i))
  }

  function updateDetalle(i, field, value) {
    const updated = [...detalles]
    updated[i][field] = value

    if (field === 'producto_id') {
      const prod = productos.find((p) => p.id === Number(value))
      if (prod) updated[i].precio_unitario = prod.precio?.toString() || ''
    }

    setDetalles(updated)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    try {
      const venta = await ventasApi.create({
        id_usuario: Number(form.id_usuario),
        fecha: form.fecha,
        subtotal: Number(form.subtotal),
        igv: Number(form.igv),
        total: Number(form.total),
      })

      for (const det of detalles) {
        if (det.producto_id && det.precio_unitario) {
          await detalleApi.create({
            venta_id: venta.id,
            producto_id: Number(det.producto_id),
            precio_unitario: Number(det.precio_unitario),
            cantidad: Number(det.cantidad),
          })
        }
      }

      setResultVenta(venta)
      setStep('success')
    } catch (err) {
      alert('Error al crear la venta: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  if (step === 'success') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-4 animate-fade-in">
        <div className="p-4 bg-emerald-500/10 rounded-full">
          <CheckCircle className="w-12 h-12 text-emerald-400" />
        </div>
        <h2 className="text-2xl font-bold text-primary-text">Venta registrada</h2>
        <p className="text-secondary-text">Venta #{resultVenta?.id} creada exitosamente.</p>
        <div className="flex gap-3 mt-2">
          <button onClick={() => router.navigate({ to: '/ventas' })} className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-hover transition text-sm cursor-pointer">
            Ir a Ventas
          </button>
          <button onClick={() => { setStep('form'); setDetalles([{ producto_id: '', precio_unitario: '', cantidad: '1' }]); setForm({ id_usuario: '', fecha: new Date().toISOString().slice(0, 16), subtotal: '', igv: '', total: '' }) }} className="px-4 py-2 bg-surface border border-border text-primary-text rounded-lg hover:bg-surface-hover transition text-sm cursor-pointer">
            Nueva Venta
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-3">
        <button onClick={() => router.navigate({ to: '/ventas' })} className="p-1.5 text-secondary-text hover:text-primary-text hover:bg-surface-hover rounded-lg transition cursor-pointer">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="p-2 bg-accent/10 rounded-lg"><ShoppingCart className="w-6 h-6 text-accent" /></div>
        <div>
          <h1 className="text-2xl font-bold text-primary-text">Nueva Venta</h1>
          <p className="text-sm text-secondary-text">Registra una venta con sus productos</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-surface rounded-xl border border-border p-6 space-y-4">
          <h2 className="text-sm font-semibold text-secondary-text uppercase tracking-wide">Datos de la venta</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Usuario" id="id_usuario">
              <Select id="id_usuario" value={form.id_usuario} onChange={(e) => setForm({ ...form, id_usuario: e.target.value })} required>
                <option value="">Seleccionar...</option>
                {usuarios.map((u) => <option key={u.id} value={u.id}>{u.nombre} ({u.dni})</option>)}
              </Select>
            </FormField>
            <FormField label="Fecha y hora" id="fecha">
              <Input id="fecha" type="datetime-local" value={form.fecha} onChange={(e) => setForm({ ...form, fecha: e.target.value })} required />
            </FormField>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField label="Subtotal" id="subtotal">
              <Input id="subtotal" type="number" step="0.01" value={form.subtotal} onChange={(e) => setForm({ ...form, subtotal: e.target.value })} required />
            </FormField>
            <FormField label="IGV (18%)" id="igv">
              <Input id="igv" type="number" step="0.01" value={form.igv} onChange={(e) => setForm({ ...form, igv: e.target.value })} required />
            </FormField>
            <FormField label="Total" id="total">
              <Input id="total" type="number" step="0.01" value={form.total} onChange={(e) => setForm({ ...form, total: e.target.value })} required />
            </FormField>
          </div>
        </div>

        <div className="bg-surface rounded-xl border border-border p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-secondary-text uppercase tracking-wide">Detalle de productos</h2>
            <button type="button" onClick={addDetalle} className="flex items-center gap-1.5 text-sm text-accent hover:text-blue-400 transition cursor-pointer">
              <PlusCircle className="w-4 h-4" /> Agregar producto
            </button>
          </div>

          {detalles.map((det, i) => (
            <div key={i} className="flex items-end gap-3 p-3 bg-elevated rounded-lg border border-border">
              <div className="flex-1">
                <FormField label="Producto" id={`prod-${i}`}>
                  <Select id={`prod-${i}`} value={det.producto_id} onChange={(e) => updateDetalle(i, 'producto_id', e.target.value)} required>
                    <option value="">Seleccionar...</option>
                    {productos.map((p) => (
                      <option key={p.id} value={p.id}>{p.marca} — S/ {Number(p.precio).toFixed(2)} (stock: {p.stock})</option>
                    ))}
                  </Select>
                </FormField>
              </div>
              <div className="w-28">
                <FormField label="Precio Unit." id={`precio-${i}`}>
                  <Input id={`precio-${i}`} type="number" step="0.01" value={det.precio_unitario} onChange={(e) => updateDetalle(i, 'precio_unitario', e.target.value)} required />
                </FormField>
              </div>
              <div className="w-20">
                <FormField label="Cant." id={`cant-${i}`}>
                  <Input id={`cant-${i}`} type="number" value={det.cantidad} onChange={(e) => updateDetalle(i, 'cantidad', e.target.value)} required />
                </FormField>
              </div>
              {detalles.length > 1 && (
                <button type="button" onClick={() => removeDetalle(i)} className="p-2 text-danger hover:bg-danger/10 rounded-lg mb-1 transition cursor-pointer">
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3">
          <button type="button" onClick={() => router.navigate({ to: '/ventas' })} className="px-4 py-2 text-sm text-secondary-text hover:text-primary-text transition cursor-pointer">
            Cancelar
          </button>
          <button type="submit" disabled={saving} className="flex items-center gap-2 px-6 py-2 bg-accent text-white rounded-lg hover:bg-accent-hover disabled:opacity-50 transition text-sm font-medium cursor-pointer">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            {saving ? 'Registrando...' : 'Registrar Venta'}
          </button>
        </div>
      </form>
    </div>
  )
}
