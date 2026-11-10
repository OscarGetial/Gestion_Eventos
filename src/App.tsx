import { useState } from 'react'
import type { ReactNode } from 'react'
import { Page, CurrentUser, AppEvent, UserType } from './types'

import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ClientHomePage from './pages/ClientHomePage'
import EventDetailPage from './pages/EventDetailPage'
import BookEventPage from './pages/BookEventPage'
import MyReservationsPage from './pages/MyReservationsPage'
import AgentDashboardPage from './pages/AgentDashboardPage'
import RegisterEventPage from './pages/RegisterEventPage'
import ManageEventsPage from './pages/ManageEventsPage'
import ManageReservationsPage from './pages/ManageReservationsPage'
import AdminDashboardPage from './pages/AdminDashboardPage'

const DEMO_USERS: Record<UserType, CurrentUser> = {
  client: { id: '1', name: 'María García', email: 'maria.garcia@email.com', type: 'client', city: 'Bogotá' },
  agent:  { id: '2', name: 'Carlos Rendón', email: 'carlos.rendon@email.com', type: 'agent', city: 'Medellín' },
  admin:  { id: '3', name: 'Administrador', email: 'admin@spektra.co', type: 'admin' },
}

export default function App() {
const [page, setPage] = useState<Page>(() => {
  return (
    sessionStorage.getItem('spektra_page') as Page
  ) || 'login'
})

const [user, setUser] = useState<CurrentUser | null>(() => {
  const saved = sessionStorage.getItem('spektra_user')

  if (!saved) return null

  try {
    return JSON.parse(saved) as CurrentUser
  } catch {
    return null
  }
})

const [selectedEvent, setSelectedEvent] = useState<AppEvent | null>(() => {
  const saved = sessionStorage.getItem('spektra_selected_event')

  if (!saved) return null

  try {
    return JSON.parse(saved) as AppEvent
  } catch {
    return null
  }
})

const navigate = (target: Page, event?: AppEvent) => {
  if (event) {
    setSelectedEvent(event)
    sessionStorage.setItem(
      'spektra_selected_event',
      JSON.stringify(event)
    )
  }

  setPage(target)
  sessionStorage.setItem('spektra_page', target)

  window.scrollTo({ top: 0, behavior: 'instant' })
}

  const handleLogin = (type: UserType) => {
    setUser(DEMO_USERS[type])
    sessionStorage.setItem(
  'spektra_user',
  JSON.stringify(DEMO_USERS[type])
)
    const landingPage: Record<UserType, Page> = {
      client: 'client-home',
      agent: 'agent-dashboard',
      admin: 'admin-dashboard',
    }
    navigate(landingPage[type])
  }

const handleLogout = () => {
  sessionStorage.removeItem('spektra_user')
  sessionStorage.removeItem('spektra_page')
  sessionStorage.removeItem('spektra_selected_event')

  setUser(null)
  setSelectedEvent(null)
  navigate('login')
}

  // Auth gates
  const ManualButton = () => (
    <a
      href="/manual-usuario-spektra.pdf"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Abrir manual de usuario de SPEKTRA"
      style={{
        position: 'fixed',
        right: '24px',
        bottom: '24px',
        zIndex: 9999,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '9px',
        padding: '13px 18px',
        borderRadius: '999px',
        background: 'linear-gradient(135deg, #7C3AED, #5B21B6)',
        color: '#FFFFFF',
        fontSize: '14px',
        fontWeight: 700,
        textDecoration: 'none',
        boxShadow: '0 8px 24px rgba(91, 33, 182, 0.35)',
        border: '1px solid rgba(255,255,255,0.2)',
      }}
    >
      <span aria-hidden="true">📘</span>
      Manual de usuario
    </a>
  )

  if (!user) {
    return (
      <>
        {page === 'register'
          ? <RegisterPage onNavigate={navigate} />
          : <LoginPage onLogin={handleLogin} onNavigate={navigate} />}
        <ManualButton />
      </>
    )
  }

  const commonProps = {
    user,
    navigate,
    onLogout: handleLogout,
  }

  let currentView: ReactNode
  switch (page) {
    case 'client-home':
      currentView = <ClientHomePage {...commonProps} />
      break
    case 'event-detail':
      currentView = selectedEvent
        ? <EventDetailPage {...commonProps} event={selectedEvent} />
        : <ClientHomePage {...commonProps} />
      break
    case 'book-event':
      currentView = selectedEvent
        ? <BookEventPage {...commonProps} event={selectedEvent} />
        : <ClientHomePage {...commonProps} />
      break
    case 'my-reservations':
      currentView = <MyReservationsPage {...commonProps} />
      break
    case 'agent-dashboard':
      currentView = <AgentDashboardPage {...commonProps} />
      break
    case 'register-event':
      currentView = <RegisterEventPage {...commonProps} />
      break
    case 'manage-events':
      currentView = <ManageEventsPage {...commonProps} />
      break
    case 'manage-reservations':
      currentView = <ManageReservationsPage {...commonProps} />
      break
    case 'admin-dashboard':
      currentView = <AdminDashboardPage {...commonProps} />
      break
    default:
      currentView = <LoginPage onLogin={handleLogin} onNavigate={navigate} />
  }

  return (
    <>
      {currentView}
      <ManualButton />
    </>
  )
}
