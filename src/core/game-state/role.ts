import { isInteger } from 'core/type-guards';

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
    return isInteger(role) && Role[role] !== undefined;
}
