import * as assert from "assert";

import { testFunc } from "../util/testutil";

import { getBoard, getFieldColor } from "./Board";
import { Color } from "./Color";

// -----------------------------------------------------------------------------

describe("Board", () => {
    describe(getBoard.name, () => {
        const board = getBoard();
        it("should have 8 rows", () => assert.deepStrictEqual(board.length, 8));
        it("should have 8 columns", () =>
            board.forEach((row) => assert.deepStrictEqual(row.length, 8)));
        it("should only contain integers from 0 to 7", () => {
            const regex = /[0-7]/;
            board.forEach((row) =>
                row.forEach((val) => assert.ok(regex.test(val.toString()))),
            );
        });
    });

    testFunc(getFieldColor, [
        [[{ row: 0, col: 0 }], Color.blue],
        [[{ row: 3, col: 2 }], Color.green],
        [[{ row: 7, col: 0 }], Color.red],
        [[{ row: 7, col: 1 }], Color.green],
        [[{ row: 7, col: 2 }], Color.yellow],
        [[{ row: 7, col: 3 }], Color.blue],
    ]);
});
