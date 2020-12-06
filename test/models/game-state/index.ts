import { getNextGameStates, getStartGameState, isGameOver, isGameState, makeMove } from 'models/game-state';

// -----------------------------------------------------------------------------

describe('models/game-state', () => {
    it(isGameState.name);
    it(getNextGameStates.name);
    it(getStartGameState.name);
    it(isGameOver.name);
    it(makeMove.name);
});