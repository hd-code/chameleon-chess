import { Position } from './board';
import { Pawn } from './pawn';

// -----------------------------------------------------------------------------

export interface Limits {
    minRow: number;
    maxRow: number;
    minCol: number;
    maxCol: number;
}

export function getStartLimits(): Limits {
    return {
        minRow: 0, maxRow: 7,
        minCol: 0, maxCol: 7,
    };
}

export function isSmallestLimits(limits: Limits): boolean {
    return limits.maxRow - limits.minRow === MIN_DIFF_BETWEEN_MIN_MAX
        && limits.maxCol - limits.minCol === MIN_DIFF_BETWEEN_MIN_MAX;
}

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