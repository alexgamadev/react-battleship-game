import createGameboard, { GameboardInterface } from './GameboardFactory';
import {dimensions} from '../types';

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

    test('Check single coordinate is valid', () => {
        expect(gameboard.isValidPlacement([8, 3])).toBe(true);
    });

    test('Check single coordinate is invalid', () => {
        expect(gameboard.isValidPlacement([-1, 8])).toBe(false);
    });

    test('Check horizontal placement is valid', () => {
        const dimensions: dimensions = {length: 3, direction: 'horizontal'};
        expect(gameboard.isValidPlacement([5, 3], dimensions)).toBe(true);
    });

    test('Check horizontal placement is invalid', () => {
        const dimensions: dimensions = {length: 3, direction: 'horizontal'};
        expect(gameboard.isValidPlacement([9, 3], dimensions)).toBe(false);
    });

    test('Check vertical placement is valid', () => {
        const dimensions: dimensions = {length: 3, direction: 'vertical'};
        expect(gameboard.isValidPlacement([8, 5], dimensions)).toBe(true);
    });

    test('Check vertical placement is invalid', () => {
        const dimensions: dimensions = {length: 3, direction: 'vertical'};
        expect(gameboard.isValidPlacement([4, 8], dimensions)).toBe(false);
    });
})