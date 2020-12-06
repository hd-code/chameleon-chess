import { hasKey, isInteger } from 'helper/type-guards';
import type { Position } from './board';
import type { Pawn } from './pawn';

// -----------------------------------------------------------------------------

/**
 * The board shrinks during the course of the game. This data structure will
 * store the current min and max values of the rows and the columns. So the
 * current board size and what fields still belong to the game, can be retrieved
 * from this data structure.
 * 
 * It has the following properties:
 * - `minRow`: the lowest     row, that is still part of the game
 * - `maxRow`: the highest    row, that is still part of the game
 * - `minCol`: the lowest  column, that is still part of the game
 * - `maxCol`: the highest column, that is still part of the game
 * 
 * _Important_: these properties are 'including'. So, `minRow: 1` means that the
 * rows with an index of **1 or higher** are still part of the game.
 */
export interface Limits {
    /** the lowest row, that is still part of the game */
    minRow: number;
    /** the highest row, that is still part of the game */
    maxRow: number;
    /** the lowest column, that is still part of the game */
    minCol: number;
    /** the highest column, that is still part of the game */
    maxCol: number;
}

/** TypeGuard for `Limits` */
export function isLimits(limits: any): limits is Limits {
    return hasKey(limits, 'minRow', isInteger) && 0 <= limits.minRow && limits.minRow <= 7
        && hasKey(limits, 'maxRow', isInteger) && 0 <= limits.maxRow && limits.maxRow <= 7
        && limits.maxRow - limits.minRow >= MIN_DIFF_BETWEEN_MIN_MAX
        && hasKey(limits, 'minCol', isInteger) && 0 <= limits.minCol && limits.minCol <= 7
        && hasKey(limits, 'maxCol', isInteger) && 0 <= limits.maxCol && limits.maxCol <= 7
        && limits.maxCol - limits.minCol >= MIN_DIFF_BETWEEN_MIN_MAX;
}

export function getStartLimits(): Limits {
    return {
        minRow: 0, maxRow: 7,
        minCol: 0, maxCol: 7,
    };
}

/** Returns true if the limits describe the smallest possible board size of 3x3
 * fields. */
export function isSmallestLimits(limits: Limits): boolean {
    return limits.maxRow - limits.minRow === MIN_DIFF_BETWEEN_MIN_MAX
        && limits.maxCol - limits.minCol === MIN_DIFF_BETWEEN_MIN_MAX;
}

/** Returns true if the given positions is within the given limits. */
export function isWithinLimits(position: Position, limits: Limits): boolean {
    return limits.minRow <= position.row && position.row <= limits.maxRow
        && limits.minCol <= position.col && position.col <= limits.maxCol;
}

/** Updates (shrinks) the limits, when a move was made. Needs the updated
 * (moved) pawns to perform the calculation. */
export function updateLimits(pawns: Pawn[], oldLimits: Limits): Limits {
    if (isSmallestLimits(oldLimits)) {
        return oldLimits;
    }
    const limits = calcLimits(pawns);
    return increaseToMinSize(limits, oldLimits);
}

// -----------------------------------------------------------------------------

const MIN_DIFF_BETWEEN_MIN_MAX = 2;

function calcLimits(pawns: Pawn[]): Limits {
    const result = {
        minRow: pawns[0].position.row, maxRow: pawns[0].position.row,
        minCol: pawns[0].position.col, maxCol: pawns[0].position.col,
    };

    for (let i = 1, ie = pawns.length; i < ie; i++) {
        if (result.minRow > pawns[i].position.row) {
            result.minRow = pawns[i].position.row;
        }
        if (result.maxRow < pawns[i].position.row) {
            result.maxRow = pawns[i].position.row;
        }
        if (result.minCol > pawns[i].position.col) {
            result.minCol = pawns[i].position.col;
        }
        if (result.maxCol < pawns[i].position.col) {
            result.maxCol = pawns[i].position.col;
        }
    }

    return result;
}

function increaseToMinSize(limits: Limits, oldLimits: Limits): Limits {
    let incMax = true;
    while (limits.maxRow - limits.minRow < MIN_DIFF_BETWEEN_MIN_MAX) {
        if (incMax) {
            if (limits.maxRow < oldLimits.maxRow) {
                limits.maxRow++;
            }
        } else {
            if (limits.minRow > oldLimits.minRow) {
                limits.minRow--;
            }
        }
        incMax = !incMax;
    }

    while (limits.maxCol - limits.minCol < MIN_DIFF_BETWEEN_MIN_MAX) {
        if (incMax) {
            if (limits.maxCol < oldLimits.maxCol) {
                limits.maxCol++;
            }
        } else {
            if (limits.minCol > oldLimits.minCol) {
                limits.minCol--;
            }
        }
        incMax = !incMax;
    }

    return limits;
}