import { useEffect, useState } from 'react'
import { CurrentUser, AppEvent, Page } from '../types'
import { C } from '../theme'
import Navbar from '../components/Navbar'
import EventCard from '../components/EventCard'
import { mockEvents } from '../data'


interface ClientHomePageProps {
  user: CurrentUser
  navigate: (page: Page, event?: AppEvent) => void
  onLogout: () => void
}

const CITIES = ['Todas las ciudades', 'Bogotá', 'Medellín', 'Cali', 'Barranquilla']

export default function ClientHomePage({ user, navigate, onLogout }: ClientHomePageProps) {
  const [search, setSearch] = useState('')
  const [city, setCity] = useState('Todas las ciudades')
  const [events, setEvents] = useState<AppEvent[]>([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState('')

useEffect(() => {
  const controller = new AbortController()

  const cargarEventos = async () => {
    try {
      const response = await fetch(
        'http://localhost:3001/api/eventos',
        { signal: controller.signal }
      )

      if (!response.ok) {
        throw new Error('No se pudieron cargar los eventos')
      }

      const datos = await response.json()

      const eventosNeon: AppEvent[] = datos.map((e: any) => ({
        id: String(e.id),
        code: e.codigo ?? '',
        name: e.titulo,
        description: e.descripcion ?? '',
        theater: e.lugar,
        city: e.ciudad ?? '',
        startDate: e.fecha,
        endDate: e.fecha_fin ?? e.fecha,
        capacity: Number(e.capacidad),
        available: Number(e.disponibles ?? e.capacidad),
        price: Number(e.precio),
        image: e.imagen ?? '',
        status: e.estado ?? 'active',
        observations: e.observaciones ?? '',
      }))

      if (!controller.signal.aborted) {
        setEvents(eventosNeon)
      }
    } catch (err) {
      if (!controller.signal.aborted) {
        setError('No se pudieron cargar los eventos de Neon')
      }
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false)
      }
    }
  }

  cargarEventos()

  return () => controller.abort()
}, [])

const allEvents: AppEvent[] = [
  ...events,
  ...mockEvents.filter(
    demo => !events.some(
      real =>
        real.code === demo.code ||
        (
          real.name === demo.name &&
          real.startDate.slice(0, 10) === demo.startDate.slice(0, 10)
        )
    )
  )
]

const filtered = allEvents.filter(e => {
  const matchSearch =
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.theater.toLowerCase().includes(search.toLowerCase())

  const matchCity =
    city === 'Todas las ciudades' || e.city === city

  const available =
    e.status === 'active' && e.available > 0

  return matchSearch && matchCity && available
})
  return (
    <div style={{ minHeight: '100vh', background: C.bg }}>
      <Navbar user={user} onNavigate={navigate} onLogout={onLogout} currentPage="client-home" />

      <div style={{ paddingTop: '64px' }}>
        {/* Hero banner */}
        <div
          style={{
            background: 'linear-gradient(135deg, #0E0B2E 0%, #1A1040 40%, #0E1535 100%)',
            padding: '64px 24px 56px',
            position: 'relative',
            overflow: 'hidden',
            borderBottom: `1px solid ${C.border}`,
          }}
        >
          <div style={{ position: 'absolute', top: '-60px', right: '10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '-40px', left: '5%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

          <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <p style={{ color: C.gold, fontSize: '13px', fontWeight: '600', letterSpacing: '0.12em', marginBottom: '12px', fontFamily: 'DM Mono, monospace' }}>
              BIENVENIDA DE VUELTA
            </p>
            <h1
              className="font-display"
              style={{ color: C.text, fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: '600', lineHeight: 1.15, marginBottom: '14px' }}
            >
              Hola, {user.name.split(' ')[0]}. 👋<br />
              <span style={{ color: C.violetLight }}>¿A qué espectáculo</span> vas hoy?
            </h1>
            <p style={{ color: C.muted, fontSize: '16px', maxWidth: '480px' }}>
              Explora los mejores eventos culturales y de entretenimiento disponibles en tu ciudad.
            </p>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-6 mt-8">
              {[
                { label: 'Eventos disponibles', value: `${events.filter(e => e.status === 'active' && e.available > 0).length}` },
                { label: 'Ciudades', value: '4+' },
                { label: 'Espectáculos este mes', value: '12' },
              ].map(s => (
                <div key={s.label}>
                  <p className="font-display" style={{ color: C.text, fontSize: '26px', fontWeight: '700' }}>{s.value}</p>
                  <p style={{ color: C.muted, fontSize: '13px' }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content area */}
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 24px' }}>
          {/* Search + filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div style={{ flex: 1, position: 'relative' }}>
              <svg
                style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: C.muted }}
                width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Buscar eventos, teatros..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                  width: '100%',
                  background: C.surface,
                  border: `1px solid ${C.border}`,
                  borderRadius: '10px',
                  padding: '12px 16px 12px 42px',
                  color: C.text,
                  fontSize: '14px',
                }}
                onFocus={e => (e.target.style.borderColor = 'rgba(124,58,237,0.5)')}
                onBlur={e => (e.target.style.borderColor = C.border)}
              />
            </div>

            <select
              value={city}
              onChange={e => setCity(e.target.value)}
              style={{
                background: C.surface,
                border: `1px solid ${C.border}`,
                borderRadius: '10px',
                padding: '12px 16px',
                color: C.text,
                fontSize: '14px',
                minWidth: '200px',
                cursor: 'pointer',
              }}
            >
              {CITIES.map(c => <option key={c} value={c} style={{ background: C.surface }}>{c}</option>)}
            </select>
          </div>

          {/* Results count */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display" style={{ color: C.text, fontSize: '22px', fontWeight: '600' }}>
              {city === 'Todas las ciudades' ? 'Todos los eventos' : `Eventos en ${city}`}
            </h2>
            <span style={{ color: C.muted, fontSize: '14px' }}>
              {filtered.length} {filtered.length === 1 ? 'resultado' : 'resultados'}
            </span>
          </div>
          {loading && (
  <p style={{ color: C.muted }}>
    Cargando eventos...
  </p>
)}

{error && (
  <p style={{ color: '#ef4444' }}>
    {error}
  </p>
)}

          {/* Grid */}
          {filtered.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
              {filtered.map(event => (
                <EventCard key={event.id} event={event} onNavigate={navigate} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <p style={{ fontSize: '48px', marginBottom: '16px' }}>🎭</p>
              <p className="font-display" style={{ color: C.text, fontSize: '20px', marginBottom: '8px' }}>Sin resultados</p>
              <p style={{ color: C.muted }}>Intenta con otro término o ciudad</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
