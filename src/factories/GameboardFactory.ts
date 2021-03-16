import {coordinates, dimensions} from '../types';
import { ShipInterface } from './ShipFactory';

export interface GameboardInterface {
    grid: number[],
    isValidPlacement: (coordinates: coordinates, dimensions?: dimensions) => boolean,
    placeShip: (coordinates: coordinates, ship : ShipInterface) => boolean,
}

function isValidCoordinate(coordinates: coordinates | null) : boolean {
    if(coordinates === null) return false;
    if(coordinates[0] < 0 || coordinates[1] < 0) return false;
    if(coordinates[0] >= 10 || coordinates[1] >= 10) return false;

    return true;
}

export default function createGameboard(): GameboardInterface {
    const grid: number[] = new Array(100);
    grid.fill(-1);

    function isValidPlacement (coordinates: coordinates, dimensions?: dimensions) : boolean {
        if(!isValidCoordinate(coordinates)) return false;
        if(!dimensions) return true;

        //Calculate end coordinate based on dimensions
        let endPos: coordinates | null = null;
        if(dimensions.direction === 'horizontal') endPos = [coordinates[0] + dimensions.length, coordinates[1]];
        else if(dimensions.direction === 'vertical') endPos = [coordinates[0], coordinates[1] + dimensions.length];

        if(!isValidCoordinate(endPos)) return false;

        return true;
    }

    function placeShip (coordinates: coordinates, ship : ShipInterface) : boolean {
        if(!isValidPlacement(coordinates, {length: ship.length, direction: 'horizontal'})) return false;
        return true;
    }

    const gameboard = {
        grid,
        isValidPlacement,
        placeShip,
    }

    return gameboard;
}