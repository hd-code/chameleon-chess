import { Position } from "./Position";

export class Limits {
    static default(): Limits {
        return new Limits(new Position(0, 0), new Position(7, 7));
    }

    constructor(readonly min: Position, readonly max: Position) {}

    contains(position: Position): boolean {
        // rome-ignore format: group by dimension
        return (
            this.min.x <= position.x && position.x <= this.max.x &&
            this.min.y <= position.y && position.y <= this.max.y
        );
    }

    isSmallest(): boolean {
        return this.xDiff() === MIN_DIFF && this.yDiff() === MIN_DIFF;
    }

    update(pawnPositions: Position[]): Limits {
        const limits = Limits.fromPawnPostions(pawnPositions);
        return limits.isBigEnough() ? limits : limits.widen(this);
    }

    private widen(formerLimits: Limits): Limits {
        let min = true;
        let [minX, maxX] = [this.min.x, this.max.x];
        let [minY, maxY] = [this.min.y, this.max.y];

        while (maxX - minX < MIN_DIFF) {
            if (min && formerLimits.min.x < minX) {
                minX -= 1;
            } else if (!min && formerLimits.max.x > maxX) {
                maxX += 1;
            }
            min = !min;
        }
        while (maxY - minY < MIN_DIFF) {
            if (min && formerLimits.min.y < minY) {
                minY -= 1;
            } else if (!min && formerLimits.max.y > maxY) {
                maxY += 1;
            }
            min = !min;
        }

        return new Limits(new Position(minX, minY), new Position(maxX, maxY));
    }

    private isBigEnough(): boolean {
        return this.xDiff() >= MIN_DIFF && this.yDiff() >= MIN_DIFF;
    }

    private xDiff(): number {
        return this.max.x - this.min.x;
    }
    private yDiff(): number {
        return this.max.y - this.min.y;
    }

    private static fromPawnPostions(pawnPositions: Position[]): Limits {
        const xs = pawnPositions.map((p) => p.x);
        const ys = pawnPositions.map((p) => p.y);

        return new Limits(
            new Position(Math.min(7, ...xs), Math.min(7, ...ys)),
            new Position(Math.max(0, ...xs), Math.max(0, ...ys)),
        );
    }
}

const MIN_DIFF = 2;
