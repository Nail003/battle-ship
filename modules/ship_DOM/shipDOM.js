import Ship from "../../classes/ship/ship.js";

export default function renderShips(player) {
    // Ships
    const carrier = new Ship(5, 5);
    const battleShip = new Ship(4, 4);
    const cruiser = new Ship(3, 3);
    const subMarine = new Ship(3, 3);
    const destroyer = new Ship(2, 2);

    renderShip(player.board.addShip(["a", 1], carrier));
    renderShip(player.board.addShip(["f", 1], battleShip));
    renderShip(player.board.addShip(["c", 1], cruiser));
    renderShip(player.board.addShip(["d", 5], subMarine));
    renderShip(player.board.addShip(["j", 1], destroyer));
}

function renderShip(shipCoords) {
    console.log(shipCoords);
    const player1DOM = document.getElementsByClassName("player1-board")[0];

    const coordsString = shipCoords.reduce(
        (prev, curr) => (prev += curr.join("")),
        ""
    );

    const coords = coordsString.match(/.{1,2}/g);

    for (const coord of coords) {
        const cellDOM = player1DOM.querySelector(`[data-coords~=${coord}]`);
        cellDOM.classList.add("board-cell--ship");
    }
}
