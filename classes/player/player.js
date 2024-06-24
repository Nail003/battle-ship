import Gameboard from "../gameboard/gameboard.js";

export default class Player {
    constructor(name = "player") {
        this.board = new Gameboard();
        this.name = name;
    }
}
