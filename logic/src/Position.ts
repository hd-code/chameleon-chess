export class Position {
    /**
     * To be used with `Array.sort(Position.sort)`. Positions will be ordered
     * first by row (x), then by column (y) – both ascending.
     */
    static sort(a: Position, b: Position): number {
        return a.x !== b.x ? a.x - b.x : a.y - b.y;
    }

    constructor(readonly x: number, readonly y: number) {}

    /**
     * Adds two positions and returns the result as a new Position.
     */
    add(other: Position): Position {
        return new Position(this.x + other.x, this.y + other.y);
    }

    /**
     * Returns true if both positions point to the same field.
     */
    equals(other: Position): boolean {
        return this.x === other.x && this.y === other.y;
    }

    /**
     * Returns true if the position points to the same field as one of the
     * positions in the given array.
     */
    isIn(positions: Position[]): boolean {
        for (let i = 0, ie = positions.length; i < ie; i++) {
            if (positions[i].equals(this)) {
                return true;
            }
        }
        return false;
    }

    toString(): string {
        return `Position(${[this.x, this.y]})`;
    }
}
