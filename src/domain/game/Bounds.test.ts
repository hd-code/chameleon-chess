import assert from "assert/strict";
import { Bounds } from "./Bounds";
import { Position } from "./Position";

describe(Bounds.name, () => {
    describe(Bounds.fromPositions.name, () => {
        [
            {
                points: [new Position(0, 0)],
                want: new Bounds(0, 0, 0, 0),
            },
            {
                points: [new Position(4, 6), new Position(2, 7)],
                want: new Bounds(2, 6, 4, 7),
            },
            {
                points: [
                    new Position(0, 6),
                    new Position(2, 7),
                    new Position(4, 4),
                ],
                want: new Bounds(0, 4, 4, 7),
            },
        ].forEach(({ points, want }) => {
            it(`points: ${points.map((p) => p.toString()).join(", ")}`, () => {
                const bounds = Bounds.fromPositions(points);
                assert.deepStrictEqual(bounds, want);
            });
        });
    });

    describe("getter", () => {
        [
            {
                bounds: new Bounds(0, 0, 2, 2),
                min: new Position(0, 0),
                max: new Position(2, 2),
                width: 3,
                height: 3,
                smallest: true,
            },
            {
                bounds: new Bounds(3, 5, 5, 7),
                min: new Position(3, 5),
                max: new Position(5, 7),
                width: 3,
                height: 3,
                smallest: true,
            },
            {
                bounds: new Bounds(1, 3, 7, 7),
                min: new Position(1, 3),
                max: new Position(7, 7),
                width: 7,
                height: 5,
                smallest: false,
            },
        ].forEach((testCase) => {
            it(`${testCase.bounds}`, () => {
                assert.deepEqual(testCase.bounds.min, testCase.min);
                assert.deepEqual(testCase.bounds.max, testCase.max);
                assert.equal(testCase.bounds.width, testCase.width);
                assert.equal(testCase.bounds.height, testCase.height);
                assert.equal(testCase.bounds.smallest, testCase.smallest);
            });
        });
    });

    describe(Bounds.prototype.contains.name, () => {
        [
            [new Bounds(0, 0, 0, 0), new Position(0, 0), true],
            [new Bounds(0, 0, 0, 0), new Position(1, 0), false],
            [new Bounds(3, 1, 5, 7), new Position(4, 3), true],
            [new Bounds(3, 1, 5, 7), new Position(1, 3), false],
            [new Bounds(3, 1, 5, 7), new Position(4, 0), false],
            [new Bounds(0, 0, 0, 0), new Bounds(0, 0, 0, 0), true],
            [new Bounds(0, 0, 0, 0), new Bounds(0, 1, 0, 1), false],
            [new Bounds(0, 0, 1, 1), new Bounds(1, 1, 1, 1), true],
            [new Bounds(0, 0, 3, 3), new Bounds(5, 5, 7, 7), false],
            [new Bounds(0, 0, 5, 5), new Bounds(3, 3, 7, 7), false],
        ].forEach(([bounds, arg, want]) => {
            it(`${bounds}.contains(${arg}) => ${want}`, () => {
                const got = (bounds as Bounds).contains(
                    arg as Bounds | Position,
                );
                assert.equal(got, want);
            });
        });
    });

    describe(Bounds.prototype.equals.name, () => {
        [
            [new Bounds(0, 0, 0, 0), new Bounds(0, 0, 0, 0), true],
            [new Bounds(3, 2, 4, 6), new Bounds(3, 2, 4, 6), true],
            [new Bounds(3, 2, 4, 6), new Bounds(3, 2, 4, 7), false],
            [new Bounds(3, 2, 4, 6), new Bounds(3, 2, 4, 5), false],
            [new Bounds(0, 0, 3, 3), new Bounds(5, 5, 7, 7), false],
        ].forEach(([bounds, arg, want]) => {
            it(`${bounds}.equals(${arg}) => ${want}`, () => {
                const got = (bounds as Bounds).equals(arg as Bounds);
                assert.equal(got, want);
            });
        });
    });

    describe(Bounds.prototype.shrink.name, () => {
        [
            {
                name: "no shrinking",
                bounds: new Bounds(2, 4, 5, 6),
                positions: [
                    new Position(2, 5),
                    new Position(5, 6),
                    new Position(4, 4),
                ],
                want: new Bounds(2, 4, 5, 6),
            },
            {
                name: "normal shrinking",
                bounds: new Bounds(0, 0, 7, 7),
                positions: [new Position(5, 3), new Position(0, 7)],
                want: new Bounds(0, 3, 5, 7),
            },
            {
                name: "shrinking to smallest width",
                bounds: new Bounds(0, 0, 7, 7),
                positions: [new Position(0, 0), new Position(0, 7)],
                want: new Bounds(0, 0, 2, 7),
            },
            {
                name: "no shrinking when already smallest",
                bounds: new Bounds(4, 1, 6, 3),
                positions: [new Position(5, 2)],
                want: new Bounds(4, 1, 6, 3),
            },
            {
                name: "shrinking to smallest with only 1 position in the center",
                bounds: new Bounds(0, 0, 7, 7),
                positions: [new Position(3, 5)],
                want: new Bounds(2, 4, 4, 6),
            },
        ].forEach(({ name, bounds, positions, want }) => {
            it(`${name}`, () => {
                const got = bounds.shrink(positions);
                assert.deepEqual(got, want);
            });
        });
    });
});
