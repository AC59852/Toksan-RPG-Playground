<template>
  <section id="battle">
    <div class="battle__enemy">
      <h2>HP: {{ this.enemy.HP }}</h2>
      <!-- progress bar -->
      <div class="progress">
        <progress class="progress__bar" :max="this.enemy.maxHP" :value="this.enemy.HP"></progress>
      </div>
    </div>
    <div class="battle__text">
      <div class="battle__textbox">
        <p>{{ this.battleText }}</p>
      </div>
      <ul class="battle__moves">
        <li v-for="(move, index) in player.moves" :key="index">
          <button class="battle__move" @click="attack(move)">{{ move.name }}</button>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import battleMixin from '@/mixins/battleMixin';
export default {

  mixins: [battleMixin],
  
  data() {
    return {
      battleText: "What will you do?",
      victory: false,
      enemy: {
        HP: 100,
        maxHP: 100,
        attack: 10,
        hitchance: 0.8,
        critchance: 0.1,
        pepperSprayDuration: 0,
        shatterpointDuration: 0,
      },

      player: {
        HP: 100,
        moves: [
          {
            name: 'Attack',
            damage: 25,
            hitchance: 0.9,
            critchance: 0.1,
          },
          {
            name: 'Pepper Spray',
            damage: 0,
            hitchance: 0.9,
            reducedHitChance: 0.5,
            duration: 2,
            cooldown: 0,
          },
          {
            name: 'Shatterpoint',
            damage: 50,
            damageOverTime: 10,
            duration: 3,
            hitchance: 1,
            cooldown: 0, 
          }
        ]
      },
    }
  },

  mounted() {
    this.validateFight()
  },

  // watch the enemy HP. if it reaches 0 or below, end the battle
  watch: {
    'enemy.HP': function() {
      if(this.enemy.HP <= 0) {
        this.endBattle()
      }
    }
  },


  methods: {
    attack(move) {
      // check if the move has a cooldown
      if(move.cooldown) {
        // if the move has a cooldown, check if the cooldown is 0
        if(move.cooldown === 0) {
          // if the cooldown is 0, attack
          this.attackEnemy(move);
        } else {
          // if the cooldown is not 0, display a message
          this.battleText = `You can't use ${move.name} yet!`;
        }
      } else {
        // if the move does not have a cooldown, attack
        this.attackEnemy(move);
      }

      // have the enemy attack after 1 second
      setTimeout(() => {
          this.attackPlayer();
        }, 2000);
    },
    
    attackEnemy(move) {
      // prevent the player from attacking until the checkDebuffs function is done
      document.querySelectorAll('.battle__move').forEach(move => {
        // prevent the button from firing
        move.disabled = true;

        // change the cursor to not-allowed
        move.style.cursor = "not-allowed";
      })


      switch(move.name) {
        case 'Attack':
          this.shootEnemy(move);
          break;
        case 'Pepper Spray':
          this.pepperSpray(move);
          break;
        case 'Shatterpoint':
          this.shatterpoint(move);
          break;
      }
    },

    endBattle() {
      alert("You won!");

      // disbale the buttons
      document.querySelectorAll('.battle__move').forEach(move => {
        // prevent the button from firing
        move.disabled = true;

        // change the cursor to not-allowed
        move.style.cursor = "not-allowed";
      })

      // set the victory variable to true
      this.victory = true;
    },

    checkHit(hitchance) {
      // generate a random number between 0 and 1 limit to 2 decimals
      let hit = Math.random().toFixed(2);
      console.log("hit: " + hit);
      // check if the random number is less than the hitchance
      if(hit < hitchance) {
        // if the random number is less than the hitchance, return true
        return true;
      } else {
        // if the random number is not less than the hitchance, return false
        return false;
      }
    },

    checkCrit(critchance) {
      // generate a random number between 0 and 1
      let crit = Math.random().toFixed(2);
      console.log("crit: ", crit)
      // check if the random number is less than the critchance
      if(crit < critchance) {
        // if the random number is less than the critchance, return true
        return true;
      } else {
        // if the random number is not less than the critchance, return false
        return false;
      }
    },

    attackPlayer() {
      // check if the enemy hits
      if(this.checkHit(this.enemy.hitchance)) {
        // check if the enemy crits
        if(this.checkCrit(this.enemy.critchance)) {
          // if the enemy crits, deal double damage
          this.player.HP -= this.enemy.attack * 2;
          this.battleText = `The enemy hit for ${this.enemy.attack * 2} damage!`;
        } else {
          // if the enemy does not crit, deal normal damage
          this.player.HP -= this.enemy.attack;
          this.battleText = `The enemy hit for ${this.enemy.attack} damage!`;
        }
      } else {
        // if the enemy does not hit, display a message
        this.battleText = `The enemy missed!`;
      }

      // settime out 1 second to check debuffs
      setTimeout(() => {
        this.checkDebuffs();
      }, 2000);
    },

    checkDebuffs() {
      // check if the enemy has a pepperSprayDuration
      if(this.enemy.pepperSprayDuration > 0) {
        // decrease the enemy's pepperSprayDuration by 1
        this.enemy.pepperSprayDuration -= 1;

        // find the pepper spray move
        let pepperSpray = this.player.moves.find(move => move.name === 'Pepper Spray');

        // set the move cooldown to the enemy's pepperSprayDuration
        pepperSpray.cooldown = this.enemy.pepperSprayDuration;

        // check if the enemy's pepperSprayDuration is 0
        if(this.enemy.pepperSprayDuration === 0) {
          this.enemy.hitchance = 0.8;
        }
      }

      // check if the enemy has a shatterpointDuration
      if(this.enemy.shatterpointDuration > 0) {
        // decrease the enemy's shatterpointDuration by 1
        this.enemy.shatterpointDuration -= 1;

        // find the shatterpoint move in the players moves
        let shatterpoint = this.player.moves.find(move => move.name === 'Shatterpoint');

        // set the move cooldown to the enemy's shatterpointDuration
        shatterpoint.cooldown = this.enemy.shatterpointDuration;

        // deal damage to the enemy over time
        this.enemy.HP -= shatterpoint.damageOverTime;

        // set battle text to the damage over time
        this.battleText = `The enemy took ${shatterpoint.damageOverTime} damage over time!`;
      }

      document.querySelectorAll('.battle__move').forEach(move => {
        // allow the button to fire
        move.disabled = false;

        // change the cursor to pointer
        move.style.cursor = "pointer";
      })
    }
  }
}
</script>

<style>

</style>