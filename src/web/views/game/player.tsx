import React, { FC } from 'react';

import { Color } from 'core/game-state';
import { PlayerType } from 'core/players';

import { imgDir } from 'web/constants';

// -----------------------------------------------------------------------------

interface PlayerProps {
    active: boolean;
    className?: string;
    color: Color;
    dead: boolean;
    type: PlayerType;
}

const component: FC<PlayerProps> = props => {
    const activeClass = props.active ? 'overlay-frame' : '';
    const baseClasses = 'border no-select p-05';
    const colorClass = mapColorClass[props.color];
    const deadClass = props.dead ? 'overlay-dark' : '';

    return (
        <div
            className={`${activeClass} ${baseClasses} ${colorClass} ${deadClass} ${props.className ?? ''}`}
            style={{ width: '3em' }}
        >
            <img src={mapTypeImg[props.type]} alt='' />
        </div>
    );
};
export default component;

// -----------------------------------------------------------------------------

const mapColorClass = {
    [Color.red]: 'bgc-red',
    [Color.green]: 'bgc-green',
    [Color.yellow]: 'bgc-yellow',
    [Color.blue]: 'bgc-blue',
};

const mapTypeImg = {
    [PlayerType.none]: imgDir + 'none.svg',
    [PlayerType.human]: imgDir + 'human.svg',
    [PlayerType.computer]: imgDir + 'computer.svg',
};
