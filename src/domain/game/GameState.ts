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
        return Object.values(extractPlayersMap(this.board));
    }

    update(move: Move): GameState {
        if (this.gameOver) {
            throw new Error(`the game is already over`);
        }
        const pawn = this.board.getPawn(move.from);
        if (pawn.player.color !== this.activePlayer.color) {
            throw new Error(`player ${pawn.player.color} is not on turn`);
        }

        const nextBoard = this.board.update(move);
        const nextPlayer = this.getNextPlayer(nextBoard);

        return new GameState(nextPlayer, nextBoard);
    }

    private getNextPlayer(nextBoard: Board): Player {
        const players = extractPlayersMap(nextBoard);

        let nextPlayerColor = mapPlayerColorToNext[this.activePlayer.color];
        while (nextPlayerColor !== this.activePlayer.color) {
            const nextPlayer = players[nextPlayerColor];
            if (nextPlayer) {
                return nextPlayer;
            }
            nextPlayerColor = mapPlayerColorToNext[nextPlayerColor];
        }

        return this.activePlayer;
    }
}

const mapPlayerColorToNext: { [color in Color]: Color } = {
    red: "blue",
    green: "red",
    yellow: "green",
    blue: "yellow",
};

function extractPlayersMap(board: Board): { [color in Color]?: Player } {
    const result: { [color in Color]?: Player } = {};
    board.pawns.forEach((pawn) => {
        result[pawn.player.color] = pawn.player;
    });
    return result;
}
