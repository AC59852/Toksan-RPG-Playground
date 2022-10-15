<template>
  <section id="register">
    <div class="splashscreen__bck">
      <img src="../assets/img/register.png" alt="">
    </div>
    <div class="form__wrapper">
      <form @submit.prevent="createAcc" class="form">
        <h1>Register</h1>
        <div class="form__input">
          <label for="email">Email</label>
          <input type="email" placeholder="Email" v-model="email" />
        </div>
        <div class="form__input">
          <label for="password">Password</label>
          <input type="password" placeholder="Password" v-model="password" />
        </div>
        <button type="submit">Register</button>
      </form>
      <transition name="fade">
        <h2 v-if="success">Account Created!</h2>
      </transition>
    </div>
    <vue-recaptcha ref="invisibleRecaptcha"
      sitekey="6LfMQkwiAAAAAGuV_sTgAeIpZ2uO_WZDyE_XVYRq"
      @verify="onVerify"
      @expired="onExpired"
      size="invisible"
    >
    </vue-recaptcha>
  </section>
</template>

<script>
import { db } from '@/db'
import userMixin from '@/mixins/userMixin';
import { VueRecaptcha } from 'vue-recaptcha'

export default {
  name: 'RegisterView',

  metaInfo: {
    title: 'Register - Toksan'
  },

  mixins: [userMixin],

  data() {
    return {
      email: '',
      password: '',
      success: false,
    }
  },

  methods: {
    createAcc() {
      // if the email contains a @ and the password is longer than 6 characters
      if (this.email.includes('@') && this.password.length > 6) {
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
              password: this.password,
              playerCurrency: 0,
              playerInventory: [],
            })
            .then(docRef => {
              console.log('User created with ID: ', docRef.id)
              // set the user id in the store
              this.$store.commit('setUserID', docRef.id)
              this.getUser()
              
              this.success = true

              // redirect to the splash screen
              setTimeout(() => {
                this.$router.push('/')
              }, 1000)
            })
            .catch(error => {
              console.error('Error adding document: ', error)

              this.$refs.invisibleRecaptcha.reset()
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