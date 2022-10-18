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
