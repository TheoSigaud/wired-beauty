import { getAuth, onAuthStateChanged } from 'firebase/auth'
import Vue from 'vue'
import Router from 'vue-router'
import Navbar from '@/components/Navbar/Navbar.vue'
import Login from '@/views/Login.vue'
import Admin from '@/views/Admin/Admin.vue' 
import Users from '@/views/Users/Users.vue'
import NewUser from '@/views/Users/NewUser/NewUser.vue'
import Dashboard from '@/views/Dashboard/Dashboard.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    },
    {
      path: '/dashboard',
      component: Dashboard,
      // meta: {requiresAuth: true},
    },
    {
      path: '/users',
      component: Users,
      meta: {requiresAuth: true},
      children: [
        {
          path: '',
          name: 'Users',
          component: Navbar
        }
      ]
    },
    {
      path: '/new-user',
      component: NewUser,
      meta: {requiresAuth: true},
      children: [
        {
          path: '',
          name: 'NewUser',
          component: Navbar
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  const auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!user) {
        next('/')
      } else {
        next()
      }
    } else {
      next()
    }
  })
})

export default router
