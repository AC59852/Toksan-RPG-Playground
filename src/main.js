import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { firestorePlugin } from 'vuefire'
import store from './store'
import './assets/css/reset.css'
import './assets/css/main.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { far } from '@fortawesome/free-regular-svg-icons'


library.add(far)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(firestorePlugin)

Vue.config.productionTip = false

// on refresh, save changes prompt
window.onbeforeunload = function() {
  return "Are you sure you want to leave?";
};

// delay going between routes by 3 seconds ONLY WHEN LEAVING ROUTE
router.beforeEach((to, from, next) => {
  if (from.name) {
    document.querySelector(".overlay-black").classList.add("overlay-active")
    setTimeout(() => {
      document.querySelector("body").style.backgroundImage = "none"
      next()
    }, 1600)
  } else {
    next()
  }
})

// check when the route loads
router.afterEach((from) => {
  if (from.name) {
    setTimeout(() => {
      // remove background-image from body
      document.querySelector(".overlay-black").classList.remove("overlay-active")
    }, 1000)
  }
})


new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
