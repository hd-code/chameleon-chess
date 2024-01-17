import { Board } from "./Board";
import { Move } from "./Move";
import { Pawn } from "./Pawn";
import { Player } from "./Player";
import { Position } from "./Position";

export class GameState {
    constructor(
        readonly activePlayer: Player,
        readonly board: Board,
        readonly pawns: Pawn[],
        readonly players: Player[],
        readonly history: Move[],
    ) {}

    getPawnByPosition(position: Position): Pawn {
        return this.pawns.find(p => p.position.is(position))!;
    }

    getPawnMovesByPosition(position: Position): Pawn {
        const pawn = this.getPawnByPosition(position);
        // get pawn
        // get pawn's role
        // generate moves
        // filter moves
        return this.getPawnByPosition(position);
    }

    makeMove(move: Move): GameState {
        return this;
    }

    private getKnightMoves(knight: Pawn): Move[] {
        const result = relativeKnightPositions.map(p => knight.position.add(p));

    }

    private filterPawnDestinations(pawn: Pawn, destination: Position[]): Position[] {

    }
}

const relativeKnightPositions: Position[] = [
    new Position(1, 2),
    new Position(1, -2),
    new Position(-1, 2),
    new Position(-1, -2),
    new Position(2, 1),
    new Position(2, -1),
    new Position(-2, 1),
    new Position(-2, -1),
];
