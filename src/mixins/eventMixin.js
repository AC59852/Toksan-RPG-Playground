export default {
  methods: {
    loadEvent() {
      console.log(this.story);

      var item = this.story[0];

      if(item) {
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
      }
    },

    loadAnimation(item) {
      console.log(item);
      switch(item.data.eventName) {
        case 'reveal-character':
          document.querySelector(`.${item.data.revealedChar}`).classList.add("reveal-character");
          this.story.shift();
          break;
        default:
          console.log('no event name');
          break;
      }
    }
  }
}