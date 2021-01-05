const CONSTANTS = {
    GRASS_SPEED: 3,
    GRASS_WIDTH: 500, 
    GRASS_HEIGHT: 100,
    GRASS_SPACING: 610
}

class Level {
  constructor(dimensions) {
    this.dimensions = dimensions;

    const grassDistance = 0


    this.grass = [
      this.randomGrass(grassDistance),
      this.randomGrass(grassDistance + CONSTANTS.GRASS_SPACING),
      this.randomGrass(grassDistance + (CONSTANTS.GRASS_SPACING * 2)),
    ];
  }

  animate(ctx) {
    this.drawBackground(ctx);
    this.moveGrass();
    this.drawGrass(ctx)

  }

  drawBackground(ctx) {
    let sky = new Image();
    sky.src = "../images/sky.png";
    ctx.drawImage(sky, 0, 0, this.dimensions.width, this.dimensions.height);
    sky.onload = () => {
      ctx.drawImage(sky, 0, 0, this.dimensions.width, this.dimensions.height);
    };
  }

  randomGrass(x){

    const grass = {
      left: x,
      right: CONSTANTS.GRASS_WIDTH + x,
      bottom: Math.floor(Math.random() * 60) + 200,
    };
    // console.log(grass.left, grass.right)


    return grass
  }

  moveGrass(){
      this.eachGrass(function(grass) {
        grass.left -= CONSTANTS.GRASS_SPEED, 
        grass.right -= CONSTANTS.GRASS_SPEED, 
        grass.bottom
      })
      
    
      
      // to make game go faster find a way to -= 2 more over time 
      
      if(this.grass[0].right <= 0) {
        
        
        // console.log(count)
          this.grass.shift();
          const newG = this.grass[1].left + CONSTANTS.GRASS_SPACING;
          this.grass.push(this.randomGrass(newG))
      
      }
  }

  drawGrass(ctx){

        this.eachGrass(function (grass) {
          let ground = new Image();
          ground.src = "../images/grass.png";

          // let height = 


            ctx.drawImage(ground, grass.left, grass.bottom, CONSTANTS.GRASS_WIDTH, CONSTANTS.GRASS_HEIGHT);


            ground.onload = () => {
  
     
            ctx.drawImage(
              ground,
              grass.left,
              grass.bottom,
              CONSTANTS.GRASS_WIDTH,
              CONSTANTS.GRASS_HEIGHT
            );


          };
        });
  }


eachGrass(callback) {
    this.grass.forEach(callback.bind(this));
  }

}

export default Level;