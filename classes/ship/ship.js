const minHp = 0;
const defaultHp = 1;
const defaultLength = 1;

export default class Ship {
    constructor(hp = defaultHp, length = defaultLength) {
        this.hp = hp;
        this.length = length;
    }

    hit() {
        if (this.hp > minHp) this.hp--;
    }

    isSunk() {
        if (this.hp <= minHp) return true;
        return false;
    }
}
