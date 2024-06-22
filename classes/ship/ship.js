export default class Ship {
    constructor(hp = 0, length = 0) {
        this.hp = hp;
        this.length = length;
    }

    isSunk() {
        if (this.hp <= 0) return true;
        return false;
    }
}
