"use strict";
// Game Configuration
const GAME_CONFIG = {
    boardSize: 3,
    players: {
        X: "X",
        O: "O",
    },
};
// Game State Management
class TicTacToeGame {
    constructor() {
        this.board = Array(GAME_CONFIG.boardSize * GAME_CONFIG.boardSize).fill("");
        this.currentPlayer = "X";
        this.gameState = "playing";
        this.stats = { X: 0, O: 0, draws: 0 };
        this.winningCombinations = this.generateWinningCombinations();
        this.initializeGame();
    }
    generateWinningCombinations() {
        const combinations = [];
        const size = GAME_CONFIG.boardSize;
        // Rows
        for (let i = 0; i < size; i++) {
            const row = [];
            for (let j = 0; j < size; j++) {
                row.push(i * size + j);
            }
            combinations.push(row);
        }
        // Columns
        for (let i = 0; i < size; i++) {
            const col = [];
            for (let j = 0; j < size; j++) {
                col.push(j * size + i);
            }
            combinations.push(col);
        }
        // Diagonals
        const diagonal1 = [];
        const diagonal2 = [];
        for (let i = 0; i < size; i++) {
            diagonal1.push(i * size + i);
            diagonal2.push(i * size + (size - 1 - i));
        }
        combinations.push(diagonal1, diagonal2);
        return combinations;
    }
    initializeGame() {
        this.setupEventListeners();
        this.updateDisplay();
        this.updateStats();
    }
    setupEventListeners() {
        const cells = document.querySelectorAll("[data-index]");
        const resetBtn = document.querySelector(".reset-btn");
        const newGameBtn = document.querySelector(".new-game-btn");
        const playAgainBtn = document.querySelector(".play-again-btn");
        const newGameModalBtn = document.querySelector(".new-game-modal-btn");
        // Game board cells
        cells.forEach((cell) => {
            const index = parseInt(cell.getAttribute("data-index") || "0");
            cell.addEventListener("click", () => this.handleCellClick(index));
            cell.addEventListener("keydown", (e) => {
                const keyboardEvent = e;
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
            const target = e.target;
            if (target.classList.contains("result-modal") ||
                target.classList.contains("close-modal")) {
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
    handleCellClick(index) {
        if (this.gameState !== "playing" || this.board[index] !== "") {
            return;
        }
        this.makeMove(index);
    }
    makeMove(index) {
        this.board[index] = this.currentPlayer;
        this.updateCell(index);
        if (this.checkWinner()) {
            this.gameState = "won";
            this.stats[this.currentPlayer]++;
            this.showGameResult(`Player ${this.currentPlayer} wins! 🎉`);
        }
        else if (this.isBoardFull()) {
            this.gameState = "draw";
            this.stats.draws++;
            this.showGameResult("It's a draw! 🤝");
        }
        else {
            this.switchPlayer();
        }
        this.updateStats();
    }
    checkWinner() {
        return this.winningCombinations.some((combination) => {
            const [a, b, c] = combination;
            return (this.board[a] !== "" &&
                this.board[a] === this.board[b] &&
                this.board[a] === this.board[c]);
        });
    }
    isBoardFull() {
        return this.board.every((cell) => cell !== "");
    }
    switchPlayer() {
        this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
        this.updateCurrentPlayerDisplay();
    }
    updateCell(index) {
        const cell = document.querySelector(`[data-index="${index}"]`);
        if (cell) {
            cell.textContent = this.board[index];
            cell.className =
                "aspect-square bg-white/5 border-2 border-white/10 rounded-2xl flex items-center justify-center text-5xl font-bold cursor-pointer transition-all duration-300 hover:bg-white/10 hover:border-white/30 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-400/30";
            if (this.board[index]) {
                if (this.board[index] === "X") {
                    cell.classList.add("text-blue-400", "animate-pop-in");
                }
                else {
                    cell.classList.add("text-orange-400", "animate-pop-in");
                }
            }
        }
    }
    updateDisplay() {
        // Update all cells
        this.board.forEach((value, index) => {
            const cell = document.querySelector(`[data-index="${index}"]`);
            if (cell) {
                cell.textContent = value;
                cell.className =
                    "aspect-square bg-white/5 border-2 border-white/10 rounded-2xl flex items-center justify-center text-5xl font-bold cursor-pointer transition-all duration-300 hover:bg-white/10 hover:border-white/30 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-400/30";
                if (value) {
                    if (value === "X") {
                        cell.classList.add("text-blue-400", "animate-pop-in");
                    }
                    else {
                        cell.classList.add("text-orange-400", "animate-pop-in");
                    }
                }
            }
        });
        this.updateCurrentPlayerDisplay();
    }
    updateCurrentPlayerDisplay() {
        const currentPlayerElement = document.getElementById("current-player");
        if (currentPlayerElement) {
            currentPlayerElement.innerHTML = `Current Player: <span class="${this.currentPlayer === "X" ? "text-blue-400" : "text-orange-400"}">${this.currentPlayer}</span>`;
        }
    }
    updateStats() {
        const xScore = document.getElementById("score-x");
        const oScore = document.getElementById("score-o");
        const drawsScore = document.getElementById("score-draws");
        if (xScore)
            xScore.textContent = this.stats.X.toString();
        if (oScore)
            oScore.textContent = this.stats.O.toString();
        if (drawsScore)
            drawsScore.textContent = this.stats.draws.toString();
    }
    showGameResult(message) {
        const resultModal = document.querySelector(".result-modal");
        const resultMessage = document.querySelector(".result-message");
        if (resultModal && resultMessage) {
            resultMessage.textContent = message;
            resultModal.classList.remove("hidden");
            resultModal.setAttribute("aria-hidden", "false");
            // Focus the first button in the modal for accessibility
            const firstButton = resultModal.querySelector("button");
            if (firstButton) {
                firstButton.focus();
            }
        }
    }
    hideGameResult() {
        const resultModal = document.querySelector(".result-modal");
        if (resultModal) {
            resultModal.classList.add("hidden");
            resultModal.setAttribute("aria-hidden", "true");
        }
    }
    resetGame() {
        this.board = Array(GAME_CONFIG.boardSize * GAME_CONFIG.boardSize).fill("");
        this.currentPlayer = "X";
        this.gameState = "playing";
        this.hideGameResult();
        this.updateDisplay();
    }
    newGame() {
        this.stats = { X: 0, O: 0, draws: 0 };
        this.resetGame();
    }
}
// Initialize the game when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    new TicTacToeGame();
});
//# sourceMappingURL=code.js.map