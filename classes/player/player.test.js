import Player from "./player";

describe("Player", () => {
    const player = new Player();
    it("should create player", () => {
        expect(player).toBeDefined();
    });

    it("should return player gameBoard", () => {
        expect(player.board).toBeDefined();
    });
});
