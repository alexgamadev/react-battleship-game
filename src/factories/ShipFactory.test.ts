import ShipFactory, {ShipInterface} from './ShipFactory';

describe('Ship Factory', () => {
    it('Returns correct object', () => {
        const expectedShip: ShipInterface = {
            length: 3,
            partsHit: [false, false, false],
            isSunk: false,
        }
        expect(ShipFactory(3)).toStrictEqual(expectedShip);
    });

    it('Returns null if length invalid', () => {
        expect(ShipFactory(-1)).toBe(null);
    });
})
