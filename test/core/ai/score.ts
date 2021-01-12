import { getZeroScore, normalizeScore } from 'core/ai/score';
import * as assert from 'assert';

// -----------------------------------------------------------------------------

describe('core/ai/score', () => {
    it(getZeroScore.name, () => {
        const expected = { 0:0, 1:0, 2:0, 3:0 };
        const actual = getZeroScore();
        assert.deepStrictEqual(actual, expected);
    });

    describe(normalizeScore.name, () => {
        [
            { input: { 0:1, 1:1, 2:1, 3:1 }, expected: { 0:.25, 1:.25, 2:.25, 3:.25 } },
            { input: { 0:0, 1:1, 2:0, 3:0 }, expected: { 0:0, 1:1, 2:0, 3:0 } },
            { input: { 0:0, 1:1, 2:1, 3:0 }, expected: { 0:0, 1:.5, 2:.5, 3:0 } },
            { input: { 0:4, 1:1, 2:2, 3:3 }, expected: { 0:.4, 1:.1, 2:.2, 3:.3 } },
            { input: { 0:5, 1:5, 2:5, 3:5 }, expected: { 0:.25, 1:.25, 2:.25, 3:.25 } },
        ].forEach(({ input, expected }) => {
            it(`${JSON.stringify(input)} => ${JSON.stringify(expected)}`, () => {
                const actual = normalizeScore(input);
                assert.deepStrictEqual(actual, expected);
            });
        });
    });
});
