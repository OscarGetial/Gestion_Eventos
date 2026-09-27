import { useState } from 'react'
import { Page, UserType } from '../types'
import { C, S } from '../theme'
import Logo from '../components/Logo'

interface LoginPageProps {
  onLogin: (type: UserType) => void
  onNavigate: (page: Page) => void
}

const DEMO_USERS: Record<string, { type: UserType; password: string; name: string }> = {
  'maria@spektra.co':  { type: 'client', password: '123456', name: 'María García' },
  'agente@spektra.co': { type: 'agent',  password: '123456', name: 'Carlos Agente' },
  'admin@spektra.co':  { type: 'admin',  password: '123456', name: 'Admin Sistema' },
}

export default function LoginPage({ onLogin, onNavigate }: LoginPageProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    setTimeout(() => {
      const user = DEMO_USERS[email.toLowerCase()]
      if (user && user.password === password) {
        onLogin(user.type)
      } else {
        setError('Correo o contraseña incorrectos. Usa una cuenta de demostración.')
        setLoading(false)
      }
    }, 700)
  }

  return (
    <div style={{ minHeight: '100vh', background: C.bg, display: 'flex' }}>
      {/* Left decorative panel */}
      <div
        className="hidden lg:flex flex-col justify-between"
        style={{
          width: '45%',
          background: 'linear-gradient(145deg, #0D0B24 0%, #1A1040 50%, #0E1535 100%)',
          padding: '48px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(124,58,237,0.25) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-80px',
            left: '-80px',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />

        <Logo size="md" />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2
            className="font-display"
            style={{ color: C.text, fontSize: '38px', fontWeight: '600', lineHeight: 1.2, marginBottom: '20px' }}
          >
            Vive el arte,<br />
            <span style={{ color: C.violetLight }}>reserva</span> el momento.
          </h2>
          <p style={{ color: C.muted, fontSize: '16px', lineHeight: 1.7 }}>
            La plataforma líder en gestión y reserva de eventos culturales, musicales y espectáculos en vivo.
          </p>
        </div>

        <div className="flex flex-col gap-4" style={{ position: 'relative', zIndex: 1 }}>
          {[
            { icon: '🎭', label: 'Ópera, teatro y danza' },
            { icon: '🎵', label: 'Conciertos y festivales' },
            { icon: '🎤', label: 'Stand up y entretenimiento' },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-3">
              <span style={{ fontSize: '20px' }}>{item.icon}</span>
              <span style={{ color: C.muted, fontSize: '14px' }}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center" style={{ padding: '32px 24px' }}>
        <div style={{ width: '100%', maxWidth: '420px' }}>
          <div className="lg:hidden mb-10 flex justify-center">
            <Logo size="md" />
          </div>

          <h1
            className="font-display"
            style={{ color: C.text, fontSize: '30px', fontWeight: '600', marginBottom: '8px' }}
          >
            Iniciar sesión
          </h1>
          <p style={{ color: C.muted, fontSize: '15px', marginBottom: '36px' }}>
            Bienvenido de vuelta a SPEKTRA
          </p>

          {/* Demo hint */}
          <div
            style={{
              background: 'rgba(124,58,237,0.08)',
              border: `1px solid ${C.border}`,
              borderRadius: '10px',
              padding: '14px 16px',
              marginBottom: '28px',
            }}
          >
            <p style={{ color: C.violetLight, fontSize: '12px', fontWeight: '600', marginBottom: '6px' }}>Cuentas de demostración (contraseña: 123456)</p>
            {Object.entries(DEMO_USERS).map(([email, u]) => (
              <p key={email} style={{ color: C.muted, fontSize: '12px', lineHeight: 1.8, fontFamily: 'DM Mono, monospace' }}>
                <span
                  style={{ color: C.violetLight, cursor: 'pointer', textDecoration: 'underline' }}
                  onClick={() => { setEmail(email); setPassword('123456') }}
                >
                  {email}
                </span>
                {' '}— {u.type}
              </p>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label style={S.label}>Correo electrónico</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="tucorreo@ejemplo.com"
                required
                style={S.input}
                onFocus={e => (e.target.style.borderColor = 'rgba(124,58,237,0.6)')}
                onBlur={e => (e.target.style.borderColor = 'rgba(124,58,237,0.25)')}
              />
            </div>

            <div>
              <label style={S.label}>Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={S.input}
                onFocus={e => (e.target.style.borderColor = 'rgba(124,58,237,0.6)')}
                onBlur={e => (e.target.style.borderColor = 'rgba(124,58,237,0.25)')}
              />
            </div>

            {error && (
              <p style={{ color: '#F87171', fontSize: '13px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '8px', padding: '10px 14px' }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{ ...S.btnPrimary, width: '100%', opacity: loading ? 0.7 : 1, marginTop: '4px' }}
            >
              {loading ? 'Verificando...' : 'Iniciar sesión'}
            </button>
          </form>

          <p style={{ color: C.muted, fontSize: '14px', textAlign: 'center', marginTop: '28px' }}>
            ¿No tienes cuenta?{' '}
            <button
              onClick={() => onNavigate('register')}
              style={{ background: 'none', border: 'none', color: C.violetLight, cursor: 'pointer', fontWeight: '600', fontSize: '14px', fontFamily: 'Outfit, sans-serif' }}
            >
              Regístrate aquí
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
