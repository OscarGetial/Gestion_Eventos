import { useState } from 'react'
import { CurrentUser, AppEvent, Page } from '../types'
import { C, S, formatCOP, formatDateShort } from '../theme'
import Navbar from '../components/Navbar'

interface BookEventPageProps {
  user: CurrentUser
  navigate: (page: Page, event?: AppEvent) => void
  onLogout: () => void
  event: AppEvent
}

export default function BookEventPage({ user, navigate, onLogout, event }: BookEventPageProps) {
  const [tickets, setTickets] = useState(1)
  const [observations, setObservations] = useState('')
  const [confirmed, setConfirmed] = useState(false)
  const [loading, setLoading] = useState(false)

  const total = event.price * tickets

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setConfirmed(true)
    }, 1000)
  }

  if (confirmed) {
    return (
      <div style={{ minHeight: '100vh', background: C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '20px', padding: '24px' }}>
        <div
          style={{
            background: 'rgba(16,185,129,0.1)',
            border: '2px solid rgba(16,185,129,0.3)',
            borderRadius: '50%',
            width: '80px',
            height: '80px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h2 className="font-display" style={{ color: C.text, fontSize: '28px', fontWeight: '600', textAlign: 'center' }}>
          ¡Reserva confirmada!
        </h2>
        <p style={{ color: C.muted, textAlign: 'center', maxWidth: '360px' }}>
          Tu reserva de <strong style={{ color: C.text }}>{tickets} entrada{tickets > 1 ? 's' : ''}</strong> para{' '}
          <strong style={{ color: C.violetLight }}>{event.name}</strong> ha sido registrada exitosamente.
        </p>
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: '12px', padding: '16px 24px', textAlign: 'center' }}>
          <p style={{ color: C.muted, fontSize: '12px', marginBottom: '4px' }}>Total pagado</p>
          <p className="font-mono-data" style={{ color: C.gold, fontSize: '24px', fontWeight: '700' }}>{formatCOP(total)}</p>
        </div>
        <div className="flex gap-3">
          <button style={S.btnOutline} onClick={() => navigate('my-reservations')}>Ver mis reservas</button>
          <button style={S.btnPrimary} onClick={() => navigate('client-home')}>Explorar más eventos</button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: C.bg }}>
      <Navbar user={user} onNavigate={navigate} onLogout={onLogout} />

      <div style={{ paddingTop: '64px', maxWidth: '900px', margin: '0 auto', padding: '84px 24px 60px' }}>
        <button
          onClick={() => navigate('event-detail', event)}
          style={{ background: 'none', border: 'none', color: C.muted, cursor: 'pointer', fontSize: '14px', fontFamily: 'Outfit, sans-serif', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '28px' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
          </svg>
          Volver al evento
        </button>

        <h1 className="font-display" style={{ color: C.text, fontSize: '30px', fontWeight: '600', marginBottom: '6px' }}>
          Realizar reserva
        </h1>
        <p style={{ color: C.muted, marginBottom: '36px' }}>Selecciona el número de entradas y confirma tu reserva</p>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Form */}
          <div style={{ flex: 1 }}>
            <form onSubmit={handleConfirm} className="flex flex-col gap-6">
              {/* Selected event summary */}
              <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: '14px', overflow: 'hidden' }}>
                <div style={{ display: 'flex', gap: '0' }}>
                  <img
                    src={event.image}
                    alt={event.name}
                    style={{ width: '120px', height: '90px', objectFit: 'cover', flexShrink: 0 }}
                  />
                  <div style={{ padding: '14px 18px' }}>
                    <p className="font-display" style={{ color: C.text, fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>{event.name}</p>
                    <p style={{ color: C.muted, fontSize: '13px' }}>{event.theater}</p>
                    <p style={{ color: C.muted, fontSize: '13px' }}>{formatDateShort(event.startDate)}</p>
                  </div>
                </div>
              </div>

              {/* Ticket count */}
              <div>
                <label style={S.label}>Número de entradas</label>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setTickets(Math.max(1, tickets - 1))}
                    style={{
                      width: '42px', height: '42px', borderRadius: '8px',
                      background: C.surface2, border: `1px solid ${C.border}`,
                      color: C.text, fontSize: '20px', cursor: 'pointer', fontFamily: 'Outfit, sans-serif',
                    }}
                  >
                    −
                  </button>
                  <span className="font-display" style={{ color: C.text, fontSize: '28px', fontWeight: '700', minWidth: '48px', textAlign: 'center' }}>
                    {tickets}
                  </span>
                  <button
                    type="button"
                    onClick={() => setTickets(Math.min(10, tickets + 1))}
                    style={{
                      width: '42px', height: '42px', borderRadius: '8px',
                      background: C.surface2, border: `1px solid ${C.border}`,
                      color: C.text, fontSize: '20px', cursor: 'pointer', fontFamily: 'Outfit, sans-serif',
                    }}
                  >
                    +
                  </button>
                  <span style={{ color: C.muted, fontSize: '13px' }}>máximo 10 por reserva</span>
                </div>
              </div>

              {/* Observations */}
              <div>
                <label style={S.label}>Observaciones (opcional)</label>
                <textarea
                  value={observations}
                  onChange={e => setObservations(e.target.value)}
                  placeholder="Ej: Necesito silla de ruedas, palco preferido..."
                  rows={4}
                  style={{
                    ...S.input,
                    resize: 'vertical',
                    fontFamily: 'Outfit, sans-serif',
                  } as React.CSSProperties}
                  onFocus={e => (e.target.style.borderColor = 'rgba(124,58,237,0.6)')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(124,58,237,0.25)')}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{ ...S.btnGold, width: '100%', padding: '15px', fontSize: '16px', opacity: loading ? 0.7 : 1 }}
              >
                {loading ? 'Procesando...' : 'Confirmar reserva'}
              </button>
            </form>
          </div>

          {/* Summary */}
          <div style={{ width: '100%', maxWidth: '280px', flexShrink: 0 }}>
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: '14px', padding: '24px', position: 'sticky', top: '84px' }}>
              <h3 className="font-display" style={{ color: C.text, fontSize: '16px', fontWeight: '600', marginBottom: '20px' }}>
                Resumen
              </h3>
              <div className="flex flex-col gap-3">
                <div className="flex justify-between">
                  <span style={{ color: C.muted, fontSize: '14px' }}>Precio unitario</span>
                  <span className="font-mono-data" style={{ color: C.text, fontSize: '14px' }}>{formatCOP(event.price)}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: C.muted, fontSize: '14px' }}>Entradas</span>
                  <span style={{ color: C.text, fontSize: '14px' }}>× {tickets}</span>
                </div>
                <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: '12px', marginTop: '4px' }}>
                  <div className="flex justify-between items-end">
                    <span style={{ color: C.text, fontSize: '14px', fontWeight: '600' }}>Total</span>
                    <span className="font-mono-data" style={{ color: C.gold, fontSize: '22px', fontWeight: '700' }}>
                      {formatCOP(total)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
