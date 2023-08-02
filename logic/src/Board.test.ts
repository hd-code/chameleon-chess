import * as assert from "assert/strict";
import { Board } from "./Board";
import { Position } from "./Position";
import { Color } from "./types";

describe("Board", function () {
    describe(Board.get.name, function () {
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

    describe(Board.getField.name, function () {
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
                const got = Board.getField(arg);
                assert.equal(got, want);
            });
        });
    });
});
