import { maxNIS } from 'ai/max-n-is';

import { GameState, getStartGameState } from 'models/game-state';

// -----------------------------------------------------------------------------

describe(maxNIS.name, () => {
    test('should return equal score for all players on start game state', () => {
        const expected = { 0:.25, 1:.25, 2:.25, 3:.25 };
        const gs = getStartGameState(true, true, true, true) as GameState;
        const score = maxNIS(gs, 0);
        expect(score).toEqual(expected);
    });

    test('should return different score for different depths', () => {
        const gs = getStartGameState(true, true, true, true) as GameState;
        const d0 = maxNIS(gs, 0);
        const d1 = maxNIS(gs, 1);
        expect(d0).not.toEqual(d1);
    });
});