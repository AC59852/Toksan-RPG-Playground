import Vue from 'vue'
import VueRouter from 'vue-router'
import SplashView from '../views/SplashView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'landing page',
    component: SplashView
  },
  {
    path: '/shop',
    name: 'shop',
    component: () => import(/* webpackChunkName: "shop" */ '../views/ShopView.vue')
  },
  {
    path: '/ModernDistrict/intro',
    name: 'modern-intro',
    component: () => import(/* webpackChunkName: "modern-intro" */ '../views/modern/IntroView.vue')
  },
  {
    path: '/battle',
    name: 'battle',
    component: () => import(/* webpackChunkName: "battle" */ '../views/BattleView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ '../views/RegisterView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
