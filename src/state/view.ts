import { useState } from 'react';

// -----------------------------------------------------------------------------

export enum View { home, setup, game, settings, about }

export interface ViewState {
    view: View;
    goTo: (view: View) => void;
}

export function useViewState(): ViewState {
    const [view, goTo] = useState(View.home);
    return { view, goTo };
}