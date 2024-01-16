import * as React from "react";

// -----------------------------------------------------------------------------

export enum Screen {
    home = "home",
    game = "game",
    gameSetup = "game-setup",
    settings = "settings",
}

export interface ScreenState {
    readonly screen: Screen;
    goTo: (screen: Screen) => void;
    goBack: () => void;
}

export function useScreenState(
    init: Screen = Screen.home,
    historyLimit = 5,
): ScreenState {
    const [screens, setScreens] = React.useState([init]);

    const goTo = (screen: Screen) =>
        setScreens([...screens.slice(-historyLimit + 1), screen]);

    const goBack = () =>
        setScreens(screens.length === 1 ? screens : screens.slice(0, -1));

    return { screen: screens[screens.length - 1], goTo, goBack };
}
