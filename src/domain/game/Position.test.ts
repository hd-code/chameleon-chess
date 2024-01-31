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

    describe(Position.prototype.is.name, () => {
        [
            { a: new Position(1, 2), b: new Position(1, 2), want: true },
            { a: new Position(1, 2), b: new Position(2, 2), want: false },
            { a: new Position(1, 2), b: new Position(1, 1), want: false },
            { a: new Position(1, 2), b: new Position(0, 3), want: false },
        ].forEach(({ a, b, want }) => {
            it(`${a} is ${b} => ${want}`, () => {
                const got = a.is(b);
                assert.strictEqual(got, want);
            });
        });
    });

    describe(Position.prototype.isIn.name, () => {
        const positions = [
            new Position(1, 2),
            new Position(3, 4),
            new Position(5, 6),
        ];

        [
            { p: new Position(1, 2), positions, want: true },
            { p: new Position(3, 4), positions, want: true },
            { p: new Position(1, 1), positions, want: false },
            { p: new Position(0, 3), positions, want: false },
        ].forEach(({ p, positions, want }) => {
            it(`${p} is in ${positions} => ${want}`, () => {
                const got = p.isIn(positions);
                assert.strictEqual(got, want);
            });
        });
    });
});
