import renderEventMessage from "../event_message/eventMessage.js";
import { generatePlayerShips } from "../ship_DOM/shipDOM.js";
import { resetGameLoop } from "./gameLoop.js";

export function assignGameLoopEventHandlers(gameState, player1) {
    // Get
    const startButton = document.getElementsByClassName("start-button")[0];
    const reorderShipsButton = document.querySelector(".reorder-ships-button");
    const msgBox = document.querySelector(".message-box-container");
    const closeMessageButton = document.querySelector(".message-box__button");

    // Event Listeners
    startButton.addEventListener("click", handleStartButton(gameState));
    reorderShipsButton.addEventListener(
        "click",
        handleReorderButton(player1, gameState)
    );
    msgBox.addEventListener("click", handleMessageButton(msgBox));
    closeMessageButton.addEventListener("click", handleMessageButton(msgBox));
}

function handleStartButton(gameState) {
    return (e) => {
        // Get
        const button = e.target;
        // Conditional strings
        const startString = "Start";
        const resetString = "Reset";

        // If start button is pressed
        if (button.textContent === startString) {
            // Start the game
            gameState.start = true;
            // Set current button as reset button
            button.textContent = resetString;
            // Render the initial start message
            renderEventMessage(undefined, "start");
            // End
            return;
        }

        // If reset button is pressed
        button.textContent = startString;
        // Stop the game
        gameState.start = false;
        // Render the reset message
        renderEventMessage(undefined, "reset");
        // Restart the game loop
        resetGameLoop();
    };
}

function handleReorderButton(player, gameState) {
    return (_e) => {
        // Player only allowed to reset when the game hasn't started
        if (gameState.start === true) {
            renderEventMessage(undefined, "no-reorder");
            return;
        }

        // Reset player board
        player.resetBoard();

        // Add new ships
        generatePlayerShips(player);
    };
}

function handleMessageButton(messageBoxContainer) {
    return (_e) => {
        // Hide the message box
        messageBoxContainer.classList.add("hidden");
    };
}
