// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number

const random = (min, max) => {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}

// function to generate random color

const randomRGB = () => {
    return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

// ここから

/**
 * ボールオブジェクト
 *
 * @param {number} x - 初期表示の x 座標
 * @param {number} y - 初期表示の y 座標
 * @param {number} velX - x 方向への移動距離
 * @param {number} velY - y 方向への移動距離
 * @param {string} color - ボールの色（'rgb(red, green, blue)'）
 * @param {number} size - ボールの
 */
function Ball(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
}

// thisはBall?
Ball.prototype.draw = function () {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
}

let testBall = new Ball(50, 100, 4, 4, 'blue', 10);

testBall.x
testBall.size
testBall.color
testBall.draw()

Ball.prototype.update = function () {
    if ((this.x + this.size) >= width) {
        this.velX = -(this.velX);
    }

    if ((this.x - this.size) <= 0) {
        this.velX = -(this.velX);
    }

    if ((this.y + this.size) >= height) {
        this.velY = -(this.velY);
    }

    if ((this.y - this.size) <= 0) {
        this.velY = -(this.velY);
    }

    // this.x = this.x + this.velX
    this.x += this.velX;
    // this.y = this.y + this.velY
    this.y += this.velY;
}


// 衝突判定
Ball.prototype.collisionDetect = function () {
    for (let j = 0; j < balls.length; j++) {
        // ballsがthis(どこのこと?Ball?)と同等ではない場合（!==じゃだめ？）
        // if (this !== balls[j])
        if (!(this === balls[j])) {
            const dx = this.x - balls[j].x;
            const dy = this.y - balls[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.size + balls[j].size) {
                balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')';
            }
        }
    }
}


const balls = [];

while (balls.length < 5) {
    let size = random(10, 20);
    // ボールの位置は、常に少なくともボール 1 個分の幅で描画されます。
    // 描画エラーを避けるため、キャンバスの端から離して描画されます。
    let ball = new Ball(
        random(0 + size, width - size),
        random(0 + size, height - size),
        random(-7, 7),
        random(-7, 7),
        'rgb(' + random(0, 255) + ',' + random(0, 255) + '+' + random(0, 255) + ')',
        size
    );

    balls.push(ball);
}

const loop = () => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < balls.length; i++) {
        balls[i].draw();
        balls[i].update();
        balls[i].collisionDetect()
    }

    requestAnimationFrame(loop);
}

loop();


