import {coordinates} from '../types';
import {ShipTypes} from '../types';

export interface ShipInterface {
    id: number,
    length: number,
    startPos: coordinates,
    partsHit: boolean[],
    isSunk: () => boolean,
    hit: (location: number) => boolean,
}

export default function createShip(length: number) : ShipInterface | null {
    if(length <= 0) return null;
    if(length > ShipTypes.LENGTH_LIMIT - 1) return null;
    const startPos: coordinates = [-1, -1];

    //Fill parts hit array with initial values
    const partsHit = new Array(length);
    partsHit.fill(false);

    function hit (location: number) : boolean  {
        //Ensure hits only happen within ship boundaries
        if(location > partsHit.length - 1 || location < 0) return false;
        //Ensure same part can't be hit twice
        if(partsHit[location]) return false;

        partsHit[location] = true;
        return true;
    }

    function isSunk() : boolean {
        //If every part has been hit, ship is sunk
        if(partsHit.every(part => part === true)) return true;
        return false;
    }

    //Create ship object
    const ship : ShipInterface = {
        id: 1,
        length,
        startPos,
        partsHit,
        isSunk,
        hit, 
    }

    return ship;
}