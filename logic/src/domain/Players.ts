import { Color, isColor } from "./Color";
import { hasKey, isEnum } from "../util/TypeGuards";

// -----------------------------------------------------------------------------

/** An enum which represents the four different players */
export type PlayerColor = Color;

/** TypeGuard for `PlayerColor` */
export function isPlayerColor(pc: unknown): pc is PlayerColor {
    return isColor(pc);
}

// -----------------------------------------------------------------------------

/** An enum which represents different types of players */
export enum PlayerType {
    none,
    human,
    computer,
}

/** TypeGuard for `PlayerType` */
export function isPlayerType(pt: unknown): pt is PlayerType {
    return isEnum(pt, PlayerType);
}

// -----------------------------------------------------------------------------

/** A map specifying which player is of which type in the current game */
export type Players = { [player in PlayerColor]: PlayerType };

/** TypeGuard for `Players` */
export function isPlayers(players: unknown): players is Players {
    return (
        hasKey<Players>(players, Color.red, isPlayerType) &&
        hasKey<Players>(players, Color.green, isPlayerType) &&
        hasKey<Players>(players, Color.yellow, isPlayerType) &&
        hasKey<Players>(players, Color.blue, isPlayerType)
    );
}
