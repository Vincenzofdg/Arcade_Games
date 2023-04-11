const canva = document.getElementById("canvas");
const ctx2 = canva.getContext("2d");

const player = {
  x: canva.width / 2,
  y: canva.height - 30,
  width: 30,
  height: 30,
  color: "blue",
  draw: function () {
    ctx2.fillStyle = this.color;
    ctx2.fillRect(this.x, this.y, this.width, this.height);
  },
};

function drawGame() {
  ctx2.clearRect(0, 0, canva.width, canva.height);
  player.draw();
}

function gameLoop() {
  drawGame();
  requestAnimationFrame(gameLoop);
}

gameLoop();
