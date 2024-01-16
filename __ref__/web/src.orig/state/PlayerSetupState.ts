import { Color } from "@chameleon-chess/logic";
import { useState } from "react";
import {
    PlayerSetup,
    getDefaultPlayerSetup,
    updatePlayerSetup,
} from "../domain/PlayerSetup";

// -----------------------------------------------------------------------------

export interface PlayerSetupState {
    readonly playerSetup: PlayerSetup;
    onClickPlayer: (player: Color) => void;
}

export function usePlayerSetupState(): PlayerSetupState {
    const [playerSetup, setPlayerSetup] = useState(getDefaultPlayerSetup);

    const onClickPlayer = (player: Color) => {
        const nextSetup = updatePlayerSetup(playerSetup, player);
        setPlayerSetup(nextSetup);
    };

    return { playerSetup, onClickPlayer };
}
