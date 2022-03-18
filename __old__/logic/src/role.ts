import { FieldColor } from "./board";
import { Color } from "./color";

// -----------------------------------------------------------------------------

/**
 * An enum, which represents the four chess roles a pawn could have.
 * - `knight`: 0
 * - `queen`:  1
 * - `bishop`: 2
 * - `rook`:   3
 */
export enum Role {
  knight,
  queen,
  bishop,
  rook,
}

/** TypeGuard for `Role` */
export function isRole(role: unknown): role is Role {
  return Role[role as Role] !== undefined;
}

export function getRole(knightColor: FieldColor, fieldColor: FieldColor): Role {
  return mapKnightColorToRoles[knightColor][fieldColor];
}

// -----------------------------------------------------------------------------

export type Roles = { [color in FieldColor]: Role };

export function getRoles(knightColor: FieldColor): Roles {
  return mapKnightColorToRoles[knightColor];
}

// -----------------------------------------------------------------------------

const mapKnightColorToRoles = {
  [Color.red]: { 0: 0, 1: 1, 2: 2, 3: 3 },
  [Color.green]: { 0: 3, 1: 0, 2: 1, 3: 2 },
  [Color.yellow]: { 0: 2, 1: 3, 2: 0, 3: 1 },
  [Color.blue]: { 0: 1, 1: 2, 2: 3, 3: 0 },
};
