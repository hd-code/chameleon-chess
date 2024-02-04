import { Position } from "./Position";

const minWidth = 3;
const minHeight = 3;

export class Bounds {
    static fromPositions(positions: Position[]): Bounds {
        const xs = positions.map((position) => position.x);
        const ys = positions.map((position) => position.y);
        return new Bounds(
            Math.min(...xs),
            Math.min(...ys),
            Math.max(...xs),
            Math.max(...ys),
        );
    }

    constructor(
        readonly minX: number,
        readonly minY: number,
        readonly maxX: number,
        readonly maxY: number,
    ) {}

    get min(): Position {
        return new Position(this.minX, this.minY);
    }
    get max(): Position {
        return new Position(this.maxX, this.maxY);
    }
    get width(): number {
        return this.maxX - this.minX + 1;
    }
    get height(): number {
        return this.maxY - this.minY + 1;
    }

    get smallest(): boolean {
        return this.width === minWidth && this.height === minHeight;
    }

    contains(other: Bounds | Position): boolean {
        if (other instanceof Bounds) {
            return this.contains(other.min) && this.contains(other.max);
        }
        return (
            other.x >= this.minX &&
            other.x <= this.maxX &&
            other.y >= this.minY &&
            other.y <= this.maxY
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

    shrink(positions: Position[]): Bounds {
        let bounds = Bounds.fromPositions(positions);
        if (this.equals(bounds)) {
            return this;
        }

        if (!this.contains(bounds)) {
            throw new Error("given positions are not contained in this bounds");
        }

        if (bounds.width < minWidth) {
            const [minX, maxX] = increaseToMin(
                this.minX,
                this.maxX,
                bounds.minX,
                bounds.maxX,
                minWidth,
            );
            bounds = new Bounds(minX, bounds.minY, maxX, bounds.maxY);
        }
        if (bounds.height < minHeight) {
            const [minY, maxY] = increaseToMin(
                this.minY,
                this.maxY,
                bounds.minY,
                bounds.maxY,
                minHeight,
            );
            bounds = new Bounds(bounds.minX, minY, bounds.maxX, maxY);
        }

        return bounds;
    }

    toString(): string {
        return `Bounds(${this.minX}, ${this.minY}, ${this.maxX}, ${this.maxY})`;
    }
}

function increaseToMin(
    oldMin: number,
    oldMax: number,
    newMin: number,
    newMax: number,
    wantWidth: number,
): [number, number] {
    let min = true;
    while (newMax - newMin + 1 < wantWidth) {
        if (min) {
            if (newMin > oldMin) {
                newMin -= 1;
            }
        } else {
            if (newMax < oldMax) {
                newMax += 1;
            }
        }
        min = !min;
    }
    return [newMin, newMax];
}
