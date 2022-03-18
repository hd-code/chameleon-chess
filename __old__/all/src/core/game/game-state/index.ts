import { hasKey, isArray } from "core/type-guards";

import {
  Position,
  isInPositions,
  isSamePosition,
  sortPositions,
} from "../board";
import { Color } from "../color";
import {
  Limits,
  getStartLimits,
  isLimits,
  isSmallestLimits,
  isWithinLimits,
  updateLimits,
} from "./limits";
import {
  Pawn,
  getPawnIndexAtPosition,
  getPawnMoves,
  getPawnRole,
  getStartPawns,
  isPawn,
} from "./pawn";
import { Player, isPlayer } from "../players";
import { arePlayersAlive, getNextPlayer } from "./players";
import { Role } from "./roles";

// -----------------------------------------------------------------------------

/**
 * This is the main data structure for playing a game of chameleon chess.
 * It represents the current state of the game with all needed information.
 *
 * It holds the following properties:
 * - `limits`: specify the current size of the game board (see {@link Limits})
 * - `pawns`:  an array with all the pawns that are still in play/alive (see {@link Pawn})
 * - `player`: the player who is currently on turn (see {@link Player})
 *
 * All other information about the current game, can be derived from this game
 * state object.
 *
 * _Important_: Only living pawns are stored in the pawns array. If a pawn is
 * beaten, it gets removed from that array.
 */
export interface GameState {
  /** Specify the current size of the game board. */
  limits: Limits;
  /** An array with all the pawns that are still in play (alive). */
  pawns: Pawn[];
  /** The player who is currently on turn. */
  player: Player;
}

/**
 * Type guard for `GameState`.
 *
 * It checks all the keys and types of the object. It will also perform further
 * checks to confirm the validity of the game state, that go beyond simple type
 * checking.
 *
 * E.g. if there are several pawns on the same field (which is not possible
 * according to the game rules), this function will return false, as well.
 */
export function isGameState(gs: unknown): gs is GameState {
  return (
    hasKey<GameState>(gs, "limits", isLimits) &&
    hasKey<GameState>(gs, "pawns") &&
    hasKey<GameState>(gs, "player", isPlayer) &&
    isArray(gs.pawns, isPawn) &&
    noPawnsOutsideOfLimits(gs) &&
    noPawnsOnSameField(gs) &&
    arePlayersAlive(gs.pawns)[gs.player]
  );
}

/**
 * Checks whether the players are alive or already out. This function will check
 * all players at once.
 *
 * It returns an object, where the keys are the players and the values are of
 * boolean type. If the value is true, the corresponding player is still alive.
 * False means the player is out.
 */
export function getPlayersAlive(
  gameState: GameState,
): { [player in Player]: boolean } {
  return arePlayersAlive(gameState.pawns);
}

/** This is for the AI. It returns all possible game states that could succeed
 * the current one. Ergo, it returns the resulting game states for all moves
 * that can be made in the current game state. The AI now has to choose
 * intelligently, which game state to select to continue. */
export function getNextGameStates(gs: GameState): GameState[] {
  const result: GameState[] = [];
  for (let i = 0, ie = gs.pawns.length; i < ie; i++) {
    if (gs.pawns[i].player !== gs.player) {
      continue;
    }
    const moves = getPawnMoves(i, gs.pawns, gs.limits);
    for (let j = 0, je = moves.length; j < je; j++) {
      result.push(updateGameState(gs, i, moves[j]));
    }
  }
  return result;
}

/**
 * Starts a new game and returns the corresponding game state.
 *
 * Up to four players can play in a game. Players are linked to a color. So
 * there is a red, green, yellow and a blue player. For each player a boolean
 * is passed as a parameter to indicate if this player takes part in the game or
 * not. (true means the player takes part in the game)
 *
 * A minimum of two players are required for a game. If too few players were
 * provided in the params, this function will return null as no game can be
 * played anyway.
 *
 * @param red    If set to true, the red    player takes part in this game.
 * @param green  If set to true, the green  player takes part in this game.
 * @param yellow If set to true, the yellow player takes part in this game.
 * @param blue   If set to true, the blue   player takes part in this game.
 * @returns the game state of the newly started game or null if there were less than two players
 */
