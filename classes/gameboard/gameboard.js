const rowsArray = "abcdefghij".split("");

export default class Gameboard {
    #board;
    #border;
    constructor() {
        this.#board = this.#createCoords();
        this.#border = 10;
    }

    info(coords) {
        const [row, col] = coords;
        return this.#board[row][col];
    }

    addShip(coords, ship, horizontal = false) {
        const [row, col] = coords;

        if (horizontal) {
            // Don't add ships that exeeds border horizontly
            const rowIndex = rowsArray.indexOf(row);
            if (rowIndex + ship.length > this.#border) return false;

            // Add ship
            this.#addShipHorizontly(row, col, ship);
            return true;
        }
        // Don't add ships that exeeds border verticaly
        if (col + ship.length > this.#border) return false;

        // Add ship
        this.#addShipVerticaly(row, col, ship);
        return true;
    }

    // Private Methods
    #createCoords() {
        const coords = {};
        // Create rows from a to j (total 10)
        const rows = rowsArray;
        for (const row of rows) {
            // Assign an array to each row
            coords[row] = [];
            // Add columns (total 10)
            for (let col = 0; col < 10; col++) {
                // Base cell of the board
                const cell = { isEmpty: true, shipRef: null };
                // Add base cell
                coords[row].push(cell);
            }
        }
        return coords;
    }

    #addShipHorizontly(row, col, ship) {
        // Add ship to specified cells
        // We need to get the numerical index of row string
        const rowIndex = rowsArray.indexOf(row);
        for (let i = 0; i < ship.length; i++) {
            // Use the numerical value to find the corresponding string value
            const nextRow = rowsArray[rowIndex + i];
            this.#board[nextRow][col].isEmpty = false;
            this.#board[nextRow][col].shipRef = ship;
        }
    }

    #addShipVerticaly(row, col, ship) {
        // Add ship to specified cells
        for (let i = 0; i < ship.length; i++) {
            const nextCol = col + i;
            this.#board[row][nextCol].isEmpty = false;
            this.#board[row][nextCol].shipRef = ship;
        }
    }
}
