import React, { FC } from 'react';

import { Color, Player as PlayerModel } from 'core/game-state';
import { Players as PlayersModel } from 'core/players';

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
        <div className={'my-2 flex middle'}>
            <div className='grow'>
                <Player {...getProps(Color.blue)} />
            </div>

            <div className='grow mx-1'>
                <Player {...getProps(Color.yellow)} className='mb-4' />
                <Player {...getProps(Color.red)} />
            </div>

            <div className='grow'>
                <Player {...getProps(Color.green)} />
            </div>
        </div>
    );
};
export default component;
