const grid = document.querySelector('.grid');
const playerDisplay = document.getElementById('player');
const resetButton = document.getElementById('reset');
const playerOneScoreDisplay = document.getElementById('player-one-score');
const playerTwoScoreDisplay = document.getElementById('player-two-score');

let currentPlayer = 1;
let playerOneScore = 0;
let playerTwoScore = 0;

// Create the game board
const squares = [];
for (let i = 0; i < 49; i++) {
  const square = document.createElement('div');
  square.classList.add('square');
  grid.appendChild(square);
  squares.push(square);
}

// Handle square click
squares.forEach((square, index) => {
  square.addEventListener('click', () => {
    const column = index % 7;

    // Find the lowest empty square in the column
    for (let row = 5; row >= 0; row--) {
      const squareIndex = row * 7 + column;
      if (
        !squares[squareIndex].classList.contains('player-one') &&
        !squares[squareIndex].classList.contains('player-two')
      ) {
        // Add player class
        squares[squareIndex].classList.add(
          currentPlayer === 1 ? 'player-one' : 'player-two'
        );

        // Check for win
        if (checkBoard(currentPlayer)) {
          alert(`Player ${currentPlayer} Wins!`);
          currentPlayer === 1 ? playerOneScore++ : playerTwoScore++;
          updateScores();
          resetBoard();
        } else {
          // Switch players
          currentPlayer = currentPlayer === 1 ? 2 : 1;
          playerDisplay.textContent = currentPlayer;
        }
        break;
      }
    }
  });
});

// Check for win
function checkBoard(player) {
  const playerClass = player === 1 ? 'player-one' : 'player-two';
  const directions = [
    [1, 2, 3], // Horizontal
    [7, 14, 21], // Vertical
    [6, 12, 18], // Diagonal (left)
    [8, 16, 24], // Diagonal (right)
  ];

  for (let i = 0; i < squares.length; i++) {
    if (squares[i].classList.contains(playerClass)) {
      for (const direction of directions) {
        if (
          direction.every(
            offset => squares[i + offset] && squares[i + offset].classList.contains(playerClass)
          )
        ) {
          return true;
        }
      }
    }
  }
  return false;
}

// Update scores
function updateScores() {
  playerOneScoreDisplay.textContent = playerOneScore;
  playerTwoScoreDisplay.textContent = playerTwoScore;
}

// Reset board
function resetBoard() {
  squares.forEach(square => {
    square.classList.remove('player-one', 'player-two');
  });
}

// Reset game
resetButton.addEventListener('click', () => {
  playerOneScore = 0;
  playerTwoScore = 0;
  updateScores();
  resetBoard();
  currentPlayer = 1;
  playerDisplay.textContent = currentPlayer;
});
