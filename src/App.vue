<template>
  <div id="app">
    <header>
      <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/shop">Shop</router-link> |
        <router-link to="/battle">Battle</router-link> |
        <span @click="toggleInventory()">Open Inventory</span>
      </nav>
      <transition name="fade">
        <InventoryComponent v-if="inventoryOpened"
        :user="updatedInventory"
        @closeInv="toggleInventory()"
        />
      </transition>
    </header>
    <div class="overlay-black">
      <h1 style="color: white;">{{ this.$store.state.loadingMessage }}</h1>
    </div>
    <router-view/>
  </div>
</template>
<script>
  import { db } from '@/db'
  import InventoryComponent from './components/InventoryComponent.vue';

  export default {
    name: 'ToksanRPG',

    data() {
      return {
        inventoryOpened: false,
      }
    },

    mounted() {
      // get the items collection
      db.collection('items')
      .get()
      .then(querySnapshot => {
        // get the items from the query snapshot and give them an ID
        const items = querySnapshot.docs.map(doc => ({ ...doc.data(), itemID: doc.id }))

        console.log(items)

        // set the items array
        this.$store.commit('setItems', items)

        console.log(this.$store.state.items)
      })
    },

    // watch the vuex store for changes
    watch: {
      user() {
        console.log(this.$store.state.user)
      },
    },

    computed: {
      updatedInventory() {
        return this.$store.state.user.playerInventory
      },
    },

    methods: {
      toggleInventory() {
        console.log('test')
        this.inventoryOpened = !this.inventoryOpened;
      }
    },

    components: {
    InventoryComponent
  }
}
</script>
