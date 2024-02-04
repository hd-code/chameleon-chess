import { Board } from "./Board";
import { Color, Move, Player } from "./types";

export class GameState {
    constructor(
        readonly activePlayer: Player,
        readonly board: Board,
    ) {}

    get gameOver(): boolean {
        return this.players.length <= 1;
    }
    get nextMoves(): Move[] {
        const pawns = this.board.pawns.filter(
            (p) => p.player.color === this.activePlayer.color,
        );
        const moves = pawns.map((p) => {
            const targets = this.board.getPawnMoves(p.position);
            return targets.map((target) => new Move(p.position, target));
        });
        return moves.flat();
    }
    get players(): Player[] {
        return extractPlayers(this.board);
    }

    update(move: Move): GameState {
        // check for correct player
        // update the board
        // update the active player
        throw new Error("not implemented");
    }
}

const nextPlayerColor: { [color in Color]: Color } = {
    red: "blue",
    green: "red",
    yellow: "green",
    blue: "yellow",
};

function extractPlayers(board: Board): Player[] {
    const result: { [color in Color]?: Player } = {};
    board.pawns.forEach((pawn) => {
        result[pawn.player.color] = pawn.player;
    });
    return Object.values(result);
}
