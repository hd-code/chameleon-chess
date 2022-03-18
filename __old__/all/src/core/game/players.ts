import { Color, isColor } from "./color";

// -----------------------------------------------------------------------------

/** An enum which represents the four different players. */
export type Player = Color;

/** TypeGuard for `Player` */
export function isPlayer(player: unknown): player is Player {
  return isColor(player);
}

// -----------------------------------------------------------------------------

export enum PlayerType {
  none,
  human,
  computer,
}

export function getNextPlayerType(current: PlayerType): PlayerType {
  return mapTypeToNext[current];
}

// -----------------------------------------------------------------------------

export type Players = { [player in Player]: PlayerType };

export function isPlayers(players: Players): boolean {
  let numOfPlayers = 0;
  Object.values(players).forEach(
    (player) => player !== PlayerType.none && ++numOfPlayers,
  );
  return numOfPlayers >= 2;
}

export function getDefaultPlayers(): Players {
  return {
    [Color.red]: PlayerType.human,
    [Color.green]: PlayerType.none,
    [Color.yellow]: PlayerType.computer,
    [Color.blue]: PlayerType.none,
  };
}

// -----------------------------------------------------------------------------

const mapTypeToNext = {
  [PlayerType.none]: PlayerType.human,
  [PlayerType.human]: PlayerType.computer,
  [PlayerType.computer]: PlayerType.none,
};
