import { Color } from "./Color";
import { Position } from "./Position";

export interface FieldColorGetter {
    getFieldColor(position: Position): Color;
}
