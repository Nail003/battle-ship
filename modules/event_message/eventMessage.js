export default function renderEventMessage(player, status) {
    // Get
    const eventMessage = document.getElementsByClassName("event-messages")[0];

    // Display message depending on status and return
    if (status === "start") {
        eventMessage.textContent = "Please click on one of the enemy cells";
        return;
    }

    if (status === "reset") {
        eventMessage.textContent = "When ready press the start button";
        return;
    }

    if (status === "no-start") {
        eventMessage.textContent = "Please start the game first";
        return;
    }

    if (status === "attack-self") {
        eventMessage.textContent = "You cannot attack yourself";
        return;
    }

    if (status === "already-attack") {
        eventMessage.textContent = "This cell has already been attacked";
        return;
    }

    if (status === "attack") {
        eventMessage.textContent = `${player.name} was attacked`;
        return;
    }
    if (status === "missed") {
        const name = player.name === "player1" ? "player2" : "player1";
        eventMessage.textContent = `${name} missed attack`;
        return;
    }

    if (status === "won") {
        eventMessage.textContent = `${player.name} lost!`;
        return;
    }

    if (status === "no-reorder") {
        eventMessage.textContent = "Cannot reorder ships during a game";
        return;
    }
}
