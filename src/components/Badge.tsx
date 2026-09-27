import { ReservationStatus, EventStatus } from '../types'

interface BadgeProps {
  status: ReservationStatus | EventStatus | string
  size?: 'sm' | 'md'
}

const configs: Record<string, { label: string; bg: string; color: string; border: string }> = {
  reserved:  { label: 'Reservada',   bg: 'rgba(59,130,246,0.12)',  color: '#60A5FA', border: 'rgba(59,130,246,0.3)' },
  confirmed: { label: 'Confirmada',  bg: 'rgba(16,185,129,0.12)',  color: '#34D399', border: 'rgba(16,185,129,0.3)' },
  cancelled: { label: 'Cancelada',   bg: 'rgba(239,68,68,0.12)',   color: '#F87171', border: 'rgba(239,68,68,0.3)'  },
  active:    { label: 'Activo',      bg: 'rgba(124,58,237,0.12)',  color: '#A78BFA', border: 'rgba(124,58,237,0.3)' },
  'sold-out':{ label: 'Agotado',     bg: 'rgba(245,158,11,0.12)', color: '#FCD34D', border: 'rgba(245,158,11,0.3)' },
}

export default function Badge({ status, size = 'sm' }: BadgeProps) {
  const cfg = configs[status] ?? { label: status, bg: 'rgba(139,135,176,0.12)', color: '#8B87B0', border: 'rgba(139,135,176,0.3)' }
  const pad = size === 'sm' ? '3px 10px' : '5px 14px'
  const fs = size === 'sm' ? '11px' : '13px'

  return (
    <span
      style={{
        background: cfg.bg,
        color: cfg.color,
        border: `1px solid ${cfg.border}`,
        borderRadius: '20px',
        padding: pad,
        fontSize: fs,
        fontWeight: '600',
        fontFamily: 'DM Mono, monospace',
        letterSpacing: '0.03em',
        whiteSpace: 'nowrap',
        display: 'inline-block',
      }}
    >
      {cfg.label}
    </span>
  )
}
