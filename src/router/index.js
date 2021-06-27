import {createRouter, createWebHashHistory} from 'vue-router'
import User from '../views/user.vue'
import Role from '../views/role.vue'
const routes = [
  {
    path: '/',
    redirect: {path: '/users'}
  },
  {
    path: '/users',
    name: "users",
    component: User
  },
  {
    path: '/roles',
    name: "roles",
    component: Role
  }
]


const router =  createRouter({
  history: createWebHashHistory(),
  routes
})

export default router