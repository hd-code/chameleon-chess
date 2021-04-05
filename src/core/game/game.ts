import { useEffect, useState } from 'react';

import { AILevel, makeComputerMove } from './ai';
import { Color, GameState, Position, getStartGameState, isGameOver, makeMove } from './game-state';
import { PlayerConfig, PlayerType } from './player-config';

// -----------------------------------------------------------------------------

export interface Game {
    readonly aiLevel: AILevel;
    readonly gameState: GameState;
    readonly playerConfig: PlayerConfig;
    beginGame: (playerConfig: PlayerConfig, aiLevel: AILevel) => boolean;
    makeMove: (pawnIndex: number, destination: Position) => boolean;
    doComputerMove: (delay: number) => void;
}

export function useGame(): Game {
    const [gameState, setGameState] = useState((null as unknown) as GameState);
    const [aiLevel, setAiLevel] = useState(AILevel.normal);
    const [playerConfig, setPlayerConfig] = useState((null as unknown) as PlayerConfig);

    const beginGame = (playerConfig: PlayerConfig, aiLevel: AILevel): boolean => {
        const gameState = initGameState(playerConfig);
        if (!gameState) {
            return false;
        }

        setAiLevel(aiLevel);
        setGameState(gameState);
        setPlayerConfig(playerConfig);
        return true;
    };

    const makeMoveInt = (pawnIndex: number, destination: Position): boolean => {
        const nextGameState = makeMove(gameState, pawnIndex, destination);
        if (!nextGameState) {
            return false;
        }

        setGameState(nextGameState);
        return true;
    };

    const doComputerMove = (delay: number) => {
        useEffect(() => {
            if (isComputerTurn(playerConfig, gameState) || isGameOver(gameState)) {
                return;
            }

            let isActive = true;
            setTimeout(() => {
                const nextGameState = makeComputerMove(gameState, aiLevel);
                setTimeout(() => {
                    if (isActive) {
                        setGameState(nextGameState);
                    }
                }, 20);
            }, delay);

            return () => {
                isActive = false;
            };
        });
    };

    return { aiLevel, gameState, playerConfig, beginGame, makeMove: makeMoveInt, doComputerMove };
}

// -----------------------------------------------------------------------------

function isComputerTurn(playerConfig: PlayerConfig, gameState: GameState): boolean {
    return playerConfig[gameState.player] !== PlayerType.computer;
}

function initGameState(playerConfig: PlayerConfig): GameState | null {
    return getStartGameState(
        playerConfig[Color.red] !== PlayerType.none,
        playerConfig[Color.green] !== PlayerType.none,
        playerConfig[Color.yellow] !== PlayerType.none,
        playerConfig[Color.blue] !== PlayerType.none,
    );
}
