export interface Credentials {
  email: string
  password: string
  nickname?: string
}

export interface Session {
  user?: Credentials
  csrfToken?: string
  jwtExpires?: number
}

export interface SesionState {
  loading: boolean
  data: Session | null
  error: string
}
