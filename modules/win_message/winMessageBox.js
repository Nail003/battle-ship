export default function renderWinMessage(playerName) {
    // Get
    const msgBox = document.getElementsByClassName("message-box-container")[0];
    const message = msgBox.getElementsByClassName("message-box__message")[0];

    if (playerName === "player1") {
        // If player 1 wins show this message
        message.textContent = "You Lost Nerd!! Go back to the chess club.";
    } else {
        // If player 2 wins show this message
        message.textContent = "Congratulations, You Won!!";
    }

    // Display the message on screen
    msgBox.classList.remove("hidden");
}
