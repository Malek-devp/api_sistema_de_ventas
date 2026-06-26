import { Loader2 } from 'lucide-react'

export function Table({ columns, data, loading, onEdit, onDelete, emptyMessage = 'No hay registros' }) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-16 text-secondary-text">
        <Loader2 className="w-6 h-6 animate-spin mr-2" />
        Cargando...
      </div>
    )
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-16 text-secondary-text">
        {emptyMessage}
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            {columns.map((col) => (
              <th key={col.key} className={`text-left py-3 px-4 text-secondary-text font-medium ${col.className || ''}`}>
                {col.label}
              </th>
            ))}
            {(onEdit || onDelete) && (
              <th className="text-right py-3 px-4 text-secondary-text font-medium w-24">Acciones</th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={row.id || i} className="border-b border-border hover:bg-surface-hover/50 transition">
              {columns.map((col) => (
                <td key={col.key} className={`py-3 px-4 ${col.className || ''}`}>
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
              {(onEdit || onDelete) && (
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {onEdit && (
                      <button onClick={() => onEdit(row)} className="px-3 py-1 text-xs bg-accent/10 text-accent rounded-md hover:bg-accent/20 transition cursor-pointer">
                        Editar
                      </button>
                    )}
                    {onDelete && (
                      <button onClick={() => onDelete(row)} className="px-3 py-1 text-xs bg-danger/10 text-danger rounded-md hover:bg-danger/20 transition cursor-pointer">
                        Eliminar
                      </button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
