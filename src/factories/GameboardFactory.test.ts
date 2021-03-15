import createGameboard from './GameboardFactory';

describe('Gameboard initialisation', () => {
    test('Gameboard initialises grid', () => {
        expect(createGameboard().grid.length).toBe(100);
        expect(createGameboard().grid[36]).toBe(-1);
    });
})