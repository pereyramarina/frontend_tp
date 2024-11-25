import { defineStore } from 'pinia'
import type { Theme } from '@/models/ThemeModel'

export const useThemeStore = defineStore({
  id: 'theme',
  state: (): Theme => ({
    isDark: false,
    mode: 'Light Mode',
  }),
  actions: {
    toggleTheme() {
      this.isDark = !this.isDark
      this.mode = this.isDark ? 'Dark Mode' : 'Light Mode'
    },
  },
})
