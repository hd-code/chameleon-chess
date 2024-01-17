import { Position } from "./Position";

export class Move {
    constructor(
        readonly from: Position,
        readonly to: Position,
    ) {}
}
