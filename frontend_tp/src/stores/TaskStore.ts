import { defineStore } from 'pinia'
import type { Task, TaskState } from '@/models/TaskModel'

import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
} from '@/services/task/TaskController'

export const useTaskStore = defineStore({
  id: 'task',
  state: (): TaskState => ({
    loading: false,
    data: [],
  }),
  actions: {
    async create(task: Task) {
      this.loading = true // mostrar el loading
      console.info('[Task Store 💾] Intentando crear una nueva tarea')
      try {
        const response = await createTask(task)
        if (response.status === 201) {
          //Task Created
          //let newId: number = response.data.id!
          //let newTask: Task = { ...task, id: newId } //Agregar el id a la tarea
          //this.data.push(newTask) // agregamos la tarea al estado
          //console.info('[API 🌐] Nueva tarea agregada')
          await this.getAll() // refrescamos todas las tareas
        }
      } catch (e) {
        console.error('[API 🌐] Error creando la tarea', e) // informamos el error
        this.loading = false // paramos el loading
      }
    },
    async getAll() {
      this.loading = true
      console.info('[Task Store 💾] Intentando obtener todas las tareas')
      try {
        const response = await getTasks()
        if (response.status === 200 && response.data) {
          this.data = [] // resetear el arreglo de tareas
          response.data.forEach((t) => {
            const task: Task = {
              id: t.id!,
              title: t.title!,
              description: t.description!,
            }
            this.data.push(task) // Add the Task to the data Array
          })
        } else {
          console.error('Error fetching tasks:', response)
        }
      } catch (error) {
        console.error('Error fetching tasks:', error)
      } finally {
        this.loading = false
      }
    },
    async edit(task: Task) {
      this.loading = true // spinner
      const index = this.data.findIndex((item) => item.id === task.id) // encontramos el indice en el arreglo data
      this.data[index] = task
      console.info('[Tasks Store 💾] Intentando actualizar la tarea')
      try {
        const response = await updateTask(task.id!, task)
        console.info('[API 🌐] Tarea con id: ', response.data.id, ' actualizada')
        this.loading = false // paramos el loading
      } catch (e) {
        console.error('[API 🌐] Error actualizando la tarea', e) // informamos el error
        this.loading = false // paramos el loading
      }
    },

    async delete(task: Task) {
      this.loading = true
      try {
        // call the api to delete
        const response = await deleteTask(task.id!)
        // if task is deleted
        if (response.status === 200 || response.status === 204) {
          this.data = this.data.filter((t) => t.id !== task.id)
          await this.getAll() //Refresh the data
        }
      } catch (e) {
        console.error('[API 🌐] Error eliminando la tarea', e) // informamos el error
        this.loading = false // paramos el loading
      }
    },
  },
})
