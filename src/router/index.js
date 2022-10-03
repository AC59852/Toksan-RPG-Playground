import Vue from 'vue'
import VueRouter from 'vue-router'
import SplashView from '../views/SplashView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Splash Screen',
    component: SplashView,
  },
  {
    path: '/shop',
    name: 'Shop',
    component: () => import(/* webpackChunkName: "shop" */ '../views/ShopView.vue')
  },
  {
    path: '/ModernDistrict/intro',
    name: 'Intro',
    component: () => import(/* webpackChunkName: "modern-intro" */ '../views/modern/IntroView.vue'),
  },
  {
    path: '/battle',
    name: 'Battle',
    component: () => import(/* webpackChunkName: "battle" */ '../views/BattleView.vue')
  },
  {
    path: '/register',
    name: 'Create Account',
    component: () => import(/* webpackChunkName: "register" */ '../views/RegisterView.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
