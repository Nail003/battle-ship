import Player from "../../classes/player/player.js";
import renderGameboard from "../gameboard_DOM/gameBoardDOM.js";
import renderShips from "../ship_DOM/shipDOM.js";

renderGameboard();

const player1 = new Player();
const player2 = new Player();

renderShips(player1);
