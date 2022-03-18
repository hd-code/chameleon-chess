import { useState } from "react";

import { getDefaultPlayers, getNextPlayerType, Player, Players } from "./game";

// -----------------------------------------------------------------------------

export interface PlayersState {
  players: Players;
  onClickPlayer: (player: Player) => void;
}

export function usePlayers(): PlayersState {
  const [players, setPlayers] = useState(getDefaultPlayers);

  const onClickPlayer = (player: Player) => {
    const nextType = getNextPlayerType(players[player]);
    setPlayers({ ...players, [player]: nextType });
  };

  return { players, onClickPlayer };
}
