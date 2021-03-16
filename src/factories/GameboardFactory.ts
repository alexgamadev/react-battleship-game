import {direction, coordinate, dimensions} from '../types';

export interface GameboardInterface {
    grid: number[],
    isValidPlacement: (coordinates: coordinate, dimensions?: dimensions) => boolean,
}

function isValidCoordinate(coordinates: coordinate) : boolean {
    if(coordinates[0] < 0 || coordinates[1] < 0) return false;
    if(coordinates[0] >= 10 || coordinates[1] >= 10) return false;

    return true;
}

export default function createGameboard(): GameboardInterface {
    const grid: number[] = new Array(100);
    grid.fill(-1);

    function isValidPlacement (coordinates: coordinate, dimensions?: dimensions) : boolean {
        if(!isValidCoordinate(coordinates)) return false;
        if(!dimensions) {
            return true;
        }

        const endPos: coordinate = [coordinates[0] + dimensions[0], coordinates[1]];
        if(!isValidCoordinate(endPos)) return false;

        return true;
    }

    const gameboard = {
        grid,
        isValidPlacement,
    }

    return gameboard;
}