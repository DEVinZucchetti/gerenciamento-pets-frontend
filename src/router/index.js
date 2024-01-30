import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import ListPets from '../views/ListPets.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/pets/:name',
      name: 'ListPets',
      component: ListPets
    }
  ]
})

export default router
