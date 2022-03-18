import { Platform, UIManager } from 'react-native';

import { render } from '../render';

import { EView, INavigation } from '../models/view';

// -----------------------------------------------------------------------------

/** Get the view, that should currently be displayed. */
export function getView() {
    return view;
}

/** Get the navigation functions to go to different views. */
export function getNavigation() {
    return navigate;
}

// -----------------------------------------------------------------------------

const navigate: INavigation = {
    home: () => {
        // FIXME: Android Bug --------------------------------------------------
        // On Android devices LayoutAnimation is a somewhat experimental feature.
        // It so happens, that the app crashes, when going from game to home
        // view. I will try to isolate the problem and report the bug to react-native.
        // There are several issues on similar errors, but it seems hard for the
        // react-native team to pin-point where the error is coming from.
        // This is workaround, that solves the issue for the time being.
        if (view === EView.GAME && Platform.OS === 'android') {
            if (UIManager.setLayoutAnimationEnabledExperimental) {
                UIManager.setLayoutAnimationEnabledExperimental(false);
                setTimeout(() => {
                    UIManager.setLayoutAnimationEnabledExperimental(true);
                }, 100);
            }
        }
        // ---------------------------------------------------------------------

        changeView(EView.HOME);

    },
    game: () => changeView(EView.GAME),
    gameConfig: () => changeView(EView.GAME_CONFIG),
    settings: () => changeView(EView.SETTINGS),
};

const defaultView = EView.HOME;

let view = defaultView;

function changeView(newView: EView) {
    view = newView;
    render();
}