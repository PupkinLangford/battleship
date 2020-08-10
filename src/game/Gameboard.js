import Ship from './Ship';

class Gameboard {
    constructor(size) {
        this.size = 10;
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
        this.sunken = 0;
    }

    placeShip(shipIndex, x, y, horizontal) {
        if (x > 10 || y > 10) throw new Error('Ship off board');
        if (horizontal && x + this.ships[shipIndex].ship.length > 10) return;
        if (!horizontal && y +this.ships[shipIndex].ship.length > 10) return;
        const oldPos = [...this.ships[shipIndex].pos];
        this.ships[shipIndex].pos = [-10, -10, true];
        this.shipLocs = this.updateShipLocs();
        try {
            this.ships[shipIndex].pos = [x, y, horizontal];
            this.shipLocs = this.updateShipLocs();
            return true;
        } catch(err) {
            this.ships[shipIndex].pos = [...oldPos];
            this.shipLocs = this.updateShipLocs();
            return false;
        }
    }

    rotateShip(shipIndex) {
        this.placeShip(shipIndex, this.ships[shipIndex].pos[0], this.ships[shipIndex].pos[1], !this.ships[shipIndex].pos[2])
    }

    placeShipsRandom() {
        for(let i = 0; i < this.ships.length; i++) {
            while (true) {
                const newCoords = [Math.floor(Math.random() * this.size), Math.floor(Math.random() * this.size), Math.random() > 0.5];
                const result = this.placeShip(i, ...newCoords);
                if (result) break;
            }
        }
    }

    receiveAttack(x, y) {
        if (x < 0 || x > this.size || y < 0 || y > this.size) throw Error('Illegal Argument Exception');
        if (this.hitMatrix[x][y]) throw Error('Already attacked');
        this.hitMatrix[x][y] = true;
        const success = this.shipLocs[x][y];
        if (success !== false) {
            const shipHit = this.ships[success];
            const location = shipHit.pos[2] ? x - shipHit.pos[0] : y - shipHit.pos[1];
            shipHit.ship.hit(location);
            if (shipHit.ship.isSunk()) this.sunken ++;
            return true;
        }
        return false;
    }

    allSunk() {
        return this.sunken === this.ships.length;
    }

    updateShipLocs() {
        const shipLocs = [];
        let row;
        for (let i = 0; i < this.size; i++) {
            row = Array(this.size).fill(false);
            shipLocs.push(row);
        }
        this.ships.forEach((obj, idx) => {
            if (obj.pos[0] < 0) return;
            if (obj.pos[2]) {
                for (let i = 0; i < obj.ship.length; i++) { 
                    if (shipLocs[obj.pos[0] + i][obj.pos[1]] !== false) throw Error('collision');
                    shipLocs[obj.pos[0] + i][obj.pos[1]] = idx;
                }
            } else {
                for (let j = 0; j < obj.ship.length; j++) {
                    if (shipLocs[obj.pos[0]][obj.pos[1] + j] !== false) throw Error('collision');
                    shipLocs[obj.pos[0]][obj.pos[1] + j] = idx;
                }
            }
        });
        return shipLocs;
    }
}

export default Gameboard;