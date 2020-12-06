import { getNextGameStates, getStartGameState, isGameOver, isGameState, makeMove } from 'models/game-state';
import * as assert from 'assert';

// -----------------------------------------------------------------------------

describe('models/game-state', () => {
    it(isGameState.name);
    it(getNextGameStates.name);
    it(getStartGameState.name);
    it(isGameOver.name);
    it(makeMove.name);
});