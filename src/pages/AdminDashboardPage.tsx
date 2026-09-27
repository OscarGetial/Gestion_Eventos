import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts'
import { CurrentUser, AppEvent, Page } from '../types'
import { C, formatCOP, formatDateShort } from '../theme'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import StatCard from '../components/StatCard'
import Badge from '../components/Badge'
import { mockEvents, mockReservations } from '../data'

interface AdminDashboardPageProps {
  user: CurrentUser
  navigate: (page: Page, event?: AppEvent) => void
  onLogout: () => void
}

const MONTHLY_REVENUE = [
  { month: 'Ene', ingresos: 12500000 },
  { month: 'Feb', ingresos: 18200000 },
  { month: 'Mar', ingresos: 15800000 },
  { month: 'Abr', ingresos: 22100000 },
  { month: 'May', ingresos: 19400000 },
  { month: 'Jun', ingresos: 28600000 },
  { month: 'Jul', ingresos: 31200000 },
  { month: 'Ago', ingresos: 25800000 },
  { month: 'Sep', ingresos: 35100000 },
]

const RESERVATIONS_BY_EVENT = [
  { name: 'Carlos Vives', reservas: 312 },
  { name: 'Romeo y Julieta', reservas: 204 },
  { name: 'Fantasma Ópera', reservas: 178 },
  { name: 'La Traviata', reservas: 127 },
  { name: 'Stand Up Comedy', reservas: 95 },
  { name: 'Festival Jazz', reservas: 89 },
]

const EVENTS_BY_CITY = [
  { name: 'Bogotá', value: 12, color: '#7C3AED' },
  { name: 'Medellín', value: 8, color: '#F59E0B' },
  { name: 'Cali', value: 5, color: '#10B981' },
  { name: 'Barranquilla', value: 4, color: '#3B82F6' },
  { name: 'Otras', value: 3, color: '#6B7280' },
]

const CANCELLED_EVENTS = mockEvents.filter(e => e.status === 'cancelled')
const CANCELLED_RESERVATIONS = mockReservations.filter(r => r.status === 'cancelled')

