import { Difficulty, makeComputerMove } from 'core/ai';
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
                expect(calcedGS).toEqual(nextGSs[i]);
                numOfMatchingStates += 1;
            } catch (e) {} // eslint-disable-line no-empty
        }
        expect(numOfMatchingStates).toBe(1);
    });

    it('difficulty hard should not return the same game state as easy (3 tries)', () => {
        const gs = getStartGameState(true, true, true, true) as GameState;
        const gsHard = makeComputerMove(gs, Difficulty.hard);
        const execTest = () => {
            const gsEasy = makeComputerMove(gs, Difficulty.easy);
            expect(gsEasy).not.toEqual(gsHard);
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
