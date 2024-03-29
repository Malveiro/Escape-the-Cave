let myObstacles;

let mySound;
let myMusic;
let waterSound;

let startBtn = document.getElementById("startBtn");

let myGameArea;


  class Component {
    constructor(width, height, color, x, y) {
      this.width = width;
      this.height = height;
      this.color = color;
      this.x = x;
      this.y = y;
      this.speedX = 0;
      this.speedY = 0; 
    }

    renderPlayer() {
      let img = new Image();
      img.src = "./images/Run__001.png";
      let ctx = myGameArea.context;
      ctx.drawImage(img, this.x, this.y, 50, 70);
    }

    update() {
      let img = new Image();
      let ctx = myGameArea.context;
    //  ctx.fillStyle = this.color;
    //  ctx.fillRect(this.x, this.y, this.width, this.height);
     img.src = "./images/stone1.png";    
     ctx.drawImage(img, this.x, this.y, this.width, 100);
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

          let ctx = myGameArea.context;
          ctx.font = "8px Lucida Sans Unicode";
          ctx.fillStyle = "black";
          //ctx.fillText("You lost!", 250, 250);
          
          ctx.drawImage(myGameArea.gameOver,190,100, 350, 350);
          mySound.play();
          myGameArea.stop();
          myMusic.stop();
          waterSound.stop();
          document.getElementById("gameOver").style.display = "block";
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
        player.speedX = -5;
        break;
      case 39: // right arrow
        player.speedX = 5;
        break;
    }
  };


  function updateObstacles() {
   
    for (i = 0; i < myObstacles.length; i++) {
        myObstacles[i].y += 3;
        myObstacles[i].update();
    }

    if (myGameArea.points < 100) {
        myGameArea.frames += 1;
        if (myGameArea.frames % 75 === 0) {
          let x = myGameArea.canvas.width;
          let y = 0;
          let minWidth = 30;
          let maxWidth = 200;
          let randomGap = Math.floor(Math.random()*350)+1
          let width = Math.floor(
            Math.random() * (maxWidth - minWidth + 1) + minWidth+randomGap
          );
          let minGap = 80;
          let maxGap = 150;
          let gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
          myObstacles.push(new Component(width, 10, "green", 0, y));
          myObstacles.push(
            new Component(x-width-gap, 10, "green", width+gap, y)
            );
        }
      } else {
        myGameArea.frames += 1;
          if (myGameArea.frames % 60 === 0) {
          let x = myGameArea.canvas.width;
            let y = 0;
            let minWidth = 30;
            let maxWidth = 200;
            let randomGap = Math.floor(Math.random()*350)+1
            let width = Math.floor(
              Math.random() * (maxWidth - minWidth + 1) + minWidth+randomGap
            );
            let minGap = 80;
            let maxGap = 150;
            let gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
            myObstacles.push(new Component(width, 10, "green", 0, y));
            myObstacles.push(
              new Component(x-width-gap, 10, "green", width+gap, y)
            );
        }
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

let player = new Component(40, 40, "red", 350, 350);

function begin() {
  document.getElementById("gameOver").style.display = "none";
  document.getElementById("img").style.display = "none";
  document.getElementsByClassName("waves")[0].style.display = "block";

  myObstacles = [];
  myGameArea = {
    frames: 0,
    start: function() {
      this.canvas = document.getElementById("canvas");
      this.canvas.width = 700;
      this.canvas.height = 500;
      this.points = 0;
      this.context = this.canvas.getContext("2d");
      this.canvas.classList.add('canvasBg');
      document.body.insertBefore(this.canvas, document.body.childNodes[0]);
      this.interval = setInterval(updateGameArea, 20);
      startBtn.style.display = "none";
      this.gameOver = new Image();
      this.gameOver.src="./images/finito.png";
    },
    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function() {
      clearInterval(this.interval); 
    },
    score: function() {
        this.points = Math.floor(this.frames / 5);
        this.context.font = "18px serif";
        this.context.fillStyle = "black";
        this.context.fillText("Score: " + this.points, 330, 50);
        console.log(this.points);
    },
  }
  mySound = new sound("./sound/game_over_sound.wav");
  myMusic = new sound("./sound/background_music.wav");
  myMusic.loop = true;
  myMusic.play();
  console.log(myMusic)
  waterSound = new sound("./sound/waterSound.mp3");
  waterSound.play();
  myGameArea.start();
}