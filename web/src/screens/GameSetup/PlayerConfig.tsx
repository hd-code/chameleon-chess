import { Color } from "chameleon-chess-logic";
import * as React from "react";

import { PlayerSetupState } from "../../state/PlayerSetupState";

import { PlayerCard } from "./PlayerCard";

// -----------------------------------------------------------------------------

interface PlayerConfigProps extends PlayerSetupState {
    className?: string;
}

export const PlayerConfig: React.FC<PlayerConfigProps> = ({
    className = "",
    playerSetup,
    onClickPlayer,
}) => {
    const getProps = (playerColor: Color) => ({
        color: playerColor,
        type: playerSetup[playerColor],
        onClick: () => onClickPlayer(playerColor),
    });
    return (
        <div className={`flex flex-y-center ${className}`}>
            <PlayerCard {...getProps(Color.blue)} />

            <div className="mx-2">
                <PlayerCard {...getProps(Color.yellow)} className="mb-4" />
                <PlayerCard {...getProps(Color.red)} />
            </div>

            <PlayerCard {...getProps(Color.green)} />
        </div>
    );
};
