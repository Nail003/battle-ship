import Ship from "../ship/ship";
import Gameboard from "./gameboard";

const defaultCell = { isEmpty: true, shipRef: null };

describe("Gameboard", () => {
    it("should create new a gameboard", () => {
        const board = new Gameboard();
        expect(board).toBeDefined();
    });

    it("should return info about given coordinates", () => {
        const board = new Gameboard();
        expect(board.info(["c", 3])).toEqual(defaultCell);
    });

    describe("Add ships to specified coords", () => {
        test("ship with length = 1", () => {
            const board = new Gameboard();
            const ship = new Ship();
            const cell = { isEmpty: false, shipRef: ship };
            const coords = ["c", 3];

            board.addShip(coords, ship);
            expect(board.info(coords)).toEqual(cell);
        });

        test("ship just at border", () => {
            const board = new Gameboard();
            const ship = new Ship();
            const cell = { isEmpty: false, shipRef: ship };
            const coords = ["j", 9];

            board.addShip(coords, ship);
            expect(board.info(coords)).toEqual(cell);
        });

        test("ship with length = 3", () => {
            const board = new Gameboard();
            const ship = new Ship(3, 3);
            const cell = { isEmpty: false, shipRef: ship };
            const coords = ["f", 5];
            const coords2 = ["f", 6];
            const coords3 = ["f", 7];

            board.addShip(coords, ship);

            expect(board.info(coords)).toEqual(cell);
            expect(board.info(coords2)).toEqual(cell);
            expect(board.info(coords3)).toEqual(cell);
        });

        test("ship with horizontal rotation", () => {
            const board = new Gameboard();
            const ship = new Ship(3, 3);
            const cell = { isEmpty: false, shipRef: ship };
            const coords = ["d", 5];
            const coords2 = ["e", 5];
            const coords3 = ["f", 5];

            board.addShip(coords, ship, true);

            expect(board.info(coords)).toEqual(cell);
            expect(board.info(coords2)).toEqual(cell);
            expect(board.info(coords3)).toEqual(cell);
        });
    });

    it("should not add ship exeeding the borders of the board vertically", () => {
        const board = new Gameboard();
        const ship = new Ship(3, 3);
        const coords = ["f", 8];

        expect(board.addShip(coords, ship)).toBeFalsy();
        expect(board.info(coords)).toEqual(defaultCell);
    });

    it("should not add ship exeeding the borders of the board horizontly", () => {
        const board = new Gameboard();
        const ship = new Ship(3, 3);
        const coords = ["i", 8];

        expect(board.addShip(coords, ship, true)).toBeFalsy();
        expect(board.info(coords)).toEqual(defaultCell);
    });
});
