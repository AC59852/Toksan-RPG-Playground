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

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
