import { Color, GameState, getPlayersAlive } from "chameleon-chess-logic";
import * as React from "react";

import { Assets } from "../../Assets";
import { PlayerSetup } from "../../domain/PlayerSetup";

import { LinkIcon } from "./LinkIcon";
import { PlayerCard } from "./PlayerCard";

// -----------------------------------------------------------------------------

interface PlayersProps {
    gameState: GameState;
    goToHome: () => void;
    goToSettings: () => void;
    isPortrait: boolean;
    players: PlayerSetup;
}

export const PlayerCards: React.FC<PlayersProps> = (props) => {
    const playersState = getPlayersAlive(props.gameState);
    return (
        <div
            className={
                props.isPortrait
                    ? "mb-1 flex flex-x-center flex-y-center"
                    : "mr-1"
            }
        >
            <LinkIcon onClick={props.goToHome} src={Assets.img.home} />
            {players.map((player, i) => (
                <PlayerCard
                    key={i}
                    active={props.gameState.player === player}
                    color={player}
                    dead={!playersState[player]}
                    type={props.players[player]}
                />
            ))}
            <LinkIcon onClick={props.goToSettings} src={Assets.img.settings} />
        </div>
    );
};

// -----------------------------------------------------------------------------

const players = [Color.red, Color.blue, Color.yellow, Color.green];
