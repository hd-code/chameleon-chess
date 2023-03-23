import { Color } from "./Color";
import { Limits } from "./Limits";
import { Pawn, Role } from "./Pawn";
import { Position } from "./Position";

export class GameState {
    static create(
        red: boolean,
        green: boolean,
        yellow: boolean,
        blue: boolean,
    ): GameState {
        const pawns: Pawn[] = [];
        red && pawns.push(...Pawn.getInitial(Color.red));
        green && pawns.push(...Pawn.getInitial(Color.green));
        yellow && pawns.push(...Pawn.getInitial(Color.yellow));
        blue && pawns.push(...Pawn.getInitial(Color.blue));
        if (pawns.length === 0) throw new Error("No players were given");
        const limits = Limits.default().update(pawns.map((p) => p.position));
        return new GameState(pawns, limits, Color.green).setPlayerToNext();
    }

    constructor(
        readonly pawns: Pawn[],
        readonly limits: Limits,
        readonly player: Color,
    ) {}

    getPawn(pawnId: string): Pawn {
        const result = this.pawns.find((p) => p.id === pawnId);
        if (!result) throw new Error(`no pawn with id ${pawnId}`);
        return result;
    }
    getPawnAt(position: Position): Pawn {
        const result = this.pawns.find((p) => p.position.equals(position));
        if (!result) throw new Error(`no pawn at position ${position}`);
        return result;
    }
    getPawnMoves(pawnId: string): Position[] {
        return this.getPawn(pawnId).getMoves(this.pawns, this.limits);
    }

    getPlayers(): Color[] {
        const players: { [player in Color]?: boolean } = {};
        this.pawns.forEach((p) => (players[p.player] = true));
        return Object.keys(players).map((p) => parseInt(p));
    }

    isGameOver(): boolean {
        return this.getPlayers().length <= 1;
    }

    makeMove(pawnId: string, destination: Position): GameState {
        this.assertMove(pawnId, destination);

        let pawns = this.pawns
            .filter((p) => !p.position.equals(destination))
            .map((p) => (p.id === pawnId ? p.setPosition(destination) : p));
        const limits = this.limits.update(pawns.map((p) => p.position));
        pawns = pawns.filter((p) => !GameState.isBlockedKnight(p, limits));

        return new GameState(pawns, limits, this.player).setPlayerToNext();
    }

    getNext(): GameState[] {
        return this.pawns
            .filter((p) => p.player === this.player)
            .flatMap((p) =>
                this.getPawnMoves(p.id).map((m) => this.makeMove(p.id, m)),
            );
    }

    private assertMove(pawnId: string, destination: Position) {
        const pawn = this.pawns.find((p) => p.id === pawnId);
        if (!pawn) throw new Error(`Unknown pawn id: '${pawnId}'`);
        if (pawn.player !== this.player)
            throw new Error(`Player '${Color[pawn.player]}' is not on turn`);
        const moves = pawn.getMoves(this.pawns, this.limits);
        if (!destination.isIn(moves))
            throw new Error(
                `Destination ${destination} is not reachable for pawn '${pawnId}'`,
            );
    }

    private setPlayerToNext(): GameState {
        let result = mapToNextPlayer[this.player];
        const players = this.getPlayers();
        while (result !== this.player) {
            if (players.includes(result)) {
                return new GameState(this.pawns, this.limits, result);
            }
            result = mapToNextPlayer[result];
        }
        return this;
    }

    private static isBlockedKnight(pawn: Pawn, limits: Limits): boolean {
        return (
            limits.isSmallest() &&
            pawn.role === Role.knight &&
            limits.min.add(new Position(1, 1)).equals(pawn.position)
        );
    }
}

const mapToNextPlayer = {
    [Color.red]: Color.blue,
    [Color.blue]: Color.yellow,
    [Color.yellow]: Color.green,
    [Color.green]: Color.red,
};
