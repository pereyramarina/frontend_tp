import { apiInstance } from '@/services/apiInstance'

// importamos nuestra respuesta generica del servidor
//(usaremos el tipo T para nuestros modelos de respuesta)
import type { APIResponse } from '@/models/ApiResponseModel'
// importamos nuestros modelos de solicitud (credenciales)
import type { Credentials } from '@/models/CredentialsModel'
// importamos nuestros modelos de respuesta
import type { AuthApiResponseModel } from '@/models/ApiResponseModel'

// register funcion
export async function CreateUser(credentials: Credentials) {
  return await apiInstance.post<AuthApiResponseModel>('auth/signup', credentials)
}

export async function Login(credentials: Credentials) {
  const response = await apiInstance.post<AuthApiResponseModel>('/auth/login', credentials, {
    withCredentials: true, // necesario para la obtenecion de cookies
  })

  // seteamos la cookie en los headers para futuras consultas
  const setCookieHeader = response.headers['set-cookie']
  return response
}

// logout function
export async function Logout() {
  return await apiInstance.post<APIResponse<null>>('/auth/logout')
}
