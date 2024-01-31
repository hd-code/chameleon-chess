export class Position {
    constructor(
        readonly x: number,
        readonly y: number,
    ) {}

    add(other: Position): Position {
        return new Position(this.x + other.x, this.y + other.y);
    }

    is(other: Position): boolean {
        return this.x === other.x && this.y === other.y;
    }

    isIn(positions: Position[]): boolean {
        for (const position of positions) {
            if (this.is(position)) {
                return true;
            }
        }
        return false;
    }

    toString(): string {
        return `Postion(${this.x}, ${this.y})`;
    }
}
