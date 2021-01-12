import { useState } from 'react';

import * as GS from './game-state';
import { PlayerType, Players } from './players';
import Storage from './storage';

// -----------------------------------------------------------------------------

export interface Game {
    gameStates: GS.GameState[];
    players: Players;
}

export function getCurrentGameState(game: Game): GS.GameState {
    return game.gameStates[game.gameStates.length - 1];
}

export function initGame(players: Players): Game | null {
    const gs = GS.getStartGameState(
        players[GS.Player.red] !== PlayerType.none,
        players[GS.Player.green] !== PlayerType.none,
        players[GS.Player.yellow] !== PlayerType.none,
        players[GS.Player.blue] !== PlayerType.none,
    );

    if (!gs) {
        return null;
    }

    return { gameStates: [gs], players };
}

export function isGameOver(game: Game): boolean {
    const gs = getCurrentGameState(game);
    return GS.isGameOver(gs);
}

export function makeMove(pawnIndex: number, destination: GS.Position, game: Game): Game | null {
    const nextGS = GS.makeMove(getCurrentGameState(game), pawnIndex, destination);
    if (!nextGS) {
        return null;
    }
    game.gameStates.push(nextGS);
    return game;
}

// -----------------------------------------------------------------------------

export interface GameState {
    game: Game;
    makeMove: (pawnIndex: number, destination: GS.Position) => boolean;
    onNextTurn: () => void;
}

export function useGame(storage: Storage): GameState {
    const [game, setGame] = useState(startGame);

    storage.read<Game>(storageKey)
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

const startGame = initGame({ 0:1, 1:0, 2:1, 3:0 });
