import React, { FC } from 'react';

import { Color, GameState, arePlayersAlive } from 'core/game-state';
import { Players as PlayersModel } from 'core/players';
import { img } from 'web/assets';

import { LinkIcon } from './link-icon';
import { Player } from './player';

// -----------------------------------------------------------------------------

interface PlayersProps {
    gameState: GameState;
    goToHome: () => void;
    goToSettings: () => void;
    isPortrait: boolean;
    players: PlayersModel;
}

export const Players: FC<PlayersProps> = props => {
    const playersState = arePlayersAlive(props.gameState.pawns);
    return (
        <div className={props.isPortrait ? 'mb-1 flex center middle' : 'mr-1'}>
            <LinkIcon onClick={props.goToHome} src={img.home} />
            {players.map((player, i) => (
                <Player
                    key={i}
                    active={props.gameState.player === player}
                    color={player}
                    dead={!playersState[player]}
                    type={props.players[player]}
                />
            ))}
            <LinkIcon onClick={props.goToSettings} src={img.settings} />
        </div>
    );
};

// -----------------------------------------------------------------------------

const players = [Color.red, Color.blue, Color.yellow, Color.green];
