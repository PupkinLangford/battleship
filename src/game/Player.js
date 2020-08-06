import Gameboard from './Gameboard';

class Player {
    constructor() {
        this.oppBoard = new Gameboard();
    }

    getBoard() {
        return {...this.oppBoard};
    }

    attack(row, col) {
        return this.oppBoard.receiveAttack(row, col); 
    }

    randomAttack() {
        const coords = [Math.floor(Math.random() * this.oppBoard.size), Math.floor(Math.random() * this.oppBoard.size)];
        try {
            return this.oppBoard.receiveAttack(...coords);
        } catch(err) {
            return this.randomAttack();
        }
    }

    wonGame() {
        return this.oppBoard.allSunk();
    }
}

export default Player;
