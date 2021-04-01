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
        <div className={'my-2 flex middle'}>
            <div className='grow'>
                <Player {...getProps(PlayerModel.blue)} />
            </div>

            <div className='grow mx-1'>
                <Player {...getProps(PlayerModel.yellow)} className='mb-4'/>
                <Player {...getProps(PlayerModel.red)} />
            </div>

            <div className='grow'>
                <Player {...getProps(PlayerModel.green)} />
            </div>
        </div>
    );
};
export default component;
