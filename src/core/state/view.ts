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
    return {
        view,
        goTo: {
            about: () => setView(View.about),
            game: () => setView(View.game),
            home: () => setView(View.home),
            settings: () => setView(View.settings),
            setup: () => setView(View.setup),
        },
    };
}
