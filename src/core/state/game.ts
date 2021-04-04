import { useState } from 'react';

import { AILevel } from 'core/ai';
import { Game, initGame, isComputerTurn, makeComputerMove, makeMove } from 'core/game';
import { Position } from 'core/game-state';
import Storage from 'core/storage';
import { Players } from 'core/players';

// -----------------------------------------------------------------------------

type GameNull = Game | null;

export interface GameState {
    game: GameNull;
    beginNewGame: (players: Players, aiLevel: AILevel) => boolean;
    makeMove: (pawnIndex: number, destination: Position) => boolean;
    onNextTurn: () => void;
}

export function useGame(storage: Storage): GameState {
    const [game, setGame] = useState<GameNull>(null);

    const beginNewGame = (players: Players, aiLevel: AILevel): boolean => {
        const newGame = initGame(players, aiLevel);
        if (!newGame) {
            return false;
        }
        setGame(newGame);
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
        setGame(newGame);
        return true;
    };

    const onNextTurn = () => {
        if (!game) {
            throw 'There is no game to be played!';
        }

        if (!isComputerTurn(game)) {
            return;
        }

        makeComputerMove(game)
            .then(setGame)
            .catch(err => console.error(err));
    };

    return { game, beginNewGame, makeMove: makeMoveOnCurrent, onNextTurn };
}

// -----------------------------------------------------------------------------

const storageKey = 'game';

let neverCalled = true;

function useStorageState(storage: Storage): [GameNull, (game: GameNull) => void] {
    const [game, setGame] = useState<GameNull>(null);

    if (neverCalled) {
        neverCalled = false;
        storage
            .read<Game>(storageKey)
            .then(data => !!data && setGame(data))
            .catch(console.info);
    }

    const setStorageGame = (game: GameNull) => {
        setGame(game);
        storage.write(storageKey, game);
    };

    return [game, setStorageGame];
}
