import React from 'react';

import About from './about';
import Game from './game';
import Home from './home';
import Setup from './setup';
import Settings from './settings';

import WebStorage from 'web/storage';

import { useGame } from 'core/game';
import { useSettings } from 'core/settings';
import { View, useView } from 'core/view';

// -----------------------------------------------------------------------------

export default function App(): JSX.Element {
    const gameState = useGame(WebStorage);
    const settingsState = useSettings(WebStorage);
    const viewState = useView();

    const states = { ...gameState, ...viewState };

    return <div className='hw-100 flex center middle'>{loadView()}</div>;

    function loadView() {
        switch (viewState.view) {
        case View.about:
            return <About />;

        case View.game:
            return <Game {...states} />;

        case View.home:
            return <Home {...states} />;

        case View.setup:
            return <Setup game={gameState.game} />;

        case View.settings:
            return <Settings />;
        }
    }
}