import { isGameOver } from "chameleon-chess-logic";
import * as React from "react";

import { GameState } from "../../state/GameState";
import { Screen, ScreenState } from "../../state/ScreenState";

import { Board } from "./Board";
import { GameOverScreen } from "./GameOverScreen";
import { PlayerCards } from "./PlayerCards";

// -----------------------------------------------------------------------------

interface GameScreenProps extends GameState, ScreenState {
    height: number;
    width: number;
}

export const GameScreen: React.FC<GameScreenProps> = ({
    game,
    height,
    width,
    beginGame,
    makeComputerMove,
    goTo,
    makeMove,
}) => {
    if (!game) {
        console.warn("There is no game to be played.");
        goTo(Screen.home);
        return <></>;
    }

    makeComputerMove(500);

    const boardWidth = Math.min(height, width) * 0.98;
    const isPortrait = height > width;

    return (
        <div className={"flex flex-center" + (isPortrait ? " flex-col" : "")}>
            <PlayerCards
                gameState={game.gameState}
                goToHome={() => goTo(Screen.home)}
                goToSettings={() => goTo(Screen.settings)}
                isPortrait={isPortrait}
                players={game.playerSetup}
            />

            <Board
                gameState={game.gameState}
                makeMove={makeMove}
                size={boardWidth}
            />

            {isGameOver(game.gameState) && (
                <GameOverScreen
                    winner={game.gameState.player}
                    home={() => goTo(Screen.home)}
                    newGame={() => goTo(Screen.gameSetup)}
                    replay={() => beginGame(game.playerSetup, game.aiLevel)}
                />
            )}
        </div>
    );
};
