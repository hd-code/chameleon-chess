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

    toString(): string {
        return `Position(${this.x}, ${this.y})`;
    }
}
