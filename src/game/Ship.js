class Ship {
    constructor(length) {
        this.length = length;
        this.hitList = Array(length).fill(false);
    }

    hit(location) {
        if (location < 0 || location >= this.length) throw new Error('Illegal Argument Exception');
        if (this.hitList[location]) throw new Error('Already hit');
        this.hitList[location] = true;
    }

    isSunk() {
        return this.hitList.reduce((prev, curr) => {
            return prev && curr;
        }, true);
    }
}

export default Ship;
