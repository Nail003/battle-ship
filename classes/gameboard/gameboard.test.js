import Ship from "../ship/ship";
import Gameboard, { defaultCell } from "./gameboard";

describe("Gameboard", () => {
    let board = new Gameboard();

    afterEach(() => {
        board = new Gameboard();
    });

    it("should create new a gameboard", () => {
        expect(board).toBeDefined();
    });

    it("should return info about given coordinates", () => {
        expect(board.info(["c", 3])).toEqual(defaultCell);
    });

    describe("Add ships to specified coords", () => {
        test("ship with length = 1", () => {
            const ship = new Ship();
            const coords = ["c", 3];

            board.addShip(coords, ship);
            expect(board.info(coords).isEmpty).toBeFalsy();
            expect(board.info(coords).shipRef).toEqual(ship);
        });

        test("ship just at border", () => {
            const ship = new Ship();
            const coords = ["j", 9];

            board.addShip(coords, ship);
            expect(board.info(coords).isEmpty).toBeFalsy();
            expect(board.info(coords).shipRef).toEqual(ship);
        });

        test("ship with length = 3", () => {
            const ship = new Ship(3, 3);
            const coords = ["f", 5];
            const coords2 = ["g", 5];
            const coords3 = ["h", 5];

            board.addShip(coords, ship);
            expect(board.info(coords).isEmpty).toBeFalsy();
            expect(board.info(coords).shipRef).toEqual(ship);
            expect(board.info(coords2).isEmpty).toBeFalsy();
            expect(board.info(coords2).shipRef).toEqual(ship);
            expect(board.info(coords3).isEmpty).toBeFalsy();
            expect(board.info(coords3).shipRef).toEqual(ship);
        });

        test("ship with horizontal rotation", () => {
            const ship = new Ship(3, 3);
            const coords = ["d", 5];
            const coords2 = ["d", 6];
            const coords3 = ["d", 7];

            board.addShip(coords, ship, true);
            expect(board.info(coords).isEmpty).toBeFalsy();
            expect(board.info(coords).shipRef).toEqual(ship);
            expect(board.info(coords2).isEmpty).toBeFalsy();
            expect(board.info(coords2).shipRef).toEqual(ship);
            expect(board.info(coords3).isEmpty).toBeFalsy();
            expect(board.info(coords3).shipRef).toEqual(ship);
        });
    });

    it("should return coordinates of added ship horizontly", () => {
        const ship = new Ship(3, 3);
        const coords = ["d", 5];
        const coords2 = ["d", 6];
        const coords3 = ["d", 7];

        expect(board.addShip(coords, ship, true)).toEqual([
            coords,
            coords2,
            coords3,
        ]);
    });

    it("should return coordinates of added ship vertically", () => {
        const ship = new Ship(3, 3);
        const coords = ["d", 5];
        const coords2 = ["e", 5];
        const coords3 = ["f", 5];

        expect(board.addShip(coords, ship)).toEqual([coords, coords2, coords3]);
    });

    it("should not add ship exeeding the borders of the board vertically", () => {
        const ship = new Ship(3, 3);
        const coords = ["j", 8];
        expect(board.addShip(coords, ship)).toBeFalsy();
        expect(board.info(coords)).toEqual(defaultCell);
    });

    it("should not add ship exeeding the borders of the board horizontly", () => {
        const ship = new Ship(3, 3);
        const coords = ["i", 8];
        expect(board.addShip(coords, ship, true)).toBeFalsy();
        expect(board.info(coords)).toEqual(defaultCell);
    });

    it("should not add ship if a ship already exists in specified coordinates vertically", () => {
        const ship = new Ship(3, 3);
        const coords = ["a", 5];
        const coords2 = ["b", 5];
        board.addShip(coords, ship);
        expect(board.addShip(coords2, ship)).toBeFalsy();
    });

    it("should not add ship if a ship already exists in specified coordinates horizontly", () => {
        const ship = new Ship(3, 3);
        const coords = ["a", 5];
        const coords2 = ["a", 6];
        board.addShip(coords, ship, true);
        expect(board.addShip(coords2, ship, true)).toBeFalsy();
    });

    it("should not add ship if a ship already exist in surrounding tiles", () => {
        const ship = new Ship(3, 3);
        const coords = ["b", 5];
        const coords2 = ["c", 6];
        board.addShip(coords, ship, true);
        expect(board.addShip(coords2, ship, true)).toBeFalsy();
    });

    describe("Attack", () => {
        const coords = ["b", 2];

        it("should recieve attack", () => {
            board.receiveAttack(coords);
            expect(board.info(coords).isAttacked).toBeTruthy();
        });

        it("should return false if attack was a miss", () => {
            expect(board.receiveAttack(coords)).toBeFalsy();
        });

        it("should return true if attack hit a ship", () => {
            const ship = new Ship();
            board.addShip(coords, ship);
            expect(board.receiveAttack(coords)).toBeTruthy();
        });

        it("should decrease the health of the ship on successfull attack", () => {
            const ship = new Ship(3, 1);
            board.addShip(coords, ship);
            board.receiveAttack(coords);
            expect(ship.hp).toBe(2);
        });

        it("should not decrease the health of the ship if attacked more than once", () => {
            const ship = new Ship(3, 1);
            board.addShip(coords, ship);
            board.receiveAttack(coords);
            board.receiveAttack(coords);
            expect(ship.hp).toBe(2);
        });

        it("should return the correct number of missed attacks", () => {
            expect(board.missedAttacks).toBe(0);
            board.receiveAttack(coords);
            expect(board.missedAttacks).toBe(1);
        });

        it("should return false if atleast one ship is alive", () => {
            const ship = new Ship();
            board.addShip(coords, ship);
            expect(board.isAllShipSunk()).toBeFalsy();
        });

        it("should return true if there are no ships on board", () => {
            expect(board.isAllShipSunk()).toBeTruthy();
        });

        it("should return true if all the ships are destroyed", () => {
            const ship = new Ship();
            board.addShip(coords, ship);
            board.receiveAttack(coords);
            expect(board.isAllShipSunk()).toBeTruthy();
        });
    });
});
