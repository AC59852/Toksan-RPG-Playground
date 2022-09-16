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
import userMixin from '@/mixins/userMixin';

export default {
  name: 'InventoryComponent',

  mixins: [userMixin],

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
      this.playerInventory = this.user.playerInventory

      // query the items collection
      db.collection('items')
      .get()
      .then(querySnapshot => {
        const items = querySnapshot.docs.map(doc => doc.data())

        // loop through the inventory
        this.playerInventory.forEach(item => {
          // find the item in the items collection
          const foundItem = items.find(i => i.id === item.id)

          // add the item to the inventory array
          this.inventory.push(foundItem)
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