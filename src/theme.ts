export const C = {
  bg: '#0A0918',
  surface: '#11102A',
  surface2: '#1C1A3A',
  surface3: '#231F4A',
  violet: '#7C3AED',
  violetLight: '#A78BFA',
  violetDim: 'rgba(124, 58, 237, 0.12)',
  violetBorder: 'rgba(124, 58, 237, 0.2)',
  violetGlow: 'rgba(124, 58, 237, 0.4)',
  gold: '#F59E0B',
  goldLight: '#FCD34D',
  text: '#F5F3FF',
  muted: '#8B87B0',
  dim: '#4F4B7A',
  border: 'rgba(124, 58, 237, 0.18)',
  success: '#10B981',
  successDim: 'rgba(16, 185, 129, 0.15)',
  warning: '#F59E0B',
  warningDim: 'rgba(245, 158, 11, 0.15)',
  danger: '#EF4444',
  dangerDim: 'rgba(239, 68, 68, 0.15)',
  info: '#3B82F6',
  infoDim: 'rgba(59, 130, 246, 0.15)',
}

export const S = {
  card: {
    background: '#11102A',
    border: `1px solid rgba(124, 58, 237, 0.18)`,
    borderRadius: '12px',
  },
  input: {
    background: '#1C1A3A',
    border: '1px solid rgba(124, 58, 237, 0.25)',
    color: '#F5F3FF',
    borderRadius: '10px',
    padding: '12px 16px',
    fontSize: '14px',
    width: '100%',
    transition: 'border-color 0.2s',
  },
  label: {
    color: '#8B87B0',
    fontSize: '13px',
    fontWeight: '500',
    marginBottom: '6px',
    display: 'block',
  },
  btnPrimary: {
    background: 'linear-gradient(135deg, #7C3AED, #6D28D9)',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    padding: '12px 24px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'opacity 0.2s, transform 0.1s',
    fontFamily: 'Outfit, sans-serif',
  },
  btnGold: {
    background: 'linear-gradient(135deg, #F59E0B, #D97706)',
    color: '#0A0918',
    border: 'none',
    borderRadius: '10px',
    padding: '12px 24px',
    fontSize: '15px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'opacity 0.2s',
    fontFamily: 'Outfit, sans-serif',
  },
  btnOutline: {
    background: 'transparent',
    color: '#A78BFA',
    border: '1px solid rgba(124, 58, 237, 0.4)',
    borderRadius: '10px',
    padding: '10px 20px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background 0.2s',
    fontFamily: 'Outfit, sans-serif',
  },
  btnDanger: {
    background: 'rgba(239, 68, 68, 0.15)',
    color: '#EF4444',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    borderRadius: '8px',
    padding: '7px 14px',
    fontSize: '13px',
    fontWeight: '500',
    cursor: 'pointer',
    fontFamily: 'Outfit, sans-serif',
  },
  btnSuccess: {
    background: 'rgba(16, 185, 129, 0.15)',
    color: '#10B981',
    border: '1px solid rgba(16, 185, 129, 0.3)',
    borderRadius: '8px',
    padding: '7px 14px',
    fontSize: '13px',
    fontWeight: '500',
    cursor: 'pointer',
    fontFamily: 'Outfit, sans-serif',
  },
}

export const formatCOP = (amount: number): string =>
  amount === 0 ? 'Gratis' : `$${amount.toLocaleString('es-CO')} COP`

export const formatDate = (dateStr: string): string =>
  new Date(dateStr).toLocaleDateString('es-CO', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  })

export const formatDateShort = (dateStr: string): string =>
  new Date(dateStr).toLocaleDateString('es-CO', {
    year: 'numeric', month: 'short', day: 'numeric',
  })

export const formatTime = (dateStr: string): string =>
  new Date(dateStr).toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })
