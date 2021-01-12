import React, { FC } from 'react';

import Board from './board';
import Logo from '../shared/logo';

import { GameState } from 'core/game';
import { ViewState } from 'core/view';

// -----------------------------------------------------------------------------

interface GameProps extends GameState, ViewState {}

const component: FC<GameProps> = (props) => {
    return <div className=''>
        <Logo />
        <div className='w-95v'>
            <Board {...props} />
        </div>
    </div>;
};

export default component;
