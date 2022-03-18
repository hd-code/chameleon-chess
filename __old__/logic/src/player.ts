import { Color, isColor } from "./color";
import type { Pawn } from "./pawn";
import { hasKey, isEnum } from "./type-guards";

// -----------------------------------------------------------------------------

/** An enum which represents the four different players. */
export type Player = Color;

/** TypeGuard for `Player` */
export function isPlayer(player: unknown): player is Player {
  return isColor(player);
}

/** Returns the next player on turn. Needs the already updated pawns to work. */
export function getNextPlayer(current: Player, pawns: Pawn[]): Player {
  const playersState = arePlayersAlive(pawns);
  let nextPlayer = mapPlayerToNext[current];
  while (!playersState[nextPlayer] && nextPlayer !== current) {
    nextPlayer = mapPlayerToNext[nextPlayer];
  }
  return nextPlayer;
}

/**
 * Checks whether the players are alive or already out. This function will check
 * all players at once.
 *
 * It returns an object, where the keys are the players and the values are of
 * boolean type. If the value is true, the corresponding player is still alive.
 * False means the player is out.
 */
export function arePlayersAlive(pawns: Pawn[]): {
  [player in Player]: boolean;
} {
  const result = {
    [Color.red]: false,
    [Color.green]: false,
    [Color.yellow]: false,
    [Color.blue]: false,
  };
  for (let i = 0, ie = pawns.length; i < ie; i++) {
    result[pawns[i].player] = true;
  }
  return result;
}

// -----------------------------------------------------------------------------

export enum PlayerType {
  none,
  human,
  computer,
}

export function isPlayerType(pt: unknown): pt is PlayerType {
  return isEnum(pt, PlayerType);
}

export function getNextPlayerType(current: PlayerType): PlayerType {
  return mapTypeToNext[current];
}

// -----------------------------------------------------------------------------

export type Players = { [player in Player]: PlayerType };

export function isPlayers(players: unknown): players is Players {
  return (
    hasKey<Players>(players, Color.red, isPlayerType) &&
    hasKey<Players>(players, Color.green, isPlayerType) &&
    hasKey<Players>(players, Color.yellow, isPlayerType) &&
    hasKey<Players>(players, Color.blue, isPlayerType)
  );
}

export function isEnoughPlayers(players: Players): boolean {
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

const mapPlayerToNext = {
  [Color.red]: Color.blue,
  [Color.green]: Color.red,
  [Color.yellow]: Color.green,
  [Color.blue]: Color.yellow,
};

const mapTypeToNext = {
  [PlayerType.none]: PlayerType.human,
  [PlayerType.human]: PlayerType.computer,
  [PlayerType.computer]: PlayerType.none,
};
