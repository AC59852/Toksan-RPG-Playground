<template>
  <section id="modernIntro story">
    <div class="story__characters">
      <img v-for="(character, index) in characters" :src="character.image" :key="character.id" :class="`character${index + 1}`">
    </div>
    <TextComponent 
      :character="story[0].character" 
      :text="story[0].data.text" 
      @storyUpdate="loadNextContent(), loadEvent()" 
    />
  </section>
</template>

<script>
  import storyMixin from '@/mixins/storyMixin';
  import eventMixin from '@/mixins/eventMixin';
  import TextComponent from '@/components/TextComponent.vue';
  import { db } from '@/db';
  
  export default {
    mixins: [storyMixin, eventMixin],

    data() {
      return {
        content: [],
      }
    },

    created() {
      this.getRoute();

      this.getStoryContent();
    },
    
    methods: {
      loadNextContent() {
        // if there is content to load, shift
        if(this.story.length > 1) {
          this.story.shift();
        } else {
          console.log("all out")

          if(this.$store.state.user.saveData) {

            if(this.$store.state.user.saveData.intro !== true) {
              // update the saveData.intro to be true
              this.$store.state.user.saveData.intro = true;

              // update the saveData on the account
              db.collection('users').doc(this.$store.state.userID).update({
                // only update saveData intro
                "saveData.intro": true,
              })
            }
          }

          
        }
      },
    },

    components: {
      TextComponent: TextComponent
    }
  }
</script>

<style>

</style>