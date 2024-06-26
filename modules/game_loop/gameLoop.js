import Player from "../../classes/player/player.js";
import renderEventMessage from "../event_message/eventMessage.js";
import renderGameboard from "../gameboard_DOM/gameboardDOM.js";
import renderShips, { generatePlayerShips } from "../ship_DOM/shipDOM.js";

const player1 = new Player("player1");
const player2 = new Player("player2");
const gameState = { start: false, turn: "player1" };

const startButton = document.getElementsByClassName("start-button")[0];
startButton.addEventListener("click", handleStartButton(gameState));

const reorderShipsButton = document.getElementsByClassName(
    "reorder-ships-button"
)[0];
reorderShipsButton.addEventListener("click", handleReorderButton(player1));

const messageBoxContainer = document.getElementsByClassName(
    "message-box-container"
)[0];
const closeMessageButton = messageBoxContainer.getElementsByClassName(
    "message-box__button"
)[0];

messageBoxContainer.addEventListener("click", handleMessageButton());
closeMessageButton.addEventListener("click", handleMessageButton());

startGameLoop();

function startGameLoop() {
    gameState.turn = "player1";
    renderGameboard(player1, player2, gameState);
    renderShips(player1, player2);
}

function resetGameLoop() {
    const boardContainer =
        document.getElementsByClassName("board-container")[0];
    boardContainer.innerHTML = "";
    player1.resetBoard();
    player2.resetBoard();
    startGameLoop();
}

function handleStartButton(gameState) {
    return (e) => {
        const button = e.target;
        const startString = "Start";
        const resetString = "Reset";
        if (button.textContent === startString) {
            gameState.start = true;
            button.textContent = resetString;
            renderEventMessage(undefined, "start");
            return;
        }
        button.textContent = startString;
        gameState.start = false;
        renderEventMessage(undefined, "reset");
        resetGameLoop();
    };
}

function handleMessageButton() {
    return (_e) => {
        messageBoxContainer.classList.add("hidden");
    };
}

function handleReorderButton(player) {
    return (_e) => {
        // Reset player board
        player.resetBoard();

        // Add new ships
        generatePlayerShips(player);
    };
}
