<template>
  <section id="house">
    <div class="house__wrapper">
      <img class="house__character" src="https://firebasestorage.googleapis.com/v0/b/toksan-rpg.appspot.com/o/f342.png?alt=media&token=28534635-2164-4d63-bad2-1075a42ece6d" alt="Main Character of the Story">
      <ul class="splashscreen__menu house__menu" v-if="currentMenu == 'Main'">
        <li class="menu__button" @click="chooseStory()">
          <button>Story</button>
        </li>
        <li class="menu__button" @click="openInventory()">
          <button>Inventory</button>
        </li>
        <li class="menu__button" @click="saveData()">
          <button>Save</button>
        </li>
        <li class="menu__button">
          <button @click="showSettings()">Settings</button>
        </li>
      </ul>
      <ul v-if="currentMenu == 'Story'" class="splashscreen__menu house__menu">
        <li class="menu__button">
          <router-link to="/chapter1">Ch.1 Investigation</router-link>
        </li>
        <li class="menu__button">
          <router-link to="/chapter2">Ch.2 Rituals</router-link>
        </li>
        <li class="menu__button">
          <router-link to="/chapter3">Ch.3 Rooftop Battle</router-link>
        </li>
        <li class="menu__button" @click="mainMenu()">
          <button>Back</button>
        </li>
      </ul>
    </div>
    <TextComponent 
      :text="currentText"
    />
  </section>
</template>

<script>
import { db } from '@/db';
import TextComponent from '@/components/TextComponent.vue';
export default {
  name: 'HouseView',

  mounted() {
    this.currentText = this.text[0].text
  },

  data() {
    return {
      currentMenu: "Main",
      currentText: "",
      text: [
        {
          id: 1,
          text: "Seems like a good time to take a break. I'll just rest my before heading out again. What should I do beforehand though?"
        },
        {
          id: 2,
          text: "Downtown Modern District. There's no better place to take in the heart of modern civilization. There's also no better place to be recruited by the Uryshi. With so many people, it's unlikely anything stands out, making is perfect to sneak around and find out what Uryshi is hiding."
        }
      ]
    }
  },

  methods: {
    // emit to root to open inventory
    openInventory() {
      this.$emit('closeInv');
    },

    chooseStory() {
      this.currentMenu = "Story";

      // change the text in the text component to this.text[1].text
      this.currentText = this.text[1].text;
    },

    saveData() {
      // update the saveData on the account
      if(this.$store.state.userID !== null) {
        db.collection('users').doc(this.$store.state.userID).update({
        // all saveData
        "saveData": this.$store.state.user.saveData,
        // save inventory
        "playerInventory": this.$store.state.user.playerInventory,
        // save currency
        "playerCurrency": this.$store.state.user.playerCurrency,
        })
      }
    },

    mainMenu() {
      this.currentMenu = "Main";

      this.currentText = this.text[0].text;
    },
  },

  components: {
    TextComponent
  }
}
</script>

<style>

</style>