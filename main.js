const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 500;
canvas.height = 1000
const numberOfEnemies = 20;
const enemiesArray = [];
let gameFrame = 0;

class Enemy {
    constructor() {
        this.image = new Image();
        this.image.src = "/images/enemy4.png";
        this.speed = Math.random() * 4 - 1;
        this.spriteWidth = 213;
        this.spriteHeight = 212;
        this.width = this.spriteWidth / 2;
        this.height = this.spriteHeight / 2;
        this.x = Math.random() * (canvas.width - this.width);
        this.y = Math.random() * (canvas.height - this.height);
        this.frame = 0;  
        this.newX = Math.random() * (canvas.width - this.width);  
        this.newY = Math.random() * (canvas.height - this.height);
        this.flapSpeed = Math.floor(Math.random() * 3 + 1);
        this.interval = Math.floor(Math.random() * 200 + 50)
    }

    draw() {
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }

    update() {
        this.draw();

        if (gameFrame % this.interval === 0) {
            this.newX = Math.random() * (canvas.width - this.width);  
            this.newY = Math.random() * (canvas.height - this.height);
        }
        // this.x = 0;
        // this.y = 0;
        let dx = this.x - this.newX;
        let dy = this.y - this.newY;
        this.x -= dx/70;
        this.y -= dy/70;
        
        // if (this.y >= canvas.height) {
        //     if (this.y >= canvas.height / 2) {
        //         this.y += Math.sin(this.angle) * this.curve;
        //     } else {
        //         this.y -= 1;
        //     }
        // }

        if (this.x + this.width < 0) this.x = canvas.width;

        // Animate sprites
        if (gameFrame % this.flapSpeed === 0) {
            this.frame > 7 ? this.frame = 0 : this.frame++;
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