type Color = "red" | "green" | "yellow" | "blue";

interface Position {
    readonly x: number;
    readonly y: number;

    add(other: Position): Position;
    equals(other: Position): boolean;
    isIn(others: Position[]): boolean;
}

interface Limits {
    readonly min: Position;
    readonly max: Position;

    isSmallest(): boolean;
    update(positions: Position[]): Limits;
}

interface Board {
    get(): readonly Color[][];
    get(position: Position): Color;
}

class Move {
    constructor(readonly from: Position, readonly to: Position) {}
}

type Role = "knight" | "queen" | "bishop" | "rook";

interface Pawn {
    readonly id: string;
    readonly player: Color;
    readonly position: Position;
    readonly roles: {[fieldColor in Color]: Role};
    readonly currentRole: Role;
}

interface GameState {
    readonly pawns: Pawn[];
    readonly limits: Limits;
    readonly currentPlayer: Color;

    init(players: {[player in Color]: boolean}): GameState;

    arePlayersAlive(): {[player in Color]: boolean};
    isOver(): boolean;

    getPawnAtPosition(position: Position): Pawn;
    getPawnMoves(pawnId: string): Position[];
    getNext(): GameState[];

    makeMove(move: Move): GameState;
}

interface Player {}

interface AI {
    execute(gameState: GameState): GameState;
}

interface Game {
    readonly players: {[player in Color]: Player};
    readonly ai: AI;
    readonly moves: Move[];

    state: GameState;
}
