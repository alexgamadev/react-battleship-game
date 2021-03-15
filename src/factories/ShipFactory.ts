export interface ShipInterface {
    length: number,
    partsHit: boolean[],
    isSunk: boolean,
}


export default function ShipFactory(length : number) : ShipInterface | null {
    if(length <= 0) return null;
    
    const partsHit = new Array(length);
    partsHit.fill(false);

    const ship : ShipInterface = {
        length,
        partsHit,
        isSunk: false,
    }
    return ship;
}