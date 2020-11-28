import React from 'react';

import Player from './player';

import { Player as PlayerModel } from 'models/game-state';
import { Players as PlayersModel } from 'models/players';

// -----------------------------------------------------------------------------

interface PlayersProps extends PlayersModel {
    onClick: (player: PlayerModel) => void;
}

export default function Players(props: PlayersProps): JSX.Element {
    const getProps = (player: PlayerModel) => ({
        color: player,
        type: props[player],
        onClick: () => props.onClick(player)
    });
    return <div className='flex stretch'>
        <Player {...getProps(PlayerModel.red)} />
        <Player {...getProps(PlayerModel.green)} />
        <Player {...getProps(PlayerModel.yellow)} />
        <Player {...getProps(PlayerModel.blue)} />
    </div>;
}