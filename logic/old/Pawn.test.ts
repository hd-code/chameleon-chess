import * as assert from "assert";
import { testFunc } from "./util/testutil";
import { Color } from "./Color";
import {
    Pawn,
    createPawns,
    getPawnIndexAtPosition,
    getPawnRole,
    getPawnRoles,
    isPawn,
} from "./Pawn";
import { isSamePosition, sortPositions } from "./Position";
import { Role } from "./Role";

// -----------------------------------------------------------------------------

const pawns: Pawn[] = [
    {
        player: Color.red,
        knightColor: Color.yellow,
        position: { row: 5, col: 3 },
    }, // red knight
    {
        player: Color.red,
        knightColor: Color.green,
        position: { row: 4, col: 1 },
    }, // red rook
    {
        player: Color.red,
        knightColor: Color.red,
        position: { row: 2, col: 1 },
    }, // red blocking pawn
    {
        player: Color.yellow,
        knightColor: Color.blue,
        position: { row: 2, col: 3 },
    }, // yellow bishop
    {
        player: Color.yellow,
        knightColor: Color.yellow,
        position: { row: 4, col: 5 },
    }, // yellow queen
    {
        player: Color.yellow,
        knightColor: Color.green,
        position: { row: 1, col: 0 },
    }, // yellow corner pawn
    {
        player: Color.yellow,
        knightColor: Color.red,
        position: { row: 1, col: 6 },
    }, // yellow corner pawn
];

describe("Pawn", () => {
    describe(isPawn.name, () => {
        it("should work for all test pawns", () => {
            pawns.forEach((pawn, i) =>
                assert.ok(isPawn(pawn), `${i}. pawn failed`),
            );
        });
    });

    describe(getPawnIndexAtPosition.name, () => {
        [
            { position: { row: 5, col: 3 }, expected: 0 },
            { position: { row: 4, col: 1 }, expected: 1 },
            { position: { row: 2, col: 3 }, expected: 3 },
            { position: { row: 4, col: 5 }, expected: 4 },
            { position: { row: 1, col: 6 }, expected: 6 },
            { position: { row: 0, col: 0 }, expected: -1 },
            { position: { row: 0, col: 1 }, expected: -1 },
            { position: { row: 0, col: 2 }, expected: -1 },
            { position: { row: 7, col: 5 }, expected: -1 },
        ].forEach(({ position, expected }) => {
            const nthPawn = expected === -1 ? "no" : `the ${expected}.`;
            it(`At ${JSON.stringify(
                position,
            )} there is ${nthPawn} pawn`, () => {
                const actual = getPawnIndexAtPosition(pawns, position);
                assert.deepStrictEqual(actual, expected);
            });
        });
    });

    describe(getPawnRole.name, () => {
        [
            {
                pawn: {
                    player: 0,
                    position: { row: 5, col: 3 },
                    knightColor: Color.yellow,
                },
                expected: Role.knight,
            },
            {
                pawn: {
                    player: 1,
                    position: { row: 4, col: 1 },
                    knightColor: Color.green,
                },
                expected: Role.rook,
            },
            {
                pawn: {
                    player: 2,
                    position: { row: 2, col: 3 },
                    knightColor: Color.blue,
                },
                expected: Role.bishop,
            },
            {
                pawn: {
                    player: 3,
                    position: { row: 4, col: 5 },
                    knightColor: Color.yellow,
                },
                expected: Role.queen,
            },
            {
                pawn: {
                    player: 3,
                    position: { row: 4, col: 5 },
                    knightColor: Color.red,
                },
                expected: Role.rook,
            },
        ].forEach(({ pawn, expected }) => {
            const posString = JSON.stringify(pawn.position);
            it(`pawn at ${posString} with knight color ${
                Color[pawn.knightColor]
            } => ${Role[expected]}`, () => {
                const actual = getPawnRole(pawn);
                assert.deepStrictEqual(actual, expected);
            });
        });
    });

    const basePawn = {
        player: 0,
        position: { row: 0, col: 0 },
        knightColor: 0,
    };
    testFunc(getPawnRoles, [
        [[{ ...basePawn, knightColor: Color.red }], { 0: 0, 1: 1, 2: 2, 3: 3 }],
        [
            [{ ...basePawn, knightColor: Color.green }],
            { 0: 3, 1: 0, 2: 1, 3: 2 },
        ],
        [
            [{ ...basePawn, knightColor: Color.yellow }],
            { 0: 2, 1: 3, 2: 0, 3: 1 },
        ],
        [
            [{ ...basePawn, knightColor: Color.blue }],
            { 0: 1, 1: 2, 2: 3, 3: 0 },
        ],
    ]);

    describe(createPawns.name, () => {
        [Color.red, Color.green, Color.yellow, Color.blue].forEach((player) => {
            describe(`Player: ${player}`, () => {
                const pawns = createPawns(player);

                it("There should be 4 pawns", () =>
                    assert.strictEqual(pawns.length, 4));

                it("All pawns should be from the same player", () => {
                    pawns.forEach((pawn) =>
                        assert.strictEqual(pawn.player, player),
                    );
                });

                it("Pawns should have different knight colors", () => {
                    const knightColors = pawns.map((pawn) => pawn.knightColor);
                    assert.notStrictEqual(knightColors[0], knightColors[1]);
                    assert.notStrictEqual(knightColors[0], knightColors[2]);
                    assert.notStrictEqual(knightColors[0], knightColors[3]);
                    assert.notStrictEqual(knightColors[1], knightColors[2]);
                    assert.notStrictEqual(knightColors[1], knightColors[3]);
                    assert.notStrictEqual(knightColors[2], knightColors[3]);
                });

                it("No pawns should be at the same position", () => {
                    const positions = pawns.map((pawn) => pawn.position);
                    positions.sort(sortPositions);
                    assert.ok(!isSamePosition(positions[0], positions[1]));
                    assert.ok(!isSamePosition(positions[1], positions[2]));
                    assert.ok(!isSamePosition(positions[2], positions[3]));
                });
            });
        });
    });
});
