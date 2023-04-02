const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const cellSize = 20;
const gridSize = canvas.width / cellSize;

let snake = [{ x: 10, y: 10 }];
let direction = "right";

function drawSnake() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "green";
    snake.forEach(function (cell) {
        ctx.fillRect(cell.x * cellSize, cell.y * cellSize, cellSize, cellSize);
    });
}

function moveSnake() {
    const head = { x: snake[0].x, y: snake[0].y };
    switch (direction) {
        case "up":
            head.y--;
            break;
        case "down":
            head.y++;
            break;
        case "left":
            head.x--;
            break;
        case "right":
            head.x++;
            break;
    }
    snake.unshift(head);
    snake.pop();
}

function changeDirection(event) {
    switch (event.keyCode) {
        case 37:
            if (direction != "right") direction = "left";
            break;
        case 38:
            if (direction != "down") direction = "up";
            break;
        case 39:
            if (direction != "left") direction = "right";
            break;
        case 40:
            if (direction != "up") direction = "down";
            break;
    }
}

document.addEventListener("keydown", changeDirection);

let gameLoop = setInterval(function () {
    moveSnake();
    drawSnake();
    drawFood();
    checkCollisions();
}, 100);

function randomFoodPosition() {
    return {
        x: Math.floor(Math.random() * gridSize),
        y: Math.floor(Math.random() * gridSize)
    }
}

let food = randomFoodPosition();

function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x * cellSize, food.y * cellSize, cellSize, cellSize);
}

function checkCollisions() {
    const head = snake[0];
    if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize) {
        alert("Game over!");
        clearInterval(gameLoop);
    }
    for (let i = 1; i < snake.length; i++) {
        if (head.x == snake[i].x && head.y == snake[i].y) {
            alert("Game over!");
            clearInterval(gameLoop);
        }
    }
    if (head.x == food.x && head.y == food.y) {
        snake.unshift(food);
        food = randomFoodPosition();
    }
}

ctx.strokeStyle = "black";
ctx.strokeRect(0, 0, canvas.width, canvas.height);
