<script setup>
import { useThemeStore } from '@/stores/ThemeStore'

const theme = useThemeStore()
</script>

<template>
  <footer
    :class="{ dark: theme.isDark }"
    class="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 py-6"
  >
    <div class="container mx-auto text-center">
      <p class="text-lg font-bold mb-2">
        <span class="text-black-500">Trabajo Practico Final Programación Frontend - 2do año - 2024</span>
      </p>
      <p class="text-lg font-bold mb-2">
        INTEGRANTE:
        <span class="text-orange-500">Pereyra Mercedes Marina Ayelen.
        </span>
      </p>
      <div class="mt-4 flex justify-center space-x-4">
      </div>
    </div>
  </footer>
</template>
