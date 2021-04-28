import { useState } from "react";

import { Color, Player } from "./game-state";

// -----------------------------------------------------------------------------

export enum PlayerType {
  none,
  human,
  computer,
}

export type PlayerConfig = { [player in Player]: PlayerType };

export function isValidPlayerConfig(config: PlayerConfig): boolean {
  let numOfPlayers = 0;
  config[Color.red] !== PlayerType.none && numOfPlayers++;
  config[Color.green] !== PlayerType.none && numOfPlayers++;
  config[Color.yellow] !== PlayerType.none && numOfPlayers++;
  config[Color.blue] !== PlayerType.none && numOfPlayers++;
  return numOfPlayers >= 2;
}

// -----------------------------------------------------------------------------

export interface PlayerConfigState {
  playerConfig: PlayerConfig;
  onClickPlayer: (player: Player) => void;
}

export function usePlayerConfig(): PlayerConfigState {
  const [playerConfig, setPlayerConfig] = useState(defaultPlayerConfig);

  const onClickPlayer = (player: Player) => {
    const currentType = playerConfig[player];

    const nextConfig = { ...playerConfig };
    nextConfig[player] = mapTypeToNext[currentType];

    setPlayerConfig(nextConfig);
  };

  return { playerConfig, onClickPlayer };
}

// -----------------------------------------------------------------------------

const defaultPlayerConfig: PlayerConfig = {
  [Color.red]: PlayerType.human,
  [Color.green]: PlayerType.none,
  [Color.yellow]: PlayerType.computer,
  [Color.blue]: PlayerType.none,
};

const mapTypeToNext = {
  [PlayerType.none]: PlayerType.human,
  [PlayerType.human]: PlayerType.computer,
  [PlayerType.computer]: PlayerType.none,
};
