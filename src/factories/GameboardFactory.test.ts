import createGameboard, { GameboardInterface } from './GameboardFactory';
import {dimensions, ShipTypes} from '../helpers/types';
import createShip from './ShipFactory';

describe('Gameboard initialisation', () => {
    test('Gameboard initialises grid', () => {
        expect(createGameboard().grid.length).toBe(100);
        expect(createGameboard().grid[36]).toBe(false);
    });
})

describe('Gameboard getAtPosition', () => {
    test('Invalid coordinates', () => {
        const gameboard = createGameboard();
        expect(gameboard.isHitAtPos([-1, -1])).toBe(null);
        expect(gameboard.isHitAtPos([10, 3 ])).toBe(null);
    });

    test('Valid coordinates', () => {
        const gameboard = createGameboard();

        expect(gameboard.isHitAtPos([0, 0])).toBe(false);
        expect(gameboard.isHitAtPos([9, 9])).toBe(false);
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
        const ship = createShip(1, ShipTypes.SUBMARINE);
        if(!ship) return;
        expect(gameboard.placeShip([8, 3], ship)).toBe(false);
        expect(gameboard.placeShip([6, 3], ship)).toBe(true);
    });

    test('Placed ship is stored in board', () => {
        const ship = createShip(1, ShipTypes.SUBMARINE);
        if(!ship) return;
        gameboard.placeShip([6, 3], ship);
        expect(gameboard.ships.length).toBe(1);
        const boardShip = gameboard.ships.find(boardShip => boardShip.id === ship.id);
        expect(boardShip).not.toBe(undefined);
        expect(boardShip?.position[0]).toStrictEqual([6, 3]);
    });

    test('Ship gets moved correctly', () => {
        const ship = createShip(1, ShipTypes.SUBMARINE);
        if(!ship) return;
        
        //Place ship initially
        expect(gameboard.placeShip([6, 3], ship)).toBe(true);
        expect(gameboard.ships.length).toBe(1);
        expect(gameboard.getShipAtPos([6, 3])?.id).toBe(ship.id);

        // Move and check that old position was cleared
        expect(gameboard.placeShip([1, 8], ship)).toBe(true);
        expect(gameboard.ships.length).toBe(1);
        expect(gameboard.getShipAtPos([6, 3])).toBe(null);
        expect(gameboard.getShipAtPos([1, 8])?.id).toBe(ship.id);
    });
})

describe('Gameboard recieveAttack', () => {
    let gameboard: GameboardInterface;

    beforeEach(() => {
        gameboard = createGameboard();
    });

    test('Valid/invalid attacks', () => {
        expect(gameboard.recieveAttack([-1, 8])).toBe(false);
        expect(gameboard.recieveAttack([6, 8])).toBe(true);
    })

    test('Hits stored', () => {
        gameboard.recieveAttack([4, 8]);
        expect(gameboard.isHitAtPos([4, 8])).toBe(true);
    })

    test('Same place cannot be hit twice', () => {
        gameboard.recieveAttack([4, 8]);
        expect(gameboard.recieveAttack([4, 8])).toBe(false);
    })

    test('Ship is hit by attack', () => {
        const ship = createShip(1, ShipTypes.SUBMARINE);
        if(!ship) return;
        gameboard.placeShip([6, 3], ship);
        expect(gameboard.recieveAttack([6, 3])).toBe(true);
        expect(ship?.partsHit).toStrictEqual([true, false, false]);
    })

    test('Ship is sunk by attacks', () => {
        const ship = createShip(1, ShipTypes.SUBMARINE);
        if(!ship) return;
        gameboard.placeShip([6, 3], ship);
        gameboard.recieveAttack([6, 3]);
        gameboard.recieveAttack([7, 3]);
        gameboard.recieveAttack([8, 3]);
        expect(ship?.partsHit).toStrictEqual([true, true, true]);
        expect(ship.isSunk()).toBe(true);
    })
});