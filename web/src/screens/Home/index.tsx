import { Color, isGameOver } from "chameleon-chess-logic";
import * as React from "react";

import { Button, Logo } from "../../components";
import { GameState } from "../../state/GameState";
import { Screen, ScreenState } from "../../state/ScreenState";

// -----------------------------------------------------------------------------

interface HomeScreenProps extends GameState, ScreenState {}

export const HomeScreen: React.FC<HomeScreenProps> = ({ game, goTo }) => {
    return (
        <div className="flex flex-col">
            <Logo className="mb-1 fz-250" />

            <Button
                className="mb-1"
                color={Color.red}
                disabled={isGameOver(game.gameState)}
                onClick={() => goTo(Screen.game)}
            >
                Fortsetzen
            </Button>

            <Button
                className="mb-1"
                color={Color.green}
                onClick={() => goTo(Screen.gameSetup)}
            >
                Neues Spiel
            </Button>

            <Button className="mb-1" color={Color.yellow} disabled={true}>
                Tutorial
            </Button>

            <Button color={Color.blue} onClick={() => goTo(Screen.settings)}>
                Einstellungen
            </Button>
        </div>
    );
};
