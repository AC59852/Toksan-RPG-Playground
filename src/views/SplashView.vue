<template>
  <div id="splashscreen">
    <div class="splashscreen__bck">
      <img src="../assets/img/splashscreen.png" alt="">
    </div>
    <div class="splashscreen__logo">
      <img class="toksan__logo toksan__logo--icon" src="../assets/toksan_logo-icon.svg" alt="">
      <img class="toksan__logo toksan__logo--text" src="../assets/Toksan_Logo.svg" alt="">
    </div>
    <ul class="splashscreen__menu">
      <li class="menu__button">
        <router-link to="/ModernDistrict/intro">New Game</router-link>
      </li>
      <li class="menu__button" v-if="this.$store.state.userID == null">
        <router-link to="/login">Login</router-link>
      </li>
      <li class="menu__button" v-if="this.$store.state.userID == null">
        <router-link to="/register">Create Account</router-link>
      </li>
      <li class="menu__button" v-if="this.$store.state.userID !== null">
        <router-link to="/house">Load Game</router-link>
      </li>
      <li class="menu__button" @click="indev()">
        <button>Settings</button>
      </li>
      <li class="menu__button" @click="logout()" v-if="this.$store.state.userID !== null">
        <button>Logout</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HomeView',

  methods: {
    indev() {
      alert('This feature is still in development!')
    },

    logout() {
      // run removeUser mutation
      this.$store.commit('removeUser')
    }
  },
}
</script>
