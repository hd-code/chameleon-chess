import React, { FC } from 'react';

import Player from './player';

import { Player as PlayerModel } from 'core/game-state';
import { Players as PlayersModel } from 'core/players';

// -----------------------------------------------------------------------------

interface PlayersProps extends PlayersModel {
    onClick: (player: PlayerModel) => void;
}

const component: FC<PlayersProps> = (props) => {
    const getProps = (player: PlayerModel) => ({
        color: player,
        type: props[player],
        onClick: () => props.onClick(player),
    });
    return <div className='flex stretch'>
        <Player {...getProps(PlayerModel.red)} />
        <Player {...getProps(PlayerModel.green)} />
        <Player {...getProps(PlayerModel.yellow)} />
        <Player {...getProps(PlayerModel.blue)} />
    </div>;
};
export default component;
