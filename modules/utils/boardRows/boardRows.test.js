import { createBoardRows } from "./boardRows";

describe("Board Row Util", () => {
    it("should return correct board rows arrays", () => {
        const expected = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
        expect(createBoardRows()).toEqual(expected);
    });
});
