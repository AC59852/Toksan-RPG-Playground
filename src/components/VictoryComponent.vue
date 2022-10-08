<template>
  <section id="victory">
    <h2 class="victory__heading">Battle Complete!</h2>
    <div class="victory__rewards">
      <h3>Rewards</h3>
      <div class="victory__currency">
        <font-awesome-icon class="currency__icon" size="3x" color="white" icon="fa-solid fa-coins" />
        <span class="currency__amount">${{ currency }} Finch</span>
      </div>
    </div>
    <div class="victory__buttons">
      <router-link :to="this.$store.state.originalRoute">Continue to {{ this.$store.state.originalRoute }}</router-link>
      <router-link to="/Home">Return Home</router-link>
    </div>
  </section>
</template>

<script>
export default {
  props: ['currency'],
}
</script>

<style>

</style>