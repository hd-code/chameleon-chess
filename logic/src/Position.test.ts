import * as assert from "assert/strict";
import { Position } from "./Position";

describe("Position", function () {
    describe(Position.sort.name, function () {
        const testCases: [string, Position[], Position[]][] = [
            ["just one position", [new Position(3, 5)], [new Position(3, 5)]],
            [
                "two positions, rows not sorted",
                [new Position(7, 5), new Position(3, 5)],
                [new Position(3, 5), new Position(7, 5)],
            ],
            [
                "two positions, rows sorted already",
                [new Position(3, 5), new Position(7, 5)],
                [new Position(3, 5), new Position(7, 5)],
            ],
            [
                "two positions, rows are equal, cols not sorted",
                [new Position(2, 5), new Position(2, 3)],
                [new Position(2, 3), new Position(2, 5)],
            ],
            [
                "two positions, rows are equal, cols sorted",
                [new Position(2, 3), new Position(2, 5)],
                [new Position(2, 3), new Position(2, 5)],
            ],
            [
                "six positions",
                [
                    new Position(2, 2),
                    new Position(3, 4),
                    new Position(2, 4),
                    new Position(0, 0),
                    new Position(4, 5),
                    new Position(3, 5),
                ],
                [
                    new Position(0, 0),
                    new Position(2, 2),
                    new Position(2, 4),
                    new Position(3, 4),
                    new Position(3, 5),
                    new Position(4, 5),
                ],
            ],
        ];
        testCases.forEach(([name, input, want]) => {
            it(name, function () {
                input.sort(Position.sort);
                assert.deepEqual(input, want);
            });
        });
    });

    describe(Position.prototype.add.name, function () {
        const testCases: [Position, Position, Position][] = [
            [new Position(0, 0), new Position(0, 0), new Position(0, 0)],
            [new Position(0, 1), new Position(0, 1), new Position(0, 2)],
            [new Position(3, 5), new Position(2, 1), new Position(5, 6)],
        ];
        testCases.forEach(([a, b, want]) => {
            it(`${a} + ${b} => ${want}`, function () {
                const got = a.add(b);
                assert.deepEqual(got, want);
            });
        });
    });

    describe(Position.prototype.equals.name, function () {
        const testCases: [Position, Position, boolean][] = [
            [new Position(0, 0), new Position(0, 0), true],
            [new Position(0, 1), new Position(0, 1), true],
            [new Position(1, 1), new Position(0, 0), false],
            [new Position(1, 3), new Position(0, 0), false],
        ];
        testCases.forEach(([a, b, want]) => {
            it(`${a} == ${b} => ${want}`, function () {
                const got = a.equals(b);
                assert.equal(got, want);
            });
        });
    });

    describe(Position.prototype.isIn.name, function () {
        const testCases: [Position, Position[], boolean][] = [
            [
                new Position(0, 0),
                [new Position(0, 0), new Position(1, 1)],
                true,
            ],
            [
                new Position(1, 1),
                [new Position(0, 0), new Position(1, 1)],
                true,
            ],
            [
                new Position(0, 1),
                [new Position(0, 0), new Position(1, 1)],
                false,
            ],
            [
                new Position(1, 3),
                [new Position(0, 0), new Position(1, 1)],
                false,
            ],
        ];
        testCases.forEach(([pos, poss, want]) => {
            it(`${pos} in [${poss}] => ${want}`, function () {
                const got = pos.isIn(poss);
                assert.equal(got, want);
            });
        });
    });
});
