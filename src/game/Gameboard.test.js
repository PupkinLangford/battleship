import Gameboard from './Gameboard'

test('board constructor returns correct hit matrix', () => {
    const board = new Gameboard(2);
    expect(board.hitMatrix).toEqual([[false,false],[false, false]]);
});