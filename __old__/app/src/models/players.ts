import { EPlayer } from 'chameleon-chess-logic';

// -----------------------------------------------------------------------------

/** The different types of players there are. */
export enum EPlayerType { NONE, HUMAN, COMPUTER }

/** An object mapping the players, represented by one of the four colors, to the
 * corresponding player type. */
export type TPlayers = {[player in EPlayer]: EPlayerType}

/** TypeGuard for TPlayers */
export function isPlayers(players: any): players is TPlayers {
    return typeof players === 'object' && players !== null
        && players[EPlayer.RED] !== undefined
        && players[EPlayer.GREEN] !== undefined
        && players[EPlayer.YELLOW] !== undefined
        && players[EPlayer.BLUE] !== undefined
}

/** Standard player configuration. */
export function getDefaultPlayers() {
    return DEFAULT_PLAYERS;
}

/** Returns the next player type. */
export function getNextPlayerType(playerType: EPlayerType) {
    switch (playerType) {
        case EPlayerType.NONE: return EPlayerType.HUMAN;
        case EPlayerType.HUMAN: return EPlayerType.COMPUTER;
        case EPlayerType.COMPUTER: return EPlayerType.NONE;
    }
}

/** Returns true if there are enough players to start a game. */
export function isEnoughPlayers(players: TPlayers) {
    let numOfPlayers = 0;
    if (players[EPlayer.RED]    !== EPlayerType.NONE) numOfPlayers += 1;
    if (players[EPlayer.GREEN]  !== EPlayerType.NONE) numOfPlayers += 1;
    if (players[EPlayer.YELLOW] !== EPlayerType.NONE) numOfPlayers += 1;
    if (players[EPlayer.BLUE]   !== EPlayerType.NONE) numOfPlayers += 1;
    return numOfPlayers >= 2;
}

// -----------------------------------------------------------------------------

const DEFAULT_PLAYERS: TPlayers = {
    [EPlayer.RED]: EPlayerType.HUMAN,
    [EPlayer.GREEN]: EPlayerType.NONE,
    [EPlayer.YELLOW]: EPlayerType.COMPUTER,
    [EPlayer.BLUE]: EPlayerType.NONE,
}