import { useState } from 'react'
import { CurrentUser, AppEvent, Page, EventStatus } from '../types'
import { C, S, formatCOP, formatDateShort } from '../theme'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Badge from '../components/Badge'
import { mockEvents } from '../data'

interface ManageEventsPageProps {
  user: CurrentUser
  navigate: (page: Page, event?: AppEvent) => void
  onLogout: () => void
}

export default function ManageEventsPage({ user, navigate, onLogout }: ManageEventsPageProps) {
  const [events, setEvents] = useState(mockEvents)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | EventStatus>('all')

  const filtered = events.filter(e => {
    const matchSearch = e.name.toLowerCase().includes(search.toLowerCase()) || e.city.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'all' || e.status === statusFilter
    return matchSearch && matchStatus
  })

  const changeStatus = (id: string, status: EventStatus) => {
    setEvents(prev => prev.map(e => e.id === id ? { ...e, status } : e))
  }

  return (
    <div style={{ minHeight: '100vh', background: C.bg }}>
      <Navbar user={user} onNavigate={navigate} onLogout={onLogout} currentPage="manage-events" />
      <div style={{ paddingTop: '64px', display: 'flex' }}>
        <Sidebar user={user} currentPage="manage-events" onNavigate={navigate} />

        <main style={{ flex: 1, padding: '36px', minWidth: 0 }}>
          {/* Header */}
          <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
            <div>
              <h1 className="font-display" style={{ color: C.text, fontSize: '28px', fontWeight: '600', marginBottom: '4px' }}>
                Gestión de Eventos
              </h1>
              <p style={{ color: C.muted, fontSize: '14px' }}>{filtered.length} eventos encontrados</p>
            </div>
            <button style={S.btnPrimary} onClick={() => navigate('register-event')}>
              + Crear evento
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div style={{ flex: 1, position: 'relative' }}>
              <svg style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: C.muted }} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text" placeholder="Buscar por nombre o ciudad..." value={search} onChange={e => setSearch(e.target.value)}
                style={{ width: '100%', background: C.surface, border: `1px solid ${C.border}`, borderRadius: '10px', padding: '11px 16px 11px 40px', color: C.text, fontSize: '14px' }}
                onFocus={e => (e.target.style.borderColor = 'rgba(124,58,237,0.5)')}
                onBlur={e => (e.target.style.borderColor = C.border)}
              />
            </div>
            <div className="flex gap-2">
              {(['all', 'active', 'sold-out', 'cancelled'] as const).map(s => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  style={{
                    background: statusFilter === s ? `${C.violet}25` : 'transparent',
                    border: `1px solid ${statusFilter === s ? C.violet : C.border}`,
                    color: statusFilter === s ? C.violetLight : C.muted,
                    borderRadius: '8px',
                    padding: '8px 14px',
                    fontSize: '13px',
                    cursor: 'pointer',
                    fontFamily: 'Outfit, sans-serif',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s',
                  }}
                >
                  {{ all: 'Todos', active: 'Activos', 'sold-out': 'Agotados', cancelled: 'Cancelados' }[s]}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: '14px', overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${C.border}`, background: `${C.surface2}` }}>
                    {['Código', 'Nombre', 'Ciudad', 'Fecha', 'Capacidad / Disp.', 'Precio', 'Estado', 'Acciones'].map(h => (
                      <th key={h} style={{ padding: '13px 16px', textAlign: 'left', color: C.muted, fontSize: '11px', fontWeight: '600', fontFamily: 'DM Mono, monospace', whiteSpace: 'nowrap', letterSpacing: '0.05em' }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={8} style={{ padding: '48px', textAlign: 'center', color: C.muted }}>
                        Sin resultados para tu búsqueda
                      </td>
                    </tr>
                  ) : (
                    filtered.map((event, i) => (
                      <tr
                        key={event.id}
                        style={{
                          borderBottom: i < filtered.length - 1 ? `1px solid ${C.border}` : 'none',
                          transition: 'background 0.15s',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.background = `${C.violet}06`)}
                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                      >
                        <td style={{ padding: '14px 16px', color: C.dim, fontSize: '12px', fontFamily: 'DM Mono, monospace', whiteSpace: 'nowrap' }}>
                          {event.code}
                        </td>
                        <td style={{ padding: '14px 16px' }}>
                          <p style={{ color: C.text, fontSize: '14px', fontWeight: '500' }}>{event.name}</p>
                          <p style={{ color: C.dim, fontSize: '12px' }}>{event.theater}</p>
                        </td>
                        <td style={{ padding: '14px 16px', color: C.muted, fontSize: '13px' }}>{event.city}</td>
                        <td style={{ padding: '14px 16px', color: C.muted, fontSize: '13px', fontFamily: 'DM Mono, monospace', whiteSpace: 'nowrap' }}>
                          {formatDateShort(event.startDate)}
                        </td>
                        <td style={{ padding: '14px 16px', whiteSpace: 'nowrap' }}>
                          <span style={{ color: C.text, fontSize: '13px', fontFamily: 'DM Mono, monospace' }}>
                            {event.capacity.toLocaleString()}
                          </span>
                          <span style={{ color: C.muted, fontSize: '12px' }}> / </span>
                          <span style={{ color: event.available === 0 ? C.danger : C.success, fontSize: '13px', fontFamily: 'DM Mono, monospace' }}>
                            {event.available.toLocaleString()}
                          </span>
                        </td>
                        <td style={{ padding: '14px 16px', color: C.gold, fontSize: '13px', fontFamily: 'DM Mono, monospace', whiteSpace: 'nowrap' }}>
                          {formatCOP(event.price)}
                        </td>
                        <td style={{ padding: '14px 16px' }}><Badge status={event.status} /></td>
                        <td style={{ padding: '14px 16px' }}>
                          <div className="flex gap-2">
                            <button
                              style={{ background: `${C.violet}18`, border: `1px solid ${C.violet}30`, color: C.violetLight, borderRadius: '7px', padding: '6px 12px', fontSize: '12px', cursor: 'pointer', fontFamily: 'Outfit, sans-serif', whiteSpace: 'nowrap' }}
                              onClick={() => navigate('event-detail', event)}
                            >
                              Ver
                            </button>
                            {event.status === 'active' && (
                              <button
                                style={S.btnDanger}
                                onClick={() => changeStatus(event.id, 'cancelled')}
                              >
                                Cancelar
                              </button>
                            )}
                            {event.status === 'cancelled' && (
                              <button
                                style={S.btnSuccess}
                                onClick={() => changeStatus(event.id, 'active')}
                              >
                                Activar
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
