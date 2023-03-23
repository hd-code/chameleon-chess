import { Color } from "./Color";
import { Position } from "./Position";

// -----------------------------------------------------------------------------

/** The game board is a two-dimensional array of {@link Color}'s. */
export type Board = Color[][];

/**
 * Returns the game board.
 *
 * The board layout never changes. So, it is sufficient to call this function
 * once on application startup and store the result in a constant.
 */
export function getBoard(): Board {
    return BOARD.map((row) => [...row]);
}

/** Returns the color of the field on the game board at a given position. */
export function getFieldColor(position: Position): Color {
    return BOARD[position.row][position.col];
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
