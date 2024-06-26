import createBoardColumns from "../utils/boardColumns/boardColumns.js";
import { createBoardRows } from "../utils/boardRows/boardRows.js";
import { generateRandomNumber } from "../utils/generateRandomNumber/generateRandomNumber.js";

// Attacks that avaible for AI to use
// Attack is removed when the AI uses it once
let availableAttackCoords = getPossibleInputsArray();

export default function makeAIMove(player) {
    if (player.name === "player2") {
        // Get player1 board
        const oppenentsBoard = document.querySelector(".player1-board");
        // Get a random attack
        const attackCoords = getRandomAttackCoords();
        const selectorString = `[data-coords=${attackCoords}]`;
        // Get cell to be attacked
        const attackedCell = oppenentsBoard.querySelector(selectorString);
        // Attack cell
        attackedCell.click();
    }
}

export function resetAI() {
    // Papulate the available attacks back to full
    availableAttackCoords = getPossibleInputsArray();
}

function getRandomAttackCoords() {
    const index = generateRandomNumber(availableAttackCoords.length - 1);
    return availableAttackCoords.splice(index, 1)[0];
}

function getPossibleInputsArray() {
    const possibleInputs = [];
    const rowsArray = createBoardRows();
    const columnsArray = createBoardColumns();
    for (const row of rowsArray) {
        for (const col of columnsArray) {
            possibleInputs.push(`${row}${col}`);
        }
    }
    return possibleInputs;
}
