import { Color } from "./Color";
import { Player } from "./Player";
import { Position } from "./Position";
import { Role } from "./Role";
import { FieldColorGetter } from "./helper";

export class Pawn {
    constructor(
        readonly player: Player,
        readonly knightColor: Color,
        readonly position: Position,
        private fieldColorGetter: FieldColorGetter,
    ) {}

    get id(): string {
        return `${this.player.color[0]}${this.knightColor[0]}`;
    }

    get roles(): { [fieldColor in Color]: Role } {
        const result = {} as { [fieldColor in Color]: Role };
        let colorIndex = colors.indexOf(this.knightColor);
        for (const role of roles) {
            result[colors[colorIndex]] = role;
            colorIndex = (colorIndex + 1) % colors.length;
        }
        return result;
    }

    get role(): Role {
        return this.roles[this.fieldColorGetter.getFieldColor(this.position)];
    }
}

const colors: Color[] = ["red", "green", "yellow", "blue"];
const roles: Role[] = ["knight", "queen", "bishop", "rook"];
