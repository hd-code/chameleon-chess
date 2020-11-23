import type { Pawn } from './pawn';

// -----------------------------------------------------------------------------

export enum Player { red, green, yellow, blue }

export function arePlayersAlive(pawns: Pawn[]): {[player in Player]: boolean} {
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

export function getNextPlayer(current: Player, pawns: Pawn[]): Player {
    const playersState = arePlayersAlive(pawns);
    let result = mapPlayerNext[current];
    while (!playersState[result] && result !== current) {
        result = mapPlayerNext[current];
    }
    return result;
}

// -----------------------------------------------------------------------------

const mapPlayerNext = {
    [Player.red]: Player.blue,
    [Player.green]: Player.red,
    [Player.yellow]: Player.green,
    [Player.blue]: Player.yellow,
};