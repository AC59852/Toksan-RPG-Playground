<template>
  <section id="textbox">
    <div class="textbox__name">
      <h2 v-if="character">{{character.name}}</h2>
      <h2 v-else>You</h2>
    </div>
    <div class="textbox__text" @click="$emit('storyUpdate')">
      <p>{{text}}</p>
    </div>
  </section>
</template>

<script>
export default {
  props: ['character', 'text'],
}
</script>

<style>

</style>