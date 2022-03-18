import { Color } from "../color";
import { Player } from "../players";
import { Pawn } from "./pawn";

// -----------------------------------------------------------------------------

/**
 * Checks whether the players are alive or already out. This function will check
 * all players at once.
 *
 * It returns an object, where the keys are the players and the values are of
 * boolean type. If the value is true, the corresponding player is still alive.
 * False means the player is out.
 */
export function arePlayersAlive(
  pawns: Pawn[],
): { [player in Player]: boolean } {
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

/** Returns the next player on turn. Needs the already updated pawns to work. */
export function getNextPlayer(current: Player, pawns: Pawn[]): Player {
  const playersState = arePlayersAlive(pawns);
  let nextPlayer = mapPlayerToNext[current];
  while (!playersState[nextPlayer] && nextPlayer !== current) {
    nextPlayer = mapPlayerToNext[nextPlayer];
  }
  return nextPlayer;
}

// -----------------------------------------------------------------------------

const mapPlayerToNext = {
  [Color.red]: Color.blue,
  [Color.green]: Color.red,
  [Color.yellow]: Color.green,
  [Color.blue]: Color.yellow,
};
