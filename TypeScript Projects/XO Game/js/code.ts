// Game Types and Interfaces
type Player = "X" | "O";
type GameState = "playing" | "won" | "draw";

interface GameConfig {
  boardSize: number;
  players: {
    X: string;
    O: string;
  };
}

interface GameStats {
  X: number;
  O: number;
  draws: number;
}

// Game Configuration
const GAME_CONFIG: GameConfig = {
  boardSize: 3,
  players: {
    X: "X",
    O: "O",
  },
};

// Game State Management
class TicTacToeGame {
  private board: string[];
  private currentPlayer: Player;
  private gameState: GameState;
  private stats: GameStats;
  private winningCombinations: number[][];

  constructor() {
    this.board = Array(GAME_CONFIG.boardSize * GAME_CONFIG.boardSize).fill("");
    this.currentPlayer = "X";
    this.gameState = "playing";
    this.stats = { X: 0, O: 0, draws: 0 };
    this.winningCombinations = this.generateWinningCombinations();
    this.initializeGame();
  }

  private generateWinningCombinations(): number[][] {
    const combinations: number[][] = [];
    const size = GAME_CONFIG.boardSize;

    // Rows
    for (let i = 0; i < size; i++) {
      const row: number[] = [];
      for (let j = 0; j < size; j++) {
        row.push(i * size + j);
      }
      combinations.push(row);
    }

    // Columns
    for (let i = 0; i < size; i++) {
      const col: number[] = [];
      for (let j = 0; j < size; j++) {
        col.push(j * size + i);
      }
      combinations.push(col);
    }

    // Diagonals
    const diagonal1: number[] = [];
    const diagonal2: number[] = [];
    for (let i = 0; i < size; i++) {
      diagonal1.push(i * size + i);
      diagonal2.push(i * size + (size - 1 - i));
    }
    combinations.push(diagonal1, diagonal2);

    return combinations;
  }

  private initializeGame(): void {
    this.setupEventListeners();
    this.updateDisplay();
    this.updateStats();
  }

