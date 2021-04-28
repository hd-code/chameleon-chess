import React, { FC } from "react";

import { Color, Player } from "core/game";
import { PlayersState } from "core/setup-view";

import { PlayerCard } from "./player-card";

// -----------------------------------------------------------------------------

export const PlayerConfig: FC<PlayersState> = ({ players, onClickPlayer }) => {
  const getProps = (player: Player) => ({
    color: player,
    type: players[player],
    onClick: () => onClickPlayer(player),
  });
  return (
    <div className="my-2 flex center middle">
      <div className={"flex middle"}>
        <div className="grow">
          <PlayerCard {...getProps(Color.blue)} />
        </div>

        <div className="grow mx-1">
          <PlayerCard {...getProps(Color.yellow)} className="mb-4" />
          <PlayerCard {...getProps(Color.red)} />
        </div>

        <div className="grow">
          <PlayerCard {...getProps(Color.green)} />
        </div>
      </div>
    </div>
  );
};
