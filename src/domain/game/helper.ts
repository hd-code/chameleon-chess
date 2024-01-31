import { Color } from "./Color";
import { Position } from "./Position";

export class Bounds {
    constructor(
        readonly minX: number,
        readonly minY: number,
        readonly maxX: number,
        readonly maxY: number,
    ) {}

    get sizeX(): number {
        return this.maxX - this.minX + 1;
    }

    get sizeY(): number {
        return this.maxY - this.minY + 1;
    }

    static fromEntities(entities: Positioned[]): Bounds {
        const xs = entities.map(e => e.position.x);
        const ys = entities.map(e => e.position.y);
        const minX = Math.min(...xs);
        const minY = Math.min(...ys);
        const maxX = Math.max(...xs);
        const maxY = Math.max(...ys);
        return new Bounds(minX, minY, maxX, maxY);
    }

    contains(position: Position): boolean {
        return (
            position.x >= this.minX &&
            position.x <= this.maxX &&
            position.y >= this.minY &&
            position.y <= this.maxY
        );
    }

    equals(other: Bounds): boolean {
        return (
            this.minX === other.minX &&
            this.minY === other.minY &&
            this.maxX === other.maxX &&
            this.maxY === other.maxY
        );
    }
}

export interface FieldColorGetter {
    getFieldColor(position: Position): Color;
}

export const mockFieldColorGetter = (color: Color): FieldColorGetter => ({
    getFieldColor: (_: Position): Color => color,
});

export interface Positioned {
    readonly position: Position;
}
