<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useThemeStore } from '@/stores/ThemeStore'
import { useAuthStore } from '@/stores/authStore'

const theme = useThemeStore()
const auth = useAuthStore()

const isLoading = ref(false) // Estado de carga para el spinner
const repeatPwd = ref('')
const reactiveCredentials = reactive({
  email: '',
  password: '',
})

async function register() {
  if (repeatPwd.value !== reactiveCredentials.password) {
    alert('Las passwords no coinciden')
    return
  }

  isLoading.value = true // Activar el spinner
  try {
    await auth.registerUser(reactiveCredentials)
    // Manejar éxito del registro
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false // Desactivar el spinner
  }
}
</script>

<template>
  <div :class="{ dark: theme.isDark }" class="flex flex-col items-center h-screen">
    <div class="w-full max-w-md bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
        Registrarse
      </h2>
      <form class="flex flex-col" @submit.prevent="register()">
        <input
          v-model="reactiveCredentials.email"
          placeholder="Email"
          class="bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="email"
          required
        />
        <input
          v-model="reactiveCredentials.password"
          placeholder="Password"
          class="bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="password"
          required
        />
        <input
          v-model="repeatPwd"
          placeholder="Repetir Password"
          class="bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="password"
          required
        />
        <button
          class="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-150 flex items-center justify-center"
          type="submit"
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
          <span v-if="isLoading">Cargando...</span>
          <span v-else>Registrar</span>
        </button>
        <small v-if="auth.error" class="text-center text-red-500 text-sm">{{ auth.error }}</small>
      </form>
    </div>
  </div>
</template>
