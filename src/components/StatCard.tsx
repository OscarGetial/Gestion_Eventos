import { C } from '../theme'

interface StatCardProps {
  label: string
  value: string | number
  icon: React.ReactNode
  trend?: string
  accent?: string
}

export default function StatCard({ label, value, icon, trend, accent = C.violet }: StatCardProps) {
  return (
    <div
      style={{
        background: C.surface,
        border: `1px solid ${C.border}`,
        borderRadius: '14px',
        padding: '20px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: `linear-gradient(90deg, ${accent}, transparent)`,
        }}
      />
      <div className="flex items-start justify-between gap-4">
        <div>
          <p style={{ color: C.muted, fontSize: '13px', fontWeight: '500', marginBottom: '8px' }}>{label}</p>
          <p
            className="font-display"
            style={{ color: C.text, fontSize: '28px', fontWeight: '700', lineHeight: 1 }}
          >
            {value}
          </p>
          {trend && (
            <p style={{ color: C.success, fontSize: '12px', marginTop: '6px', fontWeight: '500' }}>
              {trend}
            </p>
          )}
        </div>
        <div
          style={{
            background: `${accent}20`,
            border: `1px solid ${accent}30`,
            borderRadius: '12px',
            padding: '10px',
            flexShrink: 0,
            color: accent,
          }}
        >
          {icon}
        </div>
      </div>
    </div>
  )
}
