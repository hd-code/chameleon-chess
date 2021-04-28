import React, { FC } from "react";

import { Color, GameState, Players, getPlayersAlive } from "core/game";
import { img } from "web/assets";

import { LinkIcon } from "./link-icon";
import { PlayerCard } from "./player-card";

// -----------------------------------------------------------------------------

interface PlayersProps {
  gameState: GameState;
  goToHome: () => void;
  goToSettings: () => void;
  isPortrait: boolean;
  players: Players;
}

export const PlayerCards: FC<PlayersProps> = (props) => {
  const playersState = getPlayersAlive(props.gameState);
  return (
    <div className={props.isPortrait ? "mb-1 flex center middle" : "mr-1"}>
      <LinkIcon onClick={props.goToHome} src={img.home} />
      {players.map((player, i) => (
        <PlayerCard
          key={i}
          active={props.gameState.player === player}
          color={player}
          dead={!playersState[player]}
          type={props.players[player]}
        />
      ))}
      <LinkIcon onClick={props.goToSettings} src={img.settings} />
    </div>
  );
};

// -----------------------------------------------------------------------------

const players = [Color.red, Color.blue, Color.yellow, Color.green];
