import { db } from "@/db";

export default {
  data() {
    return {
      user: {},
    };
  },

  methods: {
    getUser() {
      if (this.$store.state.userID) {
        db.collection('users').doc(this.$store.state.userID).get()
          .then((doc) => {
            if (doc.exists) {

              this.user = doc.data();

              // get the user id
              this.user.id = doc.id;

              // dont store the password
              delete this.user.password;

              // store the user in vuex
              this.$store.commit('setUser', this.user);
              
            } else {
              console.log(`couldn't find user`);
              return;
            }
          })
          .catch((error) => {
            console.log('Error getting document:', error);
          });
      } else {
        console.log('No user signed in');
      }
    },
  }
}