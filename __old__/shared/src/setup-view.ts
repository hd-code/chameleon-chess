import { useState } from "react";

import {
  getDefaultPlayers,
  getNextPlayerType,
  Player,
  Players,
} from "../../logic/src/player";

// -----------------------------------------------------------------------------

export interface PlayersDispatcher {
  onClickPlayer: (player: Player) => void;
}

export function usePlayers(): [Players, PlayersDispatcher] {
  const [players, setPlayers] = useState(getDefaultPlayers);

  const onClickPlayer = (player: Player) => {
    const nextType = getNextPlayerType(players[player]);
    setPlayers({ ...players, [player]: nextType });
  };

  return [players, { onClickPlayer }];
}
