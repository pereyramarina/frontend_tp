<script setup>
import { ref } from 'vue'
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import { useThemeStore } from '@/stores/ThemeStore'

const theme = useThemeStore()

import Register from '@/components/auth/Register.vue'
import Login from '@/components/auth/Login.vue'

const sections = ref([
  { text: 'Ingreso', selected: true },
  { text: 'Registro', selected: false },
])
</script>

<template>
  <div class="container mx-auto p-3 sm:px-0 min-h-screen" v-bind:class="theme.isDark ? 'dark' : ''">
    <TabGroup>
      <TabList class="flex space-x-1 rounded-xl bg-blue-900/20 dark:bg-gray-800 p-1">
        <Tab v-for="section in sections" as="template" :key="section.text" v-slot="{ selected }">
          <button
            :class="[
              'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
              'ring-white/60 ring-offset-2 ring-offset-blue-400 dark:ring-offset-gray-600 focus:outline-none focus:ring-2',
              selected
                ? 'bg-white text-blue-700 dark:bg-gray-500 dark:text-white shadow'
                : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
            ]"
          >
            {{ section.text }}
          </button>
        </Tab>
      </TabList>

      <TabPanels class="mt-2">
        <TabPanel class="w-full"> <Login /> </TabPanel>
        <TabPanel class="w-full"> <Register /> </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>
