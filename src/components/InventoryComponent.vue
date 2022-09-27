<template>
  <section id="inventory">
    <h2>Inventory</h2>
    <div class="inventory__container">
      <div v-for="item in inventory" :key="item.id">{{item}}</div>
    </div>
  </section>
</template>

<script>

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
    
  },

  methods: {
  }
}
</script>

<style>

</style>