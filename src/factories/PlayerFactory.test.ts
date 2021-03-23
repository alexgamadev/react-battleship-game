import createPlayer, {PlayerInterface} from './PlayerFactory';
import createGameboard, {GameboardInterface} from './GameboardFactory';

describe('Player initialisation', () => {
    test('Player name', () => {
        expect(createPlayer('Alex').name).toStrictEqual('Alex');
    })
});

describe('Player attack', () => {
    let player: PlayerInterface;
    let enemyGameboard: GameboardInterface ;

    beforeEach(() => {
        player = createPlayer('Alex');
        enemyGameboard = createGameboard();
    })

    test('Invalid attack returns false', () => {
        expect(player.attack([-1, 6], enemyGameboard)).toBe(false);
    })

    test('Valid attack returns true', () => {
        expect(player.attack([4, 6], enemyGameboard)).toBe(true);
        expect(player.attack([4, 6], enemyGameboard)).toBe(false);
    })
});