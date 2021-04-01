import { Player } from 'core/game-state';

// -----------------------------------------------------------------------------

export enum PlayerType {
    none,
    human,
    computer,
}

export type Players = { [player in Player]: PlayerType };

export function nextPlayersType(players: Players, playerToAdv: Player): Players {
    const result = { ...players };
    result[playerToAdv] = mapTypeToNext[players[playerToAdv]];
    return result;
}

// -----------------------------------------------------------------------------

const mapTypeToNext = {
    [PlayerType.none]: PlayerType.human,
    [PlayerType.human]: PlayerType.computer,
    [PlayerType.computer]: PlayerType.none,
};
