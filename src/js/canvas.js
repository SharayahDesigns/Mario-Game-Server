import platform from '../img/platform.png'
console.log(platform)
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const gravity = 1.5;
class Player {
  constructor() {
    this.position = {
      x: 100,
      y: 100,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.width = 30;
    this.height = 30;
  }

  draw() {
    c.fillStyle = "red";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y <= canvas.height)
      this.velocity.y += gravity;
    else this.velocity.y = 0;
  }
}
class Platform {
  constructor({ x, y, image }) {
    this.position = {
      x,
      y,
    };
    this.width = 200;
    this.height = 20;
    this.image = image
  }
  draw() {
    // c.fillStyle = "blue";
    // c.fillRect(this.position.x, this.position.y, this.width, this.height);
    c.drawImage(this.image, this.position.x, this.position.y)
  }
}
const image = new Image()
image.src = platform

const player = new Player();
const platforms = [
  new Platform({
    x: 200,
    y: 400,
    image
  }),
  new Platform({
    x: 500,
    y: 600,
    image
  }),
];
const keys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
};

let scrollOffset = 0;

//  -----------  ANIMATION    -------

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  player.update();
  platforms.forEach((platform) => {
    platform.draw();
  });

  if (keys.right.pressed && player.position.x < 400) {
    player.velocity.x = 5;
  } else if (keys.left.pressed && player.position.x > 100) {
    player.velocity.x = -5;
  } else {
    player.velocity.x = 0;

    if (keys.right.pressed) {
      scrollOffset += 5;
      platforms.forEach((platform) => {
        platform.position.x -= 5;
      });
    } else if (keys.left.pressed) {
      scrollOffset -= 5;
      platforms.forEach((platform) => {
        platform.position.x += 5;
      });
    }
  }

  // Platform collision detection
  platforms.forEach((platform) => {
    if (
      player.position.y + player.height <= platform.position.y &&
      player.position.y + player.height + player.velocity.y >=
        platform.position.y &&
      player.position.x + player.width >= platform.position.x &&
      player.position.x <= platform.position.x + platform.width
    ) {
      player.velocity.y = 0;
    }
  });
  if (scrollOffset > 2000) {
  console.log('you WIN!!!!')}
}
animate();

addEventListener("keydown", ({ keyCode }) => {
  // console.log(keyCode)
  switch (keyCode) {
    case 37:
      console.log("left");
      keys.left.pressed = true;

      break;
    case 40:
      console.log("down");
      break;
    case 39:
      console.log("right");
      keys.right.pressed = true;
      break;
    case 38:
      console.log("up");
      player.velocity.y -= 20;
      break;
  }
  console.log(keys.right.pressed);
});
addEventListener("keyup", ({ keyCode }) => {
  // console.log(keyCode)
  switch (keyCode) {
    case 37:
      console.log("left");
      keys.left.pressed = false;
      break;
    case 40:
      console.log("down");
      break;
    case 39:
      console.log("right");
      keys.right.pressed = false;
      break;
    case 38:
      console.log("up");
      player.velocity.y -= 20;
      break;
  }
  console.log(keys.right.pressed);
});
