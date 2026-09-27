import { AppEvent, Page } from '../types'
import { C, formatCOP, formatDateShort } from '../theme'
import Badge from './Badge'

interface EventCardProps {
  event: AppEvent
  onNavigate: (page: Page, event?: AppEvent) => void
}

export default function EventCard({ event, onNavigate }: EventCardProps) {
  const availPct = (event.available / event.capacity) * 100
  const isLow = availPct < 20 && availPct > 0

  return (
    <div
      style={{
        background: C.surface,
        border: `1px solid ${C.border}`,
        borderRadius: '16px',
        overflow: 'hidden',
        transition: 'border-color 0.2s, transform 0.2s, box-shadow 0.2s',
        cursor: 'pointer',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLDivElement
        el.style.borderColor = 'rgba(124,58,237,0.45)'
        el.style.transform = 'translateY(-3px)'
        el.style.boxShadow = '0 12px 40px rgba(124,58,237,0.15)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLDivElement
        el.style.borderColor = C.border
        el.style.transform = 'translateY(0)'
        el.style.boxShadow = 'none'
      }}
      onClick={() => onNavigate('event-detail', event)}
    >
      {/* Image */}
      <div style={{ position: 'relative', height: '200px', background: C.surface2, overflow: 'hidden' }}>
        <img
          src={event.image}
          alt={event.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,9,24,0.8) 0%, transparent 60%)' }} />
        <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
          <Badge status={event.status} />
        </div>
        {isLow && (
          <div
            style={{
              position: 'absolute',
              bottom: '12px',
              left: '12px',
              background: 'rgba(245,158,11,0.9)',
              color: '#0A0918',
              borderRadius: '6px',
              padding: '3px 9px',
              fontSize: '11px',
              fontWeight: '700',
            }}
          >
            ¡Últimas entradas!
          </div>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: '18px' }}>
        <h3
          className="font-display"
          style={{ color: C.text, fontSize: '18px', fontWeight: '600', marginBottom: '10px', lineHeight: 1.2 }}
        >
          {event.name}
        </h3>

        <div className="flex flex-col gap-2" style={{ marginBottom: '14px' }}>
          <div className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.muted} strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
            </svg>
            <span style={{ color: C.muted, fontSize: '13px' }}>{event.city} — {event.theater}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.muted} strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span style={{ color: C.muted, fontSize: '13px' }}>{formatDateShort(event.startDate)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span
            className="font-mono-data"
            style={{ color: C.gold, fontSize: '17px', fontWeight: '700' }}
          >
            {formatCOP(event.price)}
          </span>
          <button
            style={{
              background: 'linear-gradient(135deg, #7C3AED, #6D28D9)',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 16px',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
              fontFamily: 'Outfit, sans-serif',
              transition: 'opacity 0.2s',
            }}
            onClick={e => { e.stopPropagation(); onNavigate('event-detail', event) }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            Ver evento
          </button>
        </div>
      </div>
    </div>
  )
}
