<template>
  <section id="splashscreen">
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
      <li class="menu__button" @click="checkSaveData()" v-if="this.$store.state.userID !== null">
        <button>Load Game</button>
      </li>
      <li class="menu__button" @click="indev()">
        <button>Settings</button>
      </li>
      <li class="menu__button" @click="logout()" v-if="this.$store.state.userID !== null">
        <button>Logout</button>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'HomeView',

  methods: {
    indev() {
      alert('This feature is still in development!')
    },

    checkSaveData() {
      var saveData = this.$store.state.user.saveData;

      if(saveData.intro == true) {
        this.$router.push('/ModernDistrict/tutorial')

        if(saveData.tutorial == true) {
        this.$router.push('/home')
        }
      } else {
        alert("You don't have a save, please start a New Game")
      }
    },

    logout() {
      // run removeUser mutation
      this.$store.commit('removeUser')
    }
  },
}
</script>
