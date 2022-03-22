import { createRouter, createWebHistory } from 'vue-router'
import Cart from '../views/Cart.vue'
import Store from '../views/Store.vue'

const routes = [
  {
    path: '/',
    name: 'Store',
    component: Store
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
