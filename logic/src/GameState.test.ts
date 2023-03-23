import * as assert from "assert/strict";
import { Color } from "./Color";
import { GameState } from "./GameState";
import { Limits } from "./Limits";
import { Pawn } from "./Pawn";
import { Position } from "./Position";

describe(GameState.name, function () {
    describe(GameState.create.name, function () {
        const testCases: [
            [boolean, boolean, boolean, boolean],
            GameState | null,
        ][] = [
            [[false, false, false, false], null],
            [
                [true, false, false, false],
                new GameState(
                    Pawn.getInitial(Color.red),
                    new Limits(new Position(5, 0), new Position(7, 3)),
                    Color.red,
                ),
            ],
            [
                [false, true, false, false],
                new GameState(
                    Pawn.getInitial(Color.green),
                    new Limits(new Position(4, 5), new Position(7, 7)),
                    Color.green,
                ),
            ],
            [
                [false, false, true, false],
                new GameState(
                    Pawn.getInitial(Color.yellow),
                    new Limits(new Position(0, 4), new Position(2, 7)),
                    Color.yellow,
                ),
            ],
            [
                [false, false, false, true],
                new GameState(
                    Pawn.getInitial(Color.blue),
                    new Limits(new Position(0, 0), new Position(3, 2)),
                    Color.blue,
                ),
            ],
            [
                [true, false, true, false],
                new GameState(
                    [0, 2].flatMap((p) => Pawn.getInitial(p)),
                    Limits.default(),
                    Color.red,
                ),
            ],
            [
                [false, true, false, true],
                new GameState(
                    [1, 3].flatMap((p) => Pawn.getInitial(p)),
                    Limits.default(),
                    Color.blue,
                ),
            ],
            [
                [true, false, true, true],
                new GameState(
                    [0, 2, 3].flatMap((p) => Pawn.getInitial(p)),
                    Limits.default(),
                    Color.red,
                ),
            ],
            [
                [false, true, true, true],
                new GameState(
                    [1, 2, 3].flatMap((p) => Pawn.getInitial(p)),
                    Limits.default(),
                    Color.blue,
                ),
            ],
            [
                [true, true, true, true],
                new GameState(
                    [0, 1, 2, 3].flatMap((p) => Pawn.getInitial(p)),
                    Limits.default(),
                    Color.red,
                ),
            ],
        ];
        testCases.forEach(([args, want]) =>
            it(`create(${args})`, function () {
                if (want === null) {
                    assert.throws(() => GameState.create(...args));
                } else {
                    const got = GameState.create(...args);
                    assert.deepEqual(got, want);
                }
            }),
        );
    });

    const pawns = [
        new Pawn(Color.red, Color.red, new Position(7, 0)),
        new Pawn(Color.red, Color.yellow, new Position(7, 1)),
        new Pawn(Color.yellow, Color.yellow, new Position(0, 7)),
        new Pawn(Color.green, Color.green, new Position(3, 4)),
    ];
    const limits = Limits.default();
    const sampleGameState = new GameState(pawns, limits, Color.red);

    describe(GameState.prototype.getPawn.name, function () {
        it("success", function () {
            const pawn = pawns[3];
            const got = sampleGameState.getPawn(pawn.id);
            assert.deepEqual(got, pawn);
        });
        it("unknown", function () {
            assert.throws(() => sampleGameState.getPawn("unknown"));
        });
    });
    describe(GameState.prototype.getPawnAt.name, function () {
        it("success", function () {
            const pawn = pawns[3];
            const got = sampleGameState.getPawnAt(pawn.position);
            assert.deepEqual(got, pawn);
        });
        it("empty field", function () {
            assert.throws(() => sampleGameState.getPawnAt(new Position(2, 2)));
        });
    });
    describe(GameState.prototype.getPawnMoves.name, function () {
        it("success", function () {
            const pawn = pawns[0];
            const want = [new Position(5, 1), new Position(6, 2)];
            want.sort(Position.sort);
            const got = sampleGameState.getPawnMoves(pawn.id);
            got.sort(Position.sort);
            assert.deepEqual(got, want);
        });
        it("unknown", function () {
            assert.throws(() => sampleGameState.getPawnMoves("unknown"));
        });
    });

    describe(GameState.prototype.getPlayers.name, function () {
        Object.entries({
            "sample GameState": {
                gameState: sampleGameState,
                want: [Color.red, Color.yellow, Color.green],
            },
            "red, green & yellow pawns": {
                gameState: GameState.create(true, true, true, false),
                want: [Color.red, Color.green, Color.yellow],
            },
            "red & blue pawns": {
                gameState: GameState.create(true, false, false, true),
                want: [Color.red, Color.blue],
            },
            "green pawns": {
                gameState: GameState.create(false, true, false, false),
                want: [Color.green],
            },
            "no pawns": {
                gameState: new GameState([], Limits.default(), Color.red),
                want: [],
            },
        }).forEach(([name, tc]) => {
            it(name, function () {
                tc.want.sort();
                const got = tc.gameState.getPlayers();
                assert.deepEqual(got, tc.want);
            });
        });
    });

    describe(GameState.prototype.isGameOver.name, function () {
        Object.entries({
            "sample GameState": {
                gameState: sampleGameState,
                want: false,
            },
            "3 players": {
                gameState: GameState.create(true, false, true, true),
                want: false,
            },
            "2 players": {
                gameState: GameState.create(true, false, true, false),
                want: false,
            },
            "1 player": {
                gameState: GameState.create(true, false, false, false),
                want: true,
            },
            "no players": {
                gameState: new GameState([], Limits.default(), Color.red),
                want: true,
            },
        }).forEach(([name, tc]) => {
            it(name, function () {
                const got = tc.gameState.isGameOver();
                assert.equal(got, tc.want);
            });
        });
    });

    describe(GameState.prototype.makeMove.name, function () {
        const gs2Players = GameState.create(true, false, true, false);
        const gsSample = new GameState(
            [
                new Pawn(Color.green, Color.red, new Position(6, 6)),
                new Pawn(Color.green, Color.blue, new Position(6, 3)),
                new Pawn(Color.yellow, Color.red, new Position(4, 4)),
                new Pawn(Color.yellow, Color.green, new Position(3, 6)),
            ],
            new Limits(new Position(3, 3), new Position(6, 6)),
            Color.green,
        );

        Object.entries({
            normalMove: {
                gameState: gs2Players,
                pawnId: "rg",
                destination: new Position(5, 0),
                want: new GameState(
                    gs2Players.pawns.map((p) =>
                        p.id !== "rg" ? p : p.setPosition(new Position(5, 0)),
                    ),
                    gs2Players.limits,
                    Color.yellow,
                ),
            },
            shrinkingMove: {
                gameState: gs2Players,
                pawnId: "rr",
                destination: new Position(5, 1),
                want: new GameState(
                    gs2Players.pawns.map((p) =>
                        p.id !== "rr" ? p : p.setPosition(new Position(5, 1)),
                    ),
                    new Limits(new Position(0, 1), new Position(7, 7)),
                    Color.yellow,
                ),
            },
            beatingMove: {
                gameState: gsSample,
                pawnId: "gr",
                destination: new Position(3, 6),
                want: new GameState(
                    gsSample.pawns
                        .map((p) =>
                            p.id !== "gr"
                                ? p
                                : p.setPosition(new Position(3, 6)),
                        )
                        .filter((p) => p.id !== "yg"),
                    gsSample.limits,
                    Color.yellow,
                ),
            },
            beatingAndShrinkingMove: {
                gameState: gsSample,
                pawnId: "gb",
                destination: new Position(3, 6),
                want: new GameState(
                    gsSample.pawns
                        .map((p) =>
                            p.id !== "gb"
                                ? p
                                : p.setPosition(new Position(3, 6)),
                        )
                        .filter((p) => p.id !== "yg"),
                    new Limits(new Position(3, 4), new Position(6, 6)),
                    Color.yellow,
                ),
            },
            shrinkToSmallest: {
                gameState: new GameState(
                    [
                        new Pawn(Color.green, Color.blue, new Position(6, 3)),
                        new Pawn(Color.yellow, Color.green, new Position(3, 6)),
                    ],
                    new Limits(new Position(3, 3), new Position(6, 6)),
                    Color.green,
                ),
                pawnId: "gb",
                destination: new Position(5, 4),
                want: new GameState(
                    [
                        new Pawn(Color.green, Color.blue, new Position(5, 4)),
                        new Pawn(Color.yellow, Color.green, new Position(3, 6)),
                    ],
                    new Limits(new Position(3, 4), new Position(5, 6)),
                    Color.yellow,
                ),
            },
            shrinkToSmallestAndDisappearInDeadlock: {
                gameState: new GameState(
                    [
                        new Pawn(Color.green, Color.blue, new Position(6, 3)),
                        new Pawn(Color.yellow, Color.green, new Position(3, 6)),
                    ],
                    new Limits(new Position(3, 3), new Position(6, 6)),
                    Color.green,
                ),
                pawnId: "gb",
                destination: new Position(4, 5),
                want: new GameState(
                    [new Pawn(Color.yellow, Color.green, new Position(3, 6))],
                    new Limits(new Position(3, 4), new Position(5, 6)),
                    Color.yellow,
                ),
            },
            shrinkToSmallestEnemyDisappearsInDeadlock: {
                gameState: new GameState(
                    [
                        new Pawn(Color.green, Color.blue, new Position(6, 3)),
                        new Pawn(Color.yellow, Color.blue, new Position(4, 5)),
                        new Pawn(Color.yellow, Color.green, new Position(3, 6)),
                    ],
                    new Limits(new Position(3, 3), new Position(6, 6)),
                    Color.green,
                ),
                pawnId: "gb",
                destination: new Position(5, 4),
                want: new GameState(
                    [
                        new Pawn(Color.green, Color.blue, new Position(5, 4)),
                        new Pawn(Color.yellow, Color.green, new Position(3, 6)),
                    ],
                    new Limits(new Position(3, 4), new Position(5, 6)),
                    Color.yellow,
                ),
            },
        }).forEach(([name, tc]) =>
            it(name, function () {
                const got = tc.gameState.makeMove(tc.pawnId, tc.destination);
                assert.deepEqual(got, tc.want);
            }),
        );

        Object.entries({
            invalidMove_invalidId: {
                pawnId: "unknown",
                destination: new Position(0, 0),
            },
            invalidMove_pawnNonExisting: {
                pawnId: "bb",
                destination: new Position(0, 0),
            },
            invalidMove_wrongPlayer: {
                pawnId: "yr",
                destination: new Position(2, 4),
            },
            invalidMove_invalidDestination: {
                pawnId: "rr",
                destination: new Position(0, 0),
            },
        }).forEach(([name, tc]) =>
            it(name, function () {
                assert.throws(() =>
                    gs2Players.makeMove(tc.pawnId, tc.destination),
                );
            }),
        );
    });

    describe(GameState.prototype.getNext.name, function () {
        Object.entries({
            "start GameState": {
                gameState: GameState.create(true, true, true, true),
                nMoves: 13,
            },
            "sample GameState": { gameState: sampleGameState, nMoves: 15 },
        }).forEach(([name, tc]) =>
            it(name, function () {
                const got = tc.gameState.getNext();
                assert.equal(got.length, tc.nMoves);
                got.forEach((ggs, i) =>
                    assert.notDeepEqual(
                        ggs,
                        tc.gameState,
                        `failed for ${i}. move`,
                    ),
                );
            }),
        );
    });
});
