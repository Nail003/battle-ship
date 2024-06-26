import { generateRandomNumber } from "./generateRandomNumber";

describe("Generate Random Number", () => {
    it("should return a number", () => {
        expect(typeof generateRandomNumber()).toBe("number");
    });

    it("should generate random number within specified range", () => {
        const expected = [0, 1];
        const max = 1;
        expect(expected.includes(generateRandomNumber(max))).toBeTruthy();
    });
});
