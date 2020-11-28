import { Player } from './game-state';

// -----------------------------------------------------------------------------

export enum PlayerType { none, human, computer }

export type Players = {[player in Player]: PlayerType}

export function nextPlayersType(players: Players, playerToAdv: Player): Players {
    const result = {...players};
    result[playerToAdv] = nextPlayerType(players[playerToAdv]);
    return result;
}

// -----------------------------------------------------------------------------

function nextPlayerType(type: PlayerType): PlayerType {
    switch (type) {
    case PlayerType.none: return PlayerType.human;
    case PlayerType.human: return PlayerType.computer;
    case PlayerType.computer: return PlayerType.none;
    }
}