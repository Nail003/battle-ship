import Player from "../../classes/player/player.js";
import renderGameboard from "../gameboard_DOM/gameBoardDOM.js";
import renderShips from "../ship_DOM/shipDOM.js";

const player1 = new Player();
const player2 = new Player();

renderGameboard(player1, player2);
renderShips(player1, player2);
