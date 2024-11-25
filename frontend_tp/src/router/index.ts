import { createRouter, createWebHistory } from 'vue-router'
import TaskView from '@/views/TaskView.vue'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: TaskView,
    },
    // Ruta comodín para redirigir a la página de inicio en caso de rutas no encontradas
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})

export default router
