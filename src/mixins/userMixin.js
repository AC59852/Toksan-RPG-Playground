import { db } from "@/db";

export default {
  data() {
    return {
      user: {},
    };
  },

  created() {
    this.getUser();
  },

  methods: {
    getUser() {
      db.collection('users').doc('diF5GgGneuVuUHS2O39q').get()
        .then((doc) => {
          if (doc.exists) {

            this.user = doc.data();

            // get the user id
            this.user.id = doc.id;
            
          }
        })
        .catch((error) => {
          console.log('Error getting document:', error);
        });
    },

    checkUser() {
      if (this.user) {
        return true;
      } else {
        return false;
      }
    },
  },
}