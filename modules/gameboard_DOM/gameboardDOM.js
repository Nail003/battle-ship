import { createBoardRows } from "../utils/boardRows/boardRows.js";
import { handleCellClick } from "./gameBoardEventListeners.js";

export default function renderGameboard(player1, player2, gameState) {
    // Get
    const boardContainer = document.querySelector(".board-container");
    // Create Child
    const player1Board = createGameboard(player1, gameState);
    const player2Board = createGameboard(player2, gameState);
    // Update Child
    player1Board.classList.add("player1-board");
    player2Board.classList.add("player2-board");
    // Add scanner background to player2's board
    const scanner = document.createElement("div");
    scanner.classList.add("scanner-background");
    player2Board.appendChild(scanner);
    // Append Child
    boardContainer.appendChild(player1Board);
    boardContainer.appendChild(player2Board);
}

function createGameboard(player, gameState) {
    // Create Rows
    const rowsArray = createBoardRows();
    const border = 10;
    // Create
    const board = document.createElement("div");
    // Update
    board.classList.add("board");

    for (const row of rowsArray) {
        for (let col = 0; col < border; col++) {
            // Create Child
            const cell = document.createElement("div");
            // Update Child
            cell.dataset.coords = `${row}${col}`; // Each cell should have its own coords as data set
            cell.classList.add("board_cell");
            cell.addEventListener("click", handleCellClick(player, gameState));
            // Append Child
            board.appendChild(cell);
        }
    }
    return board;
}
