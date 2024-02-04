import { Pawn } from "./Pawn";
import { Position } from "./Position";
import { Color } from "./types";

export class Field {
    constructor(
        readonly active: boolean,
        readonly color: Color,
        readonly position: Position,
        readonly pawn: Pawn | undefined,
    ) {}
}
