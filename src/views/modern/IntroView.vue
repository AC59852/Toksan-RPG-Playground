<template>
  <section id="modernIntro">
    <div class="textbox" @click="loadNextContent()">
      <div class="name">
        <h2 v-if="story[0].character">{{ story[0].character.name }}</h2>
        <p>{{story[0].data.text}}</p>
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
        if(this.story.length > 1) {
          this.story.shift();
        } else {
          console.log("all out")
        }
      }
    }
  }
</script>

<style>

</style>