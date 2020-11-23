import { Position, isInPositions } from './board';
import { Limits, getStartLimits, isSmallestLimits, updateLimits } from './limits';
import { Pawn, Role, getMoves, getPawnIndexAtPosition, getRole, getStartPawns } from './pawn';
import { Player, getNextPlayer } from './player';

// -----------------------------------------------------------------------------

export { getBoard, FieldColor, Position } from './board';
export { Limits, isWithinLimits } from './limits';
export { getPawnIndexAtPosition, getRole, getRoleMapping, Pawn, Role } from './pawn';
export { arePlayersAlive, Player } from './player';

// -----------------------------------------------------------------------------

export interface GameState {
    limits: Limits;
    pawns: Pawn[];
    player: number;
}

export function getNextGameStates(gs: GameState): GameState[] {
    const result = [];
    for (let i = 0, ie = gs.pawns.length; i < ie; i++) {
        const moves = getMoves(i, gs.pawns, gs.limits);
        for (let j = 0, je = moves.length; j < je; j++) {
            result.push(updateGameState(gs, i, moves[j]));
        }
    }
    return result;
}

export function getStartGameState(red: boolean, green: boolean, yellow: boolean, blue: boolean): GameState | null {
    const pawns = [];
    red && pawns.push(...getStartPawns(0));
    green && pawns.push(...getStartPawns(1));
    yellow && pawns.push(...getStartPawns(2));
    blue && pawns.push(...getStartPawns(3));

    if (pawns.length <= 4) {
        return null;
    }

    const limits = updateLimits(pawns, getStartLimits());
    const player = getNextPlayer(Player.green, pawns);

    return { limits, pawns, player };
}

export function isGameOver(gs: GameState): boolean {
    const player = gs.pawns[0]?.player;
    for (let i = 1, ie = gs.pawns.length; i < ie; i++) {
        if (player !== gs.pawns[i].player) {
            return false;
        }
    }
    return true;
}

export function makeMove(gs: GameState, pawnI: number, destination: Position): GameState | null {
    const moves = getMoves(pawnI, gs.pawns, gs.limits);
    if (!moves.length || !isInPositions(destination, moves)) {
        return null;
    }
    return updateGameState(gs, pawnI, destination);
}

// -----------------------------------------------------------------------------

/** Not validity check! Just makes the move */
function updateGameState(gs: GameState, pawnI: number, destination: Position): GameState {
    const beatenPawnI = getPawnIndexAtPosition(destination, gs.pawns);
    const pawns = gs.pawns.map(pawn => ({...pawn})); // TODO: deep clone
    pawns[pawnI].position = destination;
    if (beatenPawnI >= 0) {
        pawns.splice(beatenPawnI, 1);
    }

    const limits = updateLimits(pawns, gs.limits);
    if (isSmallestLimits(limits)) {
        const centerPos = { row: limits.minRow + 1, col: limits.minCol + 1 };
        const centerPawnI = getPawnIndexAtPosition(centerPos, pawns);
        if (centerPawnI >= 0) {
            const role = getRole(pawns[centerPawnI]);
            if (role === Role.knight) {
                pawns.splice(centerPawnI, 1);
            }
        }
    }

    const player = getNextPlayer(gs.player, pawns);

    return { limits, pawns, player };
}