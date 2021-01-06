import Level from "./level";
import Charmander from './charmander'
import PokeBall from './pokeballs'

class CharmandersRevenge {
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.dimensions = { width: canvas.width, height: canvas.height };
    this.registerEvents();
    this.restart();
  }

  registerEvents() {
    this.boundClickHandler = this.click.bind(this);

    this.ctx.canvas.addEventListener("keydown", this.boundClickHandler);
  }

  restart() {
    this.running = false;
    this.score = 0;
    this.level = new Level(this.dimensions);
    this.charmander = new Charmander(this.dimensions);
    this.pokeballs = new PokeBall(this.dimensions);
    this.animate();
  }

  animate() {
    this.ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height)
    this.level.animate(this.ctx);
    this.charmander.animate(this.ctx, this.level);
    this.pokeballs.animate(this.ctx);

    if(this.gameOver()) {
      
      this.charmander.flash()
      setTimeout(() => (this.restart(), alert('GAME OVER')), 100)
    }


    this.pokeballs.passedBall(this.charmander.bounds(), () => {
      this.score += 1
      console.log(this.score)
    })

    this.drawScore();

    if (this.running) {
      requestAnimationFrame(this.animate.bind(this));
    }
  }

  play() {
    this.running = true;
    this.animate();
  }

  click(e) {
    if (!this.running) {
      this.play();
    }

    if (e.keyCode === 38) {
      this.charmander.jump();
    }

    if(e.keyCode === 39) {
      this.charmander.dash();
    }
  }

  gameOver() {
    return (
      this.pokeballs.collidesWith(this.charmander.bounds()) ||
      this.charmander.outOfBounds(this.height)  
    );
  }


  drawScore(){

        const loc = {
          x: this.dimensions.width / 2,
          y: this.dimensions.height / 4,
        };
        this.ctx.font = "bold 50pt sigmar one";
        this.ctx.fillStyle = "white";
        this.ctx.fillText(this.score, loc.x, loc.y);
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 2;
        this.ctx.strokeText(this.score, loc.x, loc.y);

  }
}

export default CharmandersRevenge;