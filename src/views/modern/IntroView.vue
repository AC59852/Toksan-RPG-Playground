<template>
  <section id="modernIntro">
    <div class="textbox" @click="loadNextContent()">
      <div class="name">
        <h2 v-if="sortedStory[0].character">{{ story[0].character.name }}</h2>
        <p>{{sortedStory[0].data.text}}</p>
      </div>
    </div>
  </section>
</template>

<script>
  import storyMixin from '@/mixins/storyMixin';
  
  export default {
    mixins: [storyMixin],

    data() {
      return {
        content: [],
        currentCharacter: null
      }
    },

    created() {
      this.getRoute();

      this.getStoryContent();
    },

    mounted() {
      console.log(this.log)
    },

    methods: {
      loadNextContent() {
        // if there is content to load, shift
        if(this.sortedStory.length > 1) {

          this.sortedStory.shift();

        } else {
          console.log("all out")
        }
      }
    }
  }
</script>

<style>

</style>