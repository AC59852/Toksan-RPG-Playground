import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { firestorePlugin } from 'vuefire'
import store from './store'
import './assets/css/main.css'

Vue.use(firestorePlugin)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
