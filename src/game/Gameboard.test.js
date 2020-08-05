import Gameboard from './Gameboard'

test('board constructor returns correct hit matrix', () => {
    const board = new Gameboard(2);
    expect(board.hitMatrix).toEqual([[false,false],[false, false]]);
});

test('places ship at valid location', () => {
    const board = new Gameboard();
    board.placeShip(2, 0, 10, true);
    expect(board.ships[2].pos).toEqual([0, 10, true]);
});

test('rejects location out of board', () => {
    const board = new Gameboard();
    expect(() => board.placeShip(3, 10, 5, true)).toThrow(Error);
});

test('rejects ship collision', () => {
    const board = new Gameboard();
    board.placeShip(0, 0, 0, false);
    expect(board.ships[0].pos).toEqual([0, 0, true]);
});

test('rejects ship collision', () => {
    const board = new Gameboard();
    board.placeShip(1, 2, 4, true);
    expect(board.ships[1].pos).toEqual([0, 2, true]);
});

test('rejects ship collision', () => {
    const board = new Gameboard();
    board.placeShip(4, 3, 0, false);
    expect(board.ships[4].pos).toEqual([0, 8, true]);
});

test('can replace same object in its current location', () => {
    const board = new Gameboard();
    board.placeShip(0, 0, 0, true);
    expect(board.ships[0].pos).toEqual([0, 0, true]);
});