import { Position } from "./Position";
import { Color, FieldColorGetter, Player } from "./types";

export function mockFieldColorGetter(fieldColor: Color): FieldColorGetter {
    return {
        getFieldColor(_: Position): Color {
            return fieldColor;
        },
    };
}

export const redPlayer: Player = { color: "red" };
export const greenPlayer: Player = { color: "green" };
export const yellowPlayer: Player = { color: "yellow" };
export const bluePlayer: Player = { color: "blue" };
