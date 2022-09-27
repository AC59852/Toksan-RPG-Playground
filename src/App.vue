<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/shop">Shop</router-link> |
      <router-link to="/ModernDistrict/intro">Intro</router-link>
    </nav>
    <InventoryComponent :user="this.user.playerInventory" />
    <router-view/>
  </div>
</template>
<script>
  import { db } from '@/db'
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
      // get the items collection
    db.collection('items')
    .get()
    .then(querySnapshot => {
      const items = querySnapshot.docs.map(doc => doc.data())

      // set the items array
      this.$store.commit('setItems', items)

      console.log(this.$store.state.items)
    })
    },

    // watch the vuex store for changes
    watch: {
      user() {
        console.log(this.$store.state.user)
      }
    },

    components: {
    InventoryComponent
  }
}
</script>
