import { CurrentUser, AppEvent, Page } from '../types'
import { C, S, formatCOP, formatDateShort } from '../theme'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import StatCard from '../components/StatCard'
import Badge from '../components/Badge'
import { mockEvents, mockReservations } from '../data'

interface AgentDashboardPageProps {
  user: CurrentUser
  navigate: (page: Page, event?: AppEvent) => void
  onLogout: () => void
}

const AGENT_EVENTS = mockEvents.slice(0, 5)
const PENDING_RESERVATIONS = mockReservations.filter(r => r.status === 'reserved')

export default function AgentDashboardPage({ user, navigate, onLogout }: AgentDashboardPageProps) {
  const totalRevenue = mockReservations.filter(r => r.status !== 'cancelled').reduce((a, r) => a + r.total, 0)

  return (
    <div style={{ minHeight: '100vh', background: C.bg }}>
      <Navbar user={user} onNavigate={navigate} onLogout={onLogout} currentPage="agent-dashboard" />
      <div style={{ paddingTop: '64px', display: 'flex' }}>
        <Sidebar user={user} currentPage="agent-dashboard" onNavigate={navigate} />

        <main style={{ flex: 1, padding: '36px', minWidth: 0 }}>
          {/* Header */}
          <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
            <div>
              <p style={{ color: C.gold, fontSize: '12px', fontWeight: '600', letterSpacing: '0.1em', fontFamily: 'DM Mono, monospace', marginBottom: '6px' }}>
                PANEL DE AGENTE
              </p>
              <h1 className="font-display" style={{ color: C.text, fontSize: '28px', fontWeight: '600' }}>
                Bienvenido, {user.name.split(' ')[0]}
              </h1>
            </div>
            <button
              style={S.btnPrimary}
              onClick={() => navigate('register-event')}
            >
              + Crear evento
            </button>
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '36px' }}>
            <StatCard
              label="Eventos creados"
              value={AGENT_EVENTS.length}
              trend="↑ 2 este mes"
              icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>}
            />
            <StatCard
              label="Reservas pendientes"
              value={PENDING_RESERVATIONS.length}
              accent={C.warning}
              icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2z" /></svg>}
            />
            <StatCard
              label="Total reservas"
              value={mockReservations.length}
              accent={C.success}
              trend="↑ 12% este mes"
              icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>}
            />
            <StatCard
              label="Ingresos totales"
              value={formatCOP(totalRevenue)}
              accent={C.gold}
              trend="↑ $850.000 este mes"
              icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>}
            />
          </div>

          {/* Quick actions */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '36px' }}>
            {[
              { label: 'Crear evento', action: () => navigate('register-event'), icon: '➕', color: C.violet },
              { label: 'Ver mis eventos', action: () => navigate('manage-events'), icon: '🗓️', color: C.info },
              { label: 'Gestionar reservas', action: () => navigate('manage-reservations'), icon: '🎟️', color: C.gold },
            ].map(a => (
              <button
                key={a.label}
                onClick={a.action}
                style={{
                  background: `${a.color}12`,
                  border: `1px solid ${a.color}30`,
                  borderRadius: '12px',
                  padding: '18px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background 0.2s',
                  fontFamily: 'Outfit, sans-serif',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = `${a.color}20`)}
                onMouseLeave={e => (e.currentTarget.style.background = `${a.color}12`)}
              >
                <span style={{ fontSize: '24px', display: 'block', marginBottom: '8px' }}>{a.icon}</span>
                <span style={{ color: C.text, fontSize: '14px', fontWeight: '600' }}>{a.label}</span>
              </button>
            ))}
          </div>

          {/* Recent events table */}
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: '14px', overflow: 'hidden', marginBottom: '24px' }}>
            <div className="flex items-center justify-between" style={{ padding: '18px 24px', borderBottom: `1px solid ${C.border}` }}>
              <h2 className="font-display" style={{ color: C.text, fontSize: '17px', fontWeight: '600' }}>Mis eventos recientes</h2>
              <button style={S.btnOutline} onClick={() => navigate('manage-events')}>Ver todos</button>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                    {['Evento', 'Ciudad', 'Fecha', 'Capacidad', 'Estado'].map(h => (
                      <th key={h} style={{ padding: '12px 16px', textAlign: 'left', color: C.muted, fontSize: '12px', fontWeight: '600', fontFamily: 'DM Mono, monospace', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {AGENT_EVENTS.map((e, i) => (
                    <tr
                      key={e.id}
                      style={{ borderBottom: i < AGENT_EVENTS.length - 1 ? `1px solid ${C.border}` : 'none', transition: 'background 0.15s', cursor: 'pointer' }}
                      onMouseEnter={ev => (ev.currentTarget.style.background = `${C.violet}08`)}
                      onMouseLeave={ev => (ev.currentTarget.style.background = 'transparent')}
                    >
                      <td style={{ padding: '14px 16px', color: C.text, fontSize: '14px', fontWeight: '500' }}>{e.name}</td>
                      <td style={{ padding: '14px 16px', color: C.muted, fontSize: '13px' }}>{e.city}</td>
                      <td style={{ padding: '14px 16px', color: C.muted, fontSize: '13px', fontFamily: 'DM Mono, monospace' }}>{formatDateShort(e.startDate)}</td>
                      <td style={{ padding: '14px 16px', color: C.muted, fontSize: '13px', fontFamily: 'DM Mono, monospace' }}>{e.capacity.toLocaleString()}</td>
                      <td style={{ padding: '14px 16px' }}><Badge status={e.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pending reservations */}
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: '14px', overflow: 'hidden' }}>
            <div className="flex items-center justify-between" style={{ padding: '18px 24px', borderBottom: `1px solid ${C.border}` }}>
              <h2 className="font-display" style={{ color: C.text, fontSize: '17px', fontWeight: '600' }}>
                Reservas pendientes
                <span style={{ background: 'rgba(245,158,11,0.15)', color: C.gold, borderRadius: '12px', padding: '2px 8px', fontSize: '12px', marginLeft: '8px', fontFamily: 'DM Mono, monospace' }}>
                  {PENDING_RESERVATIONS.length}
                </span>
              </h2>
              <button style={S.btnOutline} onClick={() => navigate('manage-reservations')}>Gestionar</button>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                    {['Cliente', 'Evento', 'Fecha', 'Entradas', 'Total'].map(h => (
                      <th key={h} style={{ padding: '12px 16px', textAlign: 'left', color: C.muted, fontSize: '12px', fontWeight: '600', fontFamily: 'DM Mono, monospace', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PENDING_RESERVATIONS.map((r, i) => (
                    <tr
                      key={r.id}
                      style={{ borderBottom: i < PENDING_RESERVATIONS.length - 1 ? `1px solid ${C.border}` : 'none' }}
                    >
                      <td style={{ padding: '14px 16px', color: C.text, fontSize: '14px', fontWeight: '500' }}>{r.clientName}</td>
                      <td style={{ padding: '14px 16px', color: C.muted, fontSize: '13px' }}>{r.eventName}</td>
                      <td style={{ padding: '14px 16px', color: C.muted, fontSize: '13px', fontFamily: 'DM Mono, monospace' }}>{formatDateShort(r.date)}</td>
                      <td style={{ padding: '14px 16px', color: C.text, fontSize: '13px', fontFamily: 'DM Mono, monospace' }}>{r.tickets}</td>
                      <td style={{ padding: '14px 16px', color: C.gold, fontSize: '13px', fontFamily: 'DM Mono, monospace', fontWeight: '600' }}>{formatCOP(r.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
