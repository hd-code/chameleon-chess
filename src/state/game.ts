import { useState } from 'react';

import { Game, initGame, makeMove as makeMoveGameModel } from 'models/game';
import { Position } from 'models/game-state';
import Storage from 'storage';

// -----------------------------------------------------------------------------

export interface GameState {
    game: Game;
    makeMove: (pawnIndex: number, destination: Position) => boolean;
    onNextTurn: () => void;
}

export function useGameState(storage: Storage): GameState {
    const [game, setGame] = useState(startGame);

    storage.read<Game>(storageKey)
        .then(data => setGame(data))
        .catch(console.info);

    const makeMove = (pawnIndex: number, destination: Position) => {
        const newGame = makeMoveGameModel(pawnIndex, destination, game);
        if (!newGame) {
            return false;
        }
        storage.write<Game>(storageKey, newGame);
        setGame(newGame);
        return true;
    };

    const onNextTurn = () => {};

    return { game, makeMove, onNextTurn };
}

// -----------------------------------------------------------------------------

const storageKey = 'game';

const startGame = initGame({ 0:1, 1:0, 2:1, 3:0 });