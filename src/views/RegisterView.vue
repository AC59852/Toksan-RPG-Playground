<template>
  <section id="register">
    <form @submit.prevent="createAcc" class="form">
      <h1>Register</h1>
      <div class="form__wrapper">
        <label for="email">Email</label>
        <input type="email" placeholder="Email" v-model="email" />
      </div>
      <div class="form__wrapper">
        <label for="username">Username</label>
        <input type="text" placeholder="Username" v-model="username" />
      </div>
      <div class="form__wrapper">
        <label for="password">Password</label>
        <input type="password" placeholder="Password" v-model="password" />
      </div>
      <vue-recaptcha ref="invisibleRecaptcha"
        sitekey="6LfMQkwiAAAAAGuV_sTgAeIpZ2uO_WZDyE_XVYRq"
        @verify="onVerify"
        @expired="onExpired"
        size="invisible"
      >
      </vue-recaptcha>
      <button type="submit">Register</button>
    </form>
  </section>
</template>

<script>
import { db } from '@/db'
import userMixin from '@/mixins/userMixin';
import { VueRecaptcha } from 'vue-recaptcha'

export default {
  name: 'RegisterView',

  mixins: [userMixin],

  data() {
    return {
      email: '',
      username: '',
      password: '',
    }
  },

  methods: {
    createAcc() {
      // if the email contains a @ and the password is longer than 6 characters
      if (this.email.includes('@') && this.password.length > 6 && this.username.length > 2) {
        this.$refs.invisibleRecaptcha.execute()
      } else {
        alert('Please fill in all the fields correctly')
      }
    },

    onVerify(response) {
      if(response) {
        // check users and if a user with the same email exists, return
       db.collection('users')
        .where('email', '==', this.email)
        .get()
        .then(querySnapshot => {
          if (querySnapshot.docs.length > 0) {
            alert('User already exists')
            return
          }
          // create a new user
          db.collection('users')
            .add({
              email: this.email,
              username: this.username,
              password: this.password,
              playerCurrency: 0,
              playerInventory: [],
            })
            .then(docRef => {
              console.log('User created with ID: ', docRef.id)
              // set the user id in the store
              this.$store.commit('setUserID', docRef.id)

              this.getUser()

              // redirect to the splash screen
              this.$router.push('/')
            })
            .catch(error => {
              console.error('Error adding document: ', error)
            })
        })
      }
    },

    onExpired() {
      console.log('expired')
    },
  },

  components: {
    VueRecaptcha,
  },
}
</script>

<style>

</style>