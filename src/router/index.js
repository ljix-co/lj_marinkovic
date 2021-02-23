import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Biography from '../views/Biography.vue'
import Artworks from '../views/Artworks.vue'
import Projects from '../views/Projects.vue'
import Exhibitions from '../views/Exhibitions.vue'
import Contact from '../views/Contact.vue'
import Error_404 from '../views/Error_404.vue'

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
    component: Artworks
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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