export function getStartGameState(
  red: boolean,
  green: boolean,
  yellow: boolean,
  blue: boolean,
): GameState | null {
  const pawns = [];
  red && pawns.push(...getStartPawns(0));
  green && pawns.push(...getStartPawns(1));
  yellow && pawns.push(...getStartPawns(2));
  blue && pawns.push(...getStartPawns(3));

  if (pawns.length <= 4) {
    return null;
  }

  const limits = updateLimits(pawns, getStartLimits());
  const player = getNextPlayer(Color.green, pawns);

  return { limits, pawns, player };
}

/** Returns true if the given game is already over, false if not. */
export function isGameOver(gs: GameState): boolean {
  const player = gs.pawns[0]?.player;
  for (let i = 1, ie = gs.pawns.length; i < ie; i++) {
    if (player !== gs.pawns[i].player) {
      return false;
    }
  }
  return true;
}

/**
 * Advances the game by one turn. It moves the pawn to the destination and
 * returns the updated game state. If anything is wrong, it returns `null`.
 *
 * Possible errors:
 * - the game is already over
 * - the pawn does not exist or does not belong to the player whose turn it is
 * - destination is not reachable by the pawn
 *
 * @param gs the current game state
 * @param pawnI the index of the pawn to be moved in the array
 * @param destination the position where the pawn should be moved to
 * @returns the updated game state or null if the move could not be made
 */
export function makeMove(
  gs: GameState,
  pawnI: number,
  destination: Position,
): GameState | null {
  if (gs.player !== gs.pawns[pawnI]?.player) {
    return null;
  }

  const moves = getPawnMoves(pawnI, gs.pawns, gs.limits);
  if (!moves.length || !isInPositions(destination, moves)) {
    return null;
  }

  return updateGameState(gs, pawnI, destination);
}

// -----------------------------------------------------------------------------

function noPawnsOutsideOfLimits({ pawns, limits }: GameState): boolean {
  for (let i = 0, ie = pawns.length; i < ie; i++) {
    if (!isWithinLimits(pawns[i].position, limits)) {
      return false;
    }
  }
  return true;
}

function noPawnsOnSameField({ pawns }: GameState): boolean {
  const positions = pawns.map((pawn) => pawn.position);
  positions.sort(sortPositions);

  for (let i = 1, ie = positions.length; i < ie; i++) {
    if (isSamePosition(positions[i - 1], positions[i])) {
      return false;
    }
  }
  return true;
}

/** Not validity check! Just makes the move. */
function updateGameState(
  gs: GameState,
  pawnI: number,
  destination: Position,
): GameState {
  const beatenPawnI = getPawnIndexAtPosition(destination, gs.pawns);
  const pawns = gs.pawns.map((pawn) => ({ ...pawn }));
  pawns[pawnI].position = destination;
  if (beatenPawnI >= 0) {
    pawns.splice(beatenPawnI, 1);
  }

  const limits = updateLimits(pawns, gs.limits);
  if (isSmallestLimits(limits)) {
    const centerPos = { row: limits.minRow + 1, col: limits.minCol + 1 };
    const centerPawnI = getPawnIndexAtPosition(centerPos, pawns);
    if (centerPawnI >= 0) {
      const role = getPawnRole(pawns[centerPawnI]);
      if (
        role === Role.knight &&
        !isGameOver({ limits, pawns, player: gs.player })
      ) {
        pawns.splice(centerPawnI, 1);
      }
    }
  }

  const player = getNextPlayer(gs.player, pawns);

  return { limits, pawns, player };
}
