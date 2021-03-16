import createGameboard, { GameboardInterface } from './GameboardFactory';
import {dimensions, ShipTypes} from '../types';
import createShip from './ShipFactory';

describe('Gameboard initialisation', () => {
    test('Gameboard initialises grid', () => {
        expect(createGameboard().grid.length).toBe(100);
        expect(createGameboard().grid[36]).toBe(-1);
    });
})



describe('Gameboard checkValidPlacement', () => {
    let gameboard: GameboardInterface;

    beforeEach(() => {
        gameboard = createGameboard();
    });

    test('Single coordinate', () => {
        expect(gameboard.isValidPlacement([8, 3])).toBe(true);
        expect(gameboard.isValidPlacement([-1, 8])).toBe(false);
    });

    test('Horizontal placement', () => {
        const dimensions: dimensions = {length: 3, direction: 'horizontal'};
        expect(gameboard.isValidPlacement([5, 3], dimensions)).toBe(true);
        expect(gameboard.isValidPlacement([9, 3], dimensions)).toBe(false);
    });

    test('Vertical placement is valid', () => {
        const dimensions: dimensions = {length: 3, direction: 'vertical'};
        expect(gameboard.isValidPlacement([8, 5], dimensions)).toBe(true);
        expect(gameboard.isValidPlacement([4, 8], dimensions)).toBe(false);
    });

})

describe('Gameboard placeShip', () => {
    let gameboard: GameboardInterface;

    beforeEach(() => {
        gameboard = createGameboard();
    });

    test('Test ship out of bounds', () => {
        const ship = createShip(ShipTypes.SUBMARINE);
        if(!ship) return;
        expect(gameboard.placeShip([8, 3], ship)).toBe(false);
        expect(gameboard.placeShip([6, 3], ship)).toBe(true);
    });
})