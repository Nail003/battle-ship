import Ship from "../../classes/ship/ship.js";
import { generateRandomCoords } from "../utils/generateRandomCoords/generateRandomCoords.js";
import { generateRandomNumber } from "../utils/generateRandomNumber/generateRandomNumber.js";

export default function renderShips(player1, player2) {
    // Render each ship on player1 board
    generatePlayerShips(player1);
    // Add player 2 ships on board but don't render them
    generatePlayerShips(player2);
}

export function generatePlayerShips(player) {
    // Ships array for looping
    const shipsArray = createShipsArray();
    // Add each ship on board at random coords
    for (const ship of shipsArray) {
        addShipOnRandomCoords(player, ship);
    }
    // Render player1 ships on player1's board display
    if (player.name === "player1") {
        renderPlayer1Ships(player.board.shipCells);
    }
}

function addShipOnRandomCoords(player, ship) {
    // Generate random inputs
    const randomCoords = generateRandomCoords();
    const randomOrientation = generateRandomNumber(1);
    // Add ship to random location with random orientation
    const results = player.board.addShip(randomCoords, ship, randomOrientation);
    // If ship was added successfully return
    if (results) return;
    // Else try again
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

function renderShip(shipCoords, playerDOM) {
    // Create coordsString
    const coordsString = shipCoords.reduce(
        (prev, curr) => (prev += curr.join("")),
        ""
    );
    // Create coordsArray
    const coordsArray = coordsString.match(/.{1,2}/g);
    // Loop through each coord and mark that cell to contain ship
    for (const coord of coordsArray) {
        const cellDOM = playerDOM.querySelector(`[data-coords~=${coord}]`);
        cellDOM.classList.add("board-cell--ship");
    }
}

function createShipsArray() {
    // Ships
    const carrier = new Ship(5, 5);
    const battleShip = new Ship(4, 4);
    const cruiser = new Ship(3, 3);
    const subMarine = new Ship(3, 3);
    const destroyer = new Ship(2, 2);

    // Return
    return [carrier, battleShip, cruiser, subMarine, destroyer];
}
