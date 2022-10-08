import { db } from '@/db';

export default {
  data() {
    return {
      zone: "",
      area: "",
      route: "",
      log: [],
      story: [],
      characters: [],
    }
  },

  methods: {
    // get the page route
    getRoute() {
      this.route = this.$route.path;

      // get the first part of the route
      this.zone = this.route.split("/")[1];

      // get the second part of the route
      this.area = this.route.split("/")[2];
    },

    async getStoryContent() {
        // get the story content
      db.collection(this.zone).doc(this.area).get()
          .then((doc) => {
            if (doc.exists) {
              this.log = doc.data().log;

              document.body.style.backgroundImage = `url(${doc.data().background})`;

              this.getStoryComponents('conversations');
              this.getStoryComponents('events');
              
            } else {
              return;
            }
          })
      },

      async getStoryComponents(component) {
        let lowerCaseZone = this.zone.toLowerCase();

        // get the characters and store them
        if(component === 'conversations') {
          db.collection('characters').where('area', '==', this.area).get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                this.characters.push({
                  id: doc.id,
                  ...doc.data()
                });
              });

              // sort the characters based on characterID
              this.characters.sort((a, b) => a.characterID - b.characterID);
            })
        }

       // get the content from collection conversations, doc lowerCaseZone, collection this.area where the doc.id is in the log array
        await db.collection(component).doc(lowerCaseZone).collection(this.area).get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              if (this.log.includes(doc.id)) {
                if (doc.data().characterID) {
                  let character = this.characters.find((character) => character.id === doc.data().characterID);
                  this.story.push({
                    id: doc.id,
                    character: character,
                    data: doc.data()
                  })
                } else {
                  this.story.push({id: doc.id, data: doc.data()});
                }
              }
            });
          })

          // sort the array based on the log array
          this.story.sort((a, b) => {
            return this.log.indexOf(a.id) - this.log.indexOf(b.id);
          })
      },
  }
}