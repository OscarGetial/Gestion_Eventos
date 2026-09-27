import { Page, CurrentUser } from '../types'
import { C } from '../theme'

interface SidebarProps {
  user: CurrentUser
  currentPage: Page
  onNavigate: (page: Page) => void
}

const agentNav = [
  {
    label: 'Dashboard', page: 'agent-dashboard' as Page,
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>,
  },
  {
    label: 'Crear Evento', page: 'register-event' as Page,
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" /></svg>,
  },
  {
    label: 'Mis Eventos', page: 'manage-events' as Page,
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>,
  },
  {
    label: 'Reservas', page: 'manage-reservations' as Page,
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2z" /></svg>,
  },
]

const adminNav = [
  {
    label: 'Dashboard', page: 'admin-dashboard' as Page,
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3h7v7H3z" /><path d="M14 3h7v7h-7z" /><path d="M3 14h7v7H3z" /><path d="M14 14h7v7h-7z" /></svg>,
  },
  {
    label: 'Eventos', page: 'manage-events' as Page,
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>,
  },
  {
    label: 'Reservas', page: 'manage-reservations' as Page,
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2z" /></svg>,
  },
]

export default function Sidebar({ user, currentPage, onNavigate }: SidebarProps) {
  const navItems = user.type === 'admin' ? adminNav : agentNav
  const roleLabel = user.type === 'admin' ? 'Administrador' : 'Agente'
  const accentColor = user.type === 'admin' ? '#34D399' : C.gold

  return (
    <aside
      style={{
        width: '240px',
        minHeight: 'calc(100vh - 64px)',
        background: C.surface,
        borderRight: `1px solid ${C.border}`,
        padding: '24px 16px',
        position: 'sticky',
        top: '64px',
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* User badge */}
      <div
        style={{
          background: C.surface2,
          border: `1px solid ${C.border}`,
          borderRadius: '12px',
          padding: '14px',
          marginBottom: '28px',
        }}
      >
        <div
          style={{
            width: '36px',
            height: '36px',
            background: `linear-gradient(135deg, ${C.violet}, ${accentColor})`,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: '700',
            fontSize: '14px',
            marginBottom: '10px',
          }}
        >
          {user.name.charAt(0)}
        </div>
        <p style={{ color: C.text, fontSize: '14px', fontWeight: '600', marginBottom: '2px' }}>{user.name}</p>
        <p style={{ color: accentColor, fontSize: '11px', fontWeight: '600', fontFamily: 'DM Mono, monospace', letterSpacing: '0.05em' }}>
          {roleLabel}
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1">
        {navItems.map(item => {
          const isActive = currentPage === item.page
          return (
            <button
              key={item.page}
              onClick={() => onNavigate(item.page)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 14px',
                borderRadius: '10px',
                border: 'none',
                background: isActive ? `${C.violet}20` : 'transparent',
                color: isActive ? C.violetLight : C.muted,
                fontSize: '14px',
                fontWeight: isActive ? '600' : '400',
                cursor: 'pointer',
                textAlign: 'left',
                width: '100%',
                transition: 'background 0.2s, color 0.2s',
                fontFamily: 'Outfit, sans-serif',
                borderLeft: isActive ? `3px solid ${C.violet}` : '3px solid transparent',
              }}
              onMouseEnter={e => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.background = `${C.violet}10`
                  ;(e.currentTarget as HTMLButtonElement).style.color = C.text
                }
              }}
              onMouseLeave={e => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.background = 'transparent'
                  ;(e.currentTarget as HTMLButtonElement).style.color = C.muted
                }
              }}
            >
              {item.icon}
              {item.label}
            </button>
          )
        })}
      </nav>

      <div style={{ marginTop: 'auto', paddingTop: '24px', borderTop: `1px solid ${C.border}` }}>
        <p style={{ color: C.dim, fontSize: '11px', textAlign: 'center' }}>SPEKTRA v2.0</p>
      </div>
    </aside>
  )
}
