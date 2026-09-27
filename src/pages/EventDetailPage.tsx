import { CurrentUser, AppEvent, Page } from '../types'
import { C, S, formatCOP, formatDate, formatTime } from '../theme'
import Navbar from '../components/Navbar'
import Badge from '../components/Badge'

interface EventDetailPageProps {
  user: CurrentUser
  navigate: (page: Page, event?: AppEvent) => void
  onLogout: () => void
  event: AppEvent
}

export default function EventDetailPage({ user, navigate, onLogout, event }: EventDetailPageProps) {
  const availPct = Math.round((event.available / event.capacity) * 100)

  return (
    <div style={{ minHeight: '100vh', background: C.bg }}>
      <Navbar user={user} onNavigate={navigate} onLogout={onLogout} />

      <div style={{ paddingTop: '64px' }}>
        {/* Hero */}
        <div style={{ position: 'relative', height: 'clamp(280px, 45vh, 480px)', overflow: 'hidden', background: C.surface }}>
          <img
            src={event.image}
            alt={event.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,9,24,0.3) 0%, rgba(10,9,24,0.85) 100%)' }} />
          <div style={{ position: 'absolute', bottom: '32px', left: '24px', right: '24px' }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
              <div className="flex items-center gap-3 mb-3">
                <Badge status={event.status} size="md" />
                <span style={{ color: 'rgba(245,243,255,0.7)', fontSize: '13px', fontFamily: 'DM Mono, monospace' }}>{event.code}</span>
              </div>
              <h1
                className="font-display"
                style={{ color: '#fff', fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: '700', lineHeight: 1.1, textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}
              >
                {event.name}
              </h1>
            </div>
          </div>
        </div>

        {/* Back link */}
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '20px 24px 0' }}>
          <button
            onClick={() => navigate('client-home')}
            style={{ background: 'none', border: 'none', color: C.muted, cursor: 'pointer', fontSize: '14px', fontFamily: 'Outfit, sans-serif', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
            </svg>
            Volver a eventos
          </button>
        </div>

        {/* Content */}
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '28px 24px 60px' }}>
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Left: details */}
            <div style={{ flex: 1 }}>
              <h2
                className="font-display"
                style={{ color: C.text, fontSize: '22px', fontWeight: '600', marginBottom: '14px' }}
              >
                Acerca de este evento
              </h2>
              <p style={{ color: C.muted, fontSize: '15px', lineHeight: 1.8, marginBottom: '36px' }}>
                {event.description}
              </p>

              {/* Info grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                {[
                  {
                    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>,
                    label: 'Lugar',
                    value: event.theater,
                    sub: event.city,
                  },
                  {
                    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>,
                    label: 'Fecha de inicio',
                    value: formatDate(event.startDate),
                    sub: formatTime(event.startDate),
                  },
                  {
                    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
                    label: 'Finalización estimada',
                    value: formatDate(event.endDate),
                    sub: formatTime(event.endDate),
                  },
                  {
                    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
                    label: 'Capacidad total',
                    value: `${event.capacity.toLocaleString()} personas`,
                    sub: '',
                  },
                ].map(info => (
                  <div
                    key={info.label}
                    style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: '12px', padding: '16px' }}
                  >
                    <div style={{ color: C.violet, marginBottom: '8px' }}>{info.icon}</div>
                    <p style={{ color: C.muted, fontSize: '12px', marginBottom: '4px', fontWeight: '500' }}>{info.label}</p>
                    <p style={{ color: C.text, fontSize: '14px', fontWeight: '600' }}>{info.value}</p>
                    {info.sub && <p style={{ color: C.muted, fontSize: '12px' }}>{info.sub}</p>}
                  </div>
                ))}
              </div>

              {event.observations && (
                <div
                  style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: '10px', padding: '14px 16px', marginTop: '20px' }}
                >
                  <p style={{ color: C.gold, fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>NOTA</p>
                  <p style={{ color: '#D4A852', fontSize: '14px' }}>{event.observations}</p>
                </div>
              )}
            </div>

            {/* Right: booking card */}
            <div style={{ width: '100%', maxWidth: '340px', flexShrink: 0 }}>
              <div
                style={{
                  background: C.surface,
                  border: `1px solid ${C.border}`,
                  borderRadius: '18px',
                  padding: '28px',
                  position: 'sticky',
                  top: '84px',
                }}
              >
                <div style={{ marginBottom: '20px' }}>
                  <p style={{ color: C.muted, fontSize: '13px', marginBottom: '6px' }}>Precio por entrada</p>
                  <p className="font-display font-mono-data" style={{ color: C.gold, fontSize: '34px', fontWeight: '700' }}>
                    {formatCOP(event.price)}
                  </p>
                </div>

                {/* Availability bar */}
                <div style={{ marginBottom: '24px' }}>
                  <div className="flex justify-between mb-2">
                    <span style={{ color: C.muted, fontSize: '13px' }}>Disponibilidad</span>
                    <span style={{ color: availPct < 20 ? C.warning : C.success, fontSize: '13px', fontWeight: '600' }}>
                      {event.available.toLocaleString()} entradas
                    </span>
                  </div>
                  <div style={{ background: C.surface2, borderRadius: '4px', height: '6px', overflow: 'hidden' }}>
                    <div
                      style={{
                        height: '100%',
                        width: `${Math.min(availPct, 100)}%`,
                        background: availPct < 20 ? 'linear-gradient(90deg, #F59E0B, #D97706)' : 'linear-gradient(90deg, #7C3AED, #A78BFA)',
                        borderRadius: '4px',
                        transition: 'width 0.5s',
                      }}
                    />
                  </div>
                  <p style={{ color: C.dim, fontSize: '12px', marginTop: '6px' }}>
                    {availPct}% de {event.capacity.toLocaleString()} plazas disponibles
                  </p>
                </div>

                {event.status === 'sold-out' ? (
                  <div style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: '10px', padding: '14px', textAlign: 'center' }}>
                    <p style={{ color: C.gold, fontWeight: '600' }}>Evento agotado</p>
                  </div>
                ) : event.status === 'cancelled' ? (
                  <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '10px', padding: '14px', textAlign: 'center' }}>
                    <p style={{ color: '#F87171', fontWeight: '600' }}>Evento cancelado</p>
                  </div>
                ) : (
                  <button
                    style={{ ...S.btnGold, width: '100%', padding: '14px', fontSize: '16px' }}
                    onClick={() => navigate('book-event', event)}
                    onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
                    onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                  >
                    Reservar entradas
                  </button>
                )}

                <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={C.muted} strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  <span style={{ color: C.dim, fontSize: '12px' }}>Pago seguro garantizado</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
