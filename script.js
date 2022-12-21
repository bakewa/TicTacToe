// Cell index
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7], 
    [2, 5, 8],
]
let currentPlayer = "player1";
const gameState = {
    winningConditions: winningConditions,
    currentPlayer: currentPlayer,
};

// Initialize the game
function initializeGame(){
    gameState.winningConditions = ["", "", "", "", "", "", "", "", ""]
    gameState.currentPlayer = "player1";
}

// click function
const cells = document.querySelectorAll(".cell");
cells.forEach(cell => {
    cell.addEventListener('click', handleClick);
});

function handleClick(event) {
    const cell = event.target;
    cell.textContent = currentPlayer;
    currentPlayer = (currentPlayer === "X") ? "O" : "X"
}

// Players take turns
function makeMove(row,col) {
    if (gameState.winningConditions[row][col]) {
        console.log("Occupied");
        return;
    }
    if (gameState.currentPlayer === "player1") {
        gameState.winningConditions[row][col] = "X";
    } else {
        gameState.winningConditions[row][col] = "O";
    }
}



