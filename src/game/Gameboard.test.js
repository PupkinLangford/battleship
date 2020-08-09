import Gameboard from './Gameboard'

test('board constructor returns correct hit matrix', () => {
    const board = new Gameboard();
    expect(board.hitMatrix).toEqual([[false,false, false, false, false,false,false, false, false, false],
                                    [false,false, false, false, false,false,false, false, false, false],
                                    [false,false, false, false, false,false,false, false, false, false],
                                    [false,false, false, false, false,false,false, false, false, false],
                                    [false,false, false, false, false,false,false, false, false, false],
                                    [false,false, false, false, false,false,false, false, false, false],
                                    [false,false, false, false, false,false,false, false, false, false],
                                    [false,false, false, false, false,false,false, false, false, false],
                                    [false,false, false, false, false,false,false, false, false, false],
                                    [false,false, false, false, false,false,false, false, false, false]]);
});

test('places ship at valid location 1', () => {
    const board = new Gameboard();
    board.placeShip(2, 0, 9, true);
    expect(board.ships[2].pos).toEqual([0, 9, true]);
});

test('places ship at valid location 2', () => {
    const board = new Gameboard();
    board.placeShip(4, 9, 0, false);
    expect(board.ships[4].pos).toEqual([9, 0, false]);
});

test('rejects location out of board', () => {
    const board = new Gameboard();
    board.placeShip(3, 10, 5);
    expect(board.ships[3].pos).toEqual([0, 6, true]);
});

test('rejects ship collision 1', () => {
    const board = new Gameboard();
    board.placeShip(0, 0, 0, false);
    expect(board.ships[0].pos).toEqual([0, 0, true]);
});

test('rejects ship collision 2', () => {
    const board = new Gameboard();
    board.placeShip(1, 2, 4, true);
    expect(board.ships[1].pos).toEqual([0, 2, true]);
});

test('rejects ship collision 3', () => {
    const board = new Gameboard();
    board.placeShip(4, 3, 0, false);
    expect(board.ships[4].pos).toEqual([0, 8, true]);
});

test('can replace same object in its current location', () => {
    const board = new Gameboard();
    board.placeShip(0, 0, 0, true);
    expect(board.ships[0].pos).toEqual([0, 0, true]);
});

test('rejects an already attacked location', () => {
    const board = new Gameboard();
    board.receiveAttack(0, 0);
    expect(() => board.receiveAttack(0, 0)).toThrow(Error);
});

test('successfully records hit', () => {
    const board = new Gameboard();
    const hit = board.receiveAttack(0, 2);
    expect(hit).toBe(true);
    expect(board.hitMatrix).toEqual([[false,false, true, false, false,false,false, false, false, false],
        [false,false, false, false, false,false,false, false, false, false],
        [false,false, false, false, false,false,false, false, false, false],
        [false,false, false, false, false,false,false, false, false, false],
        [false,false, false, false, false,false,false, false, false, false],
        [false,false, false, false, false,false,false, false, false, false],
        [false,false, false, false, false,false,false, false, false, false],
        [false,false, false, false, false,false,false, false, false, false],
        [false,false, false, false, false,false,false, false, false, false],
        [false,false, false, false, false,false,false, false, false, false]]);
});

test('successfully records miss', () => {
    const board = new Gameboard();
    const hit = board.receiveAttack(8, 0);
    expect(hit).toBe(false);
    expect(board.hitMatrix).toEqual([[false,false, false, false, false,false,false, false, false, false],
        [false,false, false, false, false,false,false, false, false, false],
        [false,false, false, false, false,false,false, false, false, false],
        [false,false, false, false, false,false,false, false, false, false],
        [false,false, false, false, false,false,false, false, false, false],
        [false,false, false, false, false,false,false, false, false, false],
        [false,false, false, false, false,false,false, false, false, false],
        [false,false, false, false, false,false,false, false, false, false],
        [true,false, false, false, false,false,false, false, false, false],
        [false,false, false, false, false,false,false, false, false, false]]);
});

test('successfully records allSunk', () => {
    const board = new Gameboard();
    board.receiveAttack(0,0);
    board.receiveAttack(1,0);
    board.receiveAttack(2,0);
    board.receiveAttack(3,0);
    board.receiveAttack(4,0);
    board.receiveAttack(0,2);
    board.receiveAttack(1,2);
    board.receiveAttack(2,2);
    board.receiveAttack(3,2);
    board.receiveAttack(0,4);
    board.receiveAttack(1,4);
    board.receiveAttack(2,4);
    board.receiveAttack(0,6);
    board.receiveAttack(1,6);
    board.receiveAttack(2,6);
    board.receiveAttack(0,8);
    board.receiveAttack(1,8);
    expect(board.allSunk()).toBe(true);
});

test('allSunk fails properly', () => {
    const board = new Gameboard();
    board.receiveAttack(0,0);
    board.receiveAttack(1,0);
    board.receiveAttack(2,0);
    board.receiveAttack(3,0);
    board.receiveAttack(4,0);
    board.receiveAttack(0,2);
    board.receiveAttack(1,2);
    board.receiveAttack(2,2);
    board.receiveAttack(3,2);
    board.receiveAttack(0,4);
    board.receiveAttack(1,4);
    board.receiveAttack(2,4);
    board.receiveAttack(0,6);
    board.receiveAttack(1,6);
    board.receiveAttack(2,6);
    board.receiveAttack(0,8);
    board.receiveAttack(1,9);
    expect(board.allSunk()).toBe(false);
});