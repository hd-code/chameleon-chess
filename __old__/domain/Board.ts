import { Color, isColor } from "./Color";
import { Position } from "./Position";

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

// -----------------------------------------------------------------------------

/** The game board is a two-dimensional array of {@link FieldColor}'s. */
export type Board = FieldColor[][];

/**
 * Returns the game board.
 *
 * The board layout never changes. So, it is sufficient to call this function
 * once on application startup and store the result in a constant.
 */
export function getBoard(): Board {
    return BOARD.map((row) => [...row]);
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
