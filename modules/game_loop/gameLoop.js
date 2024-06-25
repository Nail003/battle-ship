import Player from "../../classes/player/player.js";
import renderEventMessage from "../event_message/eventMessage.js";
import renderGameboard from "../gameboard_DOM/gameboardDOM.js";
import renderShips from "../ship_DOM/shipDOM.js";

const gameState = { start: false, turn: "player1" };
const startButton = document.getElementsByClassName("start-button")[0];
startButton.addEventListener("click", handleStartButton(gameState));

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
    const player1 = new Player("player1");
    const player2 = new Player("player2");

    gameState.turn = "player1";

    renderGameboard(player1, player2, gameState);
    renderShips(player1, player2);
}

function resetGameLoop() {
    const boardContainer =
        document.getElementsByClassName("board-container")[0];
    boardContainer.innerHTML = "";
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
    return () => {
        messageBoxContainer.classList.add("hidden");
    };
}
