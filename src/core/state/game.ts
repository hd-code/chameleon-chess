import { useState } from 'react';

import { AILevel } from 'core/ai';
import { Game, initGame, makeMove } from 'core/game';
import { Position } from 'core/game-state';
import Storage from 'core/storage';
import { Players } from 'core/players';

// -----------------------------------------------------------------------------

export interface GameState {
    game: Game | null;
    beginNewGame: (players: Players, aiLevel: AILevel) => boolean;
    makeMove: (pawnIndex: number, destination: Position) => boolean;
    onNextTurn: () => void;
}

export function useGame(storage: Storage): GameState {
    const [game, setGame] = useState<Game | null>(null);

    storage
        .read<Game>(storageKey)
        .then(data => !!data && setGame(data))
        .catch(console.info);

    const updateGame = (newGame: Game | null) => {
        void storage.write<Game | null>(storageKey, newGame);
        setGame(newGame);
    };

    const beginNewGame = (players: Players, aiLevel: AILevel): boolean => {
        const newGame = initGame(players, aiLevel);
        if (!newGame) {
            return false;
        }
        updateGame(newGame);
        return true;
    };

    const makeMoveOnCurrent = (pawnIndex: number, destination: Position) => {
        if (!game) {
            return false;
        }
        const newGame = makeMove(game, pawnIndex, destination);
        if (!newGame) {
            return false;
        }
        updateGame(newGame);
        return true;
    };

    const onNextTurn = () => {
        // call ai if necessary
    };

    return { game, beginNewGame, makeMove: makeMoveOnCurrent, onNextTurn };
}

// -----------------------------------------------------------------------------

const storageKey = 'game';
