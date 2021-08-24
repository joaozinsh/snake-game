let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let gameControll;
let statusGame = false;
let firtPass = 0;

let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}

let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

let direction = "right";

let score = 0;
let elementScore = document.getElementById("score")
elementScore.innerHTML = "Score: "+score;

let best = 0;
let elementBest = document.getElementById("best")
elementBest.innerHTML = "Best: "+best;

let elementStart = document.getElementById("start");
let elementRestart = document.getElementById("restart");
let elementGameOver = document.getElementById("game-over");
let elementBestScore = document.getElementById("best-score");

function criarBG() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarCobrinha() {
    for (i = 0; i < snake.length; i++) {
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function criarComida() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

criarBG();
criarCobrinha();
criarComida();

document.addEventListener('keydown', movimento);

function movimento(event){
    if (event.keyCode == 37 && direction != "right") direction = "left";
    if (event.keyCode == 38 && direction != "down") direction = "up";
    if (event.keyCode == 39 && direction != "left") direction = "right";
    if (event.keyCode == 40 && direction != "up") direction = "down";
}

function jogo() {
    if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if (snake[0].x < 0 * box && direction == "left") snake[0].x = 16 * box;
    if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if (snake[0].y < 0 * box && direction == "up") snake[0].y = 16 * box;

    for (i = 1; i < snake.length; i ++) {
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(gameControll);
            elementGameOver.style.display = "block";

            elementRestart.style.display = "block";

            if (score >= best) {
                best = score;
                elementBest.innerHTML = "Best: "+best;
                elementBestScore.style.display = "block";
                elementBestScore.innerHTML = "NEW BEST SCORE: "+best;
            }

            statusGame = false;
            return false;
        }
    }

    criarBG();
    criarCobrinha();
    criarComida();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;

    if (snakeX != food.x || snakeY != food.y) {
        snake.pop();
    } else {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;

        score += 1;
        elementScore.innerHTML = "Score: "+score;
    }
    
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

addEventListener('keyup', function(event){
  if (event.keyCode == 13 && statusGame == false) {
      if (firtPass == 0) {
        startGame();
      } else {
        restartGame();
      }
  }  
});

function startGame() {
    gameControll = setInterval(jogo, 100);
    elementStart.style.display = "none";
    statusGame = true;
    firtPass = 1;
}

function restartGame() {
    snake = [];
    snake[0] = {
        x: 8 * box,
        y: 8 * box
    }

    food = {
        x: Math.floor(Math.random() * 15 + 1) * box,
        y: Math.floor(Math.random() * 15 + 1) * box
    }

    direction = "right";

    score = 0;
    elementScore.innerHTML = "Score: "+score;

    gameControll = setInterval(jogo, 100);
    statusGame = true;
    
    elementGameOver.style.display = "none";
    elementRestart.style.display = "none";
    elementBestScore.style.display = "none";
}