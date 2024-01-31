import { Color } from "./Color";
import { Position } from "./Position";

export class Field {
    constructor(
        readonly position: Position,
        readonly color: Color,
        readonly active: boolean,
    ) {}
}
