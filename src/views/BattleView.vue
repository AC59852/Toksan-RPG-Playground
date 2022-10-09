<template>
  <section id="battle">
    <div class="battle__enemy">
      <div class="enemy__hp">
        <h2>{{this.enemy.name}} HP: {{ this.enemy.HP }}</h2>
        <progress class="progress__bar" :max="this.enemy.maxHP" :value="this.enemy.HP"></progress>
      </div>
      <div class="enemy__image">
        <img :src="this.enemy.image" alt="enemy image">
      </div>
    </div>
    <div class="battle__player">
      <div class="textbox__text battle__textbox">
        <p>{{ this.battleText }}</p>
      </div>
      <div class="player__moves">
        <div class="player__hp">
          <h2>HP: {{ this.player.HP }}</h2>
          <!-- progress bar -->
          <progress class="progress__bar progress__bar--player" :max="this.player.maxHP" :value="this.player.HP"></progress>
        </div>
        <ul class="battle__moves">
          <li v-for="(move, index) in player.moves" :key="index">
            <button class="battle__move" @click="attack(move)">{{ move.name }}</button>
          </li>
        </ul>
      </div>
    </div>
    <VictoryComponent v-if="victory" :currency="currency" />
  </section>
</template>

<script>
import battleMixin from '@/mixins/battleMixin';
import VictoryComponent from '@/components/VictoryComponent.vue';
export default {
    mixins: [battleMixin],
    data() {
        return {
            battleText: "What will you do?",
            victory: false,
            currency: 0,
            enemyImages: [
                { id: 0, image: "https://firebasestorage.googleapis.com/v0/b/toksan-rpg.appspot.com/o/f171.png?alt=media&token=5a103077-b407-436c-b1e0-e8985ff0fb8c" },
                { id: 1, image: "https://firebasestorage.googleapis.com/v0/b/toksan-rpg.appspot.com/o/f175.png?alt=media&token=df3fd3ec-01bc-43d3-9acf-c3c843d967e3" },
                { id: 2, image: "https://firebasestorage.googleapis.com/v0/b/toksan-rpg.appspot.com/o/f177.png?alt=media&token=738ead1f-19ab-4d28-8481-aef2a45622a3" },
                { id: 3, image: "https://firebasestorage.googleapis.com/v0/b/toksan-rpg.appspot.com/o/f298.png?alt=media&token=6d4330b0-220c-459a-a5ca-c026208d1ae2" },
            ],
            enemyNames: [
                { id: 0, name: "Hikaru Oki" },
                { id: 1, name: "Jun Uyeda" },
                { id: 2, name: "Masumi Yamane" },
                { id: 3, name: "Riku Kikuchi" },
                { id: 4, name: "Satsuki Komuro" },
                { id: 5, name: "Shinjiro Isa" },
                { id: 6, name: "Kaoru Uematsu" },
            ],
            backgroundImages: [
                { id: 0, image: "https://firebasestorage.googleapis.com/v0/b/toksan-rpg.appspot.com/o/boardwalk.jpg?alt=media&token=aa64fc8a-5f1a-4c1b-9244-f2868b1dcb9f" },
                { id: 1, image: "https://firebasestorage.googleapis.com/v0/b/toksan-rpg.appspot.com/o/splashscreen.jpg?alt=media&token=da335a13-cd85-4594-a96f-e9034adb7175" },
                { id: 2, image: "https://firebasestorage.googleapis.com/v0/b/toksan-rpg.appspot.com/o/coffee_rain.jpg?alt=media&token=ebacc760-afef-4820-a18f-3a71cc7fdd69" },
                { id: 3, image: "https://firebasestorage.googleapis.com/v0/b/toksan-rpg.appspot.com/o/street.jpg?alt=media&token=b04c6cfe-4b85-449b-9ffe-8dec2f35050a" },
            ],
            enemy: {
                HP: 100,
                maxHP: 100,
                attack: 10,
                hitchance: 0.8,
                critchance: 0.1,
                pepperSprayDuration: 0,
                shatterpointDuration: 0,
                name: null,
                image: null,
            },
            player: {
                HP: 100,
                maxHP: 100,
                moves: [
                    {
                        name: "Attack",
                        damage: 25,
                        hitchance: 0.9,
                        critchance: 0.1,
                    },
                    {
                        name: "Pepper Spray",
                        damage: 0,
                        hitchance: 0.9,
                        reducedHitChance: 0.5,
                        duration: 2,
                        cooldown: 0,
                    },
                    {
                        name: "Shatterpoint",
                        damage: 50,
                        damageOverTime: 10,
                        duration: 3,
                        hitchance: 1,
                        cooldown: 0,
                    }
                ]
            },
        };
    },
    created() {
        this.validateFight();
        this.enemy.name = this.enemyNames[Math.floor(Math.random() * this.enemyNames.length)].name;
        this.enemy.image = this.enemyImages[Math.floor(Math.random() * this.enemyImages.length)].image;
        document.body.style.backgroundImage = `url(${this.backgroundImages[Math.floor(Math.random() * this.backgroundImages.length)].image})`;
    },
    // watch the enemy HP. if it reaches 0 or below, end the battle
    watch: {
        "enemy.HP": function () {
            if (this.enemy.HP <= 0) {
                this.endBattle();
            }
        }
    },
    methods: {
        attack(move) {
            // check if the move has a cooldown
            if (move.cooldown) {
                // if the move has a cooldown, check if the cooldown is 0
                if (move.cooldown === 0) {
                    // if the cooldown is 0, attack
                    this.attackEnemy(move);
                }
                else {
                    // if the cooldown is not 0, display a message
                    this.battleText = `You can't use ${move.name} yet!`;
                    return;
                }
            }
            else {
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
            document.querySelectorAll(".battle__move").forEach(move => {
                // prevent the button from firing
                move.disabled = true;
                // change the cursor to not-allowed
                move.style.cursor = "not-allowed";
            });
            switch (move.name) {
                case "Attack":
                    this.shootEnemy(move);
                    break;
                case "Pepper Spray":
                    this.pepperSpray(move);
                    break;
                case "Shatterpoint":
                    this.shatterpoint(move);
                    break;
            }
        },
        endBattle() {
            alert("You won!");
            // set the enemy damage to 0
            this.enemy.attack = 0;
            this.enemy.hitchance = 0;
            this.enemy.shatterpointDuration = 0;
            // disbale the buttons
            document.querySelectorAll(".battle__move").forEach(move => {
                // prevent the button from firing
                move.disabled = true;
                // change the cursor to not-allowed
                move.style.cursor = "not-allowed";
            });

            this.getReward();
            // set the victory variable to true
            this.victory = true;

            document.querySelector(".battle__enemy").classList.add("hide");
            document.querySelector(".battle__player").classList.add("hide");
        },

        getReward() {
            // get a random number between 50 and 300
            let reward = Math.floor(Math.random() * 250) + 50;

            this.currency = reward;

            this.$store.commit("addCurrency", reward);
        },

        checkHit(hitchance) {
            // generate a random number between 0 and 1 limit to 2 decimals
            let hit = Math.random().toFixed(2);
            console.log("hit: " + hit);
            // check if the random number is less than the hitchance
            if (hit < hitchance) {
                // if the random number is less than the hitchance, return true
                return true;
            }
            else {
                // if the random number is not less than the hitchance, return false
                return false;
            }
        },

        checkCrit(critchance) {
            // generate a random number between 0 and 1
            let crit = Math.random().toFixed(2);
            console.log("crit: ", crit);
            // check if the random number is less than the critchance
            if (crit < critchance) {
                // if the random number is less than the critchance, return true
                return true;
            }
            else {
                // if the random number is not less than the critchance, return false
                return false;
            }
        },

        attackPlayer() {
            // check if the enemy hits
            if (this.checkHit(this.enemy.hitchance)) {
                // check if the enemy crits
                if (this.checkCrit(this.enemy.critchance)) {
                    // if the enemy crits, deal double damage
                    this.player.HP -= this.enemy.attack * 2;
                    this.battleText = `The enemy hit for ${this.enemy.attack * 2} damage!`;
                }
                else {
                    // if the enemy does not crit, deal normal damage
                    this.player.HP -= this.enemy.attack;
                    this.battleText = `The enemy hit for ${this.enemy.attack} damage!`;
                }
            }
            else {
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
            if (this.enemy.pepperSprayDuration > 0) {
                // decrease the enemy's pepperSprayDuration by 1
                this.enemy.pepperSprayDuration -= 1;
                // find the pepper spray move
                let pepperSpray = this.player.moves.find(move => move.name === "Pepper Spray");
                // set the move cooldown to the enemy's pepperSprayDuration
                pepperSpray.cooldown = this.enemy.pepperSprayDuration;
                // check if the enemy's pepperSprayDuration is 0
                if (this.enemy.pepperSprayDuration === 0) {
                    this.enemy.hitchance = 0.8;
                }
            }
            // check if the enemy has a shatterpointDuration
            if (this.enemy.shatterpointDuration > 0) {
                // decrease the enemy's shatterpointDuration by 1
                this.enemy.shatterpointDuration -= 1;
                // find the shatterpoint move in the players moves
                let shatterpoint = this.player.moves.find(move => move.name === "Shatterpoint");
                // set the move cooldown to the enemy's shatterpointDuration
                shatterpoint.cooldown = this.enemy.shatterpointDuration;
                // deal damage to the enemy over time
                this.enemy.HP -= shatterpoint.damageOverTime;
                // set battle text to the damage over time
                this.battleText = `The enemy took ${shatterpoint.damageOverTime} damage over time!`;
            }
            document.querySelectorAll(".battle__move").forEach(move => {
                // allow the button to fire
                move.disabled = false;
                // change the cursor to pointer
                move.style.cursor = "pointer";
            });
        }
    },

    components: { VictoryComponent }
}
</script>

<style>

</style>