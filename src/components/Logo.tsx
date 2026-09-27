interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
}

export default function Logo({ size = 'md', onClick }: LogoProps) {
  const sizes = {
    sm: { mark: 28, text: 'text-lg' },
    md: { mark: 36, text: 'text-xl' },
    lg: { mark: 52, text: 'text-3xl' },
  }
  const { mark, text } = sizes[size]

  return (
    <div
      className="flex items-center gap-3 select-none"
      style={{ cursor: onClick ? 'pointer' : 'default' }}
      onClick={onClick}
    >
      <div
        style={{
          width: mark,
          height: mark,
          background: 'linear-gradient(135deg, #7C3AED 0%, #F59E0B 100%)',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 20px rgba(124, 58, 237, 0.4)',
          flexShrink: 0,
        }}
      >
        <svg width={mark * 0.55} height={mark * 0.55} viewBox="0 0 24 24" fill="none">
          <path d="M12 2L3 7l9 5 9-5-9-5z" fill="white" opacity="0.9" />
          <path d="M3 17l9 5 9-5" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
          <path d="M3 12l9 5 9-5" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      <span
        className={`font-display font-bold tracking-wider ${text}`}
        style={{ color: '#F5F3FF', letterSpacing: '0.08em' }}
      >
        SPEKTRA
      </span>
    </div>
  )
}
