import { db } from '@/db';

export default {
  data() {
    return {
      zone: "",
      area: "",
      route: "",
      log: [],
      story: [],
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

    getStoryContent() {
        // get the story content
      db.collection(this.zone).doc(this.area).get()
          .then((doc) => {
            if (doc.exists) {
              this.log = doc.data().log;

              this.getStoryComponents('conversations');
              this.getStoryComponents('events');
              
            } else {
              console.log('No story');
              return;
            }
          })
      },

      getStoryComponents(component) {
        let lowerCaseZone = this.zone.toLowerCase();

        // get the content from collection conversations, doc lowerCaseZone, collection this.area where the doc.id is in the log array
        db.collection(component).doc(lowerCaseZone).collection(this.area).get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              if (this.log.includes(doc.id)) {

                if (doc.data().characterID) {
                  db.collection('characters').doc(doc.data().characterID).get()
                    .then((characterDoc) => {
                      if (characterDoc.exists) {
                        this.story.push({
                          id: doc.id,
                          character: characterDoc.data(),
                          data: doc.data()
                        });
                      }
                    })
                } else {
                  this.story.push({id: doc.id, data: doc.data()});
                }

                console.log(this.story)
              }
            });
          })
      },
  },

  computed: {
    // sort the story array based on the log
    sortedStory() {
      return this.story.sort((a, b) => {
        return this.log.indexOf(a.id) - this.log.indexOf(b.id);
      })
    }
  },

  watch: {
    sortedStory() {
      console.log('sorting');
    }
  }
}