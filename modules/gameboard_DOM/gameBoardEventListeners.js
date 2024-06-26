import renderEventMessage from "../event_message/eventMessage.js";
import makeAIMove from "../player_ai/playerAI.js";
import renderWinMessage from "../win_message/winMessageBox.js";

export function handleCellClick(player, gameState) {
    return (e) => {
        // If game is not started than don't do anything
        if (!gameState.start) {
            renderEventMessage(player, "no-start");
            return;
        }
        // If its not your turn than return
        if (gameState.turn === player.name) {
            renderEventMessage(player, "attack-self");
            return;
        }
        // Else its your turn
        const coords = e.target.dataset.coords.split("");
        const board = player.board;
        // If the cell is already attacked than ask for input again
        if (board.info(coords).isAttacked) {
            renderEventMessage(player, "already-attacked");
            return;
        }
        // Pass turn
        gameState.turn = player.name;

        // Incase of successfull attack
        if (board.receiveAttack(coords)) {
            // Mark cell as attacked
            e.target.classList.add("board-cell--attacked");
            renderEventMessage(player, "attack");
            // If attacking player has won
            if (board.isAllShipSunk()) {
                renderEventMessage(player, "won");
                renderWinMessage(player.name);
            }
        } else {
            // If attack was a miss
            renderEventMessage(player, "missed");
            e.target.classList.add("board-cell--missed");
        }

        // AI
        makeAIMove(player);
    };
}
