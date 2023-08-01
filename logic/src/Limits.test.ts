import * as assert from "assert/strict";
import { Limits } from "./Limits";
import { Position } from "./Position";

describe(Limits.name, function () {
    it(Limits.default.name, function () {
        const want = new Limits(new Position(0, 0), new Position(7, 7));
        const got = Limits.default();
        assert.deepEqual(got, want);
    });

    describe(Limits.prototype.contains.name, function () {
        // prettier-ignore
        const tests: [Limits, Position, boolean][] = [
            [
                new Limits(new Position(0, 0), new Position(2, 2)),
                new Position(0, 0),
                true,
            ],
            [
                new Limits(new Position(3, 2), new Position(5, 4)),
                new Position(0, 0),
                false,
            ],
            [
                new Limits(new Position(3, 2), new Position(5, 4)),
                new Position(7, 3),
                false,
            ],
            [
                new Limits(new Position(3, 2), new Position(5, 4)),
                new Position(4, 5),
                false,
            ],
            [
                new Limits(new Position(0, 0), new Position(7, 7)),
                new Position(3, 5),
                true,
            ],
        ];
        tests.forEach(([limit, pos, want]) => {
            it(`[${pos}] is ${want ? "" : "not "}in ${limit}`, function () {
                const got = limit.contains(pos);
                assert.equal(got, want);
            });
        });
    });

    describe(Limits.prototype.isSmallest.name, function () {
        const tests: [Limits, boolean][] = [
            [new Limits(new Position(0, 0), new Position(2, 2)), true],
            [new Limits(new Position(3, 2), new Position(5, 4)), true],
            [new Limits(new Position(0, 0), new Position(7, 7)), false],
            [new Limits(new Position(3, 2), new Position(5, 6)), false],
            [new Limits(new Position(1, 1), new Position(3, 4)), false],
        ];
        tests.forEach(([limit, want]) => {
            it(`${limit} is ${want ? "" : "not "}smallest`, function () {
                const got = limit.isSmallest();
                assert.equal(got, want);
            });
        });
    });

    describe(Limits.prototype.update.name, function () {
        const tests: [string, Limits, Position[], Limits][] = [
            [
                "no change in limits",
                Limits.default(),
                [new Position(0, 0), new Position(0, 7), new Position(7, 0)],
                Limits.default(),
            ],
            [
                "limits shrink a bit on all sides",
                Limits.default(),
                [new Position(2, 6), new Position(5, 1)],
                new Limits(new Position(2, 1), new Position(5, 6)),
            ],
            [
                "limits shrink to min with pawn at the side",
                new Limits(new Position(2, 1), new Position(5, 6)),
                [new Position(2, 6)],
                new Limits(new Position(2, 4), new Position(4, 6)),
            ],
            [
                "limits shrink to min with pawn at the center",
                Limits.default(),
                [new Position(3, 4)],
                new Limits(new Position(2, 3), new Position(4, 5)),
            ],
            [
                "limits shrink to min with pawns at the center",
                Limits.default(),
                [new Position(3, 4), new Position(3, 5)],
                new Limits(new Position(2, 3), new Position(4, 5)),
            ],
        ];
        tests.forEach(([name, limit, pawnPositions, want]) => {
            it(name, function () {
                const got = limit.update(pawnPositions);
                assert.deepEqual(got, want);
            });
        });
    });
});
