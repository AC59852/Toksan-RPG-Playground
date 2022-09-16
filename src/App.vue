<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <InventoryComponent />
    <router-view/>
  </div>
</template>
<script>
  import InventoryComponent from './components/InventoryComponent.vue';

  export default {
    name: 'ToksanRPG',

    data() {
      return {
      }
    },

    mounted() {
      console.log(process.env.VUE_APP_TEST)
    },

    components: {
    InventoryComponent
  }
}
</script>
