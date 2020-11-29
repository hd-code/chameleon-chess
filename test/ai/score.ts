import { getZeroScore, normalizeScore } from 'ai/score';

// -----------------------------------------------------------------------------

describe('ai/score', () => {
    test(getZeroScore.name, () => {
        const expected = { 0:0, 1:0, 2:0, 3:0 };
        const actual = getZeroScore();
        expect(actual).toEqual(expected);
    });

    describe(normalizeScore.name, () => {
        test.each([
            [ { 0:1, 1:1, 2:1, 3:1 }, { 0:.25, 1:.25, 2:.25, 3:.25 } ],
            [ { 0:0, 1:1, 2:0, 3:0 }, { 0:0, 1:1, 2:0, 3:0 } ],
            [ { 0:0, 1:1, 2:1, 3:0 }, { 0:0, 1:.5, 2:.5, 3:0 } ],
            [ { 0:4, 1:1, 2:2, 3:3 }, { 0:.4, 1:.1, 2:.2, 3:.3 } ],
            [ { 0:5, 1:5, 2:5, 3:5 }, { 0:.25, 1:.25, 2:.25, 3:.25 } ],
        ])('%o should return %o', (input, expected) => {
            const actual = normalizeScore(input);
            expect(actual).toEqual(expected);
        });
    });
});