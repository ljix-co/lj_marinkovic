import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Biography from '../views/Biography.vue'
// import Artworks from '../views/Artworks.vue'
import Projects from '../views/Projects.vue'
import Exhibitions from '../views/Exhibitions.vue'
import Contact from '../views/Contact.vue'
import Error_404 from '../views/Error_404.vue'
import Login from '../views/Login.vue'
import Admin from '../views/Admin.vue'
// import Store from '../store/index.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    name: 'Error_404',
    component: Error_404
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/biography',
    name: 'Biography',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Biography
  },
  {
    path: '/artworks',
    name: 'Artworks',
    // component: Artworks
    component: () => import(/* webpackChunkName: "artworks" */ '../views/Artworks.vue')
  },
  {
    path: '/projects',
    name: 'Projects',
    component: Projects
  },
  {
    path: '/exhibitions',
    name: 'Exhibitions',
    component: Exhibitions
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,

    meta: {
      requiresLogin: true
    },
    beforeEnter(to, from, next) {

      if (to.meta.requiresLogin) {
        if (localStorage.getItem("sid")) {
          next()
        } else {
          (next('/login'))
        }
      } else {
        next()
      }
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
