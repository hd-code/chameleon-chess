import { useState } from 'react';

// -----------------------------------------------------------------------------

export enum View {
    home, setup, game, settings, about,
}

export interface ViewState {
    view: View;
    goTo: (view: View) => void;
}

export function useView(): ViewState {
    const [view, goTo] = useState(View.home);
    return { view, goTo };
}
