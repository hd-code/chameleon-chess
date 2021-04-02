import React, { FC } from 'react';

import { Color, Pawn as PawnModel, Role, getRoleMapping } from 'core/game-state';
import { img } from 'web/assets';

// -----------------------------------------------------------------------------

interface PawnProps extends PawnModel {
    selected: boolean;
}

export const Pawn: FC<PawnProps> = props => {
    const offset = { left: props.position.col * 12.5 + '%', top: props.position.row * 12.5 + '%' };
    const roleMap = getRoleMapping(props);

    return (
        <div className='hw-12 flex center middle absolute transition' style={offset}>
            <div
                className={
                    'hw-75 border rounded flex center middle ' +
                    mapColorClass[props.player] +
                    (props.selected ? ' overlay-bright' : '')
                }
            >
                <div className='hw-75 flex wrap'>
                    {colorOrder.map(color => (
                        <img
                            key={color}
                            className={'hw-50 ' + mapColorClass[color]}
                            src={mapRoleIcon[roleMap[color]]}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

// -----------------------------------------------------------------------------

const colorOrder: Color[] = [0, 1, 2, 3];

const mapColorClass = {
    [Color.red]: 'bgc-red',
    [Color.green]: 'bgc-green',
    [Color.yellow]: 'bgc-yellow',
    [Color.blue]: 'bgc-blue',
};

const mapRoleIcon = {
    [Role.knight]: img.knight,
    [Role.queen]: img.queen,
    [Role.bishop]: img.bishop,
    [Role.rook]: img.rook,
};
