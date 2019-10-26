let myObstacles = [];

let myGameArea = {
    canvas: document.createElement("canvas"),
    frames: 0,
    start: function() {
      this.canvas.width = 700;
      this.canvas.height = 500;
      this.context = this.canvas.getContext("2d");
      this.canvas.classList.add('canvasBg');
      document.body.insertBefore(this.canvas, document.body.childNodes[0]);
      this.interval = setInterval(updateGameArea, 20);
      let background = new Image();
      background.src = "./cave.jpg";
      background.onload = function() {
        ctx.drawImage(background, 0, 0);
      }
    },
    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function() {
        clearInterval(this.interval);
    },
    score: function() {
        let points = Math.floor(this.frames / 5);
        this.context.font = "18px serif";
        this.context.fillStyle = "black";
        this.context.fillText("Score: " + points, 350, 50);
    }
  }


  class Component {
    constructor(width, height, color, x, y) {
      this.width = width;
      this.height = height;
      this.color = color;
      this.x = x;
      this.y = y;
      this.speedX = 0;
      this.speedY = 0;
      //this.obsHeight = obsHeight;
      //this.obsWidth = obsWidth;
      
    }

    renderPlayer() {
      let img = new Image();
      img.src = "./imagens/Idle__001.png";
      let ctx = myGameArea.context;
      ctx.drawImage(img, this.x, this.y, 40, 40);
    }
/*
    renderObs() {
      let img = new Image();
      img.src = "./stone1.png";
      let ctx = myGameArea.context;
        ctx.drawImage(img, this.x, this.y, 250, 100); 
    }
*/
  
    update() {
      let ctx = myGameArea.context;
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    newPos() {
        this.x += this.speedX;
        this.y += this.speedY;
      }

    left() {
        return this.x;
    }
    right() {
        return this.x + this.width;
    }
    top() {
        return this.y;
    }
    bottom() {
        return this.y + this.height;
    }
    
    crashWith(obstacle) {
        return !(
          this.bottom() < obstacle.top() ||
          this.top() > obstacle.bottom() ||
          this.right() < obstacle.left() ||
          this.left() > obstacle.right()
        );
      }
    }
  
    function checkGameOver() {
        let crashed = myObstacles.some(function(obstacle) {
          return player.crashWith(obstacle);
        });
      
        if (crashed) {
          myGameArea.stop();
        }
      }
  

  document.onkeydown = function(e) {
    switch (e.keyCode) {
      case 38: // up arrow
        player.speedY -= 1;
        break;
      case 40: // down arrow
        player.speedY += 1;
        break;
      case 37: // left arrow
        player.speedX -= 1;
        break;
      case 39: // right arrow
        player.speedX += 1;
        break;
    }
  };

  function updateObstacles() {
    for (i = 0; i < myObstacles.length; i++) {
        myObstacles[i].y += 3;
        myObstacles[i].update();
      }

    myGameArea.frames += 1;
    if (myGameArea.frames % 70 === 0) {
      let x = myGameArea.canvas.width;
      let y = 0;
      let minWidth = 20;
      let maxWidth = 200;
      let randomGap = Math.floor(Math.random()*350)+1
      let width = Math.floor(
        Math.random() * (maxWidth - minWidth + 1) + minWidth+randomGap
      );
      let minGap = 70;
      let maxGap = 150;
      let gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
      /*
      let obs = new Image();
      obs.src = "./rock.jpg";
      ctx.drawImage(obs, 0, y, width, 10);
      ctx.drawImage(obs, width+gap, y, x-width-gap, 10);
      */
      myObstacles.push(new Component(width, 10, "green", 0, y));
      myObstacles.push(
        new Component(x-width-gap, 10, "green", width+gap, y)
        );
    }
  }


  document.onkeyup = function(e) {
    player.speedX = 0;
    player.speedY = 0;
  };

  function updateGameArea() {
    myGameArea.clear();
    player.newPos();
    player.renderPlayer();
    updateObstacles();
    checkGameOver();
    myGameArea.score();
  };

myGameArea.start();
let player = new Component(40, 40, "red", 350, 310);