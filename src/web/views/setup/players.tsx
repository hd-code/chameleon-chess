import React, { FC } from 'react';

import { Player as PlayerModel, Players as PlayersModel } from 'core/players';

import Player from './player';

// -----------------------------------------------------------------------------

interface PlayersProps extends PlayersModel {
    onClick: (player: PlayerModel) => void;
}

const component: FC<PlayersProps> = props => {
    const getProps = (player: PlayerModel) => ({
        color: player,
        type: props[player],
        onClick: () => props.onClick(player),
    });
    return (
        <div className='flex stretch'>
            <Player {...getProps(PlayerModel.red)} className='w-25' />
            <Player {...getProps(PlayerModel.green)} className='w-25' />
            <Player {...getProps(PlayerModel.yellow)} className='w-25' />
            <Player {...getProps(PlayerModel.blue)} className='w-25' />
        </div>
    );
};
export default component;
