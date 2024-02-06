import { Bounds } from "./Bounds";
import { Pawn, PawnWithPosition } from "./Pawn";
import { Position } from "./Position";
import { Color, Field, FieldColorGetter, Move } from "./types";

export class Board implements FieldColorGetter {
    constructor(
        private _bounds: Bounds,
        private _pawnsWithPositions: [Pawn, Position][],
    ) {}

    private _fieldsCache: Field[][] | undefined = undefined;
    get fields(): Field[][] {
        if (this._fieldsCache === undefined) {
            this._fieldsCache = fieldColors.map((row, y) =>
                row.map((color, x) => {
                    const position = new Position(x, y);
                    return new Field(
                        this._bounds.contains(position),
                        color,
                        position,
                        this._pawnsWithPositions.find(([_, p]) =>
                            position.equals(p),
                        )?.[0],
                    );
                }),
            );
        }
        return this._fieldsCache;
    }
    get pawns(): PawnWithPosition[] {
        return this._pawnsWithPositions.map(
            ([pawn, position]) => new PawnWithPosition(pawn, position, this),
        );
    }

    getField(position: Position): Field {
        const field = this.fields?.[position.y]?.[position.x];
        if (field === undefined) {
            throw new Error(`${position} is outside of the board`);
        }
        return field;
    }
    getFieldColor(position: Position): Color {
        const fieldColor = fieldColors?.[position.y]?.[position.x];
        if (fieldColor === undefined) {
            throw new Error(`${position} is outside of the board`);
        }
        return fieldColor;
    }
    getPawn(position: Position): PawnWithPosition {
        const pawn = this.getPawnOrNone(position);
        if (!pawn) {
            throw new Error(`there is no pawn at ${position}`);
        }
        return new PawnWithPosition(pawn, position, this);
    }
    getPawnMoves(position: Position): Position[] {
        const pawn = this.getPawn(position);
        switch (pawn.role) {
            case "knight":
                return this.knightMoves(pawn);
            case "queen":
                return this.queenMoves(pawn);
            case "bishop":
                return this.bishopMoves(pawn);
            case "rook":
                return this.rookMoves(pawn);
            default:
                throw new Error(`unknown pawn role '${pawn.role}'`);
        }
    }

    update(move: Move): Board {
        this.assertMove(move);

        // remove the beaten pawn if any
        let pawns = this._pawnsWithPositions.filter(
            ([_, position]) => !move.to.equals(position),
        );
        // move the pawn
        pawns = pawns.map(([pawn, position]) =>
            move.from.equals(position) ? [pawn, move.to] : [pawn, position],
        );

        const pawnPositions = pawns.map(([_, position]) => position);
        const bounds = this._bounds.shrink(pawnPositions);

        return new Board(bounds, pawns).handleSpecialCase();
    }

    private getPawnOrNone(position: Position): PawnWithPosition | undefined {
        let pawn: Pawn | undefined = undefined;
        if (this._fieldsCache === undefined) {
            const index = this._pawnsWithPositions.findIndex(([_, p]) =>
                p.equals(position),
            );
            if (index !== -1) {
                pawn = this._pawnsWithPositions[index][0];
            }
        } else {
            pawn = this.fields[position.y][position.x].pawn;
        }
        return pawn ? new PawnWithPosition(pawn, position, this) : undefined;
    }

    private knightMoves(pawn: PawnWithPosition): Position[] {
        const targets = rookMoves.map((move) => pawn.position.add(move));
        return targets.filter((position) => this.getMoveType(pawn, position));
    }
    private queenMoves(pawn: PawnWithPosition): Position[] {
        return [...this.bishopMoves(pawn), ...this.rookMoves(pawn)];
    }
    private bishopMoves(pawn: PawnWithPosition): Position[] {
        return [
            ...this.generateMoves(pawn, new Position(-1, -1)),
            ...this.generateMoves(pawn, new Position(-1, 1)),
            ...this.generateMoves(pawn, new Position(1, -1)),
            ...this.generateMoves(pawn, new Position(1, 1)),
        ];
    }
    private rookMoves(pawn: PawnWithPosition): Position[] {
        return [
            ...this.generateMoves(pawn, new Position(-1, 0)),
            ...this.generateMoves(pawn, new Position(1, 0)),
            ...this.generateMoves(pawn, new Position(0, -1)),
            ...this.generateMoves(pawn, new Position(0, 1)),
        ];
    }
    private generateMoves(
        pawn: PawnWithPosition,
        direction: Position,
    ): Position[] {
        const result: Position[] = [];
        let nextPosition = pawn.position.add(direction);
        for (let i = 0; i < 64; i++) {
            // upper bound
            const moveType = this.getMoveType(pawn, nextPosition);
            if (moveType === MoveType.invalid) {
                break;
            }
            result.push(nextPosition);
            if (moveType === MoveType.beating) {
                break;
            }
            nextPosition = nextPosition.add(direction);
        }
        return result;
    }
    private getMoveType(pawn: PawnWithPosition, target: Position): MoveType {
        if (!this._bounds.contains(target)) {
            return MoveType.invalid;
        }
        const otherPawn = this.getPawnOrNone(target);
        if (otherPawn) {
            if (otherPawn.player.color === pawn.player.color) {
                return MoveType.invalid;
            }
            return MoveType.beating;
        }
        return MoveType.normal;
    }

    private assertMove(move: Move): void {
        const pawnMoves = this.getPawnMoves(move.from);
        if (!move.to.in(pawnMoves)) {
            throw new Error(`pawn at ${move.from} cannot move to ${move.to}`);
        }
    }
    // When the board is smallest and a pawn is at the center and has the role
    // "knight", the pawn cannot move anymore. Therefore, the pawn must be
    // removed.
    // Only call this at the end of the update() method.
    private handleSpecialCase(): Board {
        if (!this._bounds.smallest) {
            return this;
        }
        if (this._pawnsWithPositions.length <= 1) {
            return this;
        }

        const center = this._bounds.min.add(new Position(1, 1));
        const pawn = this.getPawnOrNone(center);
        if (!pawn || pawn.role !== "knight") {
            return this;
        }

        // remove the pawn
        const pawns = this._pawnsWithPositions.filter(
            ([_, position]) => !position.equals(center),
        );

        return new Board(this._bounds, pawns);
    }
}

enum MoveType {
    invalid,
    normal,
    beating,
}

const [R, G, Y, B]: Color[] = ["red", "green", "yellow", "blue"];
const fieldColors = Object.freeze([
    [B, R, B, Y, G, R, B, Y],
    [R, G, R, B, Y, G, R, B],
    [G, Y, R, G, R, B, B, Y],
    [Y, B, G, Y, G, R, Y, G],
    [B, R, Y, B, R, B, G, R],
    [R, G, G, Y, B, Y, R, B],
    [G, Y, B, R, G, Y, B, Y],
    [R, G, Y, B, R, G, Y, G],
]);

const rookMoves = [
    new Position(-2, -1),
    new Position(-1, -2),
    new Position(-2, 1),
    new Position(-1, 2),
    new Position(2, -1),
    new Position(1, -2),
    new Position(2, 1),
    new Position(1, 2),
];
