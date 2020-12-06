import React from 'react';

import Board from './board';
import Logo from '../shared/logo';

import { GameState } from 'state/game';

// -----------------------------------------------------------------------------

type GameProps = GameState

export default function Game(props: GameProps): JSX.Element {
    return <div className=''>
        <Logo />
        <div className='w-95v'>
            <Board {...props} />
        </div>
    </div>;
}