import createGameboard, {GameboardInterface} from './GameboardFactory';
import {coordinates} from '../helpers/types';

export interface PlayerInterface {
    name: string,
    gameboard: GameboardInterface,
    attack: (pos: coordinates, board: GameboardInterface) => boolean;
}

export default function createPlayer(name: string) : PlayerInterface {
    const gameboard = createGameboard();

    function attack(pos: coordinates, board: GameboardInterface) : boolean {
        return board.recieveAttack(pos);
    }

    return {
        name,
        gameboard,
        attack,
    }
}