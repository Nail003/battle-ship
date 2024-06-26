import createBoardColumns from "../boardColumns/boardColumns";
import { createBoardRows } from "../boardRows/boardRows";
import { generateRandomCoords } from "./generateRandomCoords";

describe("Generate Random Coords", () => {
    it("should generate board coordinates", () => {
        const rowsArray = createBoardRows();
        const columnArray = createBoardColumns();
        const result = generateRandomCoords();

        expect(result.length).toBe(2);
        expect(typeof result[0]).toBe("string");
        expect(typeof result[1]).toBe("number");
        expect(rowsArray.includes(result[0])).toBeTruthy();
        expect(columnArray.includes(result[1])).toBeTruthy();
    });
});
