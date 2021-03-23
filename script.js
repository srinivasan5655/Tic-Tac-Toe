const X_Class = "x";
const Circle_Class = "circle";
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const winningMessageElement = document.getElementById("WinningMessage");
const restartButton = document.getElementById("restart-button");
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
);
let circleTurn;

startGame();

restartButton.addEventListener("click", startGame);

function startGame() {
  circleTurn = false;
  cellElements.forEach((cell) => {
    cell.classList.remove(X_Class);
    cell.classList.remove(Circle_Class);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHoverClass();
  winningMessageElement.classList.remove("show");
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? Circle_Class : X_Class;
  // placemark
  placeMark(cell, currentClass);
  // Check For Win
  if (checkWin(currentClass)) {
    endGame(false);
    // Check for draw
  } else if (isDraw()) {
    endGame(true);
    // Switch players
  } else {
    swapTurns();
    setBoardHoverClass();
  }
}

function isDraw() {
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(X_Class) || cell.classList.contains(Circle_Class)
    );
  });
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = "draw!";
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
  }
  winningMessageElement.classList.add("show");
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  circleTurn = !circleTurn;
}

function setBoardHoverClass() {
  board.classList.remove(X_Class);
  board.classList.remove(Circle_Class);
  if (circleTurn) {
    board.classList.add(Circle_Class);
  } else {
    board.classList.add(X_Class);
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some((combinations) => {
    return combinations.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}
