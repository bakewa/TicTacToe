const statusDisplay = document.querySelector(".game-status");

let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
let running = true; 
const currentPlayerTurn = () => `${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();

// These are the indexes of the cells. First 3 are horizontal, then 
// next 3 are vertical and last 2 are diagonal. 
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
function runCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

// Changing players 
function runPlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

// Check for the winner and if theres a draw + message to let the user know 
const winner = () => `Player ${currentPlayer} wins!`;
const draw = () => `Draw!`;

function runResult() {
    let gameWon = false;
    for (let i = 0; i <= 7; i++) {
        const win = winningConditions[i];
        let a = gameState[win[0]];
        let b = gameState[win[1]];
        let c = gameState[win[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            gameWon = true;
            break
        }
    }
    if (gameWon) {
        statusDisplay.innerHTML = winner();
        running = false;
        return;
    }
    let gameDraw = !gameState.includes("");
    if (gameDraw) {
        statusDisplay.innerHTML = draw();
        running = false;
        return;
    }
    runPlayerChange();
}

// Click function for the cells
function runCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target
    const clickedCellIndex = parseInt(clickedCell.getAttribute('cellIndex'));
    if (gameState[clickedCellIndex] !== "" || !running) {
        return;
    }
    runCellPlayed(clickedCell, clickedCellIndex);
    runResult();
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', runCellClick));


// For the restart button
function runRestart() {
    running = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}

const restartButton = document.querySelector('.restartBtn');
restartButton.addEventListener('click', runRestart);

