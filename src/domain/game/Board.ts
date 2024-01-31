import { Field } from "./Field";
import { Position } from "./Position";
import { Bounds, FieldColorGetter } from "./helper";

export class Board implements FieldColorGetter {
    constructor(private bounds: Bounds) {}

    getFields(): Field[][] {
        const result: Field[][] = [];
        for (let row = 0; row < nRows; row++) {
            result.push([]);
            for (let col = 0; col < nCols; col++) {
                const position = new Position(row, col);
                result[row].push(
                    new Field(
                        position,
                        fieldColors[row][col],
                        this.bounds.contains(position),
                    ),
                );
            }
        }
        return result;
    }

    getFieldColor(position: Position): Color {
        return fieldColors[position.x][position.y];
    }
}

const [R, G, Y, B]: Color[] = ["red", "green", "yellow", "blue"];
const fieldColors = Object.freeze([
    [B, R, B, Y, G, R, B, Y],
    [R, G, R, B, Y, G, R, B],
    [G, Y, R, G, R, B, B, Y],
    [Y, B, G, Y, G, R, Y, G],
    [B, R, Y, B, R, B, G, R],
    [R, G, G, Y, B, Y, R, B],
    [G, Y, B, R, G, Y, B, Y],
    [R, G, Y, B, R, G, Y, G],
]);

const nRows = fieldColors.length;
const nCols = fieldColors[0].length;
