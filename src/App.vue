<template>
  <div id="app">
    <header>
      <nav id="nav">
        <font-awesome-icon class="nav__icon" icon="fa-solid fa-gear" color="white" size="1x" @click="toggleSettings()"/>
        <font-awesome-icon class="nav__icon" icon="fa-solid fa-map" size="1x" color="white" @click="locationsOpened = !locationsOpened" />
        <font-awesome-icon class="nav__icon" icon="fa-solid fa-briefcase" color="white" size="1x" @click="toggleInventory()" />
      </nav>
      <transition name="fade">
        <InventoryComponent v-if="inventoryOpened"
        :user="updatedInventory"
        @closeInv="toggleInventory()"
        />
      </transition>
    </header>
    <div class="overlay-black">
      <h1 style="color: white;">{{ this.$store.state.loadingMessage }}</h1>
    </div>
    <SavePopupComponent />
    <transition name="fade">
      <MapComponent v-if="locationsOpened"/>
    </transition>
    <router-view @closeInv="toggleInventory()"/>
  </div>
</template>
<script>
  import { db } from '@/db'
  import InventoryComponent from './components/InventoryComponent.vue';
  import SavePopupComponent from './components/SavePopupComponent.vue';
import MapComponent from './components/MapComponent.vue';

  export default {
    name: 'ToksanRPG',
    metaInfo: {
      title: 'Toksan',
      meta: [
        { name: 'description', content: `Toksan is a Visual Novel RPG set on the fanatasy Japanese island known as Toksan. Your goal is to investigate and take down a cult seeking to bring ancient Japanese Shinto deities into the world for their own gain.` },
        { name: 'keywords', content: 'toksan, rpg, game, visual, novel, visual novel, japanese' },
        // opengraph title, description, type, url, image
        { property: 'og:title', content: 'Toksan' },
        { property: 'og:description', content: `Toksan is a Visual Novel RPG set on the fanatasy Japanese island known as Toksan. Your goal is to investigate and take down a cult seeking to bring ancient Japanese Shinto deities into the world for their own gain.` },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://www.toksan.ca/' },
        { property: 'og:image', content: 'https://ac59852.github.io/toksan-anime/fb.png' },
        // og:site_name
        { property: 'og:site_name', content: 'Austin Caron' },
        // og:image:alt
        { property: 'og:image:alt', content: 'Toksan Game Logo' },
        // twitter card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: 'https://www.toksan.ca' },
        { name: 'twitter:creator', content: '@caron266' },
        { name: 'twitter:title', content: 'Toksan' },
        { name: 'twitter:description', content: `Toksan is a Visual Novel RPG set on the fanatasy Japanese island known as Toksan. Your goal is to investigate and take down a cult seeking to bring ancient Japanese Shinto deities into the world for their own gain.` },
        { name: 'twitter:image', content: 'https://ac59852.github.io/toksan-anime/fb.png' },
      ]
    },

    data() {
      return {
        inventoryOpened: false,
        locationsOpened: false,
      }
    },

    mounted() {
      // if localstorage has items array, load them
      if(localStorage.getItem('items')) {
        this.$store.commit('setItems', JSON.parse(localStorage.getItem('items')));
      } else {
        // get the items collection
        db.collection('items')
        .get()
        .then(querySnapshot => {
          // get the items from the query snapshot and give them an ID
          const items = querySnapshot.docs.map(doc => ({ ...doc.data(), itemID: doc.id }))

          console.log(items)

          // set the items array
          this.$store.commit('setItems', items)

          // save the items array to localstorage
          localStorage.setItem('items', JSON.stringify(items))
        })
      }
    },

    // watch the vuex store for changes
    watch: {
      user() {
        console.log(this.$store.state.user)
      },
      
      // every time the $store.state.user.saveData changes, update the user's saveData
      '$store.state.user.saveData': {
        handler() {
          document.querySelector(".save__popup").classList.add("save__popup--active");

          setTimeout(() => {
            document.querySelector(".save__popup").classList.remove("save__popup--active");
          }, 2000);
        },
        deep: true
      }
    },

    computed: {
      updatedInventory() {
        return this.$store.state.user.playerInventory
      },
    },

    methods: {
      toggleInventory() {
        this.inventoryOpened = !this.inventoryOpened;

        document.querySelector("#textbox").classList.toggle("hide");
        document.querySelector(".house__menu").classList.toggle("hide");
      }
    },

    components: {
    InventoryComponent,
    SavePopupComponent,
    MapComponent
}
}
</script>
