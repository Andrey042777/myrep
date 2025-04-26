let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');
let Circle = function(x,y, size, color, dx, dy) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.dx = dx;
    this.dy = dy;
    this.detectCollision = function(other){
        for (let i = 0; i < other.length; i++) {
            const el = other [i];
            if (el != this) {
                let distanceX = this.x - el.x;
                let distanceY = this.y - el.y;
                let distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
                if (distance < this.size + el.size) {
                    let tmpX = this.dx;
                    let tmpY = this.dy;
                    this.dx = el.dx;
                    this.dy = el.dy;
                    el.dx = tmpX;
                    el.dy = tmpY;
                }
            }
        }
    }
    this.drawCircle = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    this.collision = function() {
        if (this.x + this.size > canvas.clientWidth || this.x - this.size < 0) {
            this.dx *= -1;
        }
        if (this.y + this.size > canvas.clientHeight || this.y - this.size < 0) {
            this.dy *= -1;
        }
    }
    this.move = function() {
        this.x += this.dx;
        this.y += this.dy;
        this.collision();
    }

}
let c1 = new Circle(20, 20, 20, 'red', 7, 4)
let c2 = new Circle(50,75,30,'blue',6,4)
let c3 = new Circle(35, 150, 15,'green',5,4)
let circles = [c1,c2,c3]
//c1.drawCircle()//
function update() {
    ctx.clearRect(0,0, canvas.clientWidth, canvas.clientHeight)
    c1.move();
c1.detectCollision(circles)
    c1.drawCircle();
    c2.move();
c2.detectCollision(circles)
    c2.drawCircle();
    c3.move();
c3.detectCollision(circles)
    c3.drawCircle();
    requestAnimationFrame(update);

}
update();
