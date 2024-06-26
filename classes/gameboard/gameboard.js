const rowsArray = "abcdefghij".split("");
// Testing exports
export const defaultCell = { isEmpty: true, isAttacked: false, shipRef: null };

export default class Gameboard {
    #board;
    #border;
    #activeShips;
    constructor() {
        this.#board = this.#createCoords();
        this.#border = { min: 0, max: 10 };
        this.#activeShips = 0;
        this.missedAttacks = 0;
        this.shipCells = [];
    }

    info(coords) {
        const [row, col] = coords;
        return this.#board[row][col];
    }

    addShip(coords, ship, horizontal = false) {
        const [row, col] = coords;

        if (horizontal) {
            // Don't add ships that exeeds border horizontly
            if (col + ship.length > this.#border.max) return false;
            // Don't add ship if there is already a ship present
            if (this.#isOccupiedHorizontly(row, col, ship)) return false;

            // Add ship
            return this.#addShipHorizontly(row, col, ship);
        }
        const rowIndex = rowsArray.indexOf(row);
        // Don't add ships that exeeds border verticaly
        if (rowIndex + ship.length > this.#border.max) return false;
        // Don't add ship if there is already a ship present
        if (this.#isOccupiedVertically(row, col, ship)) return false;

        // Add ship
        return this.#addShipVerticaly(row, col, ship);
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

    #addShipVerticaly(row, col, ship) {
        const shipCoords = [];
        // Add ship to specified cells
        // We need to get the numerical index of row string
        const rowIndex = rowsArray.indexOf(row);
        for (let i = 0; i < ship.length; i++) {
            // Use the numerical value to find the corresponding string value
            const nextRow = rowsArray[rowIndex + i];
            this.#board[nextRow][col].isEmpty = false;
            this.#board[nextRow][col].shipRef = ship;
            shipCoords.push([nextRow, col]);
        }
        // Update status
        this.#updateShipsStatus(shipCoords);
        return shipCoords;
    }

    #addShipHorizontly(row, col, ship) {
        const shipCoords = [];
        // Add ship to specified cells
        for (let i = 0; i < ship.length; i++) {
            const nextCol = col + i;
            this.#board[row][nextCol].isEmpty = false;
            this.#board[row][nextCol].shipRef = ship;
            shipCoords.push([row, nextCol]);
        }
        // Update status
        this.#updateShipsStatus(shipCoords);
        return shipCoords;
    }

    #updateShipsStatus(shipCoords) {
        // Increase number of ships
        this.#activeShips++;
        // Update the occupied ship cells
        this.shipCells = [...this.shipCells, ...shipCoords];
    }

    #isOccupiedHorizontly(row, col, ship) {
        for (let i = 0; i < ship.length; i++) {
            const nextCol = col + i;
            // If there is a ship in one the of cells
            if (this.#isOccupied(row, nextCol)) return true;
        }
        // Else we are green
        return false;
    }

    #isOccupiedVertically(row, col, ship) {
        const rowIndex = rowsArray.indexOf(row);
        for (let i = 0; i < ship.length; i++) {
            // If there is a ship in one the of cells
            const nextRow = rowsArray[rowIndex + i];
            if (this.#isOccupied(nextRow, col)) return true;
        }
        // Else we are green
        return false;
    }

    #isOccupied(row, col) {
        // Compare the current and all adjacent cells
        // If any of them is occupied return true
        const rowIndex = rowsArray.indexOf(row);

        // Current
        if (!this.#board[rowsArray[rowIndex]][col].isEmpty) return true;
        // Right
        if (
            col + 1 < this.#border.max &&
            !this.#board[rowsArray[rowIndex]][col + 1].isEmpty
        )
            return true;
        // Left
        if (
            col - 1 >= this.#border.min &&
            !this.#board[rowsArray[rowIndex]][col - 1].isEmpty
        )
            return true;
        // Bottom
        if (
            rowIndex + 1 < this.#border.max &&
            !this.#board[rowsArray[rowIndex + 1]][col].isEmpty
        )
            return true;
        // Top
        if (
            rowIndex - 1 >= this.#border.min &&
            !this.#board[rowsArray[rowIndex - 1]][col].isEmpty
        )
            return true;

        // All cells are empty
        return false;
    }
}
