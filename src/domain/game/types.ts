import { Position } from "./Position";

export type Color = "red" | "green" | "yellow" | "blue";

export interface FieldColorGetter {
    getFieldColor(position: Position): Color;
}

export class Move {
    constructor(
        readonly from: Position,
        readonly to: Position,
    ) {}
}

export interface Player {
    readonly color: Color;
}

export type Role = "knight" | "queen" | "bishop" | "rook";
