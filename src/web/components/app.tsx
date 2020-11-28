import React from 'react';

import About from './about';
import Game from './game';
import Home from './home';
import Setup from './setup';
import Settings from './settings';

import { useGameState } from 'state/game';
import { useSettingsState } from 'state/settings';
import { useViewState, View } from 'state/view';
import WebStorage from 'web/storage';

// -----------------------------------------------------------------------------

export default function App(): JSX.Element {
    const gameState = useGameState(WebStorage);
    const settingsState = useSettingsState(WebStorage);
    const viewState = useViewState();

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
                return <Setup />;

            case View.settings:
                return <Settings />;
        }
    }
}