  private setupEventListeners(): void {
    const cells = document.querySelectorAll(".game-cell");
    const resetBtn = document.querySelector(".reset-btn") as HTMLButtonElement;
    const newGameBtn = document.querySelector(
      ".new-game-btn"
    ) as HTMLButtonElement;
    const playAgainBtn = document.querySelector(
      ".play-again-btn"
    ) as HTMLButtonElement;
    const newGameModalBtn = document.querySelector(
      ".new-game-modal-btn"
    ) as HTMLButtonElement;

    // Game board cells
    cells.forEach((cell, index) => {
      cell.addEventListener("click", () => this.handleCellClick(index));
      cell.addEventListener("keydown", (e) => {
        const keyboardEvent = e as KeyboardEvent;
        if (keyboardEvent.key === "Enter" || keyboardEvent.key === " ") {
          e.preventDefault();
          this.handleCellClick(index);
        }
      });
    });

    // Control buttons
    if (resetBtn) {
      resetBtn.addEventListener("click", () => this.resetGame());
    }

    if (newGameBtn) {
      newGameBtn.addEventListener("click", () => this.newGame());
    }

    // Modal buttons
    if (playAgainBtn) {
      playAgainBtn.addEventListener("click", () => {
        this.hideGameResult();
        this.resetGame();
      });
    }

    if (newGameModalBtn) {
      newGameModalBtn.addEventListener("click", () => {
        this.hideGameResult();
        this.newGame();
      });
    }

    // Close modal on backdrop click
    document.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      if (
        target.classList.contains("result-modal") ||
        target.classList.contains("close-modal")
      ) {
        this.hideGameResult();
      }
    });

    // Close modal on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.hideGameResult();
      }
    });
  }

  private handleCellClick(index: number): void {
    if (this.gameState !== "playing" || this.board[index] !== "") {
      return;
    }

    this.makeMove(index);
  }

  private makeMove(index: number): void {
    this.board[index] = this.currentPlayer;
    this.updateCell(index);

    if (this.checkWinner()) {
      this.gameState = "won";
      this.stats[this.currentPlayer]++;
      this.showGameResult(`Player ${this.currentPlayer} wins! 🎉`);
    } else if (this.isBoardFull()) {
      this.gameState = "draw";
      this.stats.draws++;
      this.showGameResult("It's a draw! 🤝");
    } else {
      this.switchPlayer();
    }

    this.updateStats();
  }

  private checkWinner(): boolean {
    return this.winningCombinations.some((combination) => {
      const [a, b, c] = combination;
      return (
        this.board[a] !== "" &&
        this.board[a] === this.board[b] &&
        this.board[a] === this.board[c]
      );
    });
  }

  private isBoardFull(): boolean {
    return this.board.every((cell) => cell !== "");
  }

  private switchPlayer(): void {
    this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
    this.updateCurrentPlayerDisplay();
  }

  private updateCell(index: number): void {
    const cell = document.querySelector(
      `[data-index="${index}"]`
    ) as HTMLElement;
    if (cell) {
      cell.textContent = this.board[index];
      cell.className = "game-cell";
      if (this.board[index]) {
        cell.classList.add(`player-${this.board[index].toLowerCase()}`);
      }
    }
  }

  private updateDisplay(): void {
    // Update all cells
    this.board.forEach((value, index) => {
      const cell = document.querySelector(
        `[data-index="${index}"]`
      ) as HTMLElement;
      if (cell) {
        cell.textContent = value;
        cell.className = "game-cell";
        if (value) {
          cell.classList.add(`player-${value.toLowerCase()}`);
        }
      }
    });

    this.updateCurrentPlayerDisplay();
  }

  private updateCurrentPlayerDisplay(): void {
    const currentPlayerElement = document.querySelector(
      ".current-player"
    ) as HTMLElement;
    if (currentPlayerElement) {
      currentPlayerElement.textContent = `Current Player: ${this.currentPlayer}`;
      currentPlayerElement.className = `current-player player-${this.currentPlayer.toLowerCase()}`;
    }
  }

  private updateStats(): void {
    const statsElement = document.querySelector(".game-stats") as HTMLElement;
    if (statsElement) {
      statsElement.innerHTML = `
        <div class="stat-item">
          <span class="stat-label">Player X:</span>
          <span class="stat-value">${this.stats.X}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Player O:</span>
          <span class="stat-value">${this.stats.O}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Draws:</span>
          <span class="stat-value">${this.stats.draws}</span>
        </div>
      `;
    }
  }

  private showGameResult(message: string): void {
    const resultModal = document.querySelector(".result-modal") as HTMLElement;
    const resultMessage = document.querySelector(
      ".result-message"
    ) as HTMLElement;

    if (resultModal && resultMessage) {
      resultMessage.textContent = message;
      resultModal.classList.add("show");
      resultModal.setAttribute("aria-hidden", "false");

      // Focus the first button in the modal for accessibility
      const firstButton = resultModal.querySelector(
        "button"
      ) as HTMLButtonElement;
      if (firstButton) {
        firstButton.focus();
      }
    }
  }

  private hideGameResult(): void {
    const resultModal = document.querySelector(".result-modal") as HTMLElement;
    if (resultModal) {
      resultModal.classList.remove("show");
      resultModal.setAttribute("aria-hidden", "true");
    }
  }

  public resetGame(): void {
    this.board = Array(GAME_CONFIG.boardSize * GAME_CONFIG.boardSize).fill("");
    this.currentPlayer = "X";
    this.gameState = "playing";
    this.hideGameResult();
    this.updateDisplay();
  }

  public newGame(): void {
    this.stats = { X: 0, O: 0, draws: 0 };
    this.resetGame();
  }
}

// Initialize the game when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new TicTacToeGame();
});
