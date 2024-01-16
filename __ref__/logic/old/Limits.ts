import { hasKey, isArray, isInteger } from "./util/TypeGuards";
import { Pawn } from "./Pawn";
import { Position } from "./Position";

// -----------------------------------------------------------------------------

/**
 * The board shrinks during the course of the game. This data structure will
 * store the current min and max values of the rows and the columns. So the
 * current board size and what fields still belong to the game, can be retrieved
 * from this data structure.
 *
 * _Important_: these properties are 'including'. So, `rows = [1, 6]` means that
 * the rows with an index of **1 or higher** and **6 or lower** are still part
 * of the game.
 */
export type Limits = {
    rows: [number, number];
    cols: [number, number];
};

/** TypeGuard for `Limits` */
export function isLimits(limits: unknown): limits is Limits {
    return (
        hasKey<Limits>(limits, "rows", isLimit) &&
        hasKey<Limits>(limits, "cols", isLimit)
    );
}

/** Returns true if the limits describe the smallest possible board size of 3x3
 * fields. */
export function isSmallestLimits(limits: Limits): boolean {
    return (
        limits.rows[1] - limits.rows[0] === MIN_DIFF &&
        limits.cols[1] - limits.cols[0] === MIN_DIFF
    );
}

/** Returns true if the given positions is within the given limits. */
export function isWithinLimits(position: Position, limits: Limits): boolean {
    return (
        limits.rows[0] <= position.row &&
        position.row <= limits.rows[1] &&
        limits.cols[0] <= position.col &&
        position.col <= limits.cols[1]
    );
}

/** Creates the initial limits at the beginning of a game */
export function createLimits(): Limits {
    return { rows: [0, 7], cols: [0, 7] };
}

/** Updates (shrinks) the limits, when a move was made. Needs the updated
 * (moved) pawns to perform the calculation. */
export function updateLimits(pawns: Pawn[], oldLimits: Limits): Limits {
    if (isSmallestLimits(oldLimits)) {
        return oldLimits;
    }
    const limits = calcLimits(pawns);
    return {
        rows: incToMinDiff(limits.rows, oldLimits.rows),
        cols: incToMinDiff(limits.cols, oldLimits.cols),
    };
}

// -----------------------------------------------------------------------------

function calcLimits(pawns: Pawn[]): Limits {
    const rows = pawns.map((p) => p.position.row);
    const cols = pawns.map((p) => p.position.col);
    return {
        rows: [Math.min(...rows), Math.max(...rows)],
        cols: [Math.min(...cols), Math.max(...cols)],
    };
}

// -----------------------------------------------------------------------------

const MIN_DIFF = 2;

function isLimit(limit: unknown): limit is [number, number] {
    return (
        isArray(limit, isInteger) &&
        limit.length === 2 &&
        0 <= limit[0] &&
        limit[1] <= 7 &&
        limit[1] - limit[0] >= MIN_DIFF
    );
}

function incToMinDiff(
    limit: [number, number],
    oldLimit: [number, number],
): [number, number] {
    let incMax = true;
    while (limit[1] - limit[0] < MIN_DIFF) {
        if (incMax) {
            if (limit[1] < oldLimit[1]) {
                limit[1]++;
            }
        } else {
            if (limit[0] > oldLimit[0]) {
                limit[0]--;
            }
        }
        incMax = !incMax;
    }
    return limit;
}
