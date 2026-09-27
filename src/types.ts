export type UserType = 'client' | 'agent' | 'admin'
export type EventStatus = 'active' | 'cancelled' | 'sold-out'
export type ReservationStatus = 'reserved' | 'confirmed' | 'cancelled'

export type Page =
  | 'login'
  | 'register'
  | 'client-home'
  | 'event-detail'
  | 'book-event'
  | 'my-reservations'
  | 'agent-dashboard'
  | 'register-event'
  | 'manage-events'
  | 'manage-reservations'
  | 'admin-dashboard'

export interface AppEvent {
  id: string
  code: string
  name: string
  description: string
  theater: string
  city: string
  startDate: string
  endDate: string
  capacity: number
  available: number
  price: number
  image: string
  status: EventStatus
  observations?: string
}

export interface Reservation {
  id: string
  clientName: string
  clientEmail: string
  eventId: string
  eventName: string
  date: string
  tickets: number
  total: number
  status: ReservationStatus
  observations?: string
}

export interface CurrentUser {
  id: string
  name: string
  email: string
  type: UserType
  city?: string
}

export interface NavigateOptions {
  event?: AppEvent
}
