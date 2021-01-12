import React, { FC } from 'react';

import { FieldColor, Pawn, Role, getRoleMapping } from 'core/game-state';
import { imgDir } from 'web/constants';

// -----------------------------------------------------------------------------

interface PawnProps extends Pawn {
    key?: string;
    selected: boolean;
}

const component: FC<PawnProps> = (props) => {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    const offset = { left: props.position.col * 12.5 + '%', top: props.position.row * 12.5 + '%' };
    const roleMap = getRoleMapping(props);
    return <div key={props.key} className='hw-12 flex center middle absolute' style={offset}>
        <div className={'hw-80 rounded shadow flex center middle ' + mapColorClass[props.player]
                      + (props.selected ? ' overlay-bright' : '')}
        >
            <div className='hw-80 flex wrap'>
                {colorOrder.map(color => <div key={color} className={'hw-50 ' + mapColorClass[color]}>
                    <img src={mapRoleIcon[roleMap[color]]} className='hw-100' />
                </div>)}
            </div>
        </div>
    </div>;
};

export default component;

// -----------------------------------------------------------------------------

const colorOrder: FieldColor[] = [0, 1, 2, 3];

const mapColorClass = {
    [FieldColor.red]: 'bgc-red',
    [FieldColor.green]: 'bgc-green',
    [FieldColor.yellow]: 'bgc-yellow',
    [FieldColor.blue]: 'bgc-blue',
};

const mapRoleIcon = {
    [Role.knight]: imgDir + 'knight.svg',
    [Role.queen]: imgDir + 'queen.svg',
    [Role.bishop]: imgDir + 'bishop.svg',
    [Role.rook]: imgDir + 'rook.svg',
};
