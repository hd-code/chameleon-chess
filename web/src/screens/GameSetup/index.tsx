import { AILevel, Color } from "chameleon-chess-logic";
import * as React from "react";

import { Button, Link, SelectButtons, Text } from "../../components";
import { isValidPlayerSetup } from "../../domain/PlayerSetup";
import { GameState } from "../../state/GameState";
import { usePlayerSetupState } from "../../state/PlayerSetupState";
import { Screen, ScreenState } from "../../state/ScreenState";

import { PlayerConfig } from "./PlayerConfig";

// -----------------------------------------------------------------------------

interface GameSetupScreenProps extends GameState, ScreenState {}

export const GameSetupScreen: React.FC<GameSetupScreenProps> = ({
    beginGame,
    goBack,
    goTo,
}) => {
    const playerSetupState = usePlayerSetupState();
    const [aiLevel, setAILevel] = React.useState(AILevel.normal);

    const onBeginGame = () => {
        if (beginGame(playerSetupState.playerSetup, aiLevel)) {
            goTo(Screen.game);
        }
    };

    return (
        <div className="text-center scroll-y">
            <Text className="c-white fz-120 text-border" tag="h1">
                Ein neues Spiel starten
            </Text>

            <PlayerConfig className="my-3" {...playerSetupState} />

            <Button
                color={Color.green}
                disabled={!isValidPlayerSetup(playerSetupState.playerSetup)}
                onClick={onBeginGame}
            >
                Spiel beginnen
            </Button>

            <p className="c-white fz-80 my-3 text-border">
                Klicke auf die Flächen, um die teilnehmenden <br /> Spieler zu
                konfigurieren.
            </p>

            <div className="fz-80 flex flex-col flex-y-center">
                <Text tag="h2" className="c-white text-border mb-1">
                    KI-Schwierigkeit:
                </Text>
                <SelectButtons
                    onSelect={setAILevel}
                    options={aiLevelOptions}
                    selected={aiLevel}
                />
            </div>

            <Link className="block mt-2" onClick={goBack}>
                zurück
            </Link>
        </div>
    );
};

const aiLevelOptions = [
    { value: AILevel.easy, label: "leicht" },
    { value: AILevel.normal, label: "mittel" },
    { value: AILevel.hard, label: "schwer" },
];