const formatMillions = (value: number) => {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`
  if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`
  return `$${value}`
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: '#1C1A3A', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '10px', padding: '12px 16px' }}>
        <p style={{ color: '#8B87B0', fontSize: '12px', marginBottom: '4px' }}>{label}</p>
        {payload.map((p: any) => (
          <p key={p.name} style={{ color: '#F5F3FF', fontSize: '14px', fontWeight: '600', fontFamily: 'DM Mono, monospace' }}>
            {typeof p.value === 'number' && p.value > 10000 ? formatMillions(p.value) : p.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function AdminDashboardPage({ user, navigate, onLogout }: AdminDashboardPageProps) {
  const totalRevenue = mockReservations.filter(r => r.status !== 'cancelled').reduce((a, r) => a + r.total, 0)

  return (
    <div style={{ minHeight: '100vh', background: C.bg }}>
      <Navbar user={user} onNavigate={navigate} onLogout={onLogout} currentPage="admin-dashboard" />
      <div style={{ paddingTop: '64px', display: 'flex' }}>
        <Sidebar user={user} currentPage="admin-dashboard" onNavigate={navigate} />

        <main style={{ flex: 1, padding: '36px', minWidth: 0, overflowX: 'hidden' }}>
          {/* Header */}
          <div style={{ marginBottom: '32px' }}>
            <p style={{ color: '#34D399', fontSize: '12px', fontWeight: '600', letterSpacing: '0.1em', fontFamily: 'DM Mono, monospace', marginBottom: '6px' }}>
              PANEL ADMINISTRATIVO
            </p>
            <h1 className="font-display" style={{ color: C.text, fontSize: '28px', fontWeight: '600' }}>
              Dashboard General
            </h1>
            <p style={{ color: C.muted, fontSize: '14px' }}>Visión completa del estado de la plataforma SPEKTRA</p>
          </div>

          {/* Stat cards — 5 across */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', marginBottom: '32px' }}>
            <StatCard label="Clientes registrados" value="1,284" trend="↑ 38 nuevos esta semana"
              accent={C.violet}
              icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /></svg>}
            />
            <StatCard label="Agentes registrados" value="47" trend="↑ 3 este mes"
              accent={C.gold}
              icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>}
            />
            <StatCard label="Administradores" value="5"
              accent="#34D399"
              icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>}
            />
            <StatCard label="Eventos activos" value={mockEvents.filter(e => e.status === 'active').length.toString()} trend="↑ 2 esta semana"
              accent="#3B82F6"
              icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>}
            />
            <StatCard label="Total reservas" value={mockReservations.length.toString()} trend={`${formatCOP(totalRevenue)} generados`}
              accent={C.success}
              icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2z" /></svg>}
            />
          </div>

          {/* Charts row 1 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }} className="flex-col lg:grid">
            {/* Monthly revenue area chart */}
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: '14px', padding: '24px' }}>
              <h3 className="font-display" style={{ color: C.text, fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>
                Ingresos mensuales
              </h3>
              <p style={{ color: C.muted, fontSize: '12px', marginBottom: '24px' }}>Evolución de ingresos — 2026</p>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={MONTHLY_REVENUE} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(124,58,237,0.08)" />
                  <XAxis dataKey="month" tick={{ fill: C.muted, fontSize: 11, fontFamily: 'DM Mono, monospace' }} axisLine={false} tickLine={false} />
                  <YAxis tickFormatter={formatMillions} tick={{ fill: C.muted, fontSize: 11, fontFamily: 'DM Mono, monospace' }} axisLine={false} tickLine={false} width={48} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="ingresos" stroke="#7C3AED" strokeWidth={2.5} fill="url(#revenueGradient)" dot={false} activeDot={{ r: 5, fill: '#A78BFA', stroke: '#7C3AED' }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Events by city pie chart */}
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: '14px', padding: '24px' }}>
              <h3 className="font-display" style={{ color: C.text, fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>
                Eventos por ciudad
              </h3>
              <p style={{ color: C.muted, fontSize: '12px', marginBottom: '24px' }}>Distribución geográfica de eventos</p>
              <div className="flex items-center gap-8">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie data={EVENTS_BY_CITY} cx="50%" cy="50%" innerRadius={55} outerRadius={85} dataKey="value" paddingAngle={3}>
                      {EVENTS_BY_CITY.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-col gap-2" style={{ flexShrink: 0 }}>
                  {EVENTS_BY_CITY.map(item => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: item.color, flexShrink: 0 }} />
                      <span style={{ color: C.muted, fontSize: '12px', whiteSpace: 'nowrap' }}>{item.name}</span>
                      <span style={{ color: C.text, fontSize: '12px', fontFamily: 'DM Mono, monospace', marginLeft: '4px' }}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Reservations by event bar chart — full width */}
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: '14px', padding: '24px', marginBottom: '24px' }}>
            <h3 className="font-display" style={{ color: C.text, fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>
              Reservas por evento
            </h3>
            <p style={{ color: C.muted, fontSize: '12px', marginBottom: '24px' }}>Número total de reservas por evento (activas + confirmadas)</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={RESERVATIONS_BY_EVENT} margin={{ top: 4, right: 16, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(124,58,237,0.08)" vertical={false} />
                <XAxis dataKey="name" tick={{ fill: C.muted, fontSize: 11, fontFamily: 'DM Mono, monospace' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: C.muted, fontSize: 11, fontFamily: 'DM Mono, monospace' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="reservas" radius={[6, 6, 0, 0]}>
                  {RESERVATIONS_BY_EVENT.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#F59E0B' : index === 1 ? '#7C3AED' : '#A78BFA'} fillOpacity={0.85} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Two tables side by side */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px' }}>
            {/* Cancelled events */}
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: '14px', overflow: 'hidden' }}>
              <div style={{ padding: '18px 24px', borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '8px', height: '8px', background: C.danger, borderRadius: '50%' }} />
                <h3 className="font-display" style={{ color: C.text, fontSize: '15px', fontWeight: '600' }}>
                  Eventos cancelados
                </h3>
                <span style={{ color: C.danger, fontSize: '11px', fontFamily: 'DM Mono, monospace', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '10px', padding: '2px 7px' }}>
                  {CANCELLED_EVENTS.length || 0}
                </span>
              </div>
              {CANCELLED_EVENTS.length === 0 ? (
                <div style={{ padding: '32px', textAlign: 'center', color: C.muted, fontSize: '14px' }}>
                  🎉 Sin eventos cancelados
                </div>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                      {['Evento', 'Ciudad', 'Fecha'].map(h => (
                        <th key={h} style={{ padding: '10px 16px', textAlign: 'left', color: C.muted, fontSize: '11px', fontWeight: '600', fontFamily: 'DM Mono, monospace' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {CANCELLED_EVENTS.map((e, i) => (
                      <tr key={e.id} style={{ borderBottom: i < CANCELLED_EVENTS.length - 1 ? `1px solid ${C.border}` : 'none' }}>
                        <td style={{ padding: '12px 16px', color: C.text, fontSize: '13px' }}>{e.name}</td>
                        <td style={{ padding: '12px 16px', color: C.muted, fontSize: '13px' }}>{e.city}</td>
                        <td style={{ padding: '12px 16px', color: C.muted, fontSize: '12px', fontFamily: 'DM Mono, monospace' }}>{formatDateShort(e.startDate)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {CANCELLED_EVENTS.length === 0 && (
                <div style={{ padding: '0 24px 20px' }}>
                  {/* Show a sample row for demo purposes */}
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                        {['Evento', 'Ciudad', 'Fecha'].map(h => (
                          <th key={h} style={{ padding: '10px 0 10px', textAlign: 'left', color: C.muted, fontSize: '11px', fontWeight: '600', fontFamily: 'DM Mono, monospace' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{ padding: '12px 0', color: C.text, fontSize: '13px' }}>Gala de Ópera — Muñoz</td>
                        <td style={{ padding: '12px 0', color: C.muted, fontSize: '13px' }}>Cali</td>
                        <td style={{ padding: '12px 0', color: C.muted, fontSize: '12px', fontFamily: 'DM Mono, monospace' }}>Sep 10, 2026</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Cancelled reservations */}
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: '14px', overflow: 'hidden' }}>
              <div style={{ padding: '18px 24px', borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '8px', height: '8px', background: '#F87171', borderRadius: '50%' }} />
                <h3 className="font-display" style={{ color: C.text, fontSize: '15px', fontWeight: '600' }}>
                  Reservas canceladas
                </h3>
                <span style={{ color: '#F87171', fontSize: '11px', fontFamily: 'DM Mono, monospace', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '10px', padding: '2px 7px' }}>
                  {CANCELLED_RESERVATIONS.length}
                </span>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                      {['Cliente', 'Evento', 'Entradas', 'Valor'].map(h => (
                        <th key={h} style={{ padding: '10px 16px', textAlign: 'left', color: C.muted, fontSize: '11px', fontWeight: '600', fontFamily: 'DM Mono, monospace' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {CANCELLED_RESERVATIONS.map((r, i) => (
                      <tr key={r.id} style={{ borderBottom: i < CANCELLED_RESERVATIONS.length - 1 ? `1px solid ${C.border}` : 'none' }}>
                        <td style={{ padding: '12px 16px', color: C.text, fontSize: '13px' }}>{r.clientName}</td>
                        <td style={{ padding: '12px 16px', color: C.muted, fontSize: '13px', maxWidth: '140px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.eventName}</td>
                        <td style={{ padding: '12px 16px', color: C.muted, fontSize: '13px', textAlign: 'center', fontFamily: 'DM Mono, monospace' }}>{r.tickets}</td>
                        <td style={{ padding: '12px 16px', color: '#F87171', fontSize: '13px', fontFamily: 'DM Mono, monospace', fontWeight: '600' }}>
                          {formatCOP(r.total)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div style={{ padding: '14px 16px', borderTop: `1px solid ${C.border}`, display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: C.muted, fontSize: '12px' }}>Total ingresos perdidos</span>
                <span style={{ color: '#F87171', fontSize: '13px', fontFamily: 'DM Mono, monospace', fontWeight: '600' }}>
                  {formatCOP(CANCELLED_RESERVATIONS.reduce((a, r) => a + r.total, 0))}
                </span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
