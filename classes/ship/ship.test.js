import Ship from "./ship";

describe("Ship", () => {
    it("should create a new ship", () => {
        const ship = new Ship();
        expect(ship).toBeDefined();
    });

    it("should return the ship default hp", () => {
        const ship = new Ship();
        expect(ship.hp).toBe(0);
    });

    it("should return the ship default length", () => {
        const ship = new Ship();
        expect(ship.length).toBe(0);
    });

    it("should set the ship hp", () => {
        const ship = new Ship();
        ship.hp = 5;
        expect(ship.hp).toBe(5);
    });

    it("should set the ship length", () => {
        const ship = new Ship();
        ship.length = 5;
        expect(ship.length).toBe(5);
    });

    it("should create ship with specified hp and length", () => {
        const ship = new Ship(5, 5);
        expect(ship.hp).toBe(5);
        expect(ship.hp).toBe(5);
    });

    it("should not sink ship if ship still has hp", () => {
        const ship = new Ship(5, 5);
        expect(ship.isSunk()).toBeFalsy();
    });

    it("should sink ship if ship has lost all its hp", () => {
        const ship = new Ship(0, 5);
        expect(ship.isSunk()).toBeTruthy();
    });
});
