import Ship from "../../classes/ship/ship.js";

export default function renderShips(player) {
    // Ships
    const carrier = new Ship(5, 5);
    const battleShip = new Ship(4, 4);
    const cruiser = new Ship(3, 3);
    const subMarine = new Ship(3, 3);
    const destroyer = new Ship(2, 2);

    // Render each ship on player board
    renderShip(player.board.addShip(["b", 3], carrier, true));
    renderShip(player.board.addShip(["f", 5], battleShip));
    renderShip(player.board.addShip(["d", 1], cruiser, true));
    renderShip(player.board.addShip(["e", 8], subMarine));
    renderShip(player.board.addShip(["h", 2], destroyer, true));
}

function renderShip(shipCoords) {
    // If ship breaks the rules don't add it
    if (!shipCoords) {
        console.log("Ship rejected");
        return;
    }

    // Get
    const player1DOM = document.getElementsByClassName("player1-board")[0];

    // Create coordsString
    const coordsString = shipCoords.reduce(
        (prev, curr) => (prev += curr.join("")),
        ""
    );

    // Create coordsArray
    const coordsArray = coordsString.match(/.{1,2}/g);

    // Loop through each coord and mark it as ship
    for (const coord of coordsArray) {
        const cellDOM = player1DOM.querySelector(`[data-coords~=${coord}]`);
        cellDOM.classList.add("board-cell--ship");
    }
}
