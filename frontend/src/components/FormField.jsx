export function FormField({ label, id, error, children }) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-secondary-text">
        {label}
      </label>
      {children}
      {error && <p className="text-xs text-danger">{error}</p>}
    </div>
  )
}

export function Input({ id, type = 'text', value, onChange, placeholder, required, maxLength, className = '' }) {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      maxLength={maxLength}
      className={`w-full px-3 py-2 bg-elevated border border-border rounded-lg text-primary-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition text-sm ${className}`}
    />
  )
}

export function Select({ id, value, onChange, children, required, className = '' }) {
  return (
    <select
      id={id}
      value={value}
      onChange={onChange}
      required={required}
      className={`w-full px-3 py-2 bg-elevated border border-border rounded-lg text-primary-text focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition text-sm ${className}`}
    >
      {children}
    </select>
  )
}
