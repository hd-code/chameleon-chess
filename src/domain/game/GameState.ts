import { Board } from "./Board";
import { Pawn } from "./Pawn";
import { Player } from "./Player";

export class GameState {
    constructor(
        readonly activePlayer: Player,
        readonly board: Board,
        readonly pawns: Pawn[],
        readonly players: Player[],
    ) {}
}
