import Ship from './Ship';

class Gameboard {
    constructor(size) {
        this.size = size;
        this.ships = []; // Or object ship: coordinate
        this.hitMatrix = [];
        let row;
        for (let i = 0; i < this.size; i++) {
            row = Array(this.size).fill(false);
            this.hitMatrix.push(row);
        }
    }

    placeShip(x, y, theta) {
        return;
    }

    receiveAttack(x, y) {
        return;
    }
}

export default Gameboard;