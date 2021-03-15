interface Gameboard {
    grid: number[],
}

export default function createGameboard() {
    const grid = new Array(100);
    grid.fill(-1);

    return {grid};
}