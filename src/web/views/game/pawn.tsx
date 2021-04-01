import React, { FC } from 'react';

import { Color, Pawn, Role, getRoleMapping } from 'core/game-state';
import { imgDir } from 'web/constants';

// -----------------------------------------------------------------------------

interface PawnProps extends Pawn {
    selected: boolean;
}

const component: FC<PawnProps> = props => {
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
export default component;

// -----------------------------------------------------------------------------

const colorOrder: Color[] = [0, 1, 2, 3];

const mapColorClass = {
    [Color.red]: 'bgc-red',
    [Color.green]: 'bgc-green',
    [Color.yellow]: 'bgc-yellow',
    [Color.blue]: 'bgc-blue',
};

const mapRoleIcon = {
    [Role.knight]: imgDir + 'knight.svg',
    [Role.queen]: imgDir + 'queen.svg',
    [Role.bishop]: imgDir + 'bishop.svg',
    [Role.rook]: imgDir + 'rook.svg',
};
