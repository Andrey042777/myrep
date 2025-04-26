const canvas = document.querySelector('#game')
const ctx = canvas.getContext('2d')
const canvasWidth = canvas.clientWidth;
const canvasHeight = canvas.clientHeight;
const size = canvasWidth / 20
let Snake = function() {
    this.size = size;
    this.color = 'green';
    this.x = 0;
    this.y = 0;
    this.speed = this.size;
    this.speedX = this.size;
    this.speedY = 0;
    this.tail =[[0,0]]
    
    this.show = function() {
        ctx.fillStyle = this.color;
        for (let i = 0; i < this.tail.length; i++){
            const el = this.tail[i];
            ctx.fillRect(el[0],el[1], this.size, this.size);
        }
    }

    this.update = function() {
        this.x += this.speedX;
        this.y += this.speedY;

        for (let i = 0; i < this.tail.length - 1; i++) {
            this.tail[i] = this.tail[i+1]
            this.checkSelfCollision(this.tail[i])
        }
        this.tail[this.tail.length - 1] = [this.x, this.y]
    }
    this.move = function(direction) {
    if (direction === 97 && this.speedX <= 0) {
        this.speedX = this.speed * -1;
        this.speedY = 0;
    } else if (direction === 115 && this.speedY >= 0) {
        this.speedX = 0;
        this.speedY = this.speed;
    } else if (direction === 100 && this.speedX >= 0) {
        this.speedX = this.speed;
        this.speedY = 0;
    } else if (direction === 119 && this.speedY <= 0) {
        this.speedX = 0;
        this.speedY = this.speed * -1;
    }
    }
    this.wallCollision = function() {
        if ((this.x + this.size > canvasWidth) || (this.x < 0) || (this.y < 0) || (this.y + this.size> canvasHeight)) {
            return true
        }
        return false
    }
    this.eat = function(food) {
        if (food.x == this.x && food.y == this.y) {
            this.grow()
            return true
        }
        return false
    }
    this.grow = function() {
        this.tail.push([this.x,this.y])
    }
    this.getLength = function() {
        return this.tail.length
    }
    this.gameover = function() {
        ctx.fillStyle = 'black';
        ctx.font = '90px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Your lose!', canvasWidth / 2, canvasHeight / 2);
        clearInterval(gameLoop)
    }
    this.checkSelfCollision = function(tail) {
        if (tail[0] === this.x && tail[1] === this.y) {
            this.gameover();
        }
    }
}

let Score = function() {
    this.score = 1;
    this.show = function() {
        ctx.fillStyle = 'blue';
        ctx.font = '30px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Your Score:' + this.score, canvasWidth / 2, 20)
    }
    this.update = function(score) {
        this.score = score;
    }
}
let score = new Score();

let gameLoop = setInterval(game, 150)
let s = new Snake();
let Food = function() {
    this.x = null;
    this.y = null;
    this.color = 'red';
    this.size = size;
    
    this.show = function() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);

    }
    this.getRandomSpot = function() {
        return Math.floor(Math.random() * 20) * this.size;
    }
    this.pickLocation = function() {
        this.x = this.getRandomSpot();
        this.y = this.getRandomSpot();
    }
}

let f = new Food();

f.pickLocation();

function game() {
    ctx.clearRect(0,0, canvas.clientWidth, canvas.clientHeight);
    score.show();
    score.update(s.getLength())
    s.update();
    s.show();
    f.show();


    if (s.wallCollision()) {
        s.gameover();
    }
    if (s.eat(f)) {
        f.pickLocation();
    }


}

document.addEventListener('keypress', keyPressEvent)

function keyPressEvent(event) {
    s.move(event.keyCode)
}