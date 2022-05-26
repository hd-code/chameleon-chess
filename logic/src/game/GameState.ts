import { hasKey, isArray } from "../util/TypeGuards";

import { Color, isColor } from "./Color";
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
    getPawnRole,
    isPawn,
    Pawn,
} from "./Pawn";
import {
    isInPositions,
    isSamePosition,
    Position,
    sortPositions,
} from "./Position";
import { Role } from "./Role";

// -----------------------------------------------------------------------------

/**
 * This is the main data structure for playing a game of chameleon chess.
 * It represents the current state of the game with all needed information.
 *
 * It holds the following properties:
 * - `limits`: specifies the current size of the game board (see {@link Limits})
 * - `pawns`: an array with all the pawns that are still in play (alive) (see {@link Pawn})
 * - `player`: the color of the  player who is currently on turn (see {@link Color})
 *
 * All other information about the current game, can be derived from this game
 * state object.
 *
 * _Important_: Only living pawns are stored in the pawns array. If a pawn is
 * beaten, it gets removed from that array.
 */
export type GameState = {
    /** specifies the current size of the game board */
    limits: Limits;
    /** an array with all the pawns that are still in play (alive) */
    pawns: Pawn[];
    /** the color of the  player who is currently on turn */
    player: Color;
};

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
        hasKey<GameState>(gs, "player", isColor) &&
        isArray(gs.pawns, isPawn) &&
        gs.pawns.every((pawn) => isWithinLimits(pawn.position, gs.limits)) &&
        gs.pawns.some((pawn) => pawn.player === gs.player) &&
        noPawnsOnSameField(gs)
    );
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

/** Returns true if the given GameState is already over, false if not */
export function isGameOver(gs: GameState): boolean {
    const player = gs.pawns[0]?.player;
    return gs.pawns.every((pawn) => pawn.player === player);
}

/**
 * Checks whether the players are alive or already out. This function will check
 * all players at once.
 *
 * It returns an object, where the keys are the players and the values are of
 * boolean type. If the value is true, the corresponding player is still alive.
 * False means the player is out.
 */
export function getPlayersAlive({ pawns }: GameState): {
    [player in Color]: boolean;
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
    red && pawns.push(...createPawns(Color.red));
    green && pawns.push(...createPawns(Color.green));
    yellow && pawns.push(...createPawns(Color.yellow));
    blue && pawns.push(...createPawns(Color.blue));

    if (pawns.length <= 4) {
        return null;
    }

    return {
        limits: updateLimits(pawns, createLimits()),
        pawns,
        player: getNextPlayer(Color.green, pawns),
    };
}

const mapPlayerToNext = {
    [Color.red]: Color.blue,
    [Color.green]: Color.red,
    [Color.yellow]: Color.green,
    [Color.blue]: Color.yellow,
};

/** Returns the next player on turn. Needs the already updated pawns to work. */
function getNextPlayer(current: Color, pawns: Pawn[]): Color {
    let nextPlayer = mapPlayerToNext[current];
    while (nextPlayer !== current) {
        if (pawns.some((pawn) => pawn.player === nextPlayer)) {
            return nextPlayer;
        }
        nextPlayer = mapPlayerToNext[nextPlayer];
    }
    return current;
}

// -----------------------------------------------------------------------------

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
    if (gs.player !== gs.pawns[pawnI]?.player) {
        return null;
    }

    const moves = getPawnMoves(gs, pawnI);
    if (!moves.length || !isInPositions(destination, moves)) {
        return null;
    }

    return updateGameStateImmediately(gs, pawnI, destination);
}

/** Not validity check! Just makes the move. */
function updateGameStateImmediately(
    gs: GameState,
    pawnI: number,
    destination: Position,
): GameState {
    const beatenPawnI = getPawnIndexAtPosition(gs.pawns, destination);
    const pawns = gs.pawns.map((pawn) => ({ ...pawn }));
    pawns[pawnI].position = destination;
    if (beatenPawnI >= 0) {
        pawns.splice(beatenPawnI, 1);
    }

    const limits = updateLimits(pawns, gs.limits);
    if (isSmallestLimits(limits)) {
        const centerPos = { row: limits.rows[0] + 1, col: limits.cols[0] + 1 };
        const centerPawnI = getPawnIndexAtPosition(pawns, centerPos);
        if (
            centerPawnI >= 0 &&
            !isGameOver({ limits, pawns, player: gs.player }) &&
            getPawnRole(pawns[centerPawnI]) === Role.knight
        ) {
            pawns.splice(centerPawnI, 1);
        }
    }

    return { limits, pawns, player: getNextPlayer(gs.player, pawns) };
}

// -----------------------------------------------------------------------------

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
        const moves = getPawnMoves(gs, i);
        for (let j = 0, je = moves.length; j < je; j++) {
            result.push(updateGameStateImmediately(gs, i, moves[j]));
        }
    }
    return result;
}

/**
 * Returns all the moves a pawn could do. Moves are an array of {@link Position}'s,
 * which represent the fields this pawn could reach currently.
 *
 * If an invalid index is given, this function returns an empty array.
 *
 * @param gs the current game state
 * @param pawnI the index of the pawn to be moved in the array
 * @returns an array of positions that the pawn could go to
 */
export function getPawnMoves(gs: GameState, pawnI: number): Position[] {
    switch (getPawnRole(gs.pawns[pawnI])) {
        case Role.knight:
            return getKnightMoves(pawnI, gs.pawns, gs.limits);

        case Role.queen:
            return getBishopMoves(pawnI, gs.pawns, gs.limits).concat(
                getRookMoves(pawnI, gs.pawns, gs.limits),
            );

        case Role.bishop:
            return getBishopMoves(pawnI, gs.pawns, gs.limits);

        case Role.rook:
            return getRookMoves(pawnI, gs.pawns, gs.limits);
    }
}

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
    const pawnOnField = pawns[getPawnIndexAtPosition(pawns, destination)];

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
