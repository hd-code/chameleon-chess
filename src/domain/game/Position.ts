export class Position {
    constructor(
        readonly x: number,
        readonly y: number,
    ) {}

    add(other: Position): Position {
        return new Position(this.x + other.x, this.y + other.y);
    }

    equals(position: Position): boolean {
        return this.x === position.x && this.y === position.y;
    }

    in(positions: Position[]): boolean {
        for (const position of positions) {
            if (this.equals(position)) {
                return true;
            }
        }
        return false;
    }

    static sort(a: Position, b: Position): number {
        if (a.x === b.x) {
            return a.y - b.y;
        }
        return a.x - b.x;
    }

    toString(): string {
        return `Position(${this.x}, ${this.y})`;
    }
}
