import { getStartLimits, isSmallestLimits, updateLimits } from 'models/game-state/limits';

// -----------------------------------------------------------------------------

describe('models/game-state/limits', () => {
    test(getStartLimits.name, () => {
        const expected = { minRow: 0, maxRow: 7, minCol: 0, maxCol: 7 };
        const actual = getStartLimits();
        expect(actual).toEqual(expected);
    });

    describe(isSmallestLimits.name, () => {
        test.each([
            [ { minRow: 0, maxRow: 7, minCol: 0, maxCol: 7 }, false ],
            [ { minRow: 0, maxRow: 2, minCol: 0, maxCol: 7 }, false ],
            [ { minRow: 0, maxRow: 2, minCol: 0, maxCol: 2 }, true ],
            [ { minRow: 0, maxRow: 2, minCol: 5, maxCol: 7 }, true ],
            [ { minRow: 1, maxRow: 3, minCol: 3, maxCol: 5 }, true ],
            [ { minRow: 1, maxRow: 4, minCol: 3, maxCol: 5 }, false ],
            [ { minRow: 1, maxRow: 3, minCol: 3, maxCol: 6 }, false ],
            [ { minRow: 0, maxRow: 4, minCol: 2, maxCol: 6 }, false ],
        ])('%o expect %o', (limits, expected) => {
            const actual = isSmallestLimits(limits);
            expect(actual).toBe(expected);
        });
    });

    describe(updateLimits.name, () => {
        test.each([[
            'pawns at edge, no shrinking',
            [
                { player: 0, knightColor: 0, position: { row: 0, col: 0 } },
                { player: 0, knightColor: 0, position: { row: 7, col: 7 } },
            ],
            { minRow: 0, maxRow: 7, minCol: 0, maxCol: 7 },
            { minRow: 0, maxRow: 7, minCol: 0, maxCol: 7 }
        ], [
            'one pawn at edge, shrinks completely',
            [
                { player: 0, knightColor: 0, position: { row: 0, col: 0 } },
            ],
            { minRow: 0, maxRow: 7, minCol: 0, maxCol: 7 },
            { minRow: 0, maxRow: 2, minCol: 0, maxCol: 2 }
        ], [
            'pawns in the middle, limits shrink a bit',
            [
                { player: 0, knightColor: 0, position: { row: 3, col: 6 } },
                { player: 0, knightColor: 0, position: { row: 5, col: 2 } },
                { player: 0, knightColor: 0, position: { row: 4, col: 3 } },
            ],
            { minRow: 0, maxRow: 7, minCol: 0, maxCol: 7 },
            { minRow: 3, maxRow: 5, minCol: 2, maxCol: 6 }
        ], [
            'pawns in the middle, limits already right, so they should not change',
            [
                { player: 0, knightColor: 0, position: { row: 3, col: 6 } },
                { player: 0, knightColor: 0, position: { row: 5, col: 2 } },
                { player: 0, knightColor: 0, position: { row: 4, col: 3 } },
            ],
            { minRow: 3, maxRow: 5, minCol: 2, maxCol: 6 },
            { minRow: 3, maxRow: 5, minCol: 2, maxCol: 6 }
        ], [
            'pawn in the middle, limits shrink to center around pawn',
            [
                { player: 0, knightColor: 0, position: { row: 3, col: 3 } },
            ],
            { minRow: 0, maxRow: 7, minCol: 0, maxCol: 7 },
            { minRow: 2, maxRow: 4, minCol: 2, maxCol: 4 }
        ], [
            'pawn in the middle, limits already smallest, so they should not change',
            [
                { player: 0, knightColor: 0, position: { row: 3, col: 3 } },
            ],
            { minRow: 3, maxRow: 5, minCol: 2, maxCol: 4 },
            { minRow: 3, maxRow: 5, minCol: 2, maxCol: 4 }
        ]])('%s', (_, pawns, limits, expected) => {
            const actual = updateLimits(pawns, limits);
            expect(actual).toEqual(expected);
        });
    });
});