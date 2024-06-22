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

    it("should add ship to specified coords", () => {
        const board = new Gameboard();
        const ship = new Ship();
        const coords = ["c", 3];

        board.addShip(coords, ship);
        expect(board.info(coords)).toEqual({ isEmpty: false, shipRef: ship });
    });
});
