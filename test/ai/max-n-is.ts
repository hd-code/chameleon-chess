import { maxNIS } from 'ai/max-n-is';
import * as assert from 'assert';

import { GameState, getStartGameState } from 'models/game-state';

// -----------------------------------------------------------------------------

describe(maxNIS.name, () => {
    it('should return equal score for all players on start game state', () => {
        const expected = { 0:.25, 1:.25, 2:.25, 3:.25 };
        const gs = getStartGameState(true, true, true, true) as GameState;
        const score = maxNIS(gs, 0);
        assert.deepStrictEqual(score, expected);
    });

    it('should return different score for different depths', () => {
        const gs = getStartGameState(true, true, true, true) as GameState;
        const d0 = maxNIS(gs, 0);
        const d1 = maxNIS(gs, 1);
        assert.notDeepStrictEqual(d0, d1);
    });
});