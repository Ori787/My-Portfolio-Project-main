type Point = { x: number; y: number };

let board: HTMLElement;
let againBtn: HTMLElement;
const size = 20; // Reduced size to fit better in the container
const speed = 150;

const snake: Point[] = [{ x: 10, y: 10 }];
let dir = { x: 0, y: 0 };
let food = { x: 0, y: 0 };
let score = 0;
let gameLoop: number;

const randPos = (): Point => ({
  x: Math.floor(Math.random() * size),
  y: Math.floor(Math.random() * size),
});

const genFood = (): void => {
  food = randPos();
  // Prevent food spawning on snake
  if (snake.some((seg) => seg.x === food.x && seg.y === food.y)) genFood();
};

const render = (): void => {
  if (!board) return;
  board.innerHTML = "";

  // Draw snake
  snake.forEach((seg, i) => {
    const el = document.createElement("div");
    if (i === 0) {
      el.className =
        "snakeHead bg-green-500 rounded-sm border border-green-600";
    } else {
      el.className =
        "snakeBody bg-green-400 rounded-sm border border-green-500";
    }
    el.style.gridRowStart = `${seg.y + 1}`;
    el.style.gridColumnStart = `${seg.x + 1}`;
    board.appendChild(el);
  });

  const foodEl = document.createElement("div");
  foodEl.className = "food bg-red-500 rounded-full border border-red-600";
  foodEl.style.gridRowStart = `${food.y + 1}`;
  foodEl.style.gridColumnStart = `${food.x + 1}`;
  board.appendChild(foodEl);
};

const move = (): void => {
  const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };

  // Wall collision
  if (head.x < 0 || head.x >= size || head.y < 0 || head.y >= size) {
    endGame();
    return;
  }

  // Self collision
  if (snake.some((seg, i) => i > 0 && seg.x === head.x && seg.y === head.y)) {
    endGame();
    return;
  }

  snake.unshift(head);

  // Food collision
  if (head.x === food.x && head.y === food.y) {
    score += 10;
    genFood();
  } else {
    snake.pop();
  }

  render();
};

const endGame = (): void => {
  clearInterval(gameLoop);
  // Create a modern modal instead of alert
  const modal = document.createElement("div");
  modal.className =
    "fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50";
  modal.innerHTML = `
    <div class="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl border border-white/20">
      <div class="text-center">
        <h2 class="text-3xl font-bold mb-6 text-white">Game Over!</h2>
        <p class="text-2xl font-bold mb-6 text-white">Score: ${score}</p>
        <button class="bg-blue-600 hover:bg-blue-700 rounded-xl px-6 py-3 font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-400/30" onclick="location.reload()">
          Play Again
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
};

// Controls
document.addEventListener("keydown", (e: KeyboardEvent) => {
  const key = e.key;

  if (key === "ArrowUp" && dir.y !== 1) dir = { x: 0, y: -1 };
  else if (key === "ArrowDown" && dir.y !== -1) dir = { x: 0, y: 1 };
  else if (key === "ArrowLeft" && dir.x !== 1) dir = { x: -1, y: 0 };
  else if (key === "ArrowRight" && dir.x !== -1) dir = { x: 1, y: 0 };
});

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Get DOM elements
  board = document.querySelector(".gameboard") as HTMLElement;
  againBtn = document.querySelector("#restart-btn") as HTMLElement;

  if (!board) {
    console.error("Game board not found!");
    return;
  }

  // Init & Reset
  againBtn?.addEventListener("click", () => location.reload());
  genFood();
  render();
  gameLoop = window.setInterval(move, speed);
});
