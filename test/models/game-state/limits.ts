import { getStartLimits, isLimits, isSmallestLimits, isWithinLimits, updateLimits } from 'models/game-state/limits';
import * as assert from 'assert';

// -----------------------------------------------------------------------------

describe('models/game-state/limits', () => {
    describe(isLimits.name, () => {
        [
            { input: { minRow: 0, maxRow: 7, minCol: 0, maxCol: 7 }, expected: true },
            { input: { minRow: 0, maxRow: 5, minCol: 3, maxCol: 7 }, expected: true },
            { input: { minRow: 3, maxRow: 6, minCol: 2, maxCol: 5 }, expected: true },
            { input: { minRow: 2, maxRow: 4, minCol: 3, maxCol: 5 }, expected: true },
            { input: { minRow: 0, maxRow: 2, minCol: 5, maxCol: 7 }, expected: true },
            { input: { minRow: 0, maxRow: '7', minCol: 0, maxCol: 7 }, expected: false },
            { input: { minRow: 0, maxRow: 7, minCol: '0', maxCol: 7 }, expected: false },
            { input: { minRow: 0, maxRow: .5, minCol: 0, maxCol: 7 }, expected: false },
            { input: { minRow: 0, maxRow: 7, minCol: -2, maxCol: 7 }, expected: false },
            { input: { minRow: 0, maxRow: 7, minCol: 0, maxCol: 8 }, expected: false },
            { input: { minRow: 3, maxRow: 4, minCol: 0, maxCol: 7 }, expected: false },
            { input: { minRow: 4, maxRow: 2, minCol: 0, maxCol: 7 }, expected: false },
            { input: { minRow: 0, maxRow: 7, minCol: 6, maxCol: 4 }, expected: false },
            { input: -1, expected: false },
            { input: 4, expected: false },
            { input: 0.5, expected: false },
            { input: 2.3, expected: false },
            { input: '0', expected: false },
            { input: null, expected: false },
            { input: [], expected: false },
            { input: {}, expected: false },
        ].forEach(({input, expected}) => {
            it(`${JSON.stringify(input)} => ${expected}`, () => {
                const actual = isLimits(input);
                assert.strictEqual(actual, expected);
            });
        });
    });

    it(getStartLimits.name, () => {
        const expected = { minRow: 0, maxRow: 7, minCol: 0, maxCol: 7 };
        const actual = getStartLimits();
        assert.deepStrictEqual(actual, expected);
    });

    describe(isSmallestLimits.name, () => {
        [
            { limits: { minRow: 0, maxRow: 7, minCol: 0, maxCol: 7 }, expected: false },
            { limits: { minRow: 0, maxRow: 2, minCol: 0, maxCol: 7 }, expected: false },
            { limits: { minRow: 0, maxRow: 2, minCol: 0, maxCol: 2 }, expected: true },
            { limits: { minRow: 0, maxRow: 2, minCol: 5, maxCol: 7 }, expected: true },
            { limits: { minRow: 1, maxRow: 3, minCol: 3, maxCol: 5 }, expected: true },
            { limits: { minRow: 1, maxRow: 4, minCol: 3, maxCol: 5 }, expected: false },
            { limits: { minRow: 1, maxRow: 3, minCol: 3, maxCol: 6 }, expected: false },
            { limits: { minRow: 0, maxRow: 4, minCol: 2, maxCol: 6 }, expected: false },
        ].forEach(({limits, expected}) => {
            it(`${JSON.stringify(limits)} => ${expected}`, () => {
                const actual = isSmallestLimits(limits);
                assert.strictEqual(actual, expected);
            });
        });
    });

    describe(isWithinLimits.name, () => {
        [
            { position: { row: 0, col: 0 }, limits: { minRow: 0, maxRow: 7, minCol: 0, maxCol: 7 }, expected: true },
            { position: { row: 3, col: 5 }, limits: { minRow: 0, maxRow: 7, minCol: 0, maxCol: 7 }, expected: true },
            { position: { row: 6, col: 1 }, limits: { minRow: 0, maxRow: 7, minCol: 0, maxCol: 7 }, expected: true },
            { position: { row: 7, col: 7 }, limits: { minRow: 0, maxRow: 7, minCol: 0, maxCol: 7 }, expected: true },
            { position: { row: 4, col: 5 }, limits: { minRow: 3, maxRow: 6, minCol: 2, maxCol: 5 }, expected: true },
            { position: { row: 3, col: 2 }, limits: { minRow: 3, maxRow: 6, minCol: 2, maxCol: 5 }, expected: true },
            { position: { row: 7, col: 2 }, limits: { minRow: 5, maxRow: 7, minCol: 2, maxCol: 4 }, expected: true },
            { position: { row: 7, col: 3 }, limits: { minRow: 5, maxRow: 7, minCol: 2, maxCol: 4 }, expected: true },
            { position: { row: 7, col: 1 }, limits: { minRow: 5, maxRow: 7, minCol: 2, maxCol: 4 }, expected: false },
            { position: { row: 4, col: 2 }, limits: { minRow: 5, maxRow: 7, minCol: 2, maxCol: 4 }, expected: false },
            { position: { row: 0, col: 0 }, limits: { minRow: 5, maxRow: 7, minCol: 2, maxCol: 4 }, expected: false },
            { position: { row: 7, col: 7 }, limits: { minRow: 0, maxRow: 2, minCol: 0, maxCol: 2 }, expected: false },
            { position: { row: 5, col: 4 }, limits: { minRow: 0, maxRow: 2, minCol: 0, maxCol: 2 }, expected: false },
            { position: { row: 1, col: 3 }, limits: { minRow: 0, maxRow: 2, minCol: 0, maxCol: 2 }, expected: false },
            { position: { row: 1, col: 3 }, limits: { minRow: 5, maxRow: 7, minCol: 5, maxCol: 7 }, expected: false },
            { position: { row: 4, col: 4 }, limits: { minRow: 5, maxRow: 7, minCol: 5, maxCol: 7 }, expected: false },
        ].forEach(({position, limits, expected}) => {
            it(`${JSON.stringify(position)} in ${JSON.stringify(limits)} => ${expected}`, () => {
                const actual = isWithinLimits(position, limits);
                assert.strictEqual(actual, expected);
            });
        });
    });

    describe(updateLimits.name, () => {
        [{
            name: 'pawns at edge, no shrinking',
            pawns: [
                { player: 0, knightColor: 0, position: { row: 0, col: 0 } },
                { player: 0, knightColor: 0, position: { row: 7, col: 7 } },
            ],
            limits: { minRow: 0, maxRow: 7, minCol: 0, maxCol: 7 },
            expected: { minRow: 0, maxRow: 7, minCol: 0, maxCol: 7 }
        }, {
            name: 'one pawn at edge, shrinks completely',
            pawns: [
                { player: 0, knightColor: 0, position: { row: 0, col: 0 } },
            ],
            limits: { minRow: 0, maxRow: 7, minCol: 0, maxCol: 7 },
            expected: { minRow: 0, maxRow: 2, minCol: 0, maxCol: 2 }
        }, {
            name: 'pawns in the middle, limits shrink a bit',
            pawns: [
                { player: 0, knightColor: 0, position: { row: 3, col: 6 } },
                { player: 0, knightColor: 0, position: { row: 5, col: 2 } },
                { player: 0, knightColor: 0, position: { row: 4, col: 3 } },
            ],
            limits: { minRow: 0, maxRow: 7, minCol: 0, maxCol: 7 },
            expected: { minRow: 3, maxRow: 5, minCol: 2, maxCol: 6 }
        }, {
            name: 'pawns in the middle, limits already right, so they should not change',
            pawns: [
                { player: 0, knightColor: 0, position: { row: 3, col: 6 } },
                { player: 0, knightColor: 0, position: { row: 5, col: 2 } },
                { player: 0, knightColor: 0, position: { row: 4, col: 3 } },
            ],
            limits: { minRow: 3, maxRow: 5, minCol: 2, maxCol: 6 },
            expected: { minRow: 3, maxRow: 5, minCol: 2, maxCol: 6 }
        }, {
            name: 'pawn in the middle, limits shrink to center around pawn',
            pawns: [
                { player: 0, knightColor: 0, position: { row: 3, col: 3 } },
            ],
            limits: { minRow: 0, maxRow: 7, minCol: 0, maxCol: 7 },
            expected: { minRow: 2, maxRow: 4, minCol: 2, maxCol: 4 }
        }, {
            name: 'pawn in the middle, limits already smallest, so they should not change',
            pawns: [
                { player: 0, knightColor: 0, position: { row: 3, col: 3 } },
            ],
            limits: { minRow: 3, maxRow: 5, minCol: 2, maxCol: 4 },
            expected: { minRow: 3, maxRow: 5, minCol: 2, maxCol: 4 }
        }].forEach(({name, pawns, limits, expected}) => {
            it(name, () => {
                const actual = updateLimits(pawns, limits);
                assert.deepStrictEqual(actual, expected);
            });
        });
    });
});