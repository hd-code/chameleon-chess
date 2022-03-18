import { Color, isColor } from "./color";
import { hasKey, isInteger } from "./type-guards";

// -----------------------------------------------------------------------------

/** An enum, which represents the four colors a field on the board can have. */
export type FieldColor = Color;

/** TypeGuard for `FieldColor` */
export function isFieldColor(color: unknown): color is FieldColor {
  return isColor(color);
}

/** Returns the color of the field on the game board at a given position. */
export function getFieldColor(position: Position): FieldColor {
  return BOARD[position.row][position.col];
}

/**
 * Returns the game board, which is a two-dimensional array of {@link FieldColor}'s.
 *
 * The board layout never changes. So, it is sufficient to call this function
 * once on application startup and store the board in a constant.
 * @returns the game board constant
 */
export function getBoard(): FieldColor[][] {
  return BOARD.map((row) => [...row]);
}

// -----------------------------------------------------------------------------

/**
 * Specifies a field on the game board. A field is located at a certain row and
 * at a certain column.
 *
 * Therefore, a `Position` has two properties:
 * - `row`: the row    of the field on the game board
 * - `col`: the column of the field on the game board
 *
 * There are 8 rows and 8 columns, they are indexed by positive whole numbers
 * (0 to 7). So, they are zero-based.
 */
export interface Position {
  /** the row of the field on the game board */
  row: number;
  /** the column of the field on the game board */
  col: number;
}

/** TypeGuard for `Position` */
export function isPosition(position: unknown): position is Position {
  return (
    hasKey(position, "row", isInteger) &&
    hasKey(position, "col", isInteger) &&
    Math.min(position.row, position.col) >= 0 &&
    Math.max(position.row, position.col) <= 7
  );
}

/** Returns true if the given position points to the same field as one of the
 * positions in the given array. */
export function isInPositions(
  position: Position,
  positions: Position[],
): boolean {
  for (let i = 0, ie = positions.length; i < ie; i++) {
    if (isSamePosition(position, positions[i])) {
      return true;
    }
  }
  return false;
}

/** Returns true if both positions point to the same field. */
export function isSamePosition(a: Position, b: Position): boolean {
  return a.row === b.row && a.col === b.col;
}

/** To be used with `Array.sort(sortPositions)`. Positions will be ordered first
 * by row, then by column – both ascending. */
export function sortPositions(a: Position, b: Position): number {
  return a.row !== b.row ? a.row - b.row : a.col - b.col;
}

// -----------------------------------------------------------------------------

const [R, G, Y, B] = [Color.red, Color.green, Color.yellow, Color.blue];
const BOARD = [
  [B, R, B, Y, G, R, B, Y],
  [R, G, R, B, Y, G, R, B],
  [G, Y, R, G, R, B, B, Y],
  [Y, B, G, Y, G, R, Y, G],
  [B, R, Y, B, R, B, G, R],
  [R, G, G, Y, B, Y, R, B],
  [G, Y, B, R, G, Y, B, Y],
  [R, G, Y, B, R, G, Y, G],
];
