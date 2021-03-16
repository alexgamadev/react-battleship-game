import {coordinates, dimensions, direction} from '../types';
import { ShipInterface } from './ShipFactory';

export interface GameboardInterface {
    grid: number[],
    getAtPosition: (coordinates: coordinates) => number | null,
    isValidPlacement: (coordinates: coordinates, dimensions?: dimensions) => boolean,
    placeShip: (coordinates: coordinates, ship : ShipInterface) => boolean,
}

function getInterCoords(start: coordinates, end: coordinates, direction: direction) : coordinates[] {
    let coordArr: coordinates[] = [];

    if(direction === 'vertical') {
        for(let y = start[1]; y <= end[1]; y++) {
            coordArr.push([start[0], y]);
        }
    }
    else if(direction === 'horizontal') {
        for(let x = start[0]; x <= end[0]; x++) {
            coordArr.push([x, start[1]]);
        }
    }

    return coordArr;
}

function isValidCoord(coord: coordinates | null) : boolean {
    if(coord === null) return false;
    if(coord[0] < 0 || coord[1] < 0) return false;
    if(coord[0] >= 10 || coord[1] >= 10) return false;

    return true;
}

export default function createGameboard(): GameboardInterface {
    const grid: number[] = new Array(100);
    grid.fill(-1);

    function setAtPosition(coordinates: coordinates, id: number) : boolean {
        if(!isValidCoord(coordinates)) return false;
        const yValue = coordinates[1] * 10;
        grid[yValue + coordinates[0]] = id;
        return true;
    }

    function getAtPosition(coordinates: coordinates) : number | null {
        if(!isValidCoord(coordinates)) return null;
        const yValue = coordinates[1] * 10;
    
        return grid[yValue + coordinates[0]];
    }

    function isValidPlacement (startPos: coordinates, dimensions?: dimensions) : boolean {
        if(!isValidCoord(startPos)) return false;
        if(!dimensions) return true;

        //Calculate end coordinate based on dimensions
        let endPos: coordinates = [-1, -1];
        if(dimensions.direction === 'horizontal') endPos = [startPos[0] + dimensions.length, startPos[1]];
        else if(dimensions.direction === 'vertical') endPos = [startPos[0], startPos[1] + dimensions.length];
        if(!isValidCoord(endPos)) return false;

        //Get intermediate coordinates
        const coordsArray = getInterCoords(startPos, endPos, dimensions.direction);
        
        //Check for existing ships
        const isInvalid = coordsArray.some((coord) => {
            if(getAtPosition(coord) !== -1) {
                return true;
            }
        });

        return !isInvalid;
    }

    function placeShip (coordinates: coordinates, ship : ShipInterface) : boolean {
        if(!isValidPlacement(coordinates, {length: ship.length, direction: 'horizontal'})) return false;
        if(!setAtPosition(coordinates, ship.id)) return false;

        return true;
    }

    const gameboard = {
        grid,
        getAtPosition,
        isValidPlacement,
        placeShip,
    }

    return gameboard;
}