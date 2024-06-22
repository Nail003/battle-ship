export default class Gameboard {
    #board;
    constructor() {
        this.#board = this.#createCoords();
    }

    info(coords) {
        const [row, col] = coords;
        return this.#board[row][col];
    }

    addShip(coords, ship) {
        const [row, col] = coords;

        // Add ship to specified cell
        this.#board[row][col].isEmpty = false;
        this.#board[row][col].shipRef = ship;
    }

    // Private Methods
    #createCoords() {
        const coords = {};
        // Create rows from a to j (total 10)
        const rows = "abcdefghij".split("");
        for (const row of rows) {
            // Assign an array to each row
            coords[row] = [];
            // Add columns (total 10)
            for (let col = 1; col < 11; col++) {
                // Base cell of the board
                const cell = { isEmpty: true, shipRef: null };
                // Add base cell
                coords[row].push(cell);
            }
        }
        return coords;
    }
}
