import { Board } from "./Board";
import { Color } from "./Color";
import { Limits } from "./Limits";
import { Position } from "./Position";

/**
 * An enum, which represents the four chess roles a pawn could have
 * - `knight`: 0
 * - `queen`:  1
 * - `bishop`: 2
 * - `rook`:   3
 */
export enum Role {
    knight,
    queen,
    bishop,
    rook,
}

export type Roles = [Role, Role, Role, Role];

export class Pawn {
    static getInitial(player: Color): Pawn[] {
        return startPawns[player].map(
            ([x, y, knightColor]) =>
                new Pawn(player, knightColor, new Position(x, y)),
        );
    }

    constructor(
        readonly player: Color,
        readonly knightColor: Color,
        readonly position: Position,
    ) {}

    get id(): string {
        return `${Color[this.player][0]}${Color[this.knightColor][0]}`;
    }
    get role(): Role {
        return this.roles[Board.get(this.position)];
    }
    get roles(): Roles {
        return mapKnightColorToRoles[this.knightColor];
    }

    setPosition(position: Position): Pawn {
        return new Pawn(this.player, this.knightColor, position);
    }

    getMoves(pawns: Pawn[], limits: Limits): Position[] {
        switch (this.role) {
            case Role.knight:
                return this.getKnightMoves(pawns, limits);
            case Role.queen:
                return [
                    ...this.getBishopMoves(pawns, limits),
                    ...this.getRookMoves(pawns, limits),
                ];
            case Role.bishop:
                return this.getBishopMoves(pawns, limits);
            case Role.rook:
                return this.getRookMoves(pawns, limits);
        }
    }

    private getKnightMoves(pawns: Pawn[], limits: Limits): Position[] {
        const moves = knightMoves.map((m) => this.position.add(m));
        return moves.filter((m) => this.getMoveType(m, pawns, limits));
    }
    private getBishopMoves(pawns: Pawn[], limits: Limits): Position[] {
        return [
            ...this.generateMoves(new Position(-1, -1), pawns, limits),
            ...this.generateMoves(new Position(1, -1), pawns, limits),
            ...this.generateMoves(new Position(-1, 1), pawns, limits),
            ...this.generateMoves(new Position(1, 1), pawns, limits),
        ];
    }
    private getRookMoves(pawns: Pawn[], limits: Limits): Position[] {
        return [
            ...this.generateMoves(new Position(-1, 0), pawns, limits),
            ...this.generateMoves(new Position(1, 0), pawns, limits),
            ...this.generateMoves(new Position(0, -1), pawns, limits),
            ...this.generateMoves(new Position(0, 1), pawns, limits),
        ];
    }

    private getMoveType(
        destination: Position,
        pawns: Pawn[],
        limits: Limits,
    ): MoveType {
        if (!limits.isInside(destination)) {
            return MoveType.invalid;
        }
        const pawnAtPosition = pawns.find((p) =>
            p.position.equals(destination),
        );
        if (pawnAtPosition) {
            return pawnAtPosition.player === this.player
                ? MoveType.invalid
                : MoveType.beating;
        }
        return MoveType.normal;
    }
    private generateMoves(
        direction: Position,
        pawns: Pawn[],
        limits: Limits,
    ): Position[] {
        const result: Position[] = [];
        let p = this.position.add(direction);
        let mt = this.getMoveType(p, pawns, limits);
        while (mt !== MoveType.invalid) {
            result.push(p);
            if (mt === MoveType.beating) {
                break;
            }
            p = p.add(direction);
            mt = this.getMoveType(p, pawns, limits);
        }
        return result;
    }
}

const startPawns: { [color in Color]: [number, number, Color][] } = {
    [Color.red]: [
        [7, 0, Color.red],
        [7, 1, Color.green],
        [7, 2, Color.yellow],
        [7, 3, Color.blue],
    ],
    [Color.green]: [
        [7, 7, Color.green],
        [6, 7, Color.yellow],
        [5, 7, Color.blue],
        [4, 7, Color.red],
    ],
    [Color.yellow]: [
        [0, 7, Color.yellow],
        [0, 6, Color.blue],
        [0, 5, Color.red],
        [0, 4, Color.green],
    ],
    [Color.blue]: [
        [0, 0, Color.blue],
        [1, 0, Color.red],
        [2, 0, Color.green],
        [3, 0, Color.yellow],
    ],
};

const mapKnightColorToRoles: { [knightColor in Color]: Roles } = {
    [Color.red]: [0, 1, 2, 3],
    [Color.green]: [3, 0, 1, 2],
    [Color.yellow]: [2, 3, 0, 1],
    [Color.blue]: [1, 2, 3, 0],
};

// prettier-ignore
const knightMoves = [
    new Position( 2,  1), new Position( 1,  2),
    new Position(-2,  1), new Position( 1, -2),
    new Position( 2, -1), new Position(-1,  2),
    new Position(-2, -1), new Position(-1, -2),
];

enum MoveType {
    invalid,
    normal,
    beating,
}
