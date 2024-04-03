const rulesBtn = document.getElementById('rules-btn');
const closeBtn = document.getElementById('close-btn');
const startBtn = document.getElementById('start');
const rules = document.getElementById('rules');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const brickRowCount = 9;
const brickColumnCount = 5;
let score = 0;
let playing = false;

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 10,
    speed: 4,
    dx: 4,
    dy: -4
}

const paddle = {
    x: canvas.width / 2 - 40,
    y: canvas.height - 20,
    w: 80,
    h: 10,
    speed: 8,
    dx: 0
}

const brickInfo = {
    w: 70,
    h: 20,
    padding: 10,
    offsetX: 45,
    offsetY: 60,
    visible: true
}

let bricks = [];
for (let i = 0; i < brickRowCount; i++) {
    bricks[i] = [];
    for (let j = 0; j < brickColumnCount; j++) {
        const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
        const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
        bricks[i][j] = {x, y, ...brickInfo};
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2 );
    ctx.fillStyle = '#0095dd';
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.fillRect(paddle.x, paddle.y, paddle.w, paddle.h);
    ctx.fillStyle = '#0095dd';
    ctx.fill();
    ctx.closePath();
}

function drawScore() {
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, canvas.width-100, 30);
}

function drawBricks() {
    bricks.forEach(column => column.forEach(brick => {
        ctx.beginPath();
        ctx.rect(brick.x, brick.y, brick.w, brick.h);
        ctx.fillStyle = brick.visible ? '#0095dd' : 'transparent';
        ctx.fill();
        ctx.closePath();
    }));
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawScore();
    drawBricks();
}

function movePaddle() {
    paddle.x += paddle.dx;

    if (paddle.x < 0) paddle.x = 0;
    if (paddle.x + paddle.w > canvas.width) paddle.x = canvas.width - paddle.w;
}

function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.y + ball.size > canvas.height || ball.y + ball.size < 0) ball.dy *= -1;
    if (ball.x + ball.size > canvas.width || ball.x + ball.size < 0) ball.dx *= -1;

    if (
        ball.x + ball.size > paddle.x &&
        ball.x - ball.size < paddle.x + paddle.w &&
        ball.y + ball.size > paddle.y
    ) ball.dy = -1 * ball.speed;

    bricks.forEach(column => {
        column.forEach(brick => {
            if (brick.visible) {
                if (
                    ball.y - ball.size < brick.y + brick.h &&
                    ball.y + ball.size > brick.y &&
                    ball.x - ball.size > brick.x &&
                    ball.x + ball.size < brick.x + brick.w
                    ) {
                    brick.visible = false;
                    ball.dy *= -1;
                    increaseScore();
                }
            }
        })
    });

    if (ball.y + ball.size > canvas.height) endGame();
}

function increaseScore() {
    score++;

    if (score === brickRowCount * brickColumnCount) endGame();
}

function showAllBricks() {
    bricks.forEach(column => {
        column.forEach(brick => {
            brick.visible = true;
        })
    })
}

function keyDown(e) {
    if (e.key === 'ArrowRight' || e.key === 'Right') paddle.dx = paddle.speed;
    if (e.key === 'ArrowLeft' || e.key === 'Left') paddle.dx = -paddle.speed;
}

function keyUp(e) {
    if (e.key === 'ArrowRight' ||
        e.key === 'Right' ||
        e.key === 'ArrowLeft' ||
        e.key === 'Left') {
            paddle.dx = 0;
        }
}

function update() {
    moveBall();
    movePaddle();
    draw();
    if (playing) requestAnimationFrame(update);
}

function endGame() {
    playing = false;
}

function startGame() {
    showAllBricks();
    score = 0;
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = ball.speed;
    ball.dy = -ball.speed;
    paddle.x = canvas.width / 2 - 40;
    playing = true;
    update();
}

startBtn.addEventListener('click', startGame);
rulesBtn.addEventListener('click', () => rules.classList.add('show'));
closeBtn.addEventListener('click', () => rules.classList.remove('show'));

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);
