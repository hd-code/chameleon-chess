import * as assert from "assert/strict";
import { Board } from "./Board";
import { Color } from "./Color";
import { Position } from "./Position";

describe("Board", function () {
    describe(Board.get.name, function () {
        describe("get() should return whole Board", function () {
            it("should have 8 rows", function () {
                assert.deepEqual(Board.get().length, 8);
            });

            it("should have 8 cols", function () {
                Board.get().forEach((row) => assert.deepEqual(row.length, 8));
            });

            it("should only contain Colors", function () {
                Board.get().forEach((row) =>
                    row.forEach((val) => assert.ok(Color[val])),
                );
            });
        });

        const testCases: [Position, Color][] = [
            [new Position(0, 0), Color.blue],
            [new Position(3, 2), Color.green],
            [new Position(7, 0), Color.red],
            [new Position(7, 1), Color.green],
            [new Position(7, 2), Color.yellow],
            [new Position(7, 3), Color.blue],
        ];
        testCases.forEach(([arg, want]) => {
            it(`get(${arg.x},${arg.y}) => ${Color[want]}`, function () {
                const got = Board.get(arg);
                assert.equal(got, want);
            });
        });
    });
});
