<template>
  <section id="inventory">
    <div class="inventory__container">
      <div class="inventory__header">
        <span class="inventory__currency">${{currency}} Finch</span>
        <div class="inventory__close" @click="$emit('closeInv')">Close X</div>
      </div>
      <ul class="inventory__items">
        <li class="inventory__item" @click="setCurrentItem(item, $event)" v-for="(item, index) in updatedInventory" :key="index">
          <!-- <img :src="item.icon" :alt="'Small icon of the item: ' + item.name + ' within the inventory'"> -->
          <font-awesome-icon icon="fa-regular fa-address-card" size="5x" />
        </li>
      </ul>
    </div>
    <div class="inventory__currentItem">
      <div class="currentItem__container" v-if="currentItem">
        <div class="currentItem__text">
          <h2>{{currentItem.name}}</h2>
          <p>{{currentItem.description}}</p>
        </div>
        <ul class="currentItem__stats">
          <li v-if="currentItem.required == true">Key Item: Yes</li>
          <li v-else-if="currentItem.required == false">Key Item: No</li>
          <li v-if="currentItem.shopItem == true">Purchasable: Yes</li>
          <li v-else-if="currentItem.shopItem == false">Purchasable: No</li>
          <li v-if="currentItem.bonus_hp">Bonus HP: {{currentItem.bonus_hp}}</li>
          <li v-if="currentItem.bonus_atk">Bonus Attack: {{currentItem.bonus_atk}}</li>
        </ul>
      </div>
      <div v-else class="currentItem__container">
        <div class="currentItem__text">
          <h2>Select an Item to view it here</h2>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'InventoryComponent',
  props: ['user'],
  data() {
    return {
      currentItem: null,
    }
  },

  mounted() {
    // set the inventory
    var playerInventory = this.user
    var inventory = []

    console.log(this.$store.state.items)

    // this.inventory = this.$store.state.inventory

    playerInventory.forEach(item => {
      // find the item in the items collection based on the string provided
      const foundItem = this.$store.state.items.find(i => i.itemID === item)
      // add the item to the inventory array
      inventory.push(foundItem)
      // update the vuex inventory state
      this.$store.commit('updateInventory', inventory)
      console.log(this.$store.state.inventory)
    })

    console.log(this.items)
  },

  computed: {
    currency() {
      return this.$store.state.user.playerCurrency
    },

    updatedInventory() {
      return this.$store.state.inventory
    },
  },

  methods: {
    setCurrentItem(item, event) {
      this.currentItem = item
      console.log(this.currentItem)

      // remove the active class from all items
      const items = document.querySelectorAll('.inventory__item')

      items.forEach(item => {
        item.classList.remove('inventory__item--selected')
      })

      // get the parent element
      const parent = event.target.parentElement

      console.log(event)

      // if the target is either svg or path, add the class to the li instead
      if (event.target.nodeName === 'svg') {
        parent.classList.add('inventory__item--selected')
      } else if(event.target.nodeName === 'path') {
        // give the parent of the parent the class
        parent.parentElement.classList.add('inventory__item--selected')
      } else {
        event.target.classList.add('inventory__item--selected')
      }
    }
  }
}
</script>

<style>
</style>