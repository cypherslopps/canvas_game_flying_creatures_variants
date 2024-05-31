const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 500;
canvas.height = 1000
const numberOfEnemies = 10;
const enemiesArray = [];
let gameFrame = 0;

class Enemy {
    constructor() {
        this.image = new Image();
        this.image.src = "/images/enemy1.png";
        // this.speed = Math.random() * 5 - 2.5;
        this.spriteWidth = 293;
        this.spriteHeight = 155;
        this.width = this.spriteWidth / 2.5;
        this.height = this.spriteHeight / 2.5;
        this.x = Math.random() * (canvas.width - this.width);
        this.y = Math.random() * (canvas.height - this.height);
        this.frame = 0;  
        this.flapSpeed = Math.floor(Math.random() * 3 + 1);
    }

    draw() {
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }

    update() {
        this.draw();
        this.x += Math.random() * 15 - 7.5;
        this.y += Math.random() * 10 - 6.5;

        // Animate sprites
        if (gameFrame % this.flapSpeed === 0) {
            this.frame > 4 ? this.frame = 0 : this.frame++;
        }
    }
}

for (let i = 0; i < numberOfEnemies; i++) {
    const enemy = new Enemy();
    enemiesArray.push(enemy);
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    enemiesArray.forEach(enemy => {
        enemy.update();
    })
    gameFrame++;
    requestAnimationFrame(animate);
}
animate();