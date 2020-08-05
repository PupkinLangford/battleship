import Ship from './Ship';

class Gameboard {
    constructor(size = 10) {
        this.size = size;
        const carrier = new Ship(5);
        const battleship = new Ship(4);
        const cruiser = new Ship(3);
        const submarine = new Ship(3);
        const destroyer = new Ship(2);
        this.ships = [{ship: carrier, pos: [0, 0, true]},
        {ship: battleship, pos: [0, 2, true]},
        {ship: cruiser, pos: [0, 4, true]},
        {ship: submarine, pos: [0, 6, true]},
        {ship: destroyer, pos: [0, 8, true]}];
        this.shipLocs = this.updateShipLocs();
        this.hitMatrix = [];
        let row;
        for (let i = 0; i < this.size; i++) {
            row = Array(this.size).fill(false);
            this.hitMatrix.push(row);
        }
    }

    placeShip(shipIndex, x, y, horizontal) {
        if (x > 10 || y > 10) throw new Error('Ship off board');
        if (horizontal && x + this.ships[shipIndex].ship.length > 10) throw new Error('Ship off board');
        if (!horizontal && y +this.ships[shipIndex].ship.length > 10) throw new Error('Ship off board');
        const oldPos = [...this.ships[shipIndex].pos];
        this.ships[shipIndex].pos = [-10, -10, true];
        this.shipLocs = this.updateShipLocs();
        try {
            this.ships[shipIndex].pos = [x, y, horizontal];
            this.shipLocs = this.updateShipLocs();
        } catch(err) {
            this.ships[shipIndex].pos = [...oldPos];
            this.shipLocs = this.updateShipLocs();
        }
    }

    receiveAttack(x, y) {
        return;
    }

    updateShipLocs() {
        const shipLocs = [];
        let row;
        for (let i = 0; i < this.size; i++) {
            row = Array(this.size).fill(false);
            shipLocs.push(row);
        }
        this.ships.forEach((obj) => {
            if (obj.pos[0] < 0) return;
            if (obj.pos[2]) {
                for (let i = 0; i < obj.ship.length; i++) { 
                    if (shipLocs[obj.pos[0] + i][obj.pos[1]]) throw Error('collision');
                    shipLocs[obj.pos[0] + i][obj.pos[1]] = true;
                }
            } else {
                for (let j = 0; j < obj.ship.length; j++) {
                    if (shipLocs[obj.pos[0]][obj.pos[1] + j]) throw Error('collision');
                    shipLocs[obj.pos[0]][obj.pos[1] + j] = true;
                }
            }
        });
        return shipLocs;
    }
}

export default Gameboard;