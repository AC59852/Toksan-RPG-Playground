export default {
  methods: {
    loadEvent() {
      var item = this.story[0];

      if(item) {
        if(item.id.includes('event')) {
          // switch statement to load the correct event
          switch(item.data.eventType) {
            case 'animation':
              this.loadAnimation(item);
              break;
            case 'item':
              this.loadItem(item);
              break;
            case 'money':
              this.loadMoney(item);
              break;
            default:
              console.log('no event type');
              break;
          }
        }
      }
    },

    loadAnimation(item) {
      switch(item.data.eventName) {
        case 'reveal-character':
          document.querySelector(`.${item.data.revealedChar}`).classList.add("reveal-character");
          this.story.shift();
          break;
        case 'hide-character':
          document.querySelector(`.${item.data.hiddenChar}`).classList.remove("reveal-character");
          document.querySelector(`.${item.data.hiddenChar}`).classList.add("hide-character");
          this.story.shift();
          break;
        case 'change-background':
          document.querySelector("body").style.backgroundImage = `url(${item.data.background})`;
          // add a transition to the background image
          document.querySelector("body").style.transition = "background-image 1s ease-in-out";
          this.story.shift();
          break;
        default:
          console.log('no event name');
          break;
      }
    },

    loadItem(item) {
      switch(item.data.eventName) {
        case 'give-item':
          this.$store.state.user.playerInventory.push(item.data.itemID);
          this.story.shift();
          break;
        default:
          console.log('no event name');
          break;
      }
    },

    loadMoney(item) {
      switch(item.data.eventName) {
        case 'give-money':
          this.$store.commit('addCurrency', item.data.amount);
          this.story.shift();
          break;
        default:
          console.log('no event name');
          break;
      }
    },
  }
}