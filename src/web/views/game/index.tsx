import React, { FC } from 'react';

import { getCurrentGameState } from 'core/game';
import { AppState } from 'core/state';

import Board from './board';
import Players from './players';

// -----------------------------------------------------------------------------

interface GameProps extends AppState {
    height: number;
    width: number;
}

const component: FC<GameProps> = props => {
    if (!props.game) {
        console.warn('There is no game to be played.');
        props.goTo.home();
        return <></>;
    }

    const gs = getCurrentGameState(props.game);
    const boardWidth = Math.min(props.height, props.width) * 0.98;

    const isPortrait = props.height > props.width;

    return (
        <div className={'flex middle' + (isPortrait ? ' col center' : '')}>
            <Players
                gameState={gs}
                goToHome={props.goTo.home}
                goToSettings={props.goTo.settings}
                isPortrait={isPortrait}
                players={props.game.players}
            />
            <Board gameState={gs} makeMove={props.makeMove} size={boardWidth} />
        </div>
    );
};
export default component;
