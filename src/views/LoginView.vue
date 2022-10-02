<template>
  <section id="login">
    <div class="splashscreen__bck">
      <img src="../assets/img/busstop.png" alt="">
    </div>
    <div class="form__wrapper">
      <form @submit.prevent="login" class="form">
        <h1>Login</h1>
        <div class="form__input">
          <label for="email">Email</label>
          <input type="email" placeholder="Please Enter Email" v-model="email" />
        </div>
        <div class="form__input">
          <label for="password">Password</label>
          <input type="password" placeholder="Please Enter Password" v-model="password" />
        </div>
        <button type="submit">Login</button>
      </form>
      <transition name="fade">
        <h2 v-if="success">Successfully Logged in!</h2>
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
  name: 'LoginView',

  mixins: [userMixin],

  data() {
    return {
      email: '',
      password: '',
      success: false,
    }
  },

  methods: {
    login() {
      // if the email contains a @ and the password is longer than 6 characters
      if (this.email.includes('@') && this.password.length > 6) {
        this.$refs.invisibleRecaptcha.execute()
      } else {
        alert('Please fill in all the fields correctly')
      }
    },

    onVerify(response) {
      if(response) {
        // check users and if a user with the same email and password exists, run the this.getUser function and this.$store.commit('setUserID', docref.id)
        db.collection('users')
          .where('email', '==', this.email)
          .where('password', '==', this.password)
          .get()
          .then((querySnapshot) => {
            // if the user exists, run the getUser function
            if (querySnapshot.docs.length > 0) {
              querySnapshot.forEach((doc) => {
                console.log(doc)
                this.$store.commit('setUserID', doc.id)
                this.getUser(doc.id)

                this.success = true

                // redirect to the home page
                setTimeout(() => {
                  this.$router.push('/')
                }, 1000)
              })
            } else {
              alert('Email or password is incorrect')
              // reset the captcha
              this.$refs.invisibleRecaptcha.reset()
            }
          })
      }
    },

    onExpired() {
      alert('The captcha has expired, please try again')
    },
  },

  components: {
    VueRecaptcha
  }
}
</script>

<style>

</style>