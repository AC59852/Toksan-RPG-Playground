<template>
  <section id="map">
    <ul class="splashscreen__menu menu--map" v-if="this.$store.state.user.saveData.tutorial">
      <li class="menu__button menu__button--map">
        <router-link to="/Home">Home</router-link>
      </li>
      <li class="menu__button menu__button--map">
        <router-link to="/shop">Shop</router-link>
      </li>
      <li class="menu__button menu__button--map">
        <router-link to="/chapter1">Ch.1 Investigation</router-link>
      </li>
      <li class="menu__button menu__button--map">
        <router-link to="/chapter2">Ch.2 Rituals</router-link>
      </li>
      <li class="menu__button menu__button--map">
        <router-link to="/chapter3">Ch.3 Rooftop Battle</router-link>
      </li>
    </ul>
    <ul class="splashscreen__menu menu--map" v-else>
      <li class="menu__button menu__button--map">
        <button>No Routes Yet</button>
      </li>
    </ul>
  </section>
</template>

<script>
export default {

}
</script>

<style>

</style>