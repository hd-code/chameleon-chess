import React, { FC } from 'react';

import { Color, Player as PlayerColor } from 'core/game-state';
import { PlayerType } from 'core/players';
import { imgDir } from 'web/constants';
import Text from 'web/shared/text';

// -----------------------------------------------------------------------------

interface PlayerProps {
    className?: string;
    color: PlayerColor;
    type: PlayerType;
    onClick: () => void;
}

const component: FC<PlayerProps> = props => {
    const colorClass = mapColorClass[props.color];
    return (
        <div
            className={`border no-select pointer py-1 text-center ${colorClass} ${props.className ?? ''}`}
            onClick={props.onClick}
            style={{ width: '5em' }}
        >
            <img className='w-66' src={mapTypeImg[props.type]} alt='' />
            <Text className='one-line' type='p'>
                {PlayerType[props.type]}
            </Text>
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
