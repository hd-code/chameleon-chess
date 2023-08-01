import { Board } from "./Board";
import { Color } from "./Color";
import { Limits } from "./Limits";
import { Position } from "./Position";

export class Pawn {
    static getInitial(player: Color): Pawn[] {
        return startPawns[player].map(
            ([x, y, knightColor]) =>
                new Pawn(player, knightColor, new Position(x, y)),
        );
    }

    constructor(
        readonly player: Color,
        private knightColor: Color,
        readonly position: Position,
    ) {}

    get id(): string {
        return `${this.player[0]}${this.knightColor[0]}`;
    }
    get role(): Role {
        return this.roles[Board.get(this.position)];
    }
    get roles(): { [fieldColor in Color]: Role } {
        return mapKnightColorToRoles[this.knightColor];
    }

    setPosition(position: Position): Pawn {
        return new Pawn(this.player, this.knightColor, position);
    }

    getMoves(pawns: Pawn[], limits: Limits): Position[] {
        switch (this.role) {
            case "knight":
                return this.getKnightMoves(pawns, limits);
            case "queen":
                return [
                    ...this.getBishopMoves(pawns, limits),
                    ...this.getRookMoves(pawns, limits),
                ];
            case "bishop":
                return this.getBishopMoves(pawns, limits);
            case "rook":
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
        if (!limits.contains(destination)) {
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
    red: [
        [7, 0, "red"],
        [7, 1, "green"],
        [7, 2, "yellow"],
        [7, 3, "blue"],
    ],
    green: [
        [7, 7, "green"],
        [6, 7, "yellow"],
        [5, 7, "blue"],
        [4, 7, "red"],
    ],
    yellow: [
        [0, 7, "yellow"],
        [0, 6, "blue"],
        [0, 5, "red"],
        [0, 4, "green"],
    ],
    blue: [
        [0, 0, "blue"],
        [1, 0, "red"],
        [2, 0, "green"],
        [3, 0, "yellow"],
    ],
};

const colors: Color[] = ["red", "green", "yellow", "blue"];
const roles: Role[] = ["knight", "queen", "bishop", "rook"];

function getRoleMapping(startIndex: number) {
    const colorRolePairs = colors.map((color, index) => {
        const roleIndex = startIndex + (index % roles.length);
        return [color, roles[roleIndex]];
    });
    return Object.fromEntries(colorRolePairs);
}

const mapKnightColorToRoles: {
    [knightColor in Color]: { [fieldColor in Color]: Role };
} = {
    red: getRoleMapping(0),
    green: getRoleMapping(3),
    yellow: getRoleMapping(2),
    blue: getRoleMapping(1),
};

// prettier-ignore
const knightMoves = [
    new Position(2, 1),
    new Position(1, 2),
    new Position(-2, 1),
    new Position(1, -2),
    new Position(2, -1),
    new Position(-1, 2),
    new Position(-2, -1),
    new Position(-1, -2),
];

enum MoveType {
    invalid = 0,
    normal = 1,
    beating = 2,
}
