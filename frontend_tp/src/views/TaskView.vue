<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import type { Task } from '@/models/TaskModel'
import { useTaskStore } from '@/stores/TaskStore'
import { useThemeStore } from '@/stores/ThemeStore'

// tema para el estilo del sitio, pinia ya retorna un elemento reactivo
const theme = useThemeStore()
const tasks = useTaskStore()

// Estado para el formulario
const form = reactive<Task>({
  id: null,
  title: '',
  description: '',
})

const showCreateModal = ref(false)
const isEditing = ref(false)
const isLoading = ref(false) // Estado general para spinner
const loadingTaskId = ref<number | null>(null) // Estado específico para eliminar

// Métodos CRUD
const handleSave = async () => {
  isLoading.value = true // Activar el spinner
  try {
    if (isEditing.value) {
      // Editar un task
      const editedTask: Task = { id: form.id, title: form.title, description: form.description }
      await tasks.edit(editedTask)
    } else {
      // Crear un nuevo task
      const newTask: Task = { title: form.title, description: form.description }
      await tasks.create(newTask)
    }
    resetForm()
    showCreateModal.value = false
  } finally {
    isLoading.value = false // Desactivar el spinner
  }
}

const edittask = (task: Task) => {
  Object.assign(form, task) // Copiar los valores de task al formulario
  isEditing.value = true
  showCreateModal.value = true
}

const deletetask = async (task: Task) => {
  if (confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
    loadingTaskId.value = task.id // Activar el spinner para esta tarea
    try {
      await tasks.delete(task)
    } finally {
      loadingTaskId.value = null // Desactivar el spinner
    }
  }
}

const resetForm = () => {
  form.id = null
  form.title = ''
  form.description = ''
  isEditing.value = false
}

// Traer todas las tareas
onMounted(() => {
  tasks.getAll()
})
</script>

<template>
  <div class="container mx-auto p-3 sm:px-0 min-h-screen">
    <div class="mb-4">
      <button
        @click="resetForm(), (showCreateModal = true)"
        class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Agregar Nueva tarea
      </button>
    </div>

    <!-- Tabla de Datos -->
    <table
      class="min-w-full table-auto bg-white border border-gray-300 rounded-lg shadow-md dark:bg-gray-700 dark:text-white"
    >
      <thead>
        <tr>
          <th class="px-4 py-2 text-left">Id</th>
          <th class="px-4 py-2 text-left">T&iacute;tulo</th>
          <th class="px-4 py-2 text-left">Descripci&oacute;n</th>
          <th class="px-4 py-2 text-left">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in tasks.data" :key="task.id">
          <td class="px-4 py-2">{{ task.id }}</td>
          <td class="px-4 py-2">{{ task.title }}</td>
          <td class="px-4 py-2">{{ task.description }}</td>
          <td class="px-4 py-2 flex space-x-2">
            <button
              @click="edittask(task)"
              class="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
            >
              Editar
            </button>
            <button
              @click="deletetask(task)"
              class="bg-red-500 text-white px-2 py-1 rounded flex items-center justify-center hover:bg-red-600"
              :disabled="loadingTaskId === task.id"
            >
              <svg
                v-if="loadingTaskId === task.id"
                class="animate-spin h-4 w-4 text-white mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              {{ loadingTaskId === task.id ? 'Eliminando...' : 'Eliminar' }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal para Crear/Editar -->
    <div
      v-if="showCreateModal"
      class="fixed inset-x-0 top-20 bg-black bg-opacity-50 flex justify-center items-start"
    >
      <div class="bg-white p-6 rounded-lg shadow-md w-96">
        <h3 class="text-xl font-semibold mb-4">{{ isEditing ? 'Editar' : 'Agregar' }} Tarea</h3>
        <form @submit.prevent="handleSave">
          <div class="mb-4">
            <label for="title" class="block text-gray-700"></label>
            <input
              v-model="form.id"
              type="text"
              id="titles" hidden
              class="w-full px-4 py-2 border rounded-md"
              readonly
              disabled
            />
          </div>
          <div class="mb-4">
            <label for="title" class="block text-gray-700">T&iacute;tulo</label>
            <input
              v-model="form.title"
              type="text"
              id="titles"
              class="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>
          <div class="mb-4">
            <label for="description" class="block text-gray-700">Descripci&oacute;n</label>
            <textarea
              v-model="form.description"
              id="description"
              class="w-full px-4 py-10 border rounded-md"
              required
            ></textarea>
          </div>

          <div class="flex justify-between">
            <button
              type="button"
              @click="showCreateModal = false"
              class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Cancelar
            </button>
            <button
              type="submit"
              class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center justify-center"
              :disabled="isLoading"
            >
              <svg
                v-if="isLoading"
                class="animate-spin h-5 w-5 text-white mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              {{ isLoading ? 'Procesando...' : (isEditing ? 'Actualizar' : 'Crear') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
