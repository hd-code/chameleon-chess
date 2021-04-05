import React, { FC } from 'react';

import { isGameOver } from 'core/game';
import { View } from 'core/view';
import type { AppProps } from 'web/app';

import { Board } from './board';
import { GameOverScreen } from './game-over-screen';
import { PlayerCards } from './player-cards';

// -----------------------------------------------------------------------------

export const Game: FC<AppProps> = ({
    aiLevel,
    gameState,
    playerConfig,
    height,
    width,
    beginGame,
    doComputerMove,
    goTo,
    makeMove,
}) => {
    if (!gameState) {
        console.warn('There is no game to be played.');
        goTo(View.home);
        return <></>;
    }

    doComputerMove(500);

    const boardWidth = Math.min(height, width) * 0.98;
    const isPortrait = height > width;

    return (
        <div className={'flex middle' + (isPortrait ? ' col center' : '')}>
            <PlayerCards
                gameState={gameState}
                goToHome={() => goTo(View.home)}
                goToSettings={() => goTo(View.settings)}
                isPortrait={isPortrait}
                players={playerConfig}
            />

            <Board gameState={gameState} makeMove={makeMove} size={boardWidth} />

            {isGameOver(gameState) && (
                <GameOverScreen
                    winner={gameState.player}
                    home={() => goTo(View.home)}
                    newGame={() => goTo(View.setup)}
                    replay={() => beginGame(playerConfig, aiLevel)}
                />
            )}
        </div>
    );
};
