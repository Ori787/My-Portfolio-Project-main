let firstPlayer = "X";
let secondPlayer = "O";
let currentPlayer = firstPlayer;
const playBoard = document.querySelector(".playBoard");
let gameSlots = document.querySelector(".playBoard").querySelectorAll("div");
let winningAlert = document.querySelector(".winningalert");
let winningAlertText = document.querySelector(".winningalert h1");

console.log(winningAlertText);

gameSlots.forEach((cell) => {
  cell.addEventListener("click", (e) => {
    let clickedCell = e.target;
    if (clickedCell.innerText === "") {
      clickedCell.innerText = currentPlayer;

      if (whosTheWinner(currentPlayer)) {
        winningAlert.style.display = "block";
        winningAlertText.innerHTML =
          "The Winner is" + " " + currentPlayer + " " + "!";
        playBoard.style.display = "none";
      } else {
        currentPlayer =
          currentPlayer === firstPlayer ? secondPlayer : firstPlayer;
      }
    }
  });
});

const whosTheWinner = (player) => {
  for (let i = 0; i <= 2; i++) {
    if (
      gameSlots[i].innerText === player &&
      gameSlots[i + 3].innerText === player &&
      gameSlots[i + 6].innerText === player
    ) {
      return true;
    }
  }

  for (let i = 0; i <= 8; i += 3) {
    if (
      gameSlots[i].innerText === player &&
      gameSlots[i + 1].innerText === player &&
      gameSlots[i + 2].innerText === player
    ) {
      return true;
    }
  }

  if (
    (gameSlots[0].innerText === player &&
      gameSlots[4].innerText === player &&
      gameSlots[8].innerText === player) ||
    (gameSlots[2].innerText === player &&
      gameSlots[4].innerText === player &&
      gameSlots[6].innerText === player)
  ) {
    return true;
  } else {
    return false;
  }
};
