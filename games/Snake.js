// Game
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const gridSize = 5;
const snakeColor = "green";
const gameSpeed = 80;
let snake = [{ x: 0, y: 0 }];
let food = { x: 0, y: 0 };
let dx = gridSize;
let dy = 0;

canvas.width = "200";
// canvas.height = "210";
canvas.style.backgroundColor = "black";

// Score
const playerName = document.getElementById("name");
const counter = document.getElementById("counter");
const user = document.querySelector(".user");
const points = document.querySelector(".points");
let score = 0;

const player = localStorage.getItem(`x_${playerName.value}`);

const storage = Object.keys(localStorage);
const storageSnake = storage.filter((i) => {
  const playerStr = i.split("_");
  return playerStr[0] === "snake";
});

if (storageSnake.length > 0) {
  if (!storageSnake.includes(`snake_${player}`)) {
    console.log("NAO TEM");
    localStorage.setItem(`snake_${player}`, [player, 0]);
  }

  storageSnake.forEach((i) => {
    const store = localStorage.getItem(i);
    const info = store.split(",");

    const elemName = document.createElement("p");
    const elemPoint = document.createElement("p");

    elemName.textContent = info[0];
    elemPoint.textContent = info[1];

    user.appendChild(elemName);
    points.appendChild(elemPoint);
  });
} else {
  localStorage.setItem(`snake_${player}`, [player, 0]);
}

// Função para criar a comida em uma posição aleatória
function createFood() {
  food.x = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
  food.y = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;
}

// Função para atualizar o estado do jogo
function update() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    createFood();
    score += 15;
    counter.innerText = score >= 100 ? "0" + score : "00" + score;
  } else {
    snake.pop();
  }
}

// Função para renderizar o jogo
function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "green";

  snake.forEach((segment) => {
    ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
  });

  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

// Função para verificar colisões
function checkCollision() {
  const head = snake[0];
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === head.x && snake[i].y === head.y) {
      return true;
    }
  }

  return (
    head.x < 0 ||
    head.x >= canvas.width ||
    head.y < 0 ||
    head.y >= canvas.height
  );
}

// Função principal do jogo
function gameLoop() {
  if (checkCollision()) {
    const playerInfo = localStorage.getItem("snake_" + player);
    const olderScore = playerInfo.split(",");
    const total = score > olderScore[1] ? score : olderScore[1];
    alert("Game Over!");
    localStorage.setItem(`snake_${player}`, [player, total]);
    window.location.reload();
    return;
  }

  update();
  render();
  setTimeout(gameLoop, gameSpeed);
}

// Iniciar o jogo
createFood();
gameLoop();

// Evento de escuta para as teclas de direção
document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowUp":
      dx = 0;
      dy = -gridSize;
      break;
    case "ArrowDown":
      dx = 0;
      dy = gridSize;
      break;
    case "ArrowLeft":
      dx = -gridSize;
      dy = 0;
      break;
    case "ArrowRight":
      dx = gridSize;
      dy = 0;
      break;
  }
});
