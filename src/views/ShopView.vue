<template>
  <section id="shop">
    <h2>Shop</h2>
    <div class="shop__container">
      <div @click="purchase(item)" v-for="item in items" :key="item.itemID">
        {{item.name}}
      </div>
    </div>
  </section>
</template>

<script>
import { db } from '@/db'
export default {
  data() {
    return {
      items: []
    }
  },

  mounted() {
    // get the items collection
    db.collection('items')
    .get()
    .then(querySnapshot => {
      const items = querySnapshot.docs.map(doc => doc.data())

      // set the items array
      this.items = items

      console.log(items)
    })
  },

  methods: {
    purchase(item) {
      // add the item to the user's inventory
      this.$store.commit('addToInventory', item)
    }
  }
}
</script>

<style>

</style>