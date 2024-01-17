import { Position } from "./Position";

export class Bounds {
    constructor(
        readonly minX: number,
        readonly minY: number,
        readonly maxX: number,
        readonly maxY: number,
    ) {}

    isInside(position: Position): boolean {
        return (
            position.x >= this.minX &&
            position.x <= this.maxX &&
            position.y >= this.minY &&
            position.y <= this.maxY
        );
    }
}
