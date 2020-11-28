import React from 'react';

import { Player as PlayerColor } from 'models/game-state';
import { PlayerType } from 'models/players';
import { imgDir } from 'web/constants';

// -----------------------------------------------------------------------------

interface PlayerProps {
    color: PlayerColor;
    type: PlayerType;
    onClick: () => void;
}

export default function Player(props: PlayerProps): JSX.Element {
    const colorClass = mapColorClass[props.color];
    return <div className={'flex-1 border p-2 ' + colorClass} onClick={props.onClick}>
        <img src={mapTypeImg[props.type]} alt=""/>
        <p>{PlayerType[props.type]}</p>
    </div>;
}

// -----------------------------------------------------------------------------

const mapColorClass = {
    [PlayerColor.red]: 'bgc-red',
    [PlayerColor.green]: 'bgc-green',
    [PlayerColor.yellow]: 'bgc-yellow',
    [PlayerColor.blue]: 'bgc-blue',
};

const mapTypeImg = {
    [PlayerType.none]: imgDir + 'none.svg',
    [PlayerType.human]: imgDir + 'human.svg',
    [PlayerType.computer]: imgDir + 'computer.svg',
};