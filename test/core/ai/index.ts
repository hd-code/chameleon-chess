import { Difficulty, makeComputerMove } from 'core/ai';
import * as assert from 'assert';

import { GameState, getNextGameStates, getStartGameState } from 'core/game-state';

// -----------------------------------------------------------------------------

describe('core/ai/' + makeComputerMove.name, () => {
    it('should return one of the next game states', () => {
        const gs = getStartGameState(true, true, true, true) as GameState;
        const nextGSs = getNextGameStates(gs);
        const calcedGS = makeComputerMove(gs);

        let numOfMatchingStates = 0;
        for (let i = 0, ie = nextGSs.length; i < ie; i++) {
            try {
                assert.deepStrictEqual(calcedGS, nextGSs[i]);
                numOfMatchingStates += 1;
            } catch (e) {} // eslint-disable-line no-empty
        }
        assert.strictEqual(numOfMatchingStates, 1);
    });

    it('difficulty hard should not return the same game state as easy (3 tries)', () => {
        const gs = getStartGameState(true, true, true, true) as GameState;
        const gsHard = makeComputerMove(gs, Difficulty.hard);
        const execTest = () => {
            const gsEasy = makeComputerMove(gs, Difficulty.easy);
            assert.notDeepStrictEqual(gsEasy, gsHard);
        };

        try {
            execTest();
        } catch (_) {
            try {
                execTest();
            } catch (_) {
                execTest();
            }
        }
    });
});
