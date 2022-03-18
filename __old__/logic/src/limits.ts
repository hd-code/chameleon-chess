import type { Position } from "./board";
import type { Pawn } from "./pawn";
import { hasKey, isInteger } from "./type-guards";

// -----------------------------------------------------------------------------

/**
 * The board shrinks during the course of the game. This data structure will
 * store the current min and max values of the rows and the columns. So the
 * current board size and what fields still belong to the game, can be retrieved
 * from this data structure.
 *
 * _Important_: these properties are 'including'. So, `row.min = 1` means that
 * the rows with an index of **1 or higher** are still part of the game.
 */
export interface Limits {
  row: Limit;
  col: Limit;
}

/** TypeGuard for `Limits` */
export function isLimits(limits: unknown): limits is Limits {
  return (
    hasKey<Limits>(limits, "row", isLimit) &&
    hasKey<Limits>(limits, "col", isLimit)
  );
}

export function getStartLimits(): Limits {
  return { row: { min: 0, max: 7 }, col: { min: 0, max: 7 } };
}

/** Returns true if the limits describe the smallest possible board size of 3x3
 * fields. */
export function isSmallestLimits(limits: Limits): boolean {
  return calcDiff(limits.row) === MIN_DIFF && calcDiff(limits.col) === MIN_DIFF;
}

/** Returns true if the given positions is within the given limits. */
export function isWithinLimits(position: Position, limits: Limits): boolean {
  return (
    isWithinLimit(position.row, limits.row) &&
    isWithinLimit(position.col, limits.col)
  );
}

/** Updates (shrinks) the limits, when a move was made. Needs the updated
 * (moved) pawns to perform the calculation. */
export function updateLimits(pawns: Pawn[], oldLimits: Limits): Limits {
  if (isSmallestLimits(oldLimits)) {
    return oldLimits;
  }
  const limits = calcLimits(pawns);
  return {
    row: incToMinDiff(limits.row, oldLimits.row),
    col: incToMinDiff(limits.col, oldLimits.col),
  };
}

// -----------------------------------------------------------------------------

function calcLimits(pawns: Pawn[]): Limits {
  const rows = pawns.map((p) => p.position.row);
  const cols = pawns.map((p) => p.position.col);

  return {
    row: { min: Math.min(...rows), max: Math.max(...rows) },
    col: { min: Math.min(...cols), max: Math.max(...cols) },
  };
}

// -----------------------------------------------------------------------------

const MIN_DIFF = 2;

interface Limit {
  min: number;
  max: number;
}

function isLimit(limit: unknown): limit is Limit {
  return (
    hasKey(limit, "min", isInteger) &&
    hasKey(limit, "max", isInteger) &&
    isOnBoard(limit.min) &&
    isOnBoard(limit.max) &&
    calcDiff(limit) >= MIN_DIFF
  );
}

function isOnBoard(index: number): boolean {
  return 0 <= index && index <= 7;
}

function isWithinLimit(index: number, limit: Limit): boolean {
  return limit.min <= index && index <= limit.max;
}

function calcDiff(limit: Limit): number {
  return limit.max - limit.min;
}

function incToMinDiff(limit: Limit, oldLimit: Limit): Limit {
  let incMax = true;
  while (calcDiff(limit) < MIN_DIFF) {
    if (incMax) {
      if (limit.max < oldLimit.max) {
        limit.max++;
      }
    } else {
      if (limit.min > oldLimit.min) {
        limit.min--;
      }
    }
    incMax = !incMax;
  }
  return limit;
}
