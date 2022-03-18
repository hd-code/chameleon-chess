import { Color, PlayerColor } from "chameleon-chess-logic";
import * as React from "react";
import { PlayersState } from "state/PlayersState";
import { PlayerCard } from "./PlayerCard";

// -----------------------------------------------------------------------------

interface PlayerConfigProps extends PlayersState {
    className?: string;
}

export const PlayerConfig: React.FC<PlayerConfigProps> = ({
    className = "",
    players,
    onClickPlayer,
}) => {
    const getProps = (playerColor: PlayerColor) => ({
        color: playerColor,
        type: players[playerColor],
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
