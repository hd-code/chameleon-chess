import { hasKey } from "../util/TypeGuards";

import { getFieldColor } from "./Board";
import { Color, isColor } from "./Color";
import { isPosition, isSamePosition, Position } from "./Position";
import { Role } from "./Role";

// -----------------------------------------------------------------------------

/**
 * This data structure represents a pawn. Each player has four of these initially.
 *
 * A pawn has the following properties:
 * - `knightColor`: the field color, where this pawn has the role `knight` (see {@link Role})
 * - `player`: the player this pawn belongs to (see {@link Player})
 * - `position`: the current position of the pawn on the game board (see {@link Position})
 *
 * The pawns are stored in the game state (see {@link GameState}). However, only
 * alive pawns are stored there. So, if a pawn is beaten, it will be removed
 * from that array. Therefore, pawns do **not** have an `alive`-flag or
 * something similar.
 */
export type Pawn = {
    /** the field color, where this pawn has the role `knight` */
    knightColor: Color;
    /** the color of the player this pawn belongs to */
    player: Color;
    /** the current position of the pawn on the game board */
    position: Position;
};

/** TypeGuard for `Pawn` */
export function isPawn(pawn: unknown): pawn is Pawn {
    return (
        hasKey(pawn, "knightColor", isColor) &&
        hasKey(pawn, "player", isColor) &&
        hasKey(pawn, "position", isPosition)
    );
}

/** Returns -1 if no pawn is at that position
 * @param pawns the pawns array which's index should be found in
 * @param position the position where a pawn could be
 */
export function getPawnIndexAtPosition(
    pawns: Pawn[],
    position: Position,
): number {
    return pawns.findIndex((pawn) => isSamePosition(pawn.position, position));
}

/** Returns the role the pawn has on it's current field */
export function getPawnRole(pawn: Pawn): Role {
    const fieldColor = getFieldColor(pawn.position);
    return mapKnightColorToRoles[pawn.knightColor][fieldColor];
}

/** Returns an object that maps the four field colors to a corresponding chess
 * role. This mapping is dependent on a pawns knight role. There four different
 * mappings that can occur. */
export function getPawnRoles(pawn: Pawn): { [field in Color]: Role } {
    return { ...mapKnightColorToRoles[pawn.knightColor] };
}

/** Returns the initial pawns for a given player color */
export function createPawns(player: Color): Pawn[] {
    return initialPawns[player].map(([row, col, knightColor]) => ({
        knightColor,
        player,
        position: { row, col },
    }));
}

// -----------------------------------------------------------------------------

const initialPawns: { [color in Color]: [number, number, Color][] } = {
    [Color.red]: [
        [7, 0, Color.red],
        [7, 1, Color.green],
        [7, 2, Color.yellow],
        [7, 3, Color.blue],
    ],
    [Color.green]: [
        [7, 7, Color.green],
        [6, 7, Color.yellow],
        [5, 7, Color.blue],
        [4, 7, Color.red],
    ],
    [Color.yellow]: [
        [0, 7, Color.yellow],
        [0, 6, Color.blue],
        [0, 5, Color.red],
        [0, 4, Color.green],
    ],
    [Color.blue]: [
        [0, 0, Color.blue],
        [1, 0, Color.red],
        [2, 0, Color.green],
        [3, 0, Color.yellow],
    ],
};

/* eslint-disable @typescript-eslint/naming-convention */
const mapKnightColorToRoles = {
    [Color.red]: { 0: 0, 1: 1, 2: 2, 3: 3 },
    [Color.green]: { 0: 3, 1: 0, 2: 1, 3: 2 },
    [Color.yellow]: { 0: 2, 1: 3, 2: 0, 3: 1 },
    [Color.blue]: { 0: 1, 1: 2, 2: 3, 3: 0 },
};
