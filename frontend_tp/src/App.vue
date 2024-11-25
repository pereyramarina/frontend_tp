<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import router from '@/router'
import ThemeToggle from '@/components/ThemeToggle.vue'
import Footer from '@/components/Footer.vue'

import dark from '@/assets/dark mode.png'
import light from '@/assets/light mode.png'

import { useThemeStore } from '@/stores/ThemeStore'
import { useAuthStore } from '@/stores/authStore'

// pinia return reactive components
const theme = useThemeStore()
const auth = useAuthStore()

if (auth.data.user === undefined) {
  router.push('/')
}
</script>

<template>
  <div
    v-bind:class="theme.isDark ? 'dark' : ''"
    :style="{
      backgroundImage: theme.isDark ? `url(${dark})` : `url(${light})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }"
    class="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white"
  >
    <!-- Header -->
    <header class="flex flex-row p-4 bg-gray-200 dark:bg-gray-800">
      <ThemeToggle />
      <button
        @click="auth.logout()"
        v-show="auth.data.user !== undefined"
        class="dark:bg-gray-500 dark:hover:bg-gray-400 bg-gray-400 text-black dark:text-white px-4 py-2 rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-red-400 ml-auto"
      >
        Log Out
      </button>
    </header>

    <!-- Main Content -->
    <main class="flex-grow px-4">
      <RouterView />
    </main>

    <!-- Footer -->
    <footer class="bg-gray-200 dark:bg-gray-800 text-center py-4">
      <Footer />
    </footer>
  </div>
</template>

<style scoped>
html,
body {
  height: 100%;
  margin: 0;
}

footer {
  position: fixed; /* Fija el footer a la parte inferior */
  bottom: 0;
  width: 100%; /* Asegura que el footer cubra todo el ancho de la pantalla */
  background-color: var(--footer-background-color, #f5f5f5); /* Color de fondo del footer */
  padding: 1rem 0;
  z-index: 1000; /* Asegura que el footer se superponga al contenido */
}
</style>
