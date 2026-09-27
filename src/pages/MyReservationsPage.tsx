import { CurrentUser, Page, AppEvent } from '../types'
import { C, formatCOP, formatDateShort } from '../theme'
import Navbar from '../components/Navbar'
import Badge from '../components/Badge'
import { mockReservations } from '../data'

interface MyReservationsPageProps {
  user: CurrentUser
  navigate: (page: Page, event?: AppEvent) => void
  onLogout: () => void
}

const CLIENT_RESERVATIONS = mockReservations.filter(r => r.clientEmail === 'maria.garcia@email.com')

const statusOrder = { reserved: 0, confirmed: 1, cancelled: 2 }

export default function MyReservationsPage({ user, navigate, onLogout }: MyReservationsPageProps) {
  const sorted = [...CLIENT_RESERVATIONS].sort((a, b) => statusOrder[a.status] - statusOrder[b.status])

  const totals = {
    total: sorted.length,
    confirmed: sorted.filter(r => r.status === 'confirmed').length,
    reserved: sorted.filter(r => r.status === 'reserved').length,
    spent: sorted.filter(r => r.status !== 'cancelled').reduce((acc, r) => acc + r.total, 0),
  }

  return (
    <div style={{ minHeight: '100vh', background: C.bg }}>
      <Navbar user={user} onNavigate={navigate} onLogout={onLogout} currentPage="my-reservations" />

      <div style={{ paddingTop: '64px', maxWidth: '1100px', margin: '0 auto', padding: '84px 24px 60px' }}>
        {/* Header */}
        <div style={{ marginBottom: '36px' }}>
          <h1 className="font-display" style={{ color: C.text, fontSize: '30px', fontWeight: '600', marginBottom: '6px' }}>
            Mis Reservas
          </h1>
          <p style={{ color: C.muted }}>Historial de tus reservas en SPEKTRA</p>
        </div>

        {/* Summary cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px', marginBottom: '36px' }}>
          {[
            { label: 'Total reservas', value: totals.total, color: C.violet },
            { label: 'Confirmadas', value: totals.confirmed, color: C.success },
            { label: 'Pendientes', value: totals.reserved, color: C.info },
            { label: 'Total invertido', value: formatCOP(totals.spent), color: C.gold },
          ].map(s => (
            <div key={s.label} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: '12px', padding: '16px 20px' }}>
              <p style={{ color: C.muted, fontSize: '12px', marginBottom: '6px' }}>{s.label}</p>
              <p className="font-display" style={{ color: s.color, fontSize: '22px', fontWeight: '700' }}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Reservations */}
        <div className="flex flex-col gap-4">
          {sorted.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <p style={{ fontSize: '48px', marginBottom: '16px' }}>🎟️</p>
              <p className="font-display" style={{ color: C.text, fontSize: '20px', marginBottom: '8px' }}>Sin reservas aún</p>
              <p style={{ color: C.muted, marginBottom: '24px' }}>Explora los eventos disponibles y haz tu primera reserva</p>
              <button style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)', color: '#fff', border: 'none', borderRadius: '10px', padding: '12px 24px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', fontFamily: 'Outfit, sans-serif' }}
                onClick={() => navigate('client-home')}>
                Explorar eventos
              </button>
            </div>
          ) : (
            sorted.map(reservation => (
              <div
                key={reservation.id}
                style={{
                  background: C.surface,
                  border: `1px solid ${reservation.status === 'cancelled' ? 'rgba(239,68,68,0.15)' : C.border}`,
                  borderRadius: '14px',
                  padding: '20px 24px',
                  opacity: reservation.status === 'cancelled' ? 0.65 : 1,
                  transition: 'border-color 0.2s',
                }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div style={{ flex: 1 }}>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono-data" style={{ color: C.dim, fontSize: '12px' }}>{reservation.id}</span>
                      <Badge status={reservation.status} />
                    </div>
                    <h3 className="font-display" style={{ color: C.text, fontSize: '17px', fontWeight: '600', marginBottom: '4px' }}>
                      {reservation.eventName}
                    </h3>
                    <p style={{ color: C.muted, fontSize: '13px' }}>
                      Reservado el {formatDateShort(reservation.date)}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-6 items-center">
                    <div style={{ textAlign: 'center' }}>
                      <p style={{ color: C.muted, fontSize: '11px', marginBottom: '2px' }}>ENTRADAS</p>
                      <p className="font-display" style={{ color: C.text, fontSize: '20px', fontWeight: '700' }}>{reservation.tickets}</p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <p style={{ color: C.muted, fontSize: '11px', marginBottom: '2px' }}>TOTAL</p>
                      <p className="font-mono-data" style={{ color: C.gold, fontSize: '18px', fontWeight: '700' }}>
                        {formatCOP(reservation.total)}
                      </p>
                    </div>
                    {reservation.status === 'reserved' && (
                      <button
                        style={{
                          background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)',
                          color: '#F87171', borderRadius: '8px', padding: '8px 16px', fontSize: '13px',
                          fontWeight: '500', cursor: 'pointer', fontFamily: 'Outfit, sans-serif',
                        }}
                      >
                        Cancelar
                      </button>
                    )}
                  </div>
                </div>

                {reservation.observations && (
                  <p style={{ color: C.dim, fontSize: '13px', marginTop: '12px', paddingTop: '12px', borderTop: `1px solid ${C.border}` }}>
                    📋 {reservation.observations}
                  </p>
                )}
              </div>
            ))
          )}
        </div>

        <div style={{ marginTop: '32px', textAlign: 'center' }}>
          <button
            style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)', color: '#fff', border: 'none', borderRadius: '10px', padding: '12px 28px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', fontFamily: 'Outfit, sans-serif' }}
            onClick={() => navigate('client-home')}
          >
            Reservar más entradas
          </button>
        </div>
      </div>
    </div>
  )
}
