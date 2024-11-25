// importamos nuestra instancia de axios
import { apiInstance } from '@/services/apiInstance'
// importamos nuestra respuesta generica del servidor
//(usaremos el tipo T para nuestros modelos de respuesta)
import type { APIResponse } from '@/models/ApiResponseModel'
// importamos nuestros modelos de solicitud (create task)
import type { Task } from '@/models/TaskModel'
// importamos nuestros modelos de respuesta
import type { TaskApiResponse } from '@/models/TaskModel'

// post create task
export async function createTask(task: Task) {
  return await apiInstance.post<TaskApiResponse>('/todo', task)
}

// get all tasks
export async function getTasks() {
  return await apiInstance.get<TaskApiResponse[]>('/todo')
}

// get single task
export async function getTask(id: number) {
  return await apiInstance.get<TaskApiResponse>(`/todo/${id}`)
}

// put update task
export async function updateTask(id: number, task: Task) {
  return await apiInstance.patch<TaskApiResponse>(`/todo/${id}`, task)
}

// delete task
export function deleteTask(id: number) {
  return apiInstance.delete(`/todo/${id}`)
}
