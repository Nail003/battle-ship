import Ship from "../../classes/ship/ship.js";

export default function renderShips(player1, player2) {
    // Render each ship on player1 board
    generatePlayerShips(player1);
    // Add player 2 ships on board but don't render them
    generatePlayerShips(player2);
}

export function generatePlayerShips(player) {
    // Ships
    const carrier = new Ship(5, 5);
    const battleShip = new Ship(4, 4);
    const cruiser = new Ship(3, 3);
    const subMarine = new Ship(3, 3);
    const destroyer = new Ship(2, 2);

    const shipsArray = [carrier, battleShip, cruiser, subMarine, destroyer];

    for (const ship of shipsArray) {
        addShipOnRandomCoords(player, ship);
    }

    if (player.name === "player1") {
        renderPlayer1Ships(player.board.shipCells);
    }
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

function addShipOnRandomCoords(player, ship) {
    const coords = generateRandomCoords();
    const randomFlag = generateRandomNumber(1);
    const results = player.board.addShip(coords, ship, randomFlag);
    if (results) return;
    addShipOnRandomCoords(player, ship);
}

function renderPlayer1Ships(coordsArray) {
    // Get
    const player1DOM = document.getElementsByClassName("player1-board")[0];
    const shipCellsDOM = player1DOM.getElementsByClassName("board-cell--ship");

    // Remove old ship cells if any
    // We need to use while loop because
    // Whenever you remove a class that element is automatically removed from html collection
    while (shipCellsDOM.length > 0) {
        shipCellsDOM[0].classList.remove("board-cell--ship");
    }

    // Add new ship cells
    for (const coords of coordsArray) {
        renderShip(coords, player1DOM);
    }
}

function generateRandomCoords() {
    const rowsArray = "abcdefghij".split("");
    const max = 9;
    const row = rowsArray[generateRandomNumber(max)];
    const col = generateRandomNumber(max);
    return [row, col];
}

function generateRandomNumber(max) {
    return Math.round(Math.random() * max);
}
