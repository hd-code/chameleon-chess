import { hasKey } from "core/type-guards";

import {
  FieldColor,
  Position,
  getFieldColor,
  isFieldColor,
  isPosition,
  isSamePosition,
} from "../board";
import { Color } from "../color";
import { Limits, isWithinLimits } from "./limits";
import { Player, isPlayer } from "../players";
import { Role, Roles, getRole, getRoles } from "./roles";

// -----------------------------------------------------------------------------

/**
 * This data structure represents a pawn. Each player has four of these initially.
 *
 * A pawn has the following properties:
 * - `knightColor`: the field color, where this pawn has the role `knight` (see {@link Role})
 * - `player`: the player this pawn belongs to (see {@link Player})
 * - `position`: the current position of the pawn on the game board (see {@link Position})
 *
 * The pawns are stored in the game state (see {@link GameState}). However, only
 * alive pawns are stored there. So, if a pawn is beaten, it will be removed
 * from that array. Therefore, pawns do **not** have an `alive`-flag or
 * something similar.
 */
export interface Pawn {
  /** the field color, where this pawn has the role `knight` */
  knightColor: FieldColor;
  /** the player this pawn belongs to */
  player: Player;
  /** the current position of the pawn on the game board */
  position: Position;
}

/** TypeGuard for `Pawn` */
export function isPawn(pawn: unknown): pawn is Pawn {
  return (
    hasKey(pawn, "knightColor", isFieldColor) &&
    hasKey(pawn, "player", isPlayer) &&
    hasKey(pawn, "position", isPosition)
  );
}

/**
 * Returns all the moves a pawn could do. Moves are an array of {@link Position}'s,
 * which represent the fields this pawn could reach currently.
 *
 * If an invalid index is given, this function returns an empty array.
 *
 * @param pawnI the index of the pawn in `pawns`
 * @param pawns an array of {@link Pawn}s
 * @param limits the current limits of the game
 * @returns an array of positions that the pawn could go to
 */
export function getPawnMoves(
  pawnI: number,
  pawns: Pawn[],
  limits: Limits,
): Position[] {
  switch (getPawnRole(pawns[pawnI])) {
    case Role.knight:
      return getKnightMoves(pawnI, pawns, limits);

    case Role.queen:
      return getBishopMoves(pawnI, pawns, limits).concat(
        getRookMoves(pawnI, pawns, limits),
      );

    case Role.bishop:
      return getBishopMoves(pawnI, pawns, limits);

    case Role.rook:
      return getRookMoves(pawnI, pawns, limits);
  }
}

/** Returns -1 if no pawn is at that position. */
export function getPawnIndexAtPosition(
  position: Position,
  pawns: Pawn[],
): number {
  for (let i = 0, ie = pawns.length; i < ie; i++) {
    if (isSamePosition(position, pawns[i].position)) {
      return i;
    }
  }
  return -1;
}

/** Returns the role the pawn has on it's current field. */
export function getPawnRole(pawn: Pawn): Role {
  const fieldColor = getFieldColor(pawn.position);
  return getRole(pawn.knightColor, fieldColor);
}

/** Returns an object that maps the four field colors to a corresponding chess
 * role. This mapping is dependent on a pawns knight role. There four different
 * mappings that can occur. */
export function getPawnRoles(pawn: Pawn): Roles {
  return getRoles(pawn.knightColor);
}

/** Returns the initial pawns for a given player. */
export function getStartPawns(player: Player): Pawn[] {
  return createPawns(player);
}

// -----------------------------------------------------------------------------

function createPawns(player: Player): Pawn[] {
  switch (player) {
    case Color.red:
      return [
        createPawn(player, 7, 0, Color.red),
        createPawn(player, 7, 1, Color.green),
        createPawn(player, 7, 2, Color.yellow),
        createPawn(player, 7, 3, Color.blue),
      ];
    case Color.green:
      return [
        createPawn(player, 7, 7, Color.green),
        createPawn(player, 6, 7, Color.yellow),
        createPawn(player, 5, 7, Color.blue),
        createPawn(player, 4, 7, Color.red),
      ];
    case Color.yellow:
      return [
        createPawn(player, 0, 7, Color.yellow),
        createPawn(player, 0, 6, Color.blue),
        createPawn(player, 0, 5, Color.red),
        createPawn(player, 0, 4, Color.green),
      ];
    case Color.blue:
      return [
        createPawn(player, 0, 0, Color.blue),
        createPawn(player, 1, 0, Color.red),
        createPawn(player, 2, 0, Color.green),
        createPawn(player, 3, 0, Color.yellow),
      ];
  }
}

