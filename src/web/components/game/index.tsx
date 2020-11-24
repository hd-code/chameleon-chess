import React from 'react';

import Board from './board';

import { GameState } from 'state/game';

// -----------------------------------------------------------------------------

interface GameProps extends GameState {
    // toView: ToView;
}

export default function Game(props: GameProps) {
    return <div style={{ maxWidth: '100vh', width: '100%'}}>
        <Board {...props} />
    </div>;
}