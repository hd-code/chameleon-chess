import * as React from "react";
import { Button, Logo } from "../components";
import { Color, GameState } from "@chameleon-chess/logic";

// -----------------------------------------------------------------------------

interface HomeScreenProps {
    game: {
        gameState: GameState;
    };
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ game }) => {
    return (
        <div className="flex flex-col">
            <Logo className="mb-1 fz-250" />

            <Button
                className="mb-1"
                color_={Color.red}
                disabled={game.gameState.isGameOver()}
                onClick={() => console.log("should go to GameScreen")}
            >
                Fortsetzen
            </Button>

            <Button
                className="mb-1"
                color_={Color.green}
                onClick={() => console.log("should go to GameSetupScreen")}
            >
                Neues Spiel
            </Button>

            <Button className="mb-1" color_={Color.yellow} disabled={true}>
                Tutorial
            </Button>

            <Button color_={Color.blue} onClick={() => console.log("should go to SettingsScreen")}>
                Einstellungen
            </Button>
        </div>
    );
};
