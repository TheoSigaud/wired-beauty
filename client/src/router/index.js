import { getAuth, onAuthStateChanged } from 'firebase/auth'
import Vue from 'vue'
import Router from 'vue-router'
import Posts from '@/components/Posts'
import NewPost from '@/components/NewPost'
import EditPost from '@/components/EditPost'
import Navbar from '@/components/Navbar/Navbar.vue'
import Login from '@/views/Login.vue'
import Users from '@/views/Users/Users.vue'
import Dashboard from '@/views/Dashboard/Dashboard.vue'
import Stories from '@/views/Stories/Stories.vue'
import NewStory from '@/views/Stories/NewStory/NewStory.vue'
import UpdateStory from '@/views/Stories/UpdateStory/UpdateStory.vue'

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
      path: '/dashboard',
      component: Dashboard,
      meta: {requiresAuth: true},
      children: [
        {
          path: '',
          name: 'Dashboard',
          component: Navbar
        }
      ]
    },
    {
      path: '/stories',
      component: Stories,
      meta: {requiresAuth: true},
      children: [
        {
          path: '',
          name: 'Stories',
          component: Navbar
        }
      ]
    },
    {
      path: '/new-story',
      component: NewStory,
      meta: {requiresAuth: true},
      children: [
        {
          path: '',
          name: 'NewStory',
          component: Navbar
        }
      ]
    },
    {
      path: '/update-story/:id',
      component: UpdateStory,
      meta: {requiresAuth: true},
      children: [
        {
          path: '',
          name: 'UpdateStory',
          component: Navbar
        }
      ]
    },
    {
      path: '/users',
      name: 'Users',
      component: Users,
      meta: {requiresAuth: true}
    },
    {
      path: '/posts',
      name: 'Posts',
      component: Posts
    },
    {
      path: '/posts/new',
      name: 'NewPost',
      component: NewPost
    },
    {
      path: '/posts/:id',
      name: 'EditPost',
      component: EditPost
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
