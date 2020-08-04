import Ship from './Ship';

test('ship constructor returns correct hit list', () => {
    const ship = new Ship(5);
    expect(ship.hitList).toEqual([false,false,false,false,false]);
});

test('hit function marks unhit position', () => {
    const ship = new Ship(5);
    ship.hit(2)
    expect(ship.hitList).toEqual([false,false,true,false,false]);
});

test('failuire for hit position', () => {
    const ship = new Ship(5);
    ship.hit(2);
    expect(() => ship.hit(2)).toThrow(Error);
});

test('recognizes sunken ship', () => {
    const ship = new Ship(2);
    ship.hit(1);
    ship.hit(0);
    expect(ship.isSunk()).toEqual(true);
});

test('recognizes sunken ship', () => {
    const ship = new Ship(3);
    ship.hit(1);
    ship.hit(0);
    expect(ship.isSunk()).toEqual(false);
});

