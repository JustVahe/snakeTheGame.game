let scoreblock = document.querySelector('.score');
let score = 0;
let timeout;

const buttons = document.querySelectorAll(".button");
const menu = document.querySelector(".menu");

buttons.forEach((item,index) => {
    item.addEventListener("click", () => {

        if (index == 0) {
            timeout = 200;
        } else if (index == 1) {
            timeout = 100;
        } else if (index == 2) {
            timeout = 50;
        } else if (index == 3) {
            timeout = 25;
        }

        menu.style.display = "none";

    })
});

const config = {
    step : 0,
    maxStep : 0,
    sizeCell : 16,
    sizeBerry : 4
}

const snake = {
    x: 16,
    y: 16,
    dx: config.sizeCell,
    dy: 0,
    tails : [],
    maxTails : 3
}

const berry = {
    x: 0,
    y: 0
}

let canvas = document.querySelector(".canvas");
let context = canvas.getContext("2d");
drawScore();

function gameLoop() {
    setTimeout(() => {
        requestAnimationFrame(gameLoop);
    }, timeout)
    if (++config.step < config.maxStep) {
        return;
    }
    config.step = 0;
    context.clearRect(0,0,canvas.width,canvas.height);

    if (timeout) {
        drawBerry();
        drawSnake();
    }
}

// if (timeout) {
    gameLoop();


function drawSnake() {
    snake.x += snake.dx;
    snake.y += snake.dy;

    collisionBorder();

    snake.tails.unshift({x:snake.x, y:snake.y});

    if (snake.tails.length > snake.maxTails) {
        snake.tails.pop();
    }

    snake.tails.forEach((el, index) => {
        if (index == 0) {
            context.fillStyle = "#EFCF00";
        } else{
            context.fillStyle = "#E86C00";
        }

        context.fillRect(el.x, el.y, config.sizeCell, config.sizeCell);

        if (el.x === berry.x && el.y === berry.y) {
            snake.maxTails++;
            incScore();
            randomPositionBerry();
        }

        for (let i = index+1; i < snake.tails.length; i++) {
            if (el.x === snake.tails[i].x && el.y === snake.tails[i].y) {
                refreshGame();
            }
        }
    });
}

function collisionBorder() {
    if (snake.x < 0) {
        snake.x = canvas.width - config.sizeCell;
    } else if (snake.x >= canvas.width) {
        snake.x = 0;
    }

    if (snake.y < 0) {
        snake.y = canvas.height - config.sizeCell;
    } else if (snake.y >= canvas.height) {
        snake.y = 0;
    }
}

function refreshGame() {
    score = 0;
    drawScore();

    snake.x = 160;
    snake.y = 160;
    snake.tails = [];
    snake.maxTails = 3;
    snake.dx = config.sizeCell;
    snake.dy = 0;

    randomPositionBerry();
}

function drawBerry() {
    context.beginPath();
    context.fillStyle = "#D30000";
    context.arc(berry.x + (config.sizeCell / 2), berry.y + (config.sizeCell / 2), config.sizeBerry, 0 , 2*Math.PI);
    context.fill();
}

function randomPositionBerry() {
    berry.x = getRandomInt(0, canvas.width / config.sizeCell) * config.sizeCell;
    berry.y = getRandomInt(0, canvas.width / config.sizeCell) * config.sizeCell;
}

function incScore() {
    score++;
    drawScore();
}

function drawScore() {
    scoreblock.innerText = score;
}

const getRandomInt = (min,max) => Math.floor(Math.random() * (max - min) + min);

document.addEventListener('keydown', (e) => {
    if (e.code == "KeyW" || e.code == "ArrowUp") {
        snake.dy = -config.sizeCell;
        snake.dx = 0;
    } else if (e.code == "KeyA" || e.code == "ArrowLeft") {
        snake.dx = -config.sizeCell;
        snake.dy = 0;
    } else if (e.code == "KeyS" || e.code == "ArrowDown") {
        snake.dy = config.sizeCell;
        snake.dx = 0;
    } else if (e.code == "KeyD" || e.code == "ArrowRight") {
        snake.dx = config.sizeCell;
        snake.dy = 0;
    }
})