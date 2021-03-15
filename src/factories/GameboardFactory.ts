interface Gameboard {
    grid: number[],
}

export default function createGameboard(): Gameboard {
    const grid: number[] = new Array(100);
    grid.fill(-1);

    return {grid};
}