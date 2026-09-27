import { useState } from 'react'
import { Page } from '../types'
import { C, S } from '../theme'
import Logo from '../components/Logo'

interface RegisterPageProps {
  onNavigate: (page: Page) => void
}

export default function RegisterPage({ onNavigate }: RegisterPageProps) {
  const [form, setForm] = useState({
    identification: '',
    fullName: '',
    email: '',
    address: '',
    city: '',
    phone: '',
    password: '',
    confirmPassword: '',
    userType: 'client',
  })
  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [field]: e.target.value }))

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!form.identification) errs.identification = 'Requerido'
    if (!form.fullName) errs.fullName = 'Requerido'
    if (!form.email.includes('@')) errs.email = 'Correo inválido'
    if (!form.city) errs.city = 'Requerido'
    if (!form.phone) errs.phone = 'Requerido'
    if (form.password.length < 6) errs.password = 'Mínimo 6 caracteres'
    if (form.password !== form.confirmPassword) errs.confirmPassword = 'Las contraseñas no coinciden'
    return errs
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setSuccess(true)
    setTimeout(() => onNavigate('login'), 2000)
  }

  const Field = ({ field, label, type = 'text', placeholder = '' }: { field: string; label: string; type?: string; placeholder?: string }) => (
    <div>
      <label style={S.label}>{label}</label>
      <input
        type={type}
        value={(form as any)[field]}
        onChange={set(field)}
        placeholder={placeholder}
        style={{ ...S.input, borderColor: errors[field] ? 'rgba(239,68,68,0.5)' : 'rgba(124,58,237,0.25)' }}
        onFocus={e => (e.target.style.borderColor = 'rgba(124,58,237,0.6)')}
        onBlur={e => (e.target.style.borderColor = errors[field] ? 'rgba(239,68,68,0.5)' : 'rgba(124,58,237,0.25)')}
      />
      {errors[field] && <p style={{ color: '#F87171', fontSize: '12px', marginTop: '4px' }}>{errors[field]}</p>}
    </div>
  )

  if (success) {
    return (
      <div style={{ minHeight: '100vh', background: C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '20px' }}>
        <div style={{ fontSize: '52px' }}>🎉</div>
        <h2 className="font-display" style={{ color: C.text, fontSize: '26px', fontWeight: '600' }}>¡Cuenta creada!</h2>
        <p style={{ color: C.muted }}>Redirigiendo al inicio de sesión...</p>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: C.bg, padding: '40px 24px' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        <div className="flex items-center justify-between mb-10">
          <Logo size="sm" onClick={() => onNavigate('login')} />
          <button
            onClick={() => onNavigate('login')}
            style={{ background: 'none', border: 'none', color: C.muted, cursor: 'pointer', fontSize: '14px', fontFamily: 'Outfit, sans-serif' }}
          >
            ← Volver al login
          </button>
        </div>

        <div style={{ ...S.card, padding: '40px' }}>
          <h1 className="font-display" style={{ color: C.text, fontSize: '28px', fontWeight: '600', marginBottom: '6px' }}>
            Crear cuenta
          </h1>
          <p style={{ color: C.muted, fontSize: '15px', marginBottom: '36px' }}>
            Únete a SPEKTRA y empieza a explorar los mejores eventos
          </p>

          <form onSubmit={handleSubmit}>
            {/* Tipo de usuario */}
            <div style={{ marginBottom: '28px' }}>
              <label style={{ ...S.label, marginBottom: '10px' }}>Tipo de usuario</label>
              <div className="flex gap-4">
                {[
                  { value: 'client', label: 'Cliente', desc: 'Compra y reserva entradas' },
                  { value: 'agent', label: 'Agente', desc: 'Crea y gestiona eventos' },
                ].map(opt => (
                  <label
                    key={opt.value}
                    style={{
                      flex: 1,
                      background: form.userType === opt.value ? 'rgba(124,58,237,0.15)' : C.surface2,
                      border: `2px solid ${form.userType === opt.value ? C.violet : C.border}`,
                      borderRadius: '12px',
                      padding: '14px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    <input
                      type="radio"
                      name="userType"
                      value={opt.value}
                      checked={form.userType === opt.value}
                      onChange={set('userType')}
                      style={{ display: 'none' }}
                    />
                    <p style={{ color: form.userType === opt.value ? C.violetLight : C.text, fontWeight: '600', fontSize: '14px', marginBottom: '3px' }}>
                      {opt.label}
                    </p>
                    <p style={{ color: C.muted, fontSize: '12px' }}>{opt.desc}</p>
                  </label>
                ))}
              </div>
            </div>

            {/* Fields grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field field="identification" label="Número de identificación" placeholder="1234567890" />
              <Field field="fullName" label="Nombre completo" placeholder="María García López" />
              <Field field="email" label="Correo electrónico" type="email" placeholder="maria@ejemplo.com" />
              <Field field="phone" label="Teléfono" type="tel" placeholder="+57 300 000 0000" />
              <Field field="address" label="Dirección" placeholder="Calle 123 # 45-67" />
              <Field field="city" label="Ciudad" placeholder="Bogotá" />
              <Field field="password" label="Contraseña" type="password" placeholder="Mínimo 6 caracteres" />
              <Field field="confirmPassword" label="Confirmar contraseña" type="password" placeholder="Repite tu contraseña" />
            </div>

            <button
              type="submit"
              style={{ ...S.btnPrimary, width: '100%', marginTop: '32px', padding: '14px 24px', fontSize: '16px' }}
            >
              Crear cuenta
            </button>
          </form>

          <p style={{ color: C.muted, fontSize: '14px', textAlign: 'center', marginTop: '24px' }}>
            ¿Ya tienes cuenta?{' '}
            <button
              onClick={() => onNavigate('login')}
              style={{ background: 'none', border: 'none', color: C.violetLight, cursor: 'pointer', fontWeight: '600', fontSize: '14px', fontFamily: 'Outfit, sans-serif' }}
            >
              Inicia sesión
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
