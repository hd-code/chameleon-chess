import { useState } from 'react';

import * as GS from '../game-state';
import { Game, initGame, makeMove } from '../game';
import Storage from '../storage';

// -----------------------------------------------------------------------------

export interface GameState {
    game: Game;
    makeMove: (pawnIndex: number, destination: GS.Position) => boolean;
    onNextTurn: () => void;
}

export function useGame(storage: Storage): GameState {
    const [game, setGame] = useState(startGame);

    storage
        .read<Game>(storageKey)
        .then(data => !!data && setGame(data))
        .catch(console.info);

    const makeMoveOnCurrent = (pawnIndex: number, destination: GS.Position) => {
        const newGame = makeMove(pawnIndex, destination, game);
        if (!newGame) {
            return false;
        }
        void storage.write<Game>(storageKey, newGame);
        setGame(newGame);
        return true;
    };

    const onNextTurn = () => {
        // call ai if necessary
    };

    return { game, makeMove: makeMoveOnCurrent, onNextTurn };
}

// -----------------------------------------------------------------------------

const storageKey = 'game';

const startGame = initGame({ 0: 1, 1: 0, 2: 1, 3: 0 }) as Game;
