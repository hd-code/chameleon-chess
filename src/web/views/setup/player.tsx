import React, { FC } from 'react';

import { Color, Player as PlayerColor } from 'core/game-state';
import { PlayerType } from 'core/players';
import { img } from 'web/assets';
import { Text } from 'web/shared/text';

// -----------------------------------------------------------------------------

interface PlayerProps {
    className?: string;
    color: PlayerColor;
    onClick: () => void;
    type: PlayerType;
}

export const Player: FC<PlayerProps> = ({ className = '', color, ...props }) => (
    <div
        className={`border no-select pointer py-1 text-center ${mapColorToClass[color]} ${className}`}
        onClick={props.onClick}
        style={{ width: '5em' }}
    >
        <img className='w-66' src={mapTypeToImg[props.type]} alt='' />
        <Text className='one-line' Tag='p'>
            {PlayerType[props.type]}
        </Text>
    </div>
);

// -----------------------------------------------------------------------------

const mapColorToClass = {
    [Color.red]: 'bgc-red',
    [Color.green]: 'bgc-green',
    [Color.yellow]: 'bgc-yellow',
    [Color.blue]: 'bgc-blue',
};

const mapTypeToImg = {
    [PlayerType.none]: img.none,
    [PlayerType.human]: img.human,
    [PlayerType.computer]: img.computer,
};
