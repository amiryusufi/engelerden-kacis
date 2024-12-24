const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 500;

let player = {
  x: 50,
  y: canvas.height / 2 - 25,
  width: 50,
  height: 50,
  color: "lime",
  speed: 5,
};

let obstacles = [];
let gameOver = false;
let score = 0;

function createObstacle() {
  const size = Math.random() * 50 + 20;
  obstacles.push({
    x: canvas.width,
    y: Math.random() * (canvas.height - size),
    width: size,
    height: size,
    color: "red",
    speed: Math.random() * 3 + 2,
  });
}

function update() {
  if (gameOver) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Çizim ve güncellemeler
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);

  obstacles.forEach((obstacle, index) => {
    obstacle.x -= obstacle.speed;

    // Engel çarpışma kontrolü
    if (
      player.x < obstacle.x + obstacle.width &&
      player.x + player.width > obstacle.x &&
      player.y < obstacle.y + obstacle.height &&
      player.y + player.height > obstacle.y
    ) {
      gameOver = true;
    }

    // Engel ekran dışına çıkarsa sil
    if (obstacle.x + obstacle.width < 0) {
      obstacles.splice(index, 1);
      score++;
    }

    ctx.fillStyle = obstacle.color;
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
  });

  // Skor
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText(`Skor: ${score}`, 20, 30);

  requestAnimationFrame(update);
}

function movePlayer(event) {
  const key = event.key;

  if (key === "ArrowUp" && player.y > 0) {
    player.y -= player.speed;
  } else if (key === "ArrowDown" && player.y + player.height < canvas.height) {
    player.y += player.speed;
  } else if (key === "ArrowLeft" && player.x > 0) {
    player.x -= player.speed;
  } else if (key === "ArrowRight" && player.x + player.width < canvas.width) {
    player.x += player.speed;
  }
}

window.addEventListener("keydown", movePlayer);

setInterval(createObstacle, 1500);

update();

if (gameOver) {
  ctx.fillStyle = "white";
  ctx.font = "30px Arial";
  ctx.fillText("Oyun Bitti!", canvas.width / 2 - 70, canvas.height / 2);
}
