<template>
  <section id="shop">
    <div class="shop__wrapper">
      <div class="shop__header">
        <span>${{ currency }} Finch</span>
      </div>
      <ul class="shop__items">
        <li class="shop__item" v-for="(item, index) in items" @click="purchase(item, $event)" :key="index" @mouseenter="setItem(item)" @mousemove="showStats($event)" @mouseleave="removeItem()">
          <font-awesome-icon :icon="item.icon" size="4x" color="white" />
        </li>
      </ul>
    </div>
    <div class="shop__tooltip" v-if="currentItem.name">
      <div class="item__header">
        <span class="item__name">{{ currentItem.name }}</span>
        <span class="item__price">Cost: ${{ currentItem.cost }}</span>
      </div>
      <p class="item__desc">{{ currentItem.tooltip }}</p>
      <div class="item__stats">
        <span v-if="currentItem.health">HP: {{currentItem.health}}</span>
        <span v-if="currentItem.attack">Attack: {{currentItem.attack}}</span>
        <span v-if="currentItem.bleed">Bleed: {{currentItem.bleed}}</span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ['items'],

  data() {
    return {
      currentItem: {
        name: null,
        cost: null,
        health: null,
        attack: null,
        bleed: null,
      },
    };
  },

  computed: {
    currency() {
      return this.$store.state.user.playerCurrency
    },
  },

  methods: {
    purchase(item, event) {
      let cost = item.cost;
      console.log(event)
      if (this.$store.state.user.playerCurrency >= cost) {
          // subtract the cost from the user's currency
          this.$store.commit("subtractCurrency", cost);
          // add the item to the user's inventory
          this.$store.commit("addToInventory", item);
          // remove the element from the DOM
          // if the event is svg, remove the li instead
          if (event.target.nodeName === "svg") {
            event.target.parentNode.remove();
          } else if(event.target.nodeName === "path") {
            event.target.parentNode.parentNode.remove();
          } else {
            event.target.remove();
          }

          this.currentItem = {
            name: null,
            cost: null,
            health: null,
            attack: null,
            bleed: null,
        };
      }
      else {
          alert("You don't have enough money!");
      }
    },

    showStats(event) {
      let tooltip = document.querySelector(".shop__tooltip");

      // get the mouse position
      let x = event.clientX;
      let y = event.clientY;

      // bind the tooltip to the mouse position
      tooltip.style.top = y + -25 + "px";
      tooltip.style.left = x + 15 + "px";
    },

    setItem(item) {
      // get the item stats
      this.currentItem.cost = item.cost,
      this.currentItem.name = item.name;
      this.currentItem.tooltip = item.tooltip;

      if(item.bonus_bleed) { this.currentItem.bleed = item.bonus_bleed; }
      if(item.bonus_atk) { this.currentItem.attack = item.bonus_atk; }
      if(item.bonus_hp) { this.currentItem.health = item.bonus_hp; } 
    },

    removeItem() {
      this.currentItem = {
        name: null,
        cost: null,
        health: null,
        attack: null,
        bleed: null,
      };
    },
  }
}
</script>

<style>

</style>