export default function renderEventMessage(player, status) {
    const eventMessage = document.getElementsByClassName("event-messages")[0];

    if (status === "start") {
        eventMessage.textContent = "Please click on one of the enemy cells";
    }

    if (status === "reset") {
        eventMessage.textContent = "When ready press the start button";
    }

    if (status === "no-start") {
        eventMessage.textContent = "Please start the game first";
    }

    if (status === "attack-self") {
        eventMessage.textContent = "You cannot attack yourself";
    }

    if (status === "already-attack") {
        eventMessage.textContent = "This cell has already been attacked";
    }

    if (status === "attack") {
        eventMessage.textContent = `${player.name} was attacked`;
    }
    if (status === "missed") {
        eventMessage.textContent = `Attack missed`;
    }

    if (status === "won") {
        eventMessage.textContent = `${player.name} lost!`;
    }
}
