import { Button, Link, SelectButtons, Text } from "components";
import * as React from "react";
import { usePlayersState } from "state/PlayersState";
import { ScreenState } from "state/ScreenState";
import { PlayerConfig } from "./PlayerConfig";

// -----------------------------------------------------------------------------

interface GameSetupScreenProps {
    screenState: ScreenState;
}

export const GameSetupScreen: React.FC<GameSetupScreenProps> = ({
    screenState,
}) => {
    const playersState = usePlayersState();
    return (
        <div className="text-center scroll-y">
            <Text className="c-white fz-120 text-border" tag="h1">
                Ein neues Spiel starten
            </Text>

            <PlayerConfig className="my-3" {...playersState} />

            <Button color={1} disabled={!false} onClick={() => {}}>
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
                    onSelect={() => {}}
                    options={["leicht", "mittel", "schwer"]}
                    selected="schwer"
                />
            </div>

            <Link className="block mt-2" onClick={screenState.goBack}>
                zurück
            </Link>
        </div>
    );
};
