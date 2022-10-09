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
import { fas } from '@fortawesome/free-solid-svg-icons'


library.add(far)
library.add(fas)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(firestorePlugin)

Vue.config.productionTip = false

// on refresh, save changes prompt
window.onbeforeunload = function() {
  return "Are you sure you want to leave?";
};

// prevent dragging all images
document.addEventListener('dragstart', function(event) {
  if (event.target.tagName.toLowerCase() === 'img') {
    event.preventDefault();
  }
});

// delay going between routes by 3 seconds ONLY WHEN LEAVING ROUTE
router.beforeEach((to, from, next) => {
  // the user has a 30% chance to navigate to the Battle route instead of the normal route
  var random = Math.floor(Math.random() * 10);
  if (random < 4 && to.name !== 'Intro' && to.name !== 'Battle' && to.name !== 'Login' && to.name !== 'Create Account' && to.name !== 'Splash Screen' && to.name !== 'Tutorial' && from.name !== 'Battle') {
    // add the original route to the store
    store.commit('setOriginalRoute', to.name)

    var images = [
      '/img/boardwalk.jpg',
      '/img/coffee_rain.jpg',
      '/img/splashscreen.jpg',
      '/img/street.jpg',
    ]

    // set the background image to a random image
    store.commit('setBackgroundImage', images[Math.floor(Math.random() * images.length)])


    router.push('/battle').catch(() => {});
  }

  if (from.name) {
    document.querySelector(".overlay-black").classList.add("overlay-active")
    setTimeout(() => {
      next()
    }, 1600)
  } else {
    next()
  }
})

// check when the route loads
router.afterEach((from) => {
  store.commit('setLoadingMessage', from.name);

  if (from.name) {
    // set the state loading message to the route name
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
