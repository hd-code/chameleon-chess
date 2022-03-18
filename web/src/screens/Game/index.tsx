import { Link } from "components";
import * as React from "react";
import { ScreenState } from "state/ScreenState";

// -----------------------------------------------------------------------------

interface GameScreenProps {
    screenState: ScreenState;
}

export const GameScreen: React.FC<GameScreenProps> = ({ screenState }) => {
    return (
        <div className="text-center">
            <p className="c-white text-border mb-1">
                Spiel fortsetzen ist noch nicht verfügbar.
            </p>
            <Link onClick={() => screenState.goBack()}>zurück</Link>
        </div>
    );
};
