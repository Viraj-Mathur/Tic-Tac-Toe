const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Starting the game
function initGame() {
  currentPlayer = "X";
  gameGrid = ["", "", "", "", "", "", "", "", ""];

  // First making the boxes empty
  boxes.forEach((box, index) => {
    box.innerText = "";
    boxes[index].style.pointerEvents = "all";
    box.classList = `box box${index + 1}`;
  });

  newGameBtn.classList.remove("active");
  gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

// Changing turns of players
function swapTurn() {
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
  // UI Update
  gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver() {
  let ans = "";
  winningPositions.forEach((position) => {
    // All 3 boxes should be non-empty and exactly the same in value
    if (
      (gameGrid[position[0]] !== "" ||
        gameGrid[position[1]] !== "" ||
        gameGrid[position[2]] !== "") &&
      gameGrid[position[0]] === gameGrid[position[1]] &&
      gameGrid[position[1]] === gameGrid[position[2]]
    ) {
      // Check if winner is X
      if (gameGrid[position[0]] === "X") ans = "X";
      else ans = "O";

      // Disable pointer events
      boxes.forEach((box) => {
        box.style.pointerEvents = "none";
      });

      // Now we know X/O is a winner
      boxes[position[0]].classList.add("win");
      boxes[position[1]].classList.add("win");
      boxes[position[2]].classList.add("win");
    }
  });

  // For winner
  if (ans !== "") {
    gameInfo.innerText = `Winner Player - ${ans}`;
    newGameBtn.classList.add("active");
    return;
  }

  // We know, NO Winner Found, let's check whether there is a tie
  let fillCount = 0;
  gameGrid.forEach((box) => {
    if (box !== "") fillCount++;
  });

  // Board is filled, game is TIE
  if (fillCount === 9) {
    gameInfo.innerText = "Game Tied!";
    newGameBtn.classList.add("active");
  }
}

function handleClick(index) {
  if (gameGrid[index] === "") {
    // Check if grid is empty
    boxes[index].innerText = currentPlayer;
    gameGrid[index] = currentPlayer;
    boxes[index].style.pointerEvents = "none";

    // Swap turns
    swapTurn();

    // Check if anyone wins or game over
    checkGameOver();
  }
}

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClick(index);
  });
});

newGameBtn.addEventListener("click", initGame);
