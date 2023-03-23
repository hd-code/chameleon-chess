import * as React from "react";
import {
    AILevel,
    Color,
    Position,
    calcNextGameState,
    createGameState,
    isGameOver,
    updateGameState,
} from "@chameleon-chess/logic";
import { Game, isComputerMove } from "../domain/Game";
import {
    PlayerSetup,
    PlayerType,
    getDefaultPlayerSetup,
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
        return {
            aiLevel: AILevel.normal,
            gameState: createGameState(true, false, false, false),
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
    const gameState = createGameState(
        playerSetup[Color.red] != PlayerType.none,
        playerSetup[Color.green] != PlayerType.none,
        playerSetup[Color.yellow] != PlayerType.none,
        playerSetup[Color.blue] != PlayerType.none,
    );

    if (isGameOver(gameState)) {
        return false;
    }

    setGame({ gameState, playerSetup, aiLevel });
    return true;
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
