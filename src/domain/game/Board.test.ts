import assert from "assert/strict";
import { Board } from "./Board";
import { Bounds } from "./Bounds";
import { Pawn, PawnWithPosition } from "./Pawn";
import { Position } from "./Position";
import { bluePlayer, redPlayer } from "./mocks";
import { Field } from "./types";
import { testMoves } from "./tests";

describe(Board.name, () => {
    describe("fields", () => {
        const bounds = new Bounds(2, 3, 6, 5);
        const pawnsAndPositions: [Pawn, Position][] = [
            [new Pawn(redPlayer, "red"), new Position(2, 5)],
            [new Pawn(redPlayer, "green"), new Position(6, 3)],
            [new Pawn(bluePlayer, "red"), new Position(5, 5)],
            [new Pawn(bluePlayer, "yellow"), new Position(2, 4)],
        ];
        const board = new Board(bounds, pawnsAndPositions);
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
        const bounds = new Bounds(2, 3, 6, 5);
        const pawnsAndPositions: [Pawn, Position][] = [
            [new Pawn(redPlayer, "red"), new Position(2, 5)],
            [new Pawn(redPlayer, "green"), new Position(6, 3)],
            [new Pawn(bluePlayer, "red"), new Position(5, 5)],
            [new Pawn(bluePlayer, "yellow"), new Position(2, 4)],
        ];
        const board = new Board(bounds, pawnsAndPositions);

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

        it("should fail when position is outside of board", () => {
            assert.throws(() => board.getField(new Position(8, 8)));
        });
    });

    describe(Board.prototype.getFieldColor.name, () => {
        const board = new Board(new Bounds(0, 0, 1, 1), []);
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

        it("should fail when position is outside of board", () => {
            assert.throws(() => board.getFieldColor(new Position(8, 8)));
        });
    });

    describe(Board.prototype.getPawn.name, () => {
        const bounds = new Bounds(2, 3, 6, 5);
        const pawnsAndPositions: [Pawn, Position][] = [
            [new Pawn(redPlayer, "red"), new Position(2, 5)],
            [new Pawn(redPlayer, "green"), new Position(6, 3)],
            [new Pawn(bluePlayer, "red"), new Position(5, 5)],
            [new Pawn(bluePlayer, "yellow"), new Position(2, 4)],
        ];
        const board = new Board(bounds, pawnsAndPositions);
        [
            {
                name: "get existing pawn",
                board: board,
                position: pawnsAndPositions[0][1],
                want: new PawnWithPosition(...pawnsAndPositions[0], board),
            },
            {
                name: "get existing pawn 2",
                board: board,
                position: pawnsAndPositions[2][1],
                want: new PawnWithPosition(...pawnsAndPositions[2], board),
            },
            {
                name: "fail on empty field",
                board: board,
                position: new Position(0, 0),
                want: undefined,
            },
            {
                name: "fail on field outside of the board",
                board: board,
                position: new Position(9, 9),
                want: undefined,
            },
        ].forEach(({ name, board, position, want }) => {
            it(name, () => {
                if (want === undefined) {
                    assert.throws(() => board.getPawn(position));
                } else {
                    const pawn = board.getPawn(position);
                    assert.deepEqual(pawn, want);
                }
            });
        });
    });

    describe(Board.prototype.getPawnMoves.name, () => {
        it("should fail for empty field", () => {
            const board = new Board(new Bounds(0, 0, 1, 1), []);
            assert.throws(() => board.getPawnMoves(new Position(0, 0)));
        });
        it("should fail for field outside the board", () => {
            const board = new Board(new Bounds(0, 0, 1, 1), []);
            assert.throws(() => board.getPawnMoves(new Position(9, 9)));
        });

        const bounds = new Bounds(1, 0, 5, 4);
        const pawnsAndPositions: [Pawn, Position][] = [
            [new Pawn(redPlayer, "green"), new Position(1, 1)], // knight
            [new Pawn(redPlayer, "red"), new Position(2, 3)],
            [new Pawn(redPlayer, "blue"), new Position(2, 4)], // rook
            [new Pawn(bluePlayer, "blue"), new Position(3, 2)], // bishop
            [new Pawn(bluePlayer, "yellow"), new Position(5, 4)], // queen
        ];
        const board = new Board(bounds, pawnsAndPositions);
        [
            {
                name: "knight moves",
                position: new Position(1, 1),
                want: [
                    new Position(3, 2), // beating
                    new Position(3, 0), // empty field
                ],
            },
            {
                name: "rook moves",
                position: new Position(2, 4),
                want: [
                    // direction: -1, 0
                    new Position(1, 4), // empty field
                    // direction: 0, -1
                    // new Position(2, 3), // own pawn
                    // direction: 1, 0
                    new Position(3, 4), // empty field
                    new Position(4, 4), // empty field
                    new Position(5, 4), // beating
                ],
            },
            {
                name: "bishop moves",
                position: new Position(3, 2),
                want: [
                    // direction: -1, -1
                    new Position(2, 1), // empty field
                    new Position(1, 0), // empty field
                    // direction: -1, 1
                    new Position(2, 3), // beating
                    // direction: 1, -1
                    new Position(4, 1), // empty field
                    new Position(5, 0), // empty field
                    // direction: 1, 1
                    new Position(4, 3), // empty field
                    // new Position(5, 4), // own pawn
                ],
            },
            {
                name: "queen moves",
                position: new Position(5, 4),
                want: [
                    // direction: -1, 0
                    new Position(4, 4), // empty field
                    new Position(3, 4), // empty field
                    new Position(2, 4), // beating
                    // direction: -1, -1
                    new Position(4, 3), // empty field
                    // new Position(3, 2), // own pawn
                    // direction: 0, -1
                    new Position(5, 3), // empty field
                    new Position(5, 2), // empty field
                    new Position(5, 1), // empty field
                    new Position(5, 0), // empty field
                ],
            },
        ].forEach(({ name, position, want }) => {
            it(name, () => {
                const moves = board.getPawnMoves(position);
                moves.sort(Position.sort);
                want.sort(Position.sort);
                assert.deepEqual(moves, want);
            });
        });
    });

    describe.only(Board.prototype.update.name, () => {
        testMoves.forEach(({ name, board, move, want }) => {
            it(name, () => {
                const got = board.update(move);
                assert.deepEqual(got, want);
            });
        });
    });
});


