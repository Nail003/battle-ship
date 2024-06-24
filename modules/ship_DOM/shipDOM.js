import Ship from "../../classes/ship/ship.js";

export default function renderShips(player1, player2) {
    // Get
    const player1DOM = document.getElementsByClassName("player1-board")[0];

    // Ships
    const carrier = new Ship(5, 5);
    const battleShip = new Ship(4, 4);
    const cruiser = new Ship(3, 3);
    const subMarine = new Ship(3, 3);
    const destroyer = new Ship(2, 2);

    // Render each ship on player1 board
    renderShip(player1.board.addShip(["f", 5], battleShip), player1DOM);
    renderShip(player1.board.addShip(["b", 3], carrier, true), player1DOM);
    renderShip(player1.board.addShip(["d", 1], cruiser, true), player1DOM);
    renderShip(player1.board.addShip(["e", 8], subMarine), player1DOM);
    renderShip(player1.board.addShip(["h", 2], destroyer, true), player1DOM);

    // Add player 2 ships on board but don't them
    player2.board.addShip(["f", 5], battleShip);
    player2.board.addShip(["b", 3], carrier, true);
    player2.board.addShip(["d", 1], cruiser, true);
    player2.board.addShip(["e", 8], subMarine);
    player2.board.addShip(["h", 2], destroyer, true);
}

function renderShip(shipCoords, playerDOM) {
    // If ship breaks the rules don't add it
    if (!shipCoords) {
        console.log("Ship rejected");
        return;
    }

    // Get

    // Create coordsString
    const coordsString = shipCoords.reduce(
        (prev, curr) => (prev += curr.join("")),
        ""
    );

    // Create coordsArray
    const coordsArray = coordsString.match(/.{1,2}/g);

    // Loop through each coord and mark it as ship
    for (const coord of coordsArray) {
        const cellDOM = playerDOM.querySelector(`[data-coords~=${coord}]`);
        cellDOM.classList.add("board-cell--ship");
    }
}
