import {
    AILevel,
    calcNextGameState,
    Color,
    createGameState,
    isGameOver,
    Position,
    updateGameState,
} from "chameleon-chess-logic";
import * as React from "react";

import { Game, isComputerMove } from "../domain/Game";
import {
    getDefaultPlayerSetup,
    PlayerSetup,
    PlayerType,
} from "../domain/PlayerSetup";

import { AsyncStorage } from "./AsyncStorage";

// -----------------------------------------------------------------------------

export interface GameState {
    readonly game: Game;
    beginGame(playerSetup: PlayerSetup, aiLevel: AILevel): boolean;
    makeMove(pawnIndex: number, destination: Position): boolean;
    makeComputerMove: (delay: number) => void;
}

export function useGameState(store: AsyncStorage): GameState {
    let load = false;
    const [game, setGameTmp] = React.useState<Game>(() => {
        load = true;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const gs = createGameState(true, false, true, false)!;
        return {
            aiLevel: AILevel.normal,
            gameState: { ...gs, pawns: [gs.pawns[0]] },
            playerSetup: getDefaultPlayerSetup(),
        };
    });
    const setGame = (game: Game) => {
        setGameTmp(game);
        store.write(storeKey, game);
    };

    if (load) {
        store.read<Game>(storeKey).then((game) => game && setGame(game));
    }

    return {
        game,
        beginGame: (ps, ai) => beginGame(ps, ai, setGame),
        makeMove: (pi, d) => makeMove(pi, d, game, setGame),
        makeComputerMove: (d) => makeComputerMove(d, game, setGame),
    };
}

// -----------------------------------------------------------------------------

const storeKey = "game";

function beginGame(
    playerSetup: PlayerSetup,
    aiLevel: AILevel,
    setGame: (g: Game) => void,
): boolean {
    const newGS = createGameState(
        playerSetup[Color.red] != PlayerType.none,
        playerSetup[Color.green] != PlayerType.none,
        playerSetup[Color.yellow] != PlayerType.none,
        playerSetup[Color.blue] != PlayerType.none,
    );
    if (newGS !== null) {
        setGame({ gameState: newGS, playerSetup, aiLevel });
    }
    return newGS !== null;
}

function makeMove(
    pawnIndex: number,
    destination: Position,
    game: Game,
    setGame: (g: Game) => void,
): boolean {
    if (isComputerMove(game) || isGameOver(game.gameState)) {
        return false;
    }

    const nextGS = updateGameState(game.gameState, pawnIndex, destination);
    if (nextGS === null) {
        return false;
    }

    setGame({ ...game, gameState: nextGS });
    return true;
}

function makeComputerMove(
    delay: number,
    game: Game,
    setGame: (g: Game) => void,
): void {
    if (!isComputerMove(game) || isGameOver(game.gameState)) {
        return;
    }

    React.useEffect(() => {
        let isActive = true;

        const begin = Date.now();
        setTimeout(() => {
            const nextGS = calcNextGameState(game.gameState, game.aiLevel);
            setTimeout(() => {
                if (isActive) {
                    setGame({ ...game, gameState: nextGS });
                }
            }, Math.max(begin + 1000 - Date.now(), delay));
        }, delay);

        return () => {
            isActive = false;
        };
    });
}
