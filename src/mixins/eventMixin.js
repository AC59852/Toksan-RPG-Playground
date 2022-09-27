export default {
  methods: {
    loadEvent() {
      console.log(this.story);

      var item = this.story[0];

      if(item.id.includes('event')) {
        // switch statement to load the correct event
        switch(item.data.eventType) {
          case 'animation':
            this.loadAnimation(item);
            break;
          default:
            console.log('no event type');
            break;
        }
      }
    },

    loadAnimation(item) {
      console.log("Animation Name: " + item.data.eventName);

      if(item.data.eventName === 'reveal-character') {
        this.story.shift();
        console.log(this.story)
      }

      document.body.classList.add(item.data.eventName)

      document.body.addEventListener('animationend', () => {
        this.story.shift();
      });
    }
  }
}