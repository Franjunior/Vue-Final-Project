<template>
  <main>
    <div>
      <div class ="head"></div>
      <div class="container">
        <img
          :src="walkGif"
          alt="Line"
          class="line"
          :style="{ top: `${lineY}px`, left: `${lineX}px` }"
        />
        <img
          v-for="(fireImg, index) in redBoxes"
          :key="index"
          :src="fire"
          class="fire"
          :style="{ top: `${fireImg.top}px`, left: `${fireImg.left}px` }"
        />
      
      <div v-if="collision" class = "lose">
      <br /><br />
      <img src="./assets/YouLose.png" alt="You lose! Line collided with a red box." />
      </div>

      <div v-if="congratulations" class = "success">
      <br /><br />
      <img src="./assets/Congrats.gif" style="width: 600px; height: 350px;" alt="You lose! Line collided with a red box." />
      </div>

      <div v-if="lvl2" class = "lvl2">
      <br /><br />
      <img src="./assets/lvl2.jpg" style="width: 1500px; height: 1000px;" alt="You lose! Line collided with a red box." />
      </div>
    
      <div class ="button">
      <button v-if="collision" class="btn btn-danger" @click="resetGame">Play Again</button>
    </div>
    <div class ="button2">
      <button v-if="congratulations" class="btn btn-success" @click="nextGame">Play Again</button>
    </div>
    </div>
    </div>
  </main>
</template>

<script>
import walkGif from './assets/walk.gif';
import fire from './assets/passion.gif';


export default {
  data() {
    return {
      lineX: 0,
      lineY: 336,
      step: 10,
      containerWidth: 900,
      containerHeight: 400,
      collision: false,
      congratulations: false,
      lvl2: false,
      walkGif,
      fire,
      redBoxes: [
        { top: 100, left: 90 },
        { top: 150, left: 90 },
        { top: 200, left: 90 },
        { top: 250, left: 90 },
        { top: 300, left: 90 },
        { top: 350, left: 90 },
        { top: 350, left: 150 },
        { top: 350, left: 200 },
        { top: 0, left: 300 },
        { top: 50, left: 300 },
        { top: 100, left: 300 },
        { top: 250, left: 300 },
        { top: 300, left: 300 },
        { top: 350, left: 300 },
        { top: 350, left: 250 },
        { top: 0, left: 450 },
        { top: 50, left: 450 },
        { top: 100, left: 450 },
        { top: 150, left: 450 },
        { top: 200, left: 450 },
        { top: 200, left: 600 },
        { top: 0, left: 600 },
        { top: 50, left: 600 },
        { top: 250, left: 600 },
        { top: 300, left: 600 },
        { top: 350, left: 600 },
        { top: 0, left: 800 },
        { top: 50, left: 800 },
        { top: 100, left: 800 },
        { top: 150, left: 800 },
        { top: 200, left: 800 },
        { top: 350, left: 800 },
        { top: 350, left: 700 },
        { top: 350, left: 750 },
        { top: 350, left: 650 },
        
      ],
    };
  },
  mounted() {
    window.addEventListener('keydown', this.handleKeyDown);
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  },
  methods: {
    moveLine(direction) {
      switch (direction) {
        case 'up':
          this.lineY = Math.max(this.lineY - this.step, 0);
          break;
        case 'down':
          this.lineY = Math.min(this.lineY + this.step, 336);
          break;
        case 'left':
          this.lineX = Math.max(this.lineX - this.step, 0);
          break;
        case 'right':
          this.lineX = Math.min(this.lineX + this.step, this.containerWidth - 5); 
          if (this.lineX >= this.containerWidth - 5) {
            this.congratulations = true;
          }
          break;
      }
    },
    checkCollision() {
      const lineRight = this.lineX + 50; 
      const lineBottom = this.lineY + 50;

      for (const box of this.redBoxes) {
        const boxRight = box.left + 30;
        const boxBottom = box.top + 30;

        if (
          this.lineX < boxRight &&
          lineRight > box.left &&
          this.lineY < boxBottom &&
          lineBottom > box.top
        ) {
          this.collision = true;
          return;
        }
      }
    },

    handleKeyDown(event) {
      if (this.collision || this.congratulations) return;

      switch (event.key) {
        case 'ArrowUp':
          this.moveLine('up');
          this.checkCollision();
          break;
        case 'ArrowDown':
          this.moveLine('down');
          this.checkCollision();
          break;
        case 'ArrowLeft':
          this.moveLine('left');
          this.checkCollision();
          break;
        case 'ArrowRight':
          this.moveLine('right');
          this.checkCollision();
          break;
      }
    },
    resetGame() {
      Swal.fire({
        title: 'Play Again?',
        text: 'Are you sure you want to play again?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, play again!',
        cancelButtonText: 'No, cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          this.lineX = 0;
          this.lineY = 336;
          this.collision = false;
          this.congratulations = false;
        }
      });
    },

    nextGame() {
      Swal.fire({
        title: 'Move to the next level?',
        text: 'Are you sure you want to go to the next level?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Go to Level 2!',
        cancelButtonText: 'No, Stay in this Level',
      }).then((result) => {
        if (result.isConfirmed) {
          this.lineX = 0;
          this.lineY = 336;
          this.collision = false;
          this.congratulations = false;
          this.lvl2 = true;
        }
        else{
          this.lineX = 0;
          this.lineY = 336;
          this.collision = false;
          this.congratulations = false;

        }
      });
    },
  },
};
</script>

<style scoped>
main {
  
  background-image: url('./assets/bg2.jpg');
  background-size: cover;
  height: 100vh;
}

.head{
  background-image: url('./assets/WELCOME.png');
  width: 620px;
  height: 210px;
}

.container {
  position: relative;
  width: 900px;
  height: 400px;
  border: 3px solid #000000;
  margin-top: 30px;
  margin-left: 50px;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url('./assets/bg.jpg');
}

.line {
  position: absolute;
  width: 40px;
  height: 60px;
}

.lose{
  position: absolute;
  width: 40px;
  height: 60px;
  left: 120px;
}

.success{
  position: relative;
  left:150px;
}

.lvl2{
  position: relative;
  left:-65px;
  top:-495px;
}


.button{
  position: absolute;
  margin-left: 390px;
  margin-top: 200px
}

.button2{
  position: absolute;
  margin-left: 390px;
  margin-top: -120px
}
.fire {
  position: absolute;
  width: 30px;
  height: 30px;
}
</style>
