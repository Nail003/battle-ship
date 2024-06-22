export default class ship {
    constructor(hp, length) {
        this.hp = hp;
        this.length = length;
    }

    isSunk() {
        if (this.hp <= 0) {
            return true;
        }
    }
}
