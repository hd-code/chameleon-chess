import { FieldColor, Position, getFieldColor, isSamePosition } from './board';
import { Limits, isWithinLimits } from './limits';

// -----------------------------------------------------------------------------

export enum Role { knight, queen, bishop, rook }

export interface Pawn {
    knightColor: FieldColor;
    player: number;
    position: Position;
}

export function getMoves(pawnI: number, pawns: Pawn[], limits: Limits): Position[] {
    switch (getRole(pawns[pawnI])) {
    case Role.knight:
        return getKnightMoves(pawnI, pawns, limits);

    case Role.queen:
        return getBishopMoves(pawnI, pawns, limits)
            .concat(getRookMoves(pawnI, pawns, limits));

    case Role.bishop:
        return getBishopMoves(pawnI, pawns, limits);

    case Role.rook:
        return getRookMoves(pawnI, pawns, limits);
    }
}

/** Returns -1 if no pawn is at that position. */
export function getPawnIndexAtPosition(position: Position, pawns: Pawn[]): number {
    for (let i = 0, ie = pawns.length; i < ie; i++) {
        if (isSamePosition(position, pawns[i].position)) {
            return i;
        }
    }
    return -1;
}

export function getRole(pawn: Pawn): Role {
    const fieldColor = getFieldColor(pawn.position);
    return mapKnightColorRoles[pawn.knightColor][fieldColor];
}

export function getRoleMapping(pawn: Pawn): {[color in FieldColor]: Role} {
    return {...mapKnightColorRoles[pawn.knightColor]};
}

export function getStartPawns(player: number): Pawn[] {
    return createPawns(player);
}

// -----------------------------------------------------------------------------

const mapKnightColorRoles = {
    [FieldColor.red]: { 0:0, 1:1, 2:2, 3:3 },
    [FieldColor.green]: { 0:3, 1:0, 2:1, 3:2 },
    [FieldColor.yellow]: { 0:2, 1:3, 2:0, 3:1 },
    [FieldColor.blue]: { 0:1, 1:2, 2:3, 3:0 },
};

// -----------------------------------------------------------------------------

function createPawns(player: number): Pawn[] {
    switch (player) {
    case 0: return [
        createPawn(player, 7, 0, FieldColor.red),
        createPawn(player, 7, 1, FieldColor.green),
        createPawn(player, 7, 2, FieldColor.yellow),
        createPawn(player, 7, 3, FieldColor.blue),
    ];
    case 1: return [
        createPawn(player, 7, 7, FieldColor.green),
        createPawn(player, 6, 7, FieldColor.yellow),
        createPawn(player, 5, 7, FieldColor.blue),
        createPawn(player, 4, 7, FieldColor.red),
    ];
    case 2: return [
        createPawn(player, 0, 7, FieldColor.yellow),
        createPawn(player, 0, 6, FieldColor.blue),
        createPawn(player, 0, 5, FieldColor.red),
        createPawn(player, 0, 4, FieldColor.green),
    ];
    case 3: return [
        createPawn(player, 0, 0, FieldColor.blue),
        createPawn(player, 1, 0, FieldColor.red),
        createPawn(player, 2, 0, FieldColor.green),
        createPawn(player, 3, 0, FieldColor.yellow),
    ];
    }
}

function createPawn(player: number, row: number, col: number, knightColor: FieldColor): Pawn {
    return { knightColor, player, position: { row, col } };
}

// -----------------------------------------------------------------------------

function getKnightMoves(pawnI: number, pawns: Pawn[], limits: Limits): Position[] {
    const currentPos: Position = pawns[pawnI].position;

    const offsets: Position[] = [
        {row: 2, col: 1}, {row: 1, col: 2},
        {row:-2, col: 1}, {row:-1, col: 2},
        {row: 2, col:-1}, {row: 1, col:-2},
        {row:-2, col:-1}, {row:-1, col:-2},
    ];

    const result = offsets.map(offset => ({
        row: currentPos.row + offset.row,
        col: currentPos.col + offset.col
    }));

    // only return move if it is not INVALID
    return result.filter(position => getMoveType(position, pawnI, pawns, limits));
}

function getBishopMoves(pawnI: number, pawns: Pawn[], limits: Limits): Position[] {
    return [
        ...moveGenerator({ row: 1, col: 1 }, pawnI, pawns, limits),
        ...moveGenerator({ row:-1, col: 1 }, pawnI, pawns, limits),
        ...moveGenerator({ row: 1, col:-1 }, pawnI, pawns, limits),
        ...moveGenerator({ row:-1, col:-1 }, pawnI, pawns, limits),
    ];
}

function getRookMoves(pawnI: number, pawns: Pawn[], limits: Limits): Position[] {
    return [
        ...moveGenerator({ row: 1, col: 0 }, pawnI, pawns, limits),
        ...moveGenerator({ row:-1, col: 0 }, pawnI, pawns, limits),
        ...moveGenerator({ row: 0, col: 1 }, pawnI, pawns, limits),
        ...moveGenerator({ row: 0, col:-1 }, pawnI, pawns, limits),
    ];
}

/**
 * Returns an array of possible moves starting (not including) at the pawns
 * current postion. It than moves step by step from the start position along the
 * direction given by the `direction` parameter. It does that as long as the found
 * positions are valid moves and stops once that is no longer the case.
 * @param direction Direction in row and col per step
 */
function moveGenerator(direction: Position, pawnI: number, pawns: Pawn[], limits: Limits): Position[] {
    const startingPos = pawns[pawnI].position;

    const result: Position[] = [];
    const currentPos: Position = { ...startingPos };

    while (true) { // eslint-disable-line
        currentPos.row += direction.row;
        currentPos.col += direction.col;
        const moveType = getMoveType(currentPos, pawnI, pawns, limits);

        // don't add move if it's invalid
        if (moveType !== MoveType.INVALID) {
            result.push({...currentPos});
        }

        // stop generator if invalid or beating was encountered
        if (moveType !== MoveType.NORMAL) {
            break;
        }
    }

    return result;
}

// -----------------------------------------------------------------------------

enum MoveType { INVALID, NORMAL, BEATING }

function getMoveType(destination: Position, pawnI: number, pawns: Pawn[], limits: Limits): MoveType {
    const pawnToMove = pawns[pawnI];
    const pawnOnField = pawns[getPawnIndexAtPosition(destination, pawns)];

    if (!isWithinLimits(destination, limits)) {
        return MoveType.INVALID;
    }

    if (!pawnOnField) {
        return MoveType.NORMAL;
    }

    if (pawnOnField.player !== pawnToMove.player) { // pawns from two different players
        return MoveType.BEATING;
    }

    return MoveType.INVALID;
}