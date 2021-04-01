import React, { FC } from 'react';

import { Color, GameState, arePlayersAlive } from 'core/game-state';
import { Players } from 'core/players';
import { imgDir } from 'web/constants';

import LinkIcon from './link-icon';
import Player from './player';

// -----------------------------------------------------------------------------

interface PlayersProps {
    gameState: GameState;
    goToHome: () => void;
    goToSettings: () => void;
    isPortrait: boolean;
    players: Players;
}

const component: FC<PlayersProps> = props => {
    const playersState = arePlayersAlive(props.gameState.pawns);
    return (
        <div className={props.isPortrait ? 'mb-1 flex center middle' : 'mr-1'}>
            <LinkIcon onClick={props.goToHome} src={imgDir + 'home.svg'} />
            {players.map((player, i) => (
                <Player
                    key={i}
                    active={props.gameState.player === player}
                    color={player}
                    dead={!playersState[player]}
                    type={props.players[player]}
                />
            ))}
            <LinkIcon onClick={props.goToSettings} src={imgDir + 'settings.svg'} />
        </div>
    );
};
export default component;

// -----------------------------------------------------------------------------

const players = [Color.red, Color.blue, Color.yellow, Color.green];
