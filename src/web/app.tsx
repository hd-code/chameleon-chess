import React, { FC, useState } from 'react';

import { useAppState } from 'core/state';
import { View } from 'core/state/view';

import About from 'web/about';
import Game from 'web/game';
import Home from 'web/home';
import Setup from 'web/setup';
import Settings from 'web/settings';
import WebStorage from 'web/storage';

// -----------------------------------------------------------------------------

const component: FC<Record<string, never>> = () => {
    const appState = useAppState(WebStorage);

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

    const loadView = () => {
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
    };

    return (
        <div className='h-100 w-100 no-overflow flex center middle font-1 fz-140' ref={appContainer}>
            {loadView()}
        </div>
    );
};
export default component;
