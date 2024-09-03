const board = document.getElementById('game-board');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');
const playerVsPlayerButton = document.getElementById('player-vs-player');
const playerVsAiButton = document.getElementById('player-vs-ai');

let boardState = Array(9).fill(null);
let currentPlayer = 'X';
let isAiMode = false;

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]  // Diagonals
];

function initializeBoard() {
    board.innerHTML = '';
    boardState.fill(null);
    currentPlayer = 'X';
    message.textContent = `Player ${currentPlayer}'s turn`;
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.dataset.index = i;
        cell.addEventListener('click', handleClick);
        board.appendChild(cell);
    }
}

function handleClick(event) {
    const cellIndex = event.target.dataset.index;
    if (boardState[cellIndex] || checkWinner()) return;
    boardState[cellIndex] = currentPlayer;
    event.target.textContent = currentPlayer;
    
    if (checkWinner()) {
        message.textContent = `Player ${currentPlayer} wins!`;
        return;
    } else if (boardState.every(cell => cell)) {
        message.textContent = "It's a draw!";
        return;
    }
    
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    message.textContent = `Player ${currentPlayer}'s turn`;
    
    if (isAiMode && currentPlayer === 'O') {
        aiMove();
    }
}

function checkWinner() {
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c];
    });
}

function aiMove() {
    const emptyCells = boardState.map((val, index) => val === null ? index : null).filter(val => val !== null);
    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    boardState[randomIndex] = 'O';
    document.querySelector(`[data-index="${randomIndex}"]`).textContent = 'O';
    
    if (checkWinner()) {
        message.textContent = "Player O wins!";
    } else if (boardState.every(cell => cell)) {
        message.textContent = "It's a draw!";
    } else {
        currentPlayer = 'X';
        message.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function resetGame() {
    initializeBoard();
    isAiMode = false;
}

function setGameMode(event) {
    isAiMode = event.target.id === 'player-vs-ai';
    initializeBoard();
}

playerVsPlayerButton.addEventListener('click', setGameMode);
playerVsAiButton.addEventListener('click', setGameMode);
resetButton.addEventListener('click', resetGame);

initializeBoard();
