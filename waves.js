
let img = new Image();
img.src = './ondas.png';

img.height = 150px;
img.width = 300px;

let image = {
  img: img,
  x: 0,
  speed: -1,
  img.height = 150;
  img.width = 300;

  move: function() {
    this.x += this.speed;
    this.x %= myGameArea.canvas.width;
  },

  draw: function() {
    myGameArea.context.drawImage(this.img, this.x, 0);
    if (this.speed < 0) {
      myGameArea.context.drawImage(this.img, this.x + myGameArea.canvas.width, 0);
    } else {
      myGameArea.context.drawImage(this.img, this.x - this.img.width, 0);
    }
  },
};

function updateCanvas() {
  image.move();

  myGameArea.context.clearRect(0, 0, myGameArea.canvas.width, myGameArea.canvas.height);
  image.draw();

  requestAnimationFrame(updateCanvas);
}

// start calling updateCanvas once the image is loaded
img.onload = updateCanvas;

