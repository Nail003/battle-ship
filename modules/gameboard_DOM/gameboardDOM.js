import renderWinMessage from "../win_message/winMessageBox.js";

export default function renderGameboard(player1, player2, gameState) {
    // Get
    const boardContainer =
        document.getElementsByClassName("board-container")[0];

    // Create Child
    const player1Board = createGameboard(player1, gameState);
    const player2Board = createGameboard(player2, gameState);

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

function createGameboard(player, gameState) {
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
            cell.addEventListener("click", handleCellClick(player, gameState));

            // Append Child
            board.appendChild(cell);
        }
    }
    return board;
}

function handleCellClick(player, gameState) {
    return (e) => {
        // If game is not started than don't do anything
        if (!gameState.start) return;
        // If its not your turn than return
        if (gameState.turn === player.name) return;
        // Else its your turn
        const coords = e.target.dataset.coords.split("");
        const board = player.board;

        // If the cell is already attacked than ask for input again
        if (board.info(coords).isAttacked) return;

        // Pass turn
        gameState.turn = player.name;

        if (board.receiveAttack(coords)) {
            e.target.classList.add("board-cell--attacked");

            // If attacking player has won
            if (board.isAllShipSunk()) {
                renderWinMessage(player.name);
            }
            return;
        }
        e.target.classList.add("board-cell--missed");
    };
}
