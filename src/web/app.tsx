import React, { FC, useState } from 'react';

import { AppState, useAppState } from 'core/state';
import { View } from 'core/state/view';
import Storage from 'web/storage';
import { About } from 'web/views/about';
import { Game } from 'web/views/game';
import { Home } from 'web/views/home';
import { Setup } from 'web/views/setup';
import { Settings } from 'web/views/settings';

// -----------------------------------------------------------------------------

export const App: FC = () => {
    const appState = useAppState(Storage);

    const [{ height, width }, setDimensions] = useState({ height: 0, width: 0 });
    const appContainer = (div: HTMLDivElement | null) => {
        if (div) {
            const newHeight = div.clientHeight;
            const newWidth = div.clientWidth;
            if (newHeight !== height || newWidth !== width) {
                setDimensions({ height: newHeight, width: newWidth });
            }
        }
    };

    console.log('App render is called');

    return (
        <div className='hw-100 no-overflow flex center middle font-1 fz-140' ref={appContainer}>
            {loadView(appState, height, width)}
        </div>
    );
};

// -----------------------------------------------------------------------------

function loadView(appState: AppState, height: number, width: number) {
    switch (appState.view) {
        case View.about:
            return <About {...appState} />;

        case View.game:
            return <Game {...appState} height={height} width={width} />;

        case View.home:
            return <Home {...appState} />;

        case View.setup:
            return <Setup {...appState} />;

        case View.settings:
            return <Settings {...appState} />;
    }
}
