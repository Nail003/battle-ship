export default function renderWinMessage(playerName) {
    const messageBoxContainer = document.getElementsByClassName(
        "message-box-container"
    )[0];
    const message = messageBoxContainer.getElementsByClassName(
        "message-box__message"
    )[0];

    if (playerName === "player1") {
        message.textContent = "You Lost Nerd!! Go back to the chess club.";
    } else {
        message.textContent = "Congratulations, You Won!!";
    }

    messageBoxContainer.classList.remove("hidden");
}
