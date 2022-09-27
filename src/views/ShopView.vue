<template>
  <section id="shop">
    <h2>Shop</h2>
    <div class="shop__container">
      <div @click="purchase(item, $event)" v-for="item in items" :key="item.itemID">
        {{item.name}}
      </div>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    items() {
      return this.$store.state.items
    },
  },

  methods: {
    purchase(item, event) {

      let cost = item.cost

      if(this.$store.state.user.playerCurrency >= cost) {
        // subtract the cost from the user's currency
        this.$store.commit('subtractCurrency', cost)
        
        // add the item to the user's inventory
        this.$store.commit('addToInventory', item)

        // remove the element from the DOM
        event.target.remove()
      } else {
        alert("You don't have enough money!")
      }
      
    }
  }
}
</script>

<style>

</style>