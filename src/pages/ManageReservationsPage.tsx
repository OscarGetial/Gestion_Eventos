import { useState } from 'react'
import { CurrentUser, AppEvent, Page, ReservationStatus } from '../types'
import { C, formatCOP, formatDateShort } from '../theme'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Badge from '../components/Badge'
import { mockReservations } from '../data'

interface ManageReservationsPageProps {
  user: CurrentUser
  navigate: (page: Page, event?: AppEvent) => void
  onLogout: () => void
}

export default function ManageReservationsPage({ user, navigate, onLogout }: ManageReservationsPageProps) {
  const [reservations, setReservations] = useState(mockReservations)
  const [statusFilter, setStatusFilter] = useState<'all' | ReservationStatus>('all')
  const [search, setSearch] = useState('')

  const filtered = reservations.filter(r => {
    const matchSearch = r.clientName.toLowerCase().includes(search.toLowerCase()) ||
      r.eventName.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'all' || r.status === statusFilter
    return matchSearch && matchStatus
  })

  const changeStatus = (id: string, status: ReservationStatus) => {
    setReservations(prev => prev.map(r => r.id === id ? { ...r, status } : r))
  }

  const summary = {
    total: reservations.length,
    confirmed: reservations.filter(r => r.status === 'confirmed').length,
    reserved: reservations.filter(r => r.status === 'reserved').length,
    cancelled: reservations.filter(r => r.status === 'cancelled').length,
    revenue: reservations.filter(r => r.status !== 'cancelled').reduce((a, r) => a + r.total, 0),
  }

  return (
    <div style={{ minHeight: '100vh', background: C.bg }}>
      <Navbar user={user} onNavigate={navigate} onLogout={onLogout} currentPage="manage-reservations" />
      <div style={{ paddingTop: '64px', display: 'flex' }}>
        <Sidebar user={user} currentPage="manage-reservations" onNavigate={navigate} />

        <main style={{ flex: 1, padding: '36px', minWidth: 0 }}>
          {/* Header */}
          <div style={{ marginBottom: '28px' }}>
            <h1 className="font-display" style={{ color: C.text, fontSize: '28px', fontWeight: '600', marginBottom: '4px' }}>
              Gestión de Reservas
            </h1>
            <p style={{ color: C.muted, fontSize: '14px' }}>Administra y actualiza el estado de las reservas</p>
          </div>

          {/* Summary strip */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px', marginBottom: '28px' }}>
            {[
              { label: 'Total', value: summary.total, color: C.violet },
              { label: 'Confirmadas', value: summary.confirmed, color: C.success },
              { label: 'Pendientes', value: summary.reserved, color: C.info },
              { label: 'Canceladas', value: summary.cancelled, color: C.danger },
              { label: 'Ingresos', value: formatCOP(summary.revenue), color: C.gold },
            ].map(s => (
              <div key={s.label} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: '10px', padding: '14px 16px' }}>
                <p style={{ color: C.muted, fontSize: '11px', marginBottom: '4px', fontFamily: 'DM Mono, monospace' }}>{s.label}</p>
                <p className="font-display" style={{ color: s.color, fontSize: '20px', fontWeight: '700' }}>{s.value}</p>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div style={{ flex: 1, position: 'relative' }}>
              <svg style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: C.muted }} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text" placeholder="Buscar por cliente o evento..." value={search} onChange={e => setSearch(e.target.value)}
                style={{ width: '100%', background: C.surface, border: `1px solid ${C.border}`, borderRadius: '10px', padding: '11px 16px 11px 40px', color: C.text, fontSize: '14px' }}
                onFocus={e => (e.target.style.borderColor = 'rgba(124,58,237,0.5)')}
                onBlur={e => (e.target.style.borderColor = C.border)}
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {(['all', 'reserved', 'confirmed', 'cancelled'] as const).map(s => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  style={{
                    background: statusFilter === s ? `${C.violet}25` : 'transparent',
                    border: `1px solid ${statusFilter === s ? C.violet : C.border}`,
                    color: statusFilter === s ? C.violetLight : C.muted,
                    borderRadius: '8px', padding: '8px 14px', fontSize: '13px', cursor: 'pointer', fontFamily: 'Outfit, sans-serif', whiteSpace: 'nowrap', transition: 'all 0.2s',
                  }}
                >
                  {{ all: 'Todas', reserved: 'Pendientes', confirmed: 'Confirmadas', cancelled: 'Canceladas' }[s]}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: '14px', overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${C.border}`, background: C.surface2 }}>
                    {['ID', 'Cliente', 'Evento', 'Fecha', 'Entradas', 'Total', 'Estado', 'Acciones'].map(h => (
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
                        Sin reservas para mostrar
                      </td>
                    </tr>
                  ) : (
                    filtered.map((r, i) => (
                      <tr
                        key={r.id}
                        style={{ borderBottom: i < filtered.length - 1 ? `1px solid ${C.border}` : 'none', transition: 'background 0.15s', opacity: r.status === 'cancelled' ? 0.7 : 1 }}
                        onMouseEnter={e => (e.currentTarget.style.background = `${C.violet}06`)}
                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                      >
                        <td style={{ padding: '14px 16px', color: C.dim, fontSize: '12px', fontFamily: 'DM Mono, monospace' }}>{r.id}</td>
                        <td style={{ padding: '14px 16px' }}>
                          <p style={{ color: C.text, fontSize: '14px', fontWeight: '500' }}>{r.clientName}</p>
                          <p style={{ color: C.dim, fontSize: '12px' }}>{r.clientEmail}</p>
                        </td>
                        <td style={{ padding: '14px 16px', color: C.muted, fontSize: '13px', maxWidth: '180px' }}>
                          <p style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.eventName}</p>
                        </td>
                        <td style={{ padding: '14px 16px', color: C.muted, fontSize: '13px', fontFamily: 'DM Mono, monospace', whiteSpace: 'nowrap' }}>
                          {formatDateShort(r.date)}
                        </td>
                        <td style={{ padding: '14px 16px', color: C.text, fontSize: '14px', fontFamily: 'DM Mono, monospace', textAlign: 'center' }}>
                          {r.tickets}
                        </td>
                        <td style={{ padding: '14px 16px', color: C.gold, fontSize: '13px', fontFamily: 'DM Mono, monospace', whiteSpace: 'nowrap', fontWeight: '600' }}>
                          {formatCOP(r.total)}
                        </td>
                        <td style={{ padding: '14px 16px' }}><Badge status={r.status} /></td>
                        <td style={{ padding: '14px 16px' }}>
                          <div className="flex gap-2">
                            {r.status === 'reserved' && (
                              <button style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)', color: '#34D399', borderRadius: '7px', padding: '6px 11px', fontSize: '12px', cursor: 'pointer', fontFamily: 'Outfit, sans-serif', whiteSpace: 'nowrap' }}
                                onClick={() => changeStatus(r.id, 'confirmed')}>
                                Confirmar
                              </button>
                            )}
                            {r.status !== 'cancelled' && (
                              <button style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', color: '#F87171', borderRadius: '7px', padding: '6px 11px', fontSize: '12px', cursor: 'pointer', fontFamily: 'Outfit, sans-serif', whiteSpace: 'nowrap' }}
                                onClick={() => changeStatus(r.id, 'cancelled')}>
                                Cancelar
                              </button>
                            )}
                            {r.status === 'cancelled' && (
                              <button style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.25)', color: '#60A5FA', borderRadius: '7px', padding: '6px 11px', fontSize: '12px', cursor: 'pointer', fontFamily: 'Outfit, sans-serif', whiteSpace: 'nowrap' }}
                                onClick={() => changeStatus(r.id, 'reserved')}>
                                Restaurar
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
