import Player from "./player";

describe("Player", () => {
    const player = new Player();
    it("should create player", () => {
        expect(player).toBeDefined();
    });

    it("should return player gameBoard", () => {
        expect(player.board).toBeDefined();
    });

    it("should return player name", () => {
        expect(player.name).toBeDefined();
    });

    it("should change player name", () => {
        const playerName = "player1";
        player.name = playerName;
        expect(player.name).toBe(playerName);
    });
});
