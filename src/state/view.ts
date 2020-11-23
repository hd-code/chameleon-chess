import { useState } from 'react';

// -----------------------------------------------------------------------------

export enum View { home, gameSetup, game, settings }

export interface ViewState {
    view: View;
    goTo: (view: View) => void;
}

export function initViewState(): ViewState {
    const [view, goTo] = useState(View.home);
    return { view, goTo };
}