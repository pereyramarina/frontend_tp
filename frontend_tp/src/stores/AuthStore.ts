import { defineStore } from 'pinia'
import router from '@/router'

//localImport
import { apiInstance } from '@/services/apiInstance'
import type { Credentials, SesionState } from '@/models/CredentialsModel'
import { Login, CreateUser, Logout } from '@/services/auth/AuthController'

export const useAuthStore = defineStore({
  id: 'auth',
  state: (): SesionState => ({
    loading: false,
    data: {
      user: undefined,
      csrfToken: undefined,
      jwtExpires: undefined,
    },
    error: '',
  }),
  actions: {
    changeCsrfToken() {
      const headers = apiInstance.defaults.headers // obtenemos los headers de nuestra instancia apiInstance
      this.data!.csrfToken = headers['csrf-token']?.toString() // pareaseamos a string el token y actualizamos el estado
      console.info('[SesionStore] CRSF Token Actualizado') // noficamos por consola
    },
    async login(credentials: Credentials) {
      this.loading = true // para el spinner
      try {
        const response = await Login(credentials)

        if (response.status === 200) {
          this.data!.user = credentials
          const currentEpochTime = Math.floor(Date.now() / 1000)
          this.data!.jwtExpires = currentEpochTime + 3 * 60
          this.loading = false
          this.error = ''
          router.push('/tasks')
        } else {
          // Si la respuesta no es 200, establecemos un error
          this.error = `Login failed with status: ${response.status}`
          this.loading = false
        }
      } catch (e) {
        this.error = e!.toString()
      }
    },
    async logout() {
      const response = await Logout()
      this.data!.user = undefined
      router.push('/')
    },
    async registerUser(credentials: Credentials) {
      this.loading = true
      try {
        const response = await CreateUser(credentials)

        if (response.status === 201) {
          this.data!.user = credentials
          this.login(credentials)
          this.loading = false
        } else {
          // Si la respuesta no es 201, establecemos un error
          this.error = `Registration failed with status: ${response.statusText}`
          this.loading = false
        }
      } catch (e) {
        this.error = e!.toString()
      }
    },
  },
})
