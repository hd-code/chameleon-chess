import { Color } from "./Color";
import {
    createLimits,
    isLimits,
    isSmallestLimits,
    isWithinLimits,
    Limits,
    updateLimits,
} from "./Limits";
import {
    createPawns,
    getPawnIndexAtPosition,
    getPawnMoves,
    getPawnRole,
    isPawn,
    Pawn,
} from "./Pawn";
import { isPlayerColor, PlayerColor } from "./Players";
import {
    isInPositions,
    isSamePosition,
    Position,
    sortPositions,
} from "./Position";
import { Role } from "./Roles";
import { hasKey, isArray } from "../util/TypeGuards";

// -----------------------------------------------------------------------------

/**
 * This is the main data structure for playing a game of chameleon chess.
 * It represents the current state of the game with all needed information.
 *
 * It holds the following properties:
 * - `limits`: specifies the current size of the game board (see {@link Limits})
 * - `pawns`: an array with all the pawns that are still in play (alive) (see {@link Pawn})
 * - `currentPlayer`: the color of the  player who is currently on turn (see {@link PlayerColor})
 *
 * All other information about the current game, can be derived from this game
 * state object.
 *
 * _Important_: Only living pawns are stored in the pawns array. If a pawn is
 * beaten, it gets removed from that array.
 */
export interface GameState {
    /** specifies the current size of the game board */
    limits: Limits;
    /** an array with all the pawns that are still in play (alive) */
    pawns: Pawn[];
    /** the color of the  player who is currently on turn */
    currentPlayer: PlayerColor;
}

/**
 * TypeGuard for `GameState`.
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
        hasKey<GameState>(gs, "currentPlayer", isPlayerColor) &&
        isArray(gs.pawns, isPawn) &&
        noPawnsOutsideOfLimits(gs) &&
        noPawnsOnSameField(gs) &&
        getAlivePlayers(gs.pawns)[gs.currentPlayer]
    );
}

/** Returns true if the given game is already over, false if not */
export function isGameOver(gs: GameState): boolean {
    const player = gs.pawns[0]?.playerColor;
    for (let i = 1, ie = gs.pawns.length; i < ie; i++) {
        if (player !== gs.pawns[i].playerColor) {
            return false;
        }
    }
    return true;
}

/** This is for the AI. It returns all possible game states that could succeed
 * the current one. Ergo, it returns the resulting game states for all moves
 * that can be made in the current game state. The AI now has to choose
 * intelligently, which game state to select to continue. */
export function getNextGameStates(gs: GameState): GameState[] {
    const result: GameState[] = [];
    for (let i = 0, ie = gs.pawns.length; i < ie; i++) {
        if (gs.pawns[i].playerColor !== gs.currentPlayer) {
            continue;
        }
        const moves = getPawnMoves(i, gs.pawns, gs.limits);
        for (let j = 0, je = moves.length; j < je; j++) {
            result.push(updateGameStateImmediately(gs, i, moves[j]));
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
export function createGameState(
    red: boolean,
    green: boolean,
    yellow: boolean,
    blue: boolean,
): GameState | null {
    const pawns = [];
    red && pawns.push(...createPawns(0));
    green && pawns.push(...createPawns(1));
    yellow && pawns.push(...createPawns(2));
    blue && pawns.push(...createPawns(3));

    if (pawns.length <= 4) {
        return null;
    }

    const limits = updateLimits(pawns, createLimits());
    const currentPlayer = getNextPlayer(Color.green, pawns);

    return { limits, pawns, currentPlayer };
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
export function updateGameState(
    gs: GameState,
    pawnI: number,
    destination: Position,
): GameState | null {
    if (gs.currentPlayer !== gs.pawns[pawnI]?.playerColor) {
        return null;
    }

    const moves = getPawnMoves(pawnI, gs.pawns, gs.limits);
    if (!moves.length || !isInPositions(destination, moves)) {
        return null;
    }

    return updateGameStateImmediately(gs, pawnI, destination);
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

// -----------------------------------------------------------------------------

/** Not validity check! Just makes the move. */
function updateGameStateImmediately(
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
        const centerPos = { row: limits.row.min + 1, col: limits.col.min + 1 };
        const centerPawnI = getPawnIndexAtPosition(centerPos, pawns);
        if (centerPawnI >= 0) {
            const role = getPawnRole(pawns[centerPawnI]);
            if (
                role === Role.knight &&
                !isGameOver({ limits, pawns, currentPlayer: gs.currentPlayer })
            ) {
                pawns.splice(centerPawnI, 1);
            }
        }
    }

    const currentPlayer = getNextPlayer(gs.currentPlayer, pawns);

    return { limits, pawns, currentPlayer };
}

/** Returns the next player on turn. Needs the already updated pawns to work. */
function getNextPlayer(current: PlayerColor, pawns: Pawn[]): PlayerColor {
    const alivePlayers = getAlivePlayers(pawns);
    let nextPlayer = mapPlayerColorToNext[current];
    while (!alivePlayers[nextPlayer] && nextPlayer !== current) {
        nextPlayer = mapPlayerColorToNext[nextPlayer];
    }
    return nextPlayer;
}

function getAlivePlayers(pawns: Pawn[]): { [player in PlayerColor]: boolean } {
    const result: { [player in PlayerColor]: boolean } = {
        [Color.red]: false,
        [Color.green]: false,
        [Color.yellow]: false,
        [Color.blue]: false,
    };

    for (let i = 0, ie = pawns.length; i < ie; i++) {
        result[pawns[i].playerColor] = true;
    }

    return result;
}

const mapPlayerColorToNext = {
    [Color.red]: Color.blue,
    [Color.green]: Color.red,
    [Color.yellow]: Color.green,
    [Color.blue]: Color.yellow,
};
