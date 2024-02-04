import assert from "assert/strict";
import { Board } from "./Board";
import { Bounds } from "./Bounds";
import { Field } from "./Field";
import { Pawn } from "./Pawn";
import { Position } from "./Position";
import { bluePlayer, redPlayer } from "./mocks";

describe.only(Board.name, () => {
    const bounds = new Bounds(2, 3, 6, 5);
    const pawnsAndPositions: [Pawn, Position][] = [
        [new Pawn(redPlayer, "red"), new Position(2, 5)],
        [new Pawn(redPlayer, "green"), new Position(6, 3)],
        [new Pawn(bluePlayer, "red"), new Position(5, 5)],
        [new Pawn(bluePlayer, "yellow"), new Position(2, 4)],
    ];
    const board = new Board(bounds, pawnsAndPositions);

    describe("fields", () => {
        const fields = board.fields;

        it("should be 8x8 fields", () => {
            assert.equal(fields.length, 8);
            fields.forEach((row) => assert.equal(row.length, 8));
        });
        it("fields outside of bounds should be inactive and vice versa", () => {
            for (let y = 0; y < 8; y++) {
                for (let x = 0; x < 8; x++) {
                    const field = fields[y][x];
                    assert.equal(
                        field.active,
                        bounds.contains(new Position(x, y)),
                    );
                }
            }
        });
        it("fields should link to their correct position", () => {
            for (let y = 0; y < 8; y++) {
                for (let x = 0; x < 8; x++) {
                    const field = fields[y][x];
                    assert.deepEqual(field.position, new Position(x, y));
                }
            }
        });
        it("fields without a pawn should not link to a pawn", () => {
            const positions = pawnsAndPositions.map(([, p]) => p);
            for (let y = 0; y < 8; y++) {
                for (let x = 0; x < 8; x++) {
                    const position = new Position(x, y);
                    if (position.in(positions)) {
                        continue;
                    }
                    const field = fields[y][x];
                    assert.equal(
                        field.pawn,
                        undefined,
                        `failed for ${position}`,
                    );
                }
            }
        });
        it("fields with pawns should link to the correct pawn", () => {
            pawnsAndPositions.forEach(([pawn, position]) => {
                const field = fields[position.y][position.x];
                assert.deepEqual(field.pawn, pawn, `failed for ${position}`);
            });
        });
    });

    describe(Board.prototype.getField.name, () => {
        [
            {
                name: "inactive",
                position: new Position(0, 0),
                want: new Field(false, "blue", new Position(0, 0), undefined),
            },
            {
                name: "normal",
                position: new Position(4, 4),
                want: new Field(true, "red", new Position(4, 4), undefined),
            },
            {
                name: "with pawn",
                position: new Position(2, 4),
                want: new Field(
                    true,
                    "yellow",
                    new Position(2, 4),
                    pawnsAndPositions[3][0],
                ),
            },
        ].forEach(({ name, position, want }) => {
            it(name, () => {
                const field = board.getField(position);
                assert.deepEqual(field, want);
            });
        });
    });

    describe(Board.prototype.getFieldColor.name, () => {
        [
            { position: new Position(0, 0), want: "blue" },
            { position: new Position(2, 2), want: "red" },
            { position: new Position(7, 7), want: "green" },
            { position: new Position(6, 3), want: "yellow" },
        ].forEach(({ position, want }) => {
            it(`should return ${want} for ${position}`, () => {
                assert.equal(board.getFieldColor(position), want);
            });
        });
    });

    describe(Board.prototype.getPawn.name, () => {
        it("TODO");
    });

    describe(Board.prototype.getPawnMoves.name, () => {
        it("TODO");
    });

    describe(Board.prototype.update.name, () => {
        it("TODO");
    });
});
