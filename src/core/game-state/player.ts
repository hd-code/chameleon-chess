import { isInteger } from 'core/type-guards';

import type { Pawn } from './pawn';

// -----------------------------------------------------------------------------

/**
 * An enum which represents the four different players.
 * - `red`:    0
 * - `green`:  1
 * - `yellow`: 2
 * - `blue`:   3
 */
export enum Player {
    red,
    green,
    yellow,
    blue,
}

/** TypeGuard for `Player` */
export function isPlayer(player: unknown): player is Player {
    return isInteger(player) && Player[player] !== undefined;
}

/**
 * Checks whether the players are alive or already out. This function will check
 * all players at once.
 *
 * It returns an object, where the keys are the players and the values are of
 * boolean type. If the value is true, the corresponding player is still alive.
 * False means the player is out.
 */
export function arePlayersAlive(pawns: Pawn[]): { [player in Player]: boolean } {
    const result = {
        [Player.red]: false,
        [Player.green]: false,
        [Player.yellow]: false,
        [Player.blue]: false,
    };
    for (let i = 0, ie = pawns.length; i < ie; i++) {
        result[pawns[i].player] = true;
    }
    return result;
}

/** Returns the next player on turn. Needs the already updated pawns to work. */
export function getNextPlayer(current: Player, pawns: Pawn[]): Player {
    const playersState = arePlayersAlive(pawns);
    let nextPlayer = mapPlayerNext[current];
    while (!playersState[nextPlayer] && nextPlayer !== current) {
        nextPlayer = mapPlayerNext[nextPlayer];
    }
    return nextPlayer;
}

// -----------------------------------------------------------------------------

const mapPlayerNext = {
    [Player.red]: Player.blue,
    [Player.green]: Player.red,
    [Player.yellow]: Player.green,
    [Player.blue]: Player.yellow,
};
