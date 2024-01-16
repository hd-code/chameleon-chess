import { Position } from "./Position";
import { Color } from "./types";

export class Board {
    static get(): readonly Color[][] {
        return board;
    }

    static getField(position: Position) {
        return board[position.x][position.y];
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private constructor() {}
}

const [R, G, Y, B]: Color[] = ["red", "green", "yellow", "blue"];
const board = Object.freeze([
    [B, R, B, Y, G, R, B, Y],
    [R, G, R, B, Y, G, R, B],
    [G, Y, R, G, R, B, B, Y],
    [Y, B, G, Y, G, R, Y, G],
    [B, R, Y, B, R, B, G, R],
    [R, G, G, Y, B, Y, R, B],
    [G, Y, B, R, G, Y, B, Y],
    [R, G, Y, B, R, G, Y, G],
]);
