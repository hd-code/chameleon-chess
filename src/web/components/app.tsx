import React from 'react';

import About from './about';
import Game from './game';
import Home from './home';
import Setup from './setup';
import Settings from './settings';

import { useGame } from 'state/game';
import { useSettings } from 'state/settings';
import { View, useView } from 'state/view';
import WebStorage from 'web/storage';

// -----------------------------------------------------------------------------

export default function App(): JSX.Element {
    const gameState = useGame(WebStorage);
    const settingsState = useSettings(WebStorage);
    const viewState = useView();

    return <div className='hw-100 flex center middle'>{loadView()}</div>;

    function loadView() {
        switch (viewState.view) {
        case View.about:
            return <About />;

        case View.game:
            return <Game {...gameState} />;

        case View.home:
            return <Home {...{...gameState, ...viewState}} />;

        case View.setup:
            return <Setup game={gameState.game} />;

        case View.settings:
            return <Settings />;
        }
    }
}