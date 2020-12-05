import { getNextGameStates, getStartGameState, isGameOver, makeMove } from 'models/game-state';

// -----------------------------------------------------------------------------

describe('models/game-state', () => {
    it(getNextGameStates.name);
    it(getStartGameState.name);
    it(isGameOver.name);
    it(makeMove.name);
});