export type direction = 'vertical' | 'horizontal';

export type coordinates = [number, number];

export type dimensions = {length: number, direction: direction};

export enum ShipTypes {
    PATROL_BOAT = 2,
    SUBMARINE,
    DESTROYER = 3,
    BATTLESHIP,
    CARRIER,
    LENGTH_LIMIT,
}