function createPawn(
  player: Player,
  row: number,
  col: number,
  knightColor: Color,
): Pawn {
  return { knightColor, player, position: { row, col } };
}

// -----------------------------------------------------------------------------

function getKnightMoves(
  pawnI: number,
  pawns: Pawn[],
  limits: Limits,
): Position[] {
  const currentPos: Position = pawns[pawnI].position;

  const offsets: Position[] = [
    { row: 2, col: 1 },
    { row: 1, col: 2 },
    { row: -2, col: 1 },
    { row: -1, col: 2 },
    { row: 2, col: -1 },
    { row: 1, col: -2 },
    { row: -2, col: -1 },
    { row: -1, col: -2 },
  ];

  const result = offsets.map((offset) => ({
    row: currentPos.row + offset.row,
    col: currentPos.col + offset.col,
  }));

  // only return move if it is not INVALID
  return result.filter((position) =>
    getMoveType(position, pawnI, pawns, limits),
  );
}

function getBishopMoves(
  pawnI: number,
  pawns: Pawn[],
  limits: Limits,
): Position[] {
  return [
    ...moveGenerator({ row: 1, col: 1 }, pawnI, pawns, limits),
    ...moveGenerator({ row: -1, col: 1 }, pawnI, pawns, limits),
    ...moveGenerator({ row: 1, col: -1 }, pawnI, pawns, limits),
    ...moveGenerator({ row: -1, col: -1 }, pawnI, pawns, limits),
  ];
}

function getRookMoves(
  pawnI: number,
  pawns: Pawn[],
  limits: Limits,
): Position[] {
  return [
    ...moveGenerator({ row: 1, col: 0 }, pawnI, pawns, limits),
    ...moveGenerator({ row: -1, col: 0 }, pawnI, pawns, limits),
    ...moveGenerator({ row: 0, col: 1 }, pawnI, pawns, limits),
    ...moveGenerator({ row: 0, col: -1 }, pawnI, pawns, limits),
  ];
}

/**
 * Returns an array of possible moves starting (not including) at the pawns
 * current postion. It than moves step by step from the start position along the
 * direction given by the `direction` parameter. It does that as long as the found
 * positions are valid moves and stops once that is no longer the case.
 * @param direction Direction in row and col per step
 */
function moveGenerator(
  direction: Position,
  pawnI: number,
  pawns: Pawn[],
  limits: Limits,
): Position[] {
  const startingPos = pawns[pawnI].position;

  const result: Position[] = [];
  const currentPos: Position = { ...startingPos };

  // eslint-disable-next-line no-constant-condition
  while (true) {
    currentPos.row += direction.row;
    currentPos.col += direction.col;
    const moveType = getMoveType(currentPos, pawnI, pawns, limits);

    // don't add move if it's invalid
    if (moveType !== MoveType.invalid) {
      result.push({ ...currentPos });
    }

    // stop generator if invalid or beating was encountered
    if (moveType !== MoveType.normal) {
      break;
    }
  }

  return result;
}

// -----------------------------------------------------------------------------

enum MoveType {
  invalid,
  normal,
  beating,
}

function getMoveType(
  destination: Position,
  pawnI: number,
  pawns: Pawn[],
  limits: Limits,
): MoveType {
  const pawnToMove = pawns[pawnI];
  const pawnOnField = pawns[getPawnIndexAtPosition(destination, pawns)];

  if (!isWithinLimits(destination, limits)) {
    return MoveType.invalid;
  }

  if (!pawnOnField) {
    return MoveType.normal;
  }

  if (pawnOnField.player !== pawnToMove.player) {
    // pawns from two different players
    return MoveType.beating;
  }

  return MoveType.invalid;
}
