import { createBoardRows } from "../boardRows/boardRows.js";
import { generateRandomNumber } from "../generateRandomNumber/generateRandomNumber.js";

export function generateRandomCoords() {
    const rowsArray = createBoardRows();
    const max = 9;
    const row = rowsArray[generateRandomNumber(max)];
    const col = generateRandomNumber(max);
    return [row, col];
}
