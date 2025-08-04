type Point = { x: number; y: number };

const board = document.querySelector(".gameboard") as HTMLElement;
const againBtn = document.querySelector(".playagn") as HTMLElement;
const size = 30;
const speed = 150;

const snake: Point[] = [{ x: 10, y: 10 }];
let dir = { x: 0, y: 0 };
let food = { x: 0, y: 0 };
let score = 0;
let gameLoop: number;

const randPos = (): Point => ({ 
  x: Math.floor(Math.random() * size), 
  y: Math.floor(Math.random() * size) 
});

const genFood = (): void => {
  food = randPos();
  // Prevent food spawning on snake
  if (snake.some(seg => seg.x === food.x && seg.y === food.y)) genFood();
};

const render = (): void => {
  if (!board) return;
  board.innerHTML = '';
  
  // Draw snake
  snake.forEach((seg, i) => {
    const el = document.createElement('div');
    el.className = i === 0 ? 'snakeHead' : 'snakeBody';
    el.style.gridRowStart = `${seg.y + 1}`;
    el.style.gridColumnStart = `${seg.x + 1}`;
    board.appendChild(el);
  });
  
  const foodEl = document.createElement('div');
  foodEl.className = 'food';
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
  alert(`Game over! Score: ${score}`);
};

// Controls
document.addEventListener('keydown', (e: KeyboardEvent) => {
  const key = e.key;
  
  if (key === 'ArrowUp' && dir.y !== 1) dir = { x: 0, y: -1 };
  else if (key === 'ArrowDown' && dir.y !== -1) dir = { x: 0, y: 1 };
  else if (key === 'ArrowLeft' && dir.x !== 1) dir = { x: -1, y: 0 };
  else if (key === 'ArrowRight' && dir.x !== -1) dir = { x: 1, y: 0 };
});

// Init & Reset
againBtn?.addEventListener('click', () => location.reload());
genFood();
render();
gameLoop = window.setInterval(move, speed);