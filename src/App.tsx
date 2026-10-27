import { useState } from 'react'
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
  if (!user) {
    if (page === 'register') return <RegisterPage onNavigate={navigate} />
    return <LoginPage onLogin={handleLogin} onNavigate={navigate} />
  }

  const commonProps = {
    user,
    navigate,
    onLogout: handleLogout,
  }

  switch (page) {
    case 'client-home':
      return <ClientHomePage {...commonProps} />

    case 'event-detail':
      return selectedEvent
        ? <EventDetailPage {...commonProps} event={selectedEvent} />
        : <ClientHomePage {...commonProps} />

    case 'book-event':
      return selectedEvent
        ? <BookEventPage {...commonProps} event={selectedEvent} />
        : <ClientHomePage {...commonProps} />

    case 'my-reservations':
      return <MyReservationsPage {...commonProps} />

    case 'agent-dashboard':
      return <AgentDashboardPage {...commonProps} />

    case 'register-event':
      return <RegisterEventPage {...commonProps} />

    case 'manage-events':
      return <ManageEventsPage {...commonProps} />

    case 'manage-reservations':
      return <ManageReservationsPage {...commonProps} />

    case 'admin-dashboard':
      return <AdminDashboardPage {...commonProps} />

    default:
      return <LoginPage onLogin={handleLogin} onNavigate={navigate} />
  }
}
