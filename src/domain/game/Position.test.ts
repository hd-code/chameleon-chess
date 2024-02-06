import assert from "assert/strict";
import { Position } from "./Position";

describe(Position.name, () => {
    describe(Position.prototype.add.name, () => {
        [
            [new Position(1, 2), new Position(3, 4), new Position(4, 6)],
            [new Position(1, 2), new Position(1, 2), new Position(2, 4)],
            [new Position(1, 2), new Position(0, 0), new Position(1, 2)],
        ].forEach(([a, b, want]) => {
            it(`${a} + ${b} = ${want}`, () => {
                const got = a.add(b);
                assert.deepStrictEqual(got, want);
            });
        });
    });

    describe(Position.prototype.equals.name, () => {
        [
            { a: new Position(1, 2), b: new Position(1, 2), want: true },
            { a: new Position(1, 2), b: new Position(2, 2), want: false },
            { a: new Position(1, 2), b: new Position(1, 1), want: false },
            { a: new Position(1, 2), b: new Position(0, 3), want: false },
        ].forEach(({ a, b, want }) => {
            it(`${a} is ${b} => ${want}`, () => {
                const got = a.equals(b);
                assert.strictEqual(got, want);
            });
        });
    });

    describe(Position.prototype.in.name, () => {
        [
            {
                name: "empty",
                position: new Position(1, 2),
                positions: [],
                want: false,
            },
            {
                name: "same position",
                position: new Position(1, 2),
                positions: [new Position(1, 2)],
                want: true,
            },
            {
                name: "is among 3 positions",
                position: new Position(1, 2),
                positions: [
                    new Position(0, 1),
                    new Position(1, 2),
                    new Position(3, 4),
                ],
                want: true,
            },
            {
                name: "is not among 3 positions",
                position: new Position(1, 3),
                positions: [
                    new Position(0, 1),
                    new Position(1, 2),
                    new Position(3, 4),
                ],
                want: false,
            },
        ].forEach(({ name, position, positions, want }) => {
            it(`${name}`, () => {
                const got = position.in(positions);
                assert.equal(got, want);
            });
        });
    });

    describe(Position.sort.name, () => {
        [
            {
                name: "no positions",
                positions: [],
                want: [],
            },
            {
                name: "one positions",
                positions: [new Position(1, 2)],
                want: [new Position(1, 2)],
            },
            {
                name: "two positions already sorted",
                positions: [new Position(1, 2), new Position(3, 4)],
                want: [new Position(1, 2), new Position(3, 4)],
            },
            {
                name: "two positions not sorted",
                positions: [new Position(3, 4), new Position(1, 2)],
                want: [new Position(1, 2), new Position(3, 4)],
            },
            {
                name: "three positions with equal pairs per dimension",
                positions: [
                    new Position(2, 3),
                    new Position(1, 2),
                    new Position(1, 3),
                ],
                want: [
                    new Position(1, 2),
                    new Position(1, 3),
                    new Position(2, 3),
                ],
            },
            {
                name: "six positions",
                positions: [
                    new Position(3, 4),
                    new Position(1, 2),
                    new Position(2, 3),
                    new Position(1, 3),
                    new Position(3, 1),
                    new Position(1, 3),
                ],
                want: [
                    new Position(1, 2),
                    new Position(1, 3),
                    new Position(1, 3),
                    new Position(2, 3),
                    new Position(3, 1),
                    new Position(3, 4),
                ],
            },
        ].forEach(({ name, positions, want }) => {
            it(`${name}`, () => {
                const got = positions.sort(Position.sort);
                assert.deepEqual(got, want);
            });
        });
    });
});
