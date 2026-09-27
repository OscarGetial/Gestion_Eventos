import { useState } from 'react'
import { CurrentUser, Page } from '../types'
import { C } from '../theme'
import Logo from './Logo'

interface NavbarProps {
  user: CurrentUser
  onNavigate: (page: Page) => void
  onLogout: () => void
  currentPage?: Page
}

const clientLinks = [
  { label: 'Explorar Eventos', page: 'client-home' as Page },
  { label: 'Mis Reservas', page: 'my-reservations' as Page },
]

const agentLinks = [
  { label: 'Dashboard', page: 'agent-dashboard' as Page },
  { label: 'Gestionar Eventos', page: 'manage-events' as Page },
  { label: 'Gestionar Reservas', page: 'manage-reservations' as Page },
]

const adminLinks = [
  { label: 'Dashboard', page: 'admin-dashboard' as Page },
]

export default function Navbar({ user, onNavigate, onLogout, currentPage }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  const links =
    user.type === 'client' ? clientLinks :
    user.type === 'agent' ? agentLinks : adminLinks

  const roleLabel = { client: 'Cliente', agent: 'Agente', admin: 'Administrador' }[user.type]
  const roleColor = { client: C.violetLight, agent: C.gold, admin: '#34D399' }[user.type]

  return (
    <nav
      style={{
        background: 'rgba(10,9,24,0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${C.border}`,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: '64px',
      }}
    >
      <div
        style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', height: '100%' }}
        className="flex items-center gap-8"
      >
        <Logo size="sm" onClick={() => onNavigate(links[0].page)} />

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6 flex-1">
          {links.map(link => (
            <button
              key={link.page}
              onClick={() => onNavigate(link.page)}
              style={{
                background: 'none',
                border: 'none',
                color: currentPage === link.page ? C.violetLight : C.muted,
                fontSize: '14px',
                fontWeight: currentPage === link.page ? '600' : '400',
                cursor: 'pointer',
                fontFamily: 'Outfit, sans-serif',
                padding: '4px 0',
                borderBottom: currentPage === link.page ? `2px solid ${C.violet}` : '2px solid transparent',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => { if (currentPage !== link.page) (e.currentTarget as HTMLButtonElement).style.color = C.text }}
              onMouseLeave={e => { if (currentPage !== link.page) (e.currentTarget as HTMLButtonElement).style.color = C.muted }}
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4 ml-auto">
          <div className="hidden md:flex flex-col items-end">
            <span style={{ color: C.text, fontSize: '14px', fontWeight: '500' }}>{user.name}</span>
            <span style={{ color: roleColor, fontSize: '11px', fontWeight: '600', letterSpacing: '0.05em', fontFamily: 'DM Mono, monospace' }}>
              {roleLabel}
            </span>
          </div>

          <button
            onClick={onLogout}
            style={{
              background: 'rgba(239,68,68,0.1)',
              border: '1px solid rgba(239,68,68,0.25)',
              color: '#F87171',
              borderRadius: '8px',
              padding: '7px 14px',
              fontSize: '13px',
              fontWeight: '500',
              cursor: 'pointer',
              fontFamily: 'Outfit, sans-serif',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(239,68,68,0.2)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(239,68,68,0.1)')}
          >
            Salir
          </button>

          {/* Mobile menu */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: 'none', border: 'none', color: C.text, cursor: 'pointer', padding: '4px' }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen
                ? <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
                : <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>
              }
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: '12px 24px 16px' }}>
          {links.map(link => (
            <button
              key={link.page}
              onClick={() => { onNavigate(link.page); setMenuOpen(false) }}
              style={{
                display: 'block', width: '100%', textAlign: 'left',
                background: 'none', border: 'none', color: C.text,
                padding: '10px 0', fontSize: '15px', cursor: 'pointer', fontFamily: 'Outfit, sans-serif',
              }}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}
