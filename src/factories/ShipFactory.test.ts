import createShip from './ShipFactory';
import {ShipTypes} from '../types';

describe('Ship initialisation', () => {
    it('Length valid/invalid', () => {
        expect(createShip(0, -1)).toBe(null);
        expect(createShip(0, ShipTypes.LENGTH_LIMIT)).toBe(null);
        expect(createShip(0, ShipTypes.SUBMARINE)?.length).toBe(3);
    });

    test('Initial parts hit are all false', () => {
        expect(createShip(0, ShipTypes.SUBMARINE)?.partsHit).toStrictEqual([false, false, false]);
    });

    test('Ship is sunk by default', () => {
        expect(createShip(0, ShipTypes.SUBMARINE)?.isSunk()).toBe(false);
    });
})

describe('Ship hit function', () => {
    let ship: any;

    beforeEach(() => {
        ship = createShip(0, ShipTypes.SUBMARINE);
    });

    test('Hit returns true when valid', () => {
        expect(ship?.hit(2)).toBe(true);
    })

    test('Invalid hit location returns null', () => {
        expect(ship?.hit(3)).toBe(false);
        expect(ship?.partsHit).toStrictEqual([false, false, false]);
    });

    test('Parts can be hit', () => {
        ship?.hit(2);
        expect(ship?.partsHit).toStrictEqual([false, false, true]);
    });

    test('Multiple parts can be hit', () => {
        ship?.hit(2);
        ship?.hit(0);
        expect(ship?.partsHit).toStrictEqual([true, false, true]);
    });

    test('Same parts cannot be hit twice', () => {
        ship?.hit(2);
        expect(ship?.hit(2)).toBe(false);
    });

    test('Ship can be sunk', () => {
        ship?.hit(0);
        ship?.hit(1);
        ship?.hit(2);
        expect(ship?.partsHit).toStrictEqual([true, true, true]);
        expect(ship?.isSunk()).toBe(true);
    })
});
