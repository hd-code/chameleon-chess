import React from 'react';

import Board from './board';

import { GameState } from 'state/game';

// -----------------------------------------------------------------------------

type GameProps = GameState

export default function Game(props: GameProps) {
    return <div style={{ maxWidth: '100vh', width: '100%'}}>
        <Board {...props} />
    </div>;
}