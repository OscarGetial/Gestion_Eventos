import { useState } from 'react'
import { CurrentUser, AppEvent, Page } from '../types'
import { C, S } from '../theme'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

interface RegisterEventPageProps {
  user: CurrentUser
  navigate: (page: Page, event?: AppEvent) => void
  onLogout: () => void
}

export default function RegisterEventPage({ user, navigate, onLogout }: RegisterEventPageProps) {
  const [form, setForm] = useState({
    code: 'EVT-' + String(Date.now()).slice(-4),
    name: '',
    description: '',
    theater: '',
    city: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    capacity: '',
    price: '',
    observations: '',
  })
  const [saved, setSaved] = useState(false)

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [field]: e.target.value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => navigate('manage-events'), 1800)
  }

  const InputField = ({ field, label, type = 'text', placeholder = '', full = false }: { field: string; label: string; type?: string; placeholder?: string; full?: boolean }) => (
    <div style={{ gridColumn: full ? '1 / -1' : 'auto' }}>
      <label style={S.label}>{label}</label>
      <input
        type={type}
        value={(form as any)[field]}
        onChange={set(field)}
        placeholder={placeholder}
        style={S.input}
        onFocus={e => (e.target.style.borderColor = 'rgba(124,58,237,0.6)')}
        onBlur={e => (e.target.style.borderColor = 'rgba(124,58,237,0.25)')}
      />
    </div>
  )

  if (saved) {
    return (
      <div style={{ minHeight: '100vh', background: C.bg }}>
        <Navbar user={user} onNavigate={navigate} onLogout={onLogout} />
        <div style={{ paddingTop: '64px', display: 'flex' }}>
          <Sidebar user={user} currentPage="register-event" onNavigate={navigate} />
          <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px' }}>
            <div style={{ background: 'rgba(124,58,237,0.1)', border: '2px solid rgba(124,58,237,0.4)', borderRadius: '50%', width: '72px', height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={C.violetLight} strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
            </div>
            <h2 className="font-display" style={{ color: C.text, fontSize: '24px', fontWeight: '600' }}>¡Evento guardado!</h2>
            <p style={{ color: C.muted }}>Redirigiendo a gestión de eventos...</p>
          </main>
        </div>
      </div>
    )
  }

  const CITIES = ['Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena', 'Santa Marta', 'Otra']

  return (
    <div style={{ minHeight: '100vh', background: C.bg }}>
      <Navbar user={user} onNavigate={navigate} onLogout={onLogout} currentPage="register-event" />
      <div style={{ paddingTop: '64px', display: 'flex' }}>
        <Sidebar user={user} currentPage="register-event" onNavigate={navigate} />

        <main style={{ flex: 1, padding: '36px', maxWidth: '900px' }}>
          <div style={{ marginBottom: '32px' }}>
            <button
              onClick={() => navigate('agent-dashboard')}
              style={{ background: 'none', border: 'none', color: C.muted, cursor: 'pointer', fontSize: '14px', fontFamily: 'Outfit, sans-serif', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
              Volver
            </button>
            <h1 className="font-display" style={{ color: C.text, fontSize: '28px', fontWeight: '600', marginBottom: '6px' }}>
              Registrar nuevo evento
            </h1>
            <p style={{ color: C.muted }}>Completa la información del evento para publicarlo en la plataforma</p>
          </div>

          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: '16px', padding: '36px' }}>
            <form onSubmit={handleSubmit}>
              {/* Section: Identificación */}
              <div style={{ marginBottom: '28px' }}>
                <h3 style={{ color: C.violetLight, fontSize: '13px', fontWeight: '600', letterSpacing: '0.1em', fontFamily: 'DM Mono, monospace', marginBottom: '20px', borderBottom: `1px solid ${C.border}`, paddingBottom: '10px' }}>
                  IDENTIFICACIÓN
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
                  <div>
                    <label style={S.label}>Código del evento</label>
                    <input value={form.code} readOnly
                      style={{ ...S.input, background: C.surface3, color: C.muted, cursor: 'not-allowed' }}
                    />
                  </div>
                  <div>
                    <label style={S.label}>Nombre del evento *</label>
                    <input type="text" value={form.name} onChange={set('name')} required placeholder="Ej: La Traviata — Gala" style={S.input}
                      onFocus={e => (e.target.style.borderColor = 'rgba(124,58,237,0.6)')}
                      onBlur={e => (e.target.style.borderColor = 'rgba(124,58,237,0.25)')} />
                  </div>
                </div>
              </div>

              {/* Section: Descripción */}
              <div style={{ marginBottom: '28px' }}>
                <h3 style={{ color: C.violetLight, fontSize: '13px', fontWeight: '600', letterSpacing: '0.1em', fontFamily: 'DM Mono, monospace', marginBottom: '20px', borderBottom: `1px solid ${C.border}`, paddingBottom: '10px' }}>
                  DESCRIPCIÓN
                </h3>
                <div>
                  <label style={S.label}>Descripción del evento *</label>
                  <textarea
                    value={form.description}
                    onChange={set('description')}
                    required
                    rows={4}
                    placeholder="Describe el evento, artistas, propuesta artística..."
                    style={{ ...S.input, resize: 'vertical', fontFamily: 'Outfit, sans-serif' } as React.CSSProperties}
                    onFocus={e => (e.target.style.borderColor = 'rgba(124,58,237,0.6)')}
                    onBlur={e => (e.target.style.borderColor = 'rgba(124,58,237,0.25)')}
                  />
                </div>
              </div>

              {/* Section: Ubicación */}
              <div style={{ marginBottom: '28px' }}>
                <h3 style={{ color: C.violetLight, fontSize: '13px', fontWeight: '600', letterSpacing: '0.1em', fontFamily: 'DM Mono, monospace', marginBottom: '20px', borderBottom: `1px solid ${C.border}`, paddingBottom: '10px' }}>
                  UBICACIÓN
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
                  <div>
                    <label style={S.label}>Teatro / Lugar *</label>
                    <input type="text" value={form.theater} onChange={set('theater')} required placeholder="Ej: Teatro Nacional Cristóbal Colón" style={S.input}
                      onFocus={e => (e.target.style.borderColor = 'rgba(124,58,237,0.6)')}
                      onBlur={e => (e.target.style.borderColor = 'rgba(124,58,237,0.25)')} />
                  </div>
                  <div>
                    <label style={S.label}>Ciudad *</label>
                    <select value={form.city} onChange={set('city')} required
                      style={{ ...S.input, cursor: 'pointer' }}>
                      <option value="" style={{ background: C.surface }}>Selecciona una ciudad</option>
                      {CITIES.map(c => <option key={c} value={c} style={{ background: C.surface }}>{c}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* Section: Fechas */}
              <div style={{ marginBottom: '28px' }}>
                <h3 style={{ color: C.violetLight, fontSize: '13px', fontWeight: '600', letterSpacing: '0.1em', fontFamily: 'DM Mono, monospace', marginBottom: '20px', borderBottom: `1px solid ${C.border}`, paddingBottom: '10px' }}>
                  FECHAS Y HORARIO
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                  <InputField field="startDate" label="Fecha de inicio *" type="date" />
                  <InputField field="startTime" label="Hora de inicio *" type="time" />
                  <InputField field="endDate" label="Fecha estimada de finalización" type="date" />
                  <InputField field="endTime" label="Hora estimada de fin" type="time" />
                </div>
              </div>

              {/* Section: Entradas */}
              <div style={{ marginBottom: '28px' }}>
                <h3 style={{ color: C.violetLight, fontSize: '13px', fontWeight: '600', letterSpacing: '0.1em', fontFamily: 'DM Mono, monospace', marginBottom: '20px', borderBottom: `1px solid ${C.border}`, paddingBottom: '10px' }}>
                  CAPACIDAD Y PRECIO
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
                  <InputField field="capacity" label="Capacidad (personas) *" type="number" placeholder="Ej: 1500" />
                  <InputField field="price" label="Precio base (COP) *" type="number" placeholder="Ej: 150000 (0 para gratis)" />
                </div>
              </div>

              {/* Observations */}
              <div style={{ marginBottom: '32px' }}>
                <label style={S.label}>Observaciones adicionales</label>
                <textarea
                  value={form.observations}
                  onChange={set('observations')}
                  rows={3}
                  placeholder="Restricciones de edad, vestimenta, notas especiales..."
                  style={{ ...S.input, resize: 'vertical', fontFamily: 'Outfit, sans-serif' } as React.CSSProperties}
                  onFocus={e => (e.target.style.borderColor = 'rgba(124,58,237,0.6)')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(124,58,237,0.25)')}
                />
              </div>

              <div className="flex gap-4">
                <button type="button" style={{ ...S.btnOutline, flex: 1 }} onClick={() => navigate('manage-events')}>
                  Cancelar
                </button>
                <button type="submit" style={{ ...S.btnPrimary, flex: 2 }}>
                  Guardar evento
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}
