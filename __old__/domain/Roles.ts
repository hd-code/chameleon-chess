import { FieldColor } from "./Board";
import { Color } from "./Color";

// -----------------------------------------------------------------------------

/**
 * An enum, which represents the four chess roles a pawn could have
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

/** Returns the role of a pawn with a certain knight color for a given field color */
export function getRole(knightColor: FieldColor, fieldColor: FieldColor): Role {
    return mapKnightColorToRoles[knightColor][fieldColor];
}

// -----------------------------------------------------------------------------

/** Map from a field color to the corresponding role */
export type Roles = { [color in FieldColor]: Role };

/** Returns the `Roles` for a certain knight color */
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
