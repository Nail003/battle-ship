import createBoardColumns from "./boardColumns";

describe("Board Column", () => {
    it("should return the expected output", () => {
        const expected = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        expect(createBoardColumns()).toEqual(expected);
    });
});
