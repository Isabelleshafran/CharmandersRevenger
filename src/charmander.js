
const CONSTANTS = {
  GRAVITY: 3,
  JUMP_SPEED: 70,
  DASH_SPEED: 300,
  NO_SPEED: 50,
  CHAR_WIDTH: 220,
  CHAR_HEIGHT: 150,
};

class Charmander {
  constructor(dimensions) {
    this.dimensions = dimensions;
    this.dashing = false;
    this.gameover = false;
    this.tick = 0;
    this.x = 20;
    this.y = 155;
    this.vel = 0;
    this.currentFrame = 0;
    this.srcX;
    this.srcY = 1;
    this.sheetWidth = 900;
    this.sheetHeight = 600;
    this.cols = 2;
    this.rows = 2;
    this.width = this.sheetWidth / this.cols;
    this.height = this.sheetHeight / this.rows;
  }

  animate(ctx, level) {
      this.moveChar(level);
      this.drawChar(ctx);
      if (this.dashing === true) {
        this.drawFlames(ctx);
      }
      if (this.gameover === true) {
        this.drawFlash(ctx);
      }
  }

  jump() {
    let i = 0;
    while (i < CONSTANTS.JUMP_SPEED) {
      this.vel = -1 * i;
      i += 1;
    }
  }

  dash() {
    if(this.dashing === false) {
      this.dashing = true;
      let i = 50;
  
      while (i < CONSTANTS.DASH_SPEED) {
        this.x = i;
        i += 1;
      }
    }
  }

  moveChar(level) {
    this.y += this.vel;
    this.vel = CONSTANTS.GRAVITY;

    level.grass.forEach((grass) => {
      if (this.x > grass.left && this.x < grass.right) {
        if (this.y > grass.bottom - 75) {
          this.vel = 0;
        }
      }
    });

    if (this.x > 50) {
      this.x -= 5;
    } else {
      this.dashing = false;
    }
  }

  drawFlash(ctx) {
    let flash = new Image();
    flash.src = "./assets/images/flash.png";

    ctx.drawImage(
      flash,
      this.x - 75,
      this.y - 75,
      CONSTANTS.CHAR_WIDTH * 2,
      CONSTANTS.CHAR_HEIGHT * 2
    );

    flash.onload = () => {
      ctx.drawImage(
        flash,
        this.x - 75,
        this.y - 75,
        CONSTANTS.CHAR_WIDTH * 2,
        CONSTANTS.CHAR_HEIGHT * 2
      );
    };
  }

  updateFrame() {
    this.srcX = this.currentFrame * this.width;
    this.srcY = this.currentFrame * this.height;
    this.tick++;

    if (this.tick === 13) {
      this.currentFrame = ++this.currentFrame % this.cols; // 2% 2 = 1
      this.tick = 0;
    }
  }

  drawChar(ctx) {
    let char = new Image();
    char.src = "./assets/images/charsprite.png";

    this.updateFrame();

    char.onload = () => {
      ctx.drawImage(
        char,
        this.srcX,
        this.srcY,
        this.width,
        this.height,
        this.x,
        this.y,
        CONSTANTS.CHAR_WIDTH,
        CONSTANTS.CHAR_HEIGHT
      );
    };

    ctx.drawImage(
      char,
      this.srcX,
      this.srcY,
      this.width,
      this.height,
      this.x,
      this.y,
      CONSTANTS.CHAR_WIDTH,
      CONSTANTS.CHAR_HEIGHT
    );
  }

  drawFlames(ctx) {
    let flames = new Image();
    flames.src = "./assets/images/flames.png";

    ctx.drawImage(flames, this.x - 90, this.y, 200, CONSTANTS.CHAR_HEIGHT);
  }

  bounds() {
      return {
        left: this.x,
        right: this.x + CONSTANTS.CHAR_WIDTH,
        top: this.y,
        bottom: this.y,
      };

  }

  outOfBounds() {
    const aboveTheTop = this.y < -100;
    const belowTheBottom = this.y > 310;
    return belowTheBottom || aboveTheTop;
  }
}

export default Charmander