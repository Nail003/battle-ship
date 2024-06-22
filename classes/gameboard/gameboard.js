const rowsArray = "abcdefghij".split("");
// Testing exports
export const defaultCell = { isEmpty: true, isAttacked: false, shipRef: null };

export default class Gameboard {
    #board;
    #border;
    #activeShips;
    constructor() {
        this.#board = this.#createCoords();
        this.#border = 10;
        this.#activeShips = 0;
        this.missedAttacks = 0;
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

    receiveAttack(coords) {
        const [row, col] = coords;
        const cell = this.#board[row][col];

        // Attack to an already attacked cell is unacceptable
        if (cell.isAttacked) return false;

        // Set cell to be attacked
        cell.isAttacked = true;

        // Return false on unsuccessfull attack
        if (cell.isEmpty) {
            this.missedAttacks++;
            return false;
        }

        // Attack the ship
        cell.shipRef.hit();
        // Decrease total ships if this ship is destroyed
        if (cell.shipRef.isSunk()) this.#activeShips--;
        // Return true on successfull attack
        return true;
    }

    isAllShipSunk() {
        return this.#activeShips === 0 ? true : false;
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
                const cell = JSON.parse(JSON.stringify(defaultCell)); // Create Deep copy
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
        // Increase number of ships
        this.#activeShips++;
    }

    #addShipVerticaly(row, col, ship) {
        // Add ship to specified cells
        for (let i = 0; i < ship.length; i++) {
            const nextCol = col + i;
            this.#board[row][nextCol].isEmpty = false;
            this.#board[row][nextCol].shipRef = ship;
        }
        // Increase number of ships
        this.#activeShips++;
    }
}
