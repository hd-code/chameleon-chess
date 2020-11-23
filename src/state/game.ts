import { useState } from 'react';

import Storage from '../storage';

// -----------------------------------------------------------------------------

export interface GameState {
    game: any;
}

export function initGameState(storage: Storage): GameState {
    const [game, setGame] = useState(null);

    storage.read<any>(storageKey)
        .then(data => setGame(data))
        .catch(console.info);

    return {
        game
    };
}

// -----------------------------------------------------------------------------

const storageKey = 'game';