import Player from "../../classes/player/player.js";
import renderGameboard from "../gameboard_DOM/gameboardDOM.js";
import renderShips from "../ship_DOM/shipDOM.js";
import { assignGameLoopEventHandlers } from "./gameLoopEventHandlers.js";

// Global Constans
const player1 = new Player("player1");
const player2 = new Player("player2");
const gameState = { start: false, turn: "player1" };

// Event Handlers
assignGameLoopEventHandlers(gameState, player1);

export default function startGameLoop() {
    // Set current turn to player 1
    gameState.turn = "player1";
    // Render empty boards
    renderGameboard(player1, player2, gameState);
    // Render ships on boards
    renderShips(player1, player2);
}

export function resetGameLoop() {
    // Get
    const boardContainer = document.querySelector(".board-container");
    // Reset html
    boardContainer.innerHTML = "";
    // Empty players boards
    player1.resetBoard();
    player2.resetBoard();
    // Start the game again
    startGameLoop();
}
