
export interface GameboardInterface {
    grid: number[],
    isValidPlacement: (coordinate: [number, number]) => boolean,
}

export default function createGameboard(): GameboardInterface {
    const grid: number[] = new Array(100);
    grid.fill(-1);

    function isValidPlacement (coordinate: [number, number]) : boolean {
        if(coordinate[0] < 0 || coordinate[1] < 0) return false;
        if(coordinate[0] >= 10 || coordinate[1] >= 10) return false;
        
        return true;
    }

    const gameboard = {
        grid,
        isValidPlacement,
    }

    return gameboard;
}