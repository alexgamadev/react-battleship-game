import {coordinates, dimensions} from '../helpers/types';
import { ShipInterface } from './ShipFactory';

export interface GameboardInterface {
    grid: boolean[],
    ships: ShipInterface[],
    isHitAtPos: (coordinates: coordinates) => boolean | null,
    getShipAtPos: (coordinates: coordinates) => ShipInterface | null,
    recieveAttack: (coordinates: coordinates) => boolean,
    isValidPlacement: (coordinates: coordinates, dimensions?: dimensions) => boolean,
    placeShip: (coordinates: coordinates, ship : ShipInterface) => boolean,
}

function getInterCoords(startPos: coordinates, dimensions: dimensions) : coordinates[] {
    let coordArr: coordinates[] = [];
    //Calculate end coordinates based on dimensions
    let endPos: coordinates = [-1, -1];
    if(dimensions.direction === 'horizontal') endPos = [startPos[0] + (dimensions.length - 1), startPos[1]];
    else if(dimensions.direction === 'vertical') endPos = [startPos[0], startPos[1] + (dimensions.length - 1)];

    for(let x = startPos[0]; x <= endPos[0]; x++) {
        for(let y = startPos[1]; y <= endPos[1]; y++) {
            coordArr.push([x, y]);
        }
    }

    return coordArr;
}

function coordinatesEqual(a: coordinates, b: coordinates) : boolean {
    if(a[0] === b[0] && a[1] === b[1]) return true;
    return false;
}

function isValidCoord(coord: coordinates | null) : boolean {
    if(coord === null) return false;
    if(coord[0] < 0 || coord[1] < 0) return false;
    if(coord[0] >= 10 || coord[1] >= 10) return false;

    return true;
}

export default function createGameboard(): GameboardInterface {
    //Initialise grid
    let grid: boolean[] = new Array(100);
    grid.fill(false);
    const ships: ShipInterface[] = [];

    function setHitAtPos(coordinates: coordinates, value: boolean) {
        const yValue = coordinates[1] * 10;
        grid[yValue + coordinates[0]] = value;
    }

    function getShipAtPos(coordinates: coordinates) : ShipInterface | null {
        if(!isValidCoord(coordinates)) return null;

        //Check to see if ship exists at coordinates
        const ship = ships.find(ship => {
            return ship.position.some(pos => coordinatesEqual(pos, coordinates));
        });

        if(ship !== undefined) return ship;

        return null;
    }

    function isHitAtPos(coordinates: coordinates) : boolean | null {
        if(!isValidCoord(coordinates)) return null;

        const yValue = coordinates[1] * 10;
        return grid[yValue + coordinates[0]];
    }

    function isValidPlacement (startPos: coordinates, dimensions?: dimensions) : boolean {
        if(!isValidCoord(startPos)) return false;
        if(!dimensions) return true;

        //Get intermediate coordinates
        const coordsArray = getInterCoords(startPos, dimensions);
        
        //Test if all coords are valid and don't contain a ship
        if(coordsArray.some(coord => {
            if(!isValidCoord(coord)) return true;
            if(getShipAtPos(coord) !== null) return true;
        })) return false;

        return true;
    }

    function placeShip (position: coordinates, newShip : ShipInterface) : boolean {
        const shipDimensions: dimensions = {length: newShip.length, direction: 'horizontal'};
        if(!isValidPlacement(position, {length: newShip.length, direction: 'horizontal'})) return false;

        //Get intermediate coordinates
        const coordsArray = getInterCoords(position, shipDimensions);

        //If ship doesn't exist already, store in board
        const ship = ships.find(ship => ship.id === newShip.id);
        if(!ship) {
            ships.push({...newShip, position: coordsArray});
        } else {
            ship.position = coordsArray;
        }

        return true;
    }

    function recieveAttack(coordinates: coordinates) : boolean {
        if(!isValidCoord(coordinates)) return false;
        if(isHitAtPos(coordinates) === true) return false;
        const ship = getShipAtPos(coordinates);

        if(ship !== null) {
           const posIndex = ship.position.findIndex(pos => coordinatesEqual(pos, coordinates));
           if(posIndex !== -1) ship.hit(posIndex);
        }

        setHitAtPos(coordinates, true);
        return true;
    }

    const gameboard = {
        grid,
        ships,
        isHitAtPos,
        getShipAtPos,
        recieveAttack,
        isValidPlacement,
        placeShip,
    }

    return gameboard;
}