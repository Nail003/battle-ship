export default function renderGameboard() {
    // Get
    const boardContainer =
        document.getElementsByClassName("board-container")[0];

    // Create Child
    const player1Board = createGameboard();
    const player2Board = createGameboard();

    // Update Child
    player1Board.classList.add("player1-board");
    player2Board.classList.add("player2-board");

    // Add scanner background to board
    const scanner = document.createElement("div");
    scanner.classList.add("scanner-background");
    player2Board.appendChild(scanner);

    // Append Child
    boardContainer.appendChild(player1Board);
    boardContainer.appendChild(player2Board);
}

function createGameboard() {
    const rows = "abcdefghij".split("");
    const border = 10;
    // Create
    const board = document.createElement("div");

    // Update
    board.classList.add("board");

    for (const row of rows) {
        for (let col = 0; col < border; col++) {
            // Create Child
            const cell = document.createElement("div");

            // Update Child
            cell.dataset.coords = `${row}${col}`;
            cell.classList.add("board_cell");

            // Append Child
            board.appendChild(cell);
        }
    }
    return board;
}
