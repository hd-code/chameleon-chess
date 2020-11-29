import { Difficulty, makeComputerMove } from 'ai';

import { GameState, getNextGameStates, getStartGameState } from 'models/game-state';

// -----------------------------------------------------------------------------

describe(makeComputerMove.name, () => {
    test('should return one of the next game states', () => {
        const gs = getStartGameState(true, true, true, true) as GameState;
        const nextGSs = getNextGameStates(gs);
        const calcedGS = makeComputerMove(gs);
        expect(nextGSs).toContainEqual(calcedGS);
    });

    test('difficulty hard should return other game state then easy (2 tries)', () => {
        const gs = getStartGameState(true, true, true, true) as GameState;
        const gsHard = makeComputerMove(gs, Difficulty.hard);
        try {
            const gsEasy = makeComputerMove(gs, Difficulty.easy);
            expect(gsHard).not.toEqual(gsEasy);
        } catch (_) {
            const gsEasy = makeComputerMove(gs, Difficulty.easy);
            expect(gsHard).not.toEqual(gsEasy);
        }
    });
});