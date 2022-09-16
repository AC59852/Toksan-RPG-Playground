<template>
  <section id="inventory">
    <h2>Inventory</h2>
    <div class="inventory__container">
      <div v-for="item in inventory" :key="item.id">{{item}}</div>
    </div>
  </section>
</template>

<script>
import { db } from '@/db'

export default {
  name: 'InventoryComponent',

  props: ['user'],

  data() {
    return {
      inventory: [],
      items: []
    }
  },

  mounted() {
  },

  watch: {
    user() {
      // set the inventory
      this.playerInventory = this.user

      // query the items collection
      db.collection('items')
      .get()
      .then(querySnapshot => {
        const items = querySnapshot.docs.map(doc => doc.data())

        // loop through the inventory
        this.playerInventory.forEach(item => {

          // find the item in the items collection based on the string provided
          const foundItem = items.find(i => i.itemID === item)

          // add the item to the inventory array
          this.inventory.push(foundItem)

          // update the vuex inventory state
          this.$store.commit('updateInventory', this.inventory)

          console.log(this.$store.state.inventory)
        })
      })
    }
  },

  methods: {
  }
}
</script>

<style>

</style>