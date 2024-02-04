import { Position } from "./Position";
import { Color, FieldColorGetter, Player, Role } from "./types";

const colors: Color[] = ["red", "green", "yellow", "blue"];
const roles: Role[] = ["knight", "queen", "bishop", "rook"];

export class Pawn {
    constructor(
        readonly player: Player,
        readonly knightColor: Color,
    ) {}

    get roles(): { [fieldColor in Color]: Role } {
        const result = {} as { [fieldColor in Color]: Role };
        let colorIndex = colors.indexOf(this.knightColor);
        for (const role of roles) {
            result[colors[colorIndex]] = role;
            colorIndex = (colorIndex + 1) % colors.length;
        }
        return result;
    }
}

export class PawnWithPosition extends Pawn {
    constructor(
        pawn: Pawn,
        readonly position: Position,
        private fieldColorGetter: FieldColorGetter,
    ) {
        super(pawn.player, pawn.knightColor);
    }

    get role(): Role {
        return this.roles[this.fieldColorGetter.getFieldColor(this.position)];
    }
}
