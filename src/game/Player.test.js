import Player from './Player';

test('random attack returns value', () => {
    const plyr = new Player();
    for(let i = 0; i < 99; i++) {
        plyr.randomAttack();
    }
    const x = plyr.randomAttack();
    expect(x).toBeDefined();
    expect(x).not.toBeNull();
}) ;

test('rejects already attacked location', () => {
    const plyr = new Player();
    plyr.attack(0, 0);
    expect(() => plyr.attack(0, 0)).toThrow(Error);
});

test('successful attack returns true', () => {
    const plyr = new Player();
    const x = plyr.attack(0, 0);
    expect(x).toBe(true);
});

test('miss returns false', () => {
    const plyr = new Player();
    const x = plyr.attack(5, 5);
    expect(x).toBe(false);
});