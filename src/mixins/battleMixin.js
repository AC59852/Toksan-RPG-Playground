export default {
  methods: {
    validateFight() {
      // get the items from the store.state.user.playerInventory
      var playerInventory = this.$store.state.inventory;

      // loop through the items
      for(var i = 0; i < playerInventory.length; i++) {
        // if the item has bonus_atk, add it to the Attack move
        if(playerInventory[i].bonus_atk) {
          this.player.moves[0].damage += playerInventory[i].bonus_atk;
        }

        // if the item has bonus_hp, add it to the player HP
        if(playerInventory[i].bonus_hp) {
          this.player.HP += playerInventory[i].bonus_hp;
          this.player.maxHP = this.player.HP;

          this.enemy.maxHP = this.player.HP * 0.8;
          this.enemy.attack = this.player.HP / 10;
        }

        // if the item has bonus_bleed, add it to the Shatterpoint move
        if(playerInventory[i].bonus_bleed) {
          this.player.moves[2].damageOverTime += playerInventory[i].bonus_bleed;
        }
      }
    },

    shootEnemy(move) {
      // check if the move hits
      if(this.checkHit(move.hitchance)) {
        // check if the move crits
        if(this.checkCrit(move.critchance)) {
          // if the move crits, deal double damage
          this.enemy.HP -= move.damage * 2;
          this.battleText = `You hit for ${move.damage * 2} damage!`;
        } else {
          // if the move does not crit, deal normal damage
          this.enemy.HP -= move.damage;
          this.battleText = `You hit for ${move.damage} damage!`;
        }
      } else {
        // if the move does not hit, display a message
        this.battleText = `You missed!`;
      }
    },

    pepperSpray(move) {
      // check if the move hits
      if(this.checkHit(move.hitchance)) {
        // decrease the enemy's hit chance by the moves hitChanceReduction
        this.enemy.hitchance -= move.reducedHitChance;

        // set the move's cooldown to the moves duration
        move.cooldown = move.duration;

        // set the enemy's pepperSprayDuration to the moves duration
        this.enemy.pepperSprayDuration = move.duration;

        // display a message
        this.battleText = `You reduced the enemy's hit chance by ${move.reducedHitChance * 100}%!`;
      } else {
        // if the move does not hit, display a message
        this.battleText = `You missed!`;
      }
    },

    shatterpoint(move) {
      // check if the move hits
      if(this.checkHit(move.hitchance)) {
        // set the move's cooldown to the moves duration
        move.cooldown = move.duration;

        // set the enemy's shatterpointDuration to the moves duration
        this.enemy.shatterpointDuration = move.duration;

        // deal damage
        this.enemy.HP -= move.damage;

        // display a message
        this.battleText = `You dealt ${move.damage} damage and applied ${move.damageOverTime} damage over time!`;
      } else {
        // if the move does not hit, display a message
        this.battleText = `You missed!`;
      }
    },

  }
}