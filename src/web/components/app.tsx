import React from 'react';

import Game from './game';

import { initGameState } from 'state/game';
import WebStorage from 'web/storage';

// -----------------------------------------------------------------------------

export default function App(): JSX.Element {
    const gameState = initGameState(WebStorage);
    return <Game {...gameState} />;
}