import { getAuth, onAuthStateChanged } from 'firebase/auth'
import Vue from 'vue'
import Router from 'vue-router'
import Navbar from '@/components/Navbar/Navbar.vue'
import Login from '@/views/Login.vue'
import Admin from '@/views/Admin/Admin.vue'
import Users from '@/views/Users/Users.vue'
import NewUser from '@/views/Users/NewUser/NewUser.vue'
import Dashboard from '@/views/Dashboard/Dashboard.vue'
import Report from '@/views/Report/Report.vue'

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
      component: Admin,
      meta: {requiresAuth: true}
    },
    {
      path: '/dashboard',
      component: Dashboard,
      name: 'Dashboard',
      meta: {requiresAuth: true}
    },
    {
      path: '/users',
      component: Users,
      meta: { requiresAuth: true },
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
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'NewUser',
          component: Navbar
        }
      ]
    },
    {
      path: '/report',
      component: Report,
      meta: {requiresAuth: true},
      children: [
        {
          path: '',
          name: 'Report',
          component: Navbar
        }
      ]
    },
    { path: '*', component: Login }
  ]
})

router.beforeEach((to, from, next) => {
  const auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!user) {
        next('/')
      } else {
        switch (user.email) {
          case 'wired@gmail.com':
            if (to.name === 'Report') {
              next('/')
              break
            }
            next()
            break
          default:
            if (to.name === 'Report' || to.name === 'Login') {
              next()
            } else {
              next('/report')
            }
        }
      }
    } else {
      next()
    }
  })
})

export default router
