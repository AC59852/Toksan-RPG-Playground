<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <InventoryComponent :user="this.user.playerInventory" />
    <router-view/>
  </div>
</template>
<script>
  import InventoryComponent from './components/InventoryComponent.vue';
  import userMixin from './mixins/userMixin';

  export default {
    name: 'ToksanRPG',

    mixins: [userMixin],

    data() {
      return {
      }
    },

    mounted() {
      console.log(this.user)
    },

    components: {
    InventoryComponent
  }
}
</script>
