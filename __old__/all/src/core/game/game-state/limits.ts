import { hasKey, isInteger } from "core/type-guards";

import type { Position } from "../board";
import type { Pawn } from "./pawn";

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
export function isLimits(limits: unknown): limits is Limits {
  return (
    hasKey<Limits>(limits, "minRow", isInteger) &&
    hasKey<Limits>(limits, "maxRow", isInteger) &&
    hasKey<Limits>(limits, "minCol", isInteger) &&
    hasKey<Limits>(limits, "maxCol", isInteger) &&
    limits.maxRow - limits.minRow >= MIN_DIFF_BETWEEN_MIN_MAX &&
    limits.maxCol - limits.minCol >= MIN_DIFF_BETWEEN_MIN_MAX &&
    Math.min(limits.minRow, limits.minCol) >= 0 &&
    Math.max(limits.maxRow, limits.maxCol) <= 7
  );
}

export function getStartLimits(): Limits {
  return {
    minRow: 0,
    maxRow: 7,
    minCol: 0,
    maxCol: 7,
  };
}

/** Returns true if the limits describe the smallest possible board size of 3x3
 * fields. */
export function isSmallestLimits(limits: Limits): boolean {
  return (
    limits.maxRow - limits.minRow === MIN_DIFF_BETWEEN_MIN_MAX &&
    limits.maxCol - limits.minCol === MIN_DIFF_BETWEEN_MIN_MAX
  );
}

/** Returns true if the given positions is within the given limits. */
export function isWithinLimits(position: Position, limits: Limits): boolean {
  return (
    position.row >= limits.minRow &&
    position.row <= limits.maxRow &&
    position.col >= limits.minCol &&
    position.col <= limits.maxCol
  );
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
  const firstPawn = pawns[0];
  const result = {
    minRow: firstPawn.position.row,
    maxRow: firstPawn.position.row,
    minCol: firstPawn.position.col,
    maxCol: firstPawn.position.col,
  };

  for (let i = 1, ie = pawns.length; i < ie; i++) {
    const pawn = pawns[i];
    if (result.minRow > pawn.position.row) {
      result.minRow = pawn.position.row;
    }
    if (result.maxRow < pawn.position.row) {
      result.maxRow = pawn.position.row;
    }
    if (result.minCol > pawn.position.col) {
      result.minCol = pawn.position.col;
    }
    if (result.maxCol < pawn.position.col) {
      result.maxCol = pawn.position.col;
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
