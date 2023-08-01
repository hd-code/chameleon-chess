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
                const colors: { [color in Color]: boolean } = {
                    red: true,
                    green: true,
                    yellow: true,
                    blue: true,
                };
                Board.get().forEach((row) =>
                    row.forEach((val) => assert.ok(colors[val])),
                );
            });
        });

        const testCases: [Position, Color][] = [
            [new Position(0, 0), "blue"],
            [new Position(3, 2), "green"],
            [new Position(7, 0), "red"],
            [new Position(7, 1), "green"],
            [new Position(7, 2), "yellow"],
            [new Position(7, 3), "blue"],
        ];
        testCases.forEach(([arg, want]) => {
            it(`get(${arg.x},${arg.y}) => ${want}`, function () {
                const got = Board.get(arg);
                assert.equal(got, want);
            });
        });
    });
});
