import React, { FC, useEffect, useRef, useState } from 'react';

import { useAppState } from 'core/state';
import { View } from 'core/state/view';
import WebStorage from 'web/storage';

import About from './about';
import Game from './game';
import Home from './home';
import Setup from './setup';
import Settings from './settings';

// -----------------------------------------------------------------------------

const component: FC<Record<string, never>> = () => {
    const appState = useAppState(WebStorage);

    const ref = useRef(null);
    const [{ height, width }, setDimensions] = useState({ height: 0, width: 0 });
    useEffect(() => {
        const newHeight = ref?.current?.clientHeight ?? 0;
        const newWidth = ref?.current?.clientWidth ?? 0;
        if (newHeight !== height || newWidth !== width) {
            setDimensions({ height: newHeight, width: newWidth });
        }
    });

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
        <div className='h-100 w-100 flex center middle' ref={ref}>
            {loadView()}
        </div>
    );
};
export default component;
