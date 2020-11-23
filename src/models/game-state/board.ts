export enum FieldColor { red, green, yellow, blue }

export function getFieldColor(position: Position): FieldColor {
    return BOARD[position.row][position.col];
}

// -----------------------------------------------------------------------------

export function getBoard(): FieldColor[][] {
    return BOARD.map(row => [...row]);
}

// -----------------------------------------------------------------------------

export interface Position {
    row: number;
    col: number;
}

export function isSamePosition(a: Position, b: Position): boolean {
    return a.row === b.row && a.col === b.col;
}

export function isInPositions(postion: Position, positions: Position[]): boolean {
    for (let i = 0, ie = positions.length; i < ie; i++) {
        if (isSamePosition(postion, positions[i])) {
            return true;
        }
    }
    return false;
}

/** First by row, then by column. */
export function sortPositions(a: Position, b: Position): number {
    return a.row !== b.row ? a.row - b.row : a.col - b.col;
}

// -----------------------------------------------------------------------------

const [R, G, Y, B] = [FieldColor.red, FieldColor.green, FieldColor.yellow, FieldColor.blue];
const BOARD = [
    [B, R, B, Y, G, R, B, Y],
    [R, G, R, B, Y, G, R, B],
    [G, Y, R, G, R, B, B, Y],
    [Y, B, G, Y, G, R, Y, G],
    [B, R, Y, B, R, B, G, R],
    [R, G, G, Y, B, Y, R, B],
    [G, Y, B, R, G, Y, B, Y],
    [R, G, Y, B, R, G, Y, G]
];