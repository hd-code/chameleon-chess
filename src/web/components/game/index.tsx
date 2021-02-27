import React, { FC } from 'react';

import { AppState } from 'core/state';

import Board from './board';
import Logo from '../shared/logo';

// -----------------------------------------------------------------------------

interface GameProps extends AppState {
    height: number;
    width: number;
}

const component: FC<GameProps> = (props) => {
    const boardWidth = Math.min(props.height, props.width);
    return <div className='h-100 w-100 flex wrap justify'>
        <Logo />
        <Board {...props} width={boardWidth} />
    </div>;
};
export default component;
