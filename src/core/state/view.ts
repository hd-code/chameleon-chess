import { useState } from 'react';

// -----------------------------------------------------------------------------

export enum View {
    about,
    game,
    home,
    settings,
    setup,
}

export interface ViewState {
    view: View;
    goBack: () => void;
    goTo: {
        about: () => void;
        game: () => void;
        home: () => void;
        settings: () => void;
        setup: () => void;
    };
}

export function useView(): ViewState {
    const [view, setView] = useState(View.home);
    const updateView = (nextView: View) => {
        previous = view;
        setView(nextView);
    };

    const goBack = () => {
        setView(previous);
        previous = defaultView;
    };

    return {
        view,
        goBack,
        goTo: {
            about: () => updateView(View.about),
            game: () => updateView(View.game),
            home: () => updateView(View.home),
            settings: () => updateView(View.settings),
            setup: () => updateView(View.setup),
        },
    };
}

// -----------------------------------------------------------------------------

const defaultView = View.home;
let previous = defaultView;
