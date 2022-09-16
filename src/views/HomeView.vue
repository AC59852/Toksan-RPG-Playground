<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { db } from '@/db'

export default {
  name: 'HomeView',

  data() {
    return {
      ModernDistrict: [],
    }
  },

  mounted() {
    db.collection('ModernDistrict')
    .get()
    .then(querySnapshot => {
      const documents = querySnapshot.docs.map(doc => doc.data())
      this.ModernDistrict = documents[0]
    })
  },

  components: {
    HelloWorld
  }
}
</script>
