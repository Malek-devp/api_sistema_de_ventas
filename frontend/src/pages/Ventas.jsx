import { useState, useEffect, useCallback } from 'react'
import { ShoppingCart, Eye, Trash2, Loader2 } from 'lucide-react'
import { ventasApi, detalleApi } from '../api/ventas'
import { productosApi } from '../api/productos'
import { Modal } from '../components/Modal'
import { Table } from '../components/Table'

export function VentasPage() {
  const [ventas, setVentas] = useState([])
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)
  const [detalleOpen, setDetalleOpen] = useState(false)
  const [detalleVenta, setDetalleVenta] = useState(null)
  const [detalleItems, setDetalleItems] = useState([])
  const [detalleLoading, setDetalleLoading] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const [v, p] = await Promise.all([ventasApi.getAll(), productosApi.getAll()])
      setVentas(v)
      setProductos(p)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  function formatFecha(fecha) {
    if (!fecha) return '—'
    const d = new Date(fecha)
    return d.toLocaleDateString('es-PE', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })
  }

  async function openDetalle(venta) {
    setDetalleVenta(venta)
    setDetalleLoading(true)
    setDetalleOpen(true)
    try {
      const all = await detalleApi.getAll()
      const items = all.filter((d) => d.venta_id === venta.id)
      setDetalleItems(items)
    } finally {
      setDetalleLoading(false)
    }
  }

  function getProductoName(id) {
    const p = productos.find((pr) => pr.id === id)
    return p?.marca || `ID: ${id}`
  }

  async function handleDelete(row) {
    if (!window.confirm(`¿Eliminar venta #${row.id}?`)) return
    await ventasApi.delete(row.id)
    await load()
  }

  const columns = [
    { key: 'id', label: 'N°', className: 'w-12 text-muted' },
    { key: 'id_usuario', label: 'Usuario', render: (val) => <span className="text-secondary-text">ID: {val}</span> },
    { key: 'fecha', label: 'Fecha', render: (val) => formatFecha(val) },
    { key: 'subtotal', label: 'Subtotal', render: (val) => `S/ ${Number(val).toFixed(2)}` },
    { key: 'igv', label: 'IGV', render: (val) => `S/ ${Number(val).toFixed(2)}` },
    { key: 'total', label: 'Total', render: (val) => <span className="font-semibold text-accent">S/ {Number(val).toFixed(2)}</span> },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-emerald-500/10 rounded-lg"><ShoppingCart className="w-6 h-6 text-emerald-400" /></div>
        <div>
          <h1 className="text-2xl font-bold text-primary-text">Ventas</h1>
          <p className="text-sm text-secondary-text">Registro de ventas realizadas</p>
        </div>
      </div>

      <div className="bg-surface rounded-xl border border-border">
        <Table
          columns={columns}
          data={ventas}
          loading={loading}
          onEdit={(row) => openDetalle(row)}
          onDelete={handleDelete}
        />
      </div>

      <Modal open={detalleOpen} onClose={() => setDetalleOpen(false)} title={`Venta #${detalleVenta?.id}`} size="lg">
        {detalleLoading ? (
          <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 text-accent animate-spin" /></div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="text-secondary-text">Usuario:</span> <span className="text-primary-text ml-1">ID {detalleVenta?.id_usuario}</span></div>
              <div><span className="text-secondary-text">Fecha:</span> <span className="text-primary-text ml-1">{formatFecha(detalleVenta?.fecha)}</span></div>
              <div><span className="text-secondary-text">Subtotal:</span> <span className="text-primary-text ml-1">S/ {Number(detalleVenta?.subtotal || 0).toFixed(2)}</span></div>
              <div><span className="text-secondary-text">IGV:</span> <span className="text-primary-text ml-1">S/ {Number(detalleVenta?.igv || 0).toFixed(2)}</span></div>
              <div className="col-span-2"><span className="text-secondary-text">Total:</span> <span className="text-accent font-bold ml-1">S/ {Number(detalleVenta?.total || 0).toFixed(2)}</span></div>
            </div>

            <div className="border-t border-border pt-4">
              <h3 className="text-sm font-medium text-secondary-text mb-3">Detalle de productos</h3>
              {detalleItems.length === 0 ? (
                <p className="text-sm text-muted">Sin detalle registrado</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 px-3 text-secondary-text font-medium">Producto</th>
                        <th className="text-right py-2 px-3 text-secondary-text font-medium">Precio Unit.</th>
                        <th className="text-right py-2 px-3 text-secondary-text font-medium">Cantidad</th>
                        <th className="text-right py-2 px-3 text-secondary-text font-medium">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {detalleItems.map((item, i) => (
                        <tr key={item.id || i} className="border-b border-border/50">
                          <td className="py-2 px-3 text-primary-text">{getProductoName(item.producto_id)}</td>
                          <td className="py-2 px-3 text-right text-primary-text">S/ {Number(item.precio_unitario).toFixed(2)}</td>
                          <td className="py-2 px-3 text-right text-primary-text">{item.cantidad}</td>
                          <td className="py-2 px-3 text-right text-primary-text font-medium">S/ {(Number(item.precio_unitario) * Number(item.cantidad)).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
