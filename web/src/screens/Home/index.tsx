import { Color } from "chameleon-chess-logic";
import { Button, Logo } from "components";
import * as React from "react";
import { Screen, ScreenState } from "state/ScreenState";

// -----------------------------------------------------------------------------

interface HomeScreenProps {
    screenState: ScreenState;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ screenState }) => {
    return (
        <div className="flex flex-col">
            <Logo className="mb-1 fz-250" />

            <Button
                className="mb-1"
                color={Color.red}
                disabled={false}
                onClick={() => screenState.goTo(Screen.game)}
            >
                Fortsetzen
            </Button>

            <Button
                className="mb-1"
                color={Color.green}
                onClick={() => screenState.goTo(Screen.gameSetup)}
            >
                Neues Spiel
            </Button>

            <Button className="mb-1" color={Color.yellow} disabled={true}>
                Tutorial
            </Button>

            <Button
                color={Color.blue}
                onClick={() => screenState.goTo(Screen.settings)}
            >
                Einstellungen
            </Button>
        </div>
    );
};
