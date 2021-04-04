import React, { FC } from 'react';

import { getCurrentGameState } from 'core/game';
import { AppState } from 'core/state';

import { Board } from './board';
import { Players } from './players';

// -----------------------------------------------------------------------------

interface GameProps extends AppState {
    height: number;
    width: number;
}

export const Game: FC<GameProps> = ({game, goTo, height, width, makeMove, onNextTurn}) => {
    if (!game) {
        console.warn('There is no game to be played.');
        goTo.home();
        return <></>;
    }

    setTimeout(onNextTurn, 500); // delay to let the animations finish before the computer move is calculated

    const gs = getCurrentGameState(game);

    const boardWidth = Math.min(height, width) * 0.98;
    const isPortrait = height > width;

    return (
        <div className={'flex middle' + (isPortrait ? ' col center' : '')}>
            <Players
                gameState={gs}
                goToHome={goTo.home}
                goToSettings={goTo.settings}
                isPortrait={isPortrait}
                players={game.players}
            />
            <Board gameState={gs} makeMove={makeMove} size={boardWidth} />
        </div>
    );
};
