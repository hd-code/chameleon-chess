import * as assert from "assert/strict";
import { testFunc } from "./util/testutil";
import { Color } from "./Color";
import {
    GameState,
    createGameState,
    getNextGameStates,
    getPlayersAlive,
    isGameOver,
    isGameState,
    updateGameState,
} from "./GameState";
import { Position } from "./Position";

// -----------------------------------------------------------------------------

interface Move {
    gameState: GameState;
    pawnIndex: number;
    destination: Position;
    expected: GameState;
}

const testMoves: { [name: string]: Move } = {
    normalMove: {
        gameState: {
            limits: { rows: [2, 6], cols: [3, 6] },
            pawns: [
                {
                    player: 2,
                    position: { row: 6, col: 3 },
                    knightColor: 2,
                },
                {
                    player: 3,
                    position: { row: 2, col: 6 },
                    knightColor: 1,
                },
                {
                    player: 3,
                    position: { row: 3, col: 4 },
                    knightColor: 3,
                }, // moves
            ],
            player: 3,
        },
        pawnIndex: 2,
        destination: { row: 4, col: 5 },
        expected: {
            limits: { rows: [2, 6], cols: [3, 6] },
            pawns: [
                {
                    player: 2,
                    position: { row: 6, col: 3 },
                    knightColor: 2,
                },
                {
                    player: 3,
                    position: { row: 2, col: 6 },
                    knightColor: 1,
                },
                {
                    player: 3,
                    position: { row: 4, col: 5 },
                    knightColor: 3,
                }, // moves
            ],
            player: 2,
        },
    },
    shrinkingMove: {
        gameState: {
            limits: { rows: [1, 6], cols: [1, 7] },
            pawns: [
                {
                    player: 1,
                    position: { row: 5, col: 1 },
                    knightColor: 0,
                },
                {
                    player: 1,
                    position: { row: 2, col: 2 },
                    knightColor: 1,
                },
                {
                    player: 2,
                    position: { row: 4, col: 7 },
                    knightColor: 2,
                },
                {
                    player: 2,
                    position: { row: 6, col: 6 },
                    knightColor: 0,
                },
                {
                    player: 3,
                    position: { row: 4, col: 3 },
                    knightColor: 1,
                },
                {
                    player: 3,
                    position: { row: 1, col: 6 },
                    knightColor: 2,
                }, // moves
            ],
            player: 3,
        },
        pawnIndex: 5,
        destination: { row: 3, col: 4 },
        expected: {
            limits: { rows: [2, 6], cols: [1, 7] },
            pawns: [
                {
                    player: 1,
                    position: { row: 5, col: 1 },
                    knightColor: 0,
                },
                {
                    player: 1,
                    position: { row: 2, col: 2 },
                    knightColor: 1,
                },
                {
                    player: 2,
                    position: { row: 4, col: 7 },
                    knightColor: 2,
                },
                {
                    player: 2,
                    position: { row: 6, col: 6 },
                    knightColor: 0,
                },
                {
                    player: 3,
                    position: { row: 4, col: 3 },
                    knightColor: 1,
                },
                {
                    player: 3,
                    position: { row: 3, col: 4 },
                    knightColor: 2,
                }, // moves
            ],
            player: 2,
        },
    },
    beatingMove: {
        gameState: {
            limits: { rows: [1, 6], cols: [1, 7] },
            pawns: [
                {
                    player: 0,
                    position: { row: 4, col: 3 },
                    knightColor: 0,
                }, // moves
                {
                    player: 1,
                    position: { row: 5, col: 1 },
                    knightColor: 0,
                },
                {
                    player: 1,
                    position: { row: 2, col: 2 },
                    knightColor: 1,
                },
                {
                    player: 2,
                    position: { row: 4, col: 7 },
                    knightColor: 2,
                }, // is beaten
                {
                    player: 2,
                    position: { row: 6, col: 6 },
                    knightColor: 0,
                },
                {
                    player: 3,
                    position: { row: 1, col: 6 },
                    knightColor: 2,
                },
            ],
            player: 0,
        },
        pawnIndex: 0,
        destination: { row: 4, col: 7 },
        expected: {
            limits: { rows: [1, 6], cols: [1, 7] },
            pawns: [
                {
                    player: 0,
                    position: { row: 4, col: 7 },
                    knightColor: 0,
                }, // moves
                {
                    player: 1,
                    position: { row: 5, col: 1 },
                    knightColor: 0,
                },
                {
                    player: 1,
                    position: { row: 2, col: 2 },
                    knightColor: 1,
                },
                {
                    player: 2,
                    position: { row: 6, col: 6 },
                    knightColor: 0,
                },
                {
                    player: 3,
                    position: { row: 1, col: 6 },
                    knightColor: 2,
                },
            ],
            player: 3,
        },
    },
    shrinkAndBeatingMove: {
        gameState: {
            limits: { rows: [1, 6], cols: [1, 7] },
            pawns: [
                {
                    player: 0,
                    position: { row: 4, col: 3 },
                    knightColor: 0,
                },
                {
                    player: 1,
                    position: { row: 5, col: 1 },
                    knightColor: 0,
                },
                {
                    player: 1,
                    position: { row: 2, col: 2 },
                    knightColor: 1,
                },
                {
                    player: 2,
                    position: { row: 4, col: 7 },
                    knightColor: 2,
                },
                {
                    player: 2,
                    position: { row: 6, col: 6 },
                    knightColor: 0,
                }, // is beaten
                {
                    player: 3,
                    position: { row: 1, col: 6 },
                    knightColor: 1,
                }, // moves
            ],
            player: 3,
        },
        pawnIndex: 5,
        destination: { row: 6, col: 6 },
        expected: {
            limits: { rows: [2, 6], cols: [1, 7] },
            pawns: [
                {
                    player: 0,
                    position: { row: 4, col: 3 },
                    knightColor: 0,
                },
                {
                    player: 1,
                    position: { row: 5, col: 1 },
                    knightColor: 0,
                },
                {
                    player: 1,
                    position: { row: 2, col: 2 },
                    knightColor: 1,
                },
                {
                    player: 2,
                    position: { row: 4, col: 7 },
                    knightColor: 2,
                },
                {
                    player: 3,
                    position: { row: 6, col: 6 },
                    knightColor: 1,
                }, // moves
            ],
            player: 2,
        },
    },
    shrinkToSmallestMove: {
        gameState: {
            limits: { rows: [3, 6], cols: [1, 4] },
            pawns: [
                {
                    player: 1,
                    position: { row: 5, col: 3 },
                    knightColor: 2,
                },
                {
                    player: 2,
                    position: { row: 3, col: 4 },
                    knightColor: 2,
                },
                {
                    player: 3,
                    position: { row: 6, col: 1 },
                    knightColor: 0,
                }, // moves
            ],
            player: 3,
        },
        pawnIndex: 2,
        destination: { row: 4, col: 3 },
        expected: {
            limits: { rows: [3, 5], cols: [2, 4] },
            pawns: [
                {
                    player: 1,
                    position: { row: 5, col: 3 },
                    knightColor: 2,
                },
                {
                    player: 2,
                    position: { row: 3, col: 4 },
                    knightColor: 2,
                },
                {
                    player: 3,
                    position: { row: 4, col: 3 },
                    knightColor: 0,
                }, // moves
            ],
            player: 2,
        },
    },
    shrinkToSmallestAndBeatingMove: {
        gameState: {
            limits: { rows: [3, 5], cols: [2, 7] },
            pawns: [
                {
                    player: 0,
                    position: { row: 4, col: 3 },
                    knightColor: 1,
                },
                {
                    player: 2,
                    position: { row: 5, col: 7 },
                    knightColor: 0,
                }, // moves
                {
                    player: 3,
                    position: { row: 5, col: 3 },
                    knightColor: 0,
                }, // is beaten
            ],
            player: 2,
        },
        pawnIndex: 1,
        destination: { row: 5, col: 3 },
        expected: {
            limits: { rows: [3, 5], cols: [2, 4] },
            pawns: [
                {
                    player: 0,
                    position: { row: 4, col: 3 },
                    knightColor: 1,
                },
                {
                    player: 2,
                    position: { row: 5, col: 3 },
                    knightColor: 0,
                }, // moves
            ],
            player: 0,
        },
    },
    normalMoveOnSmallestBoard: {
        gameState: {
            limits: { rows: [5, 7], cols: [1, 3] },
            pawns: [
                {
                    player: 0,
                    position: { row: 5, col: 2 },
                    knightColor: 0,
                },
                {
                    player: 2,
                    position: { row: 6, col: 1 },
                    knightColor: 2,
                }, // moves
            ],
            player: 2,
        },
        pawnIndex: 1,
        destination: { row: 7, col: 3 },
        expected: {
            limits: { rows: [5, 7], cols: [1, 3] },
            pawns: [
                {
                    player: 0,
                    position: { row: 5, col: 2 },
                    knightColor: 0,
                },
                {
                    player: 2,
                    position: { row: 7, col: 3 },
                    knightColor: 2,
                }, // moves
            ],
            player: 0,
        },
    },
    beatingMoveOnSmallestBoard: {
        gameState: {
            limits: { rows: [5, 7], cols: [1, 3] },
            pawns: [
                {
                    player: 0,
                    position: { row: 5, col: 2 },
                    knightColor: 0,
                }, // moves
                {
                    player: 2,
                    position: { row: 6, col: 1 },
                    knightColor: 2,
                }, // is beaten
            ],
            player: 0,
        },
        pawnIndex: 0,
        destination: { row: 6, col: 1 },
        expected: {
            limits: { rows: [5, 7], cols: [1, 3] },
            pawns: [
                {
                    player: 0,
                    position: { row: 6, col: 1 },
                    knightColor: 0,
                }, // moves
            ],
            player: 0,
        },
    },
    deadlockMoveOnSmallestBoard: {
        gameState: {
            limits: { rows: [3, 5], cols: [3, 5] },
            pawns: [
                {
                    player: 0,
                    position: { row: 3, col: 5 },
                    knightColor: 1,
                },
                {
                    player: 1,
                    position: { row: 3, col: 3 },
                    knightColor: 0,
                }, // moves, becomes knight
            ],
            player: 1,
        },
        pawnIndex: 1,
        destination: { row: 4, col: 4 },
        expected: {
            limits: { rows: [3, 5], cols: [3, 5] },
            pawns: [
                {
                    player: 0,
                    position: { row: 3, col: 5 },
                    knightColor: 1,
                },
            ],
            player: 0,
        },
    },
    shrinkingToDeadlockMove: {
        gameState: {
            limits: { rows: [2, 4], cols: [0, 5] },
            pawns: [
                {
                    player: 1,
                    position: { row: 3, col: 4 },
                    knightColor: 1,
                }, // Knight, is beaten
                {
                    player: 1,
                    position: { row: 4, col: 3 },
                    knightColor: 2,
                }, // Queen
                {
                    player: 2,
                    position: { row: 2, col: 5 },
                    knightColor: 3,
                }, // Knight
                {
                    player: 2,
                    position: { row: 3, col: 0 },
                    knightColor: 1,
                }, // Queen, becomes Knight and is removed too
            ],
            player: 2,
        },
        pawnIndex: 3,
        destination: { row: 3, col: 4 },
        expected: {
            limits: { rows: [2, 4], cols: [3, 5] },
            pawns: [
                {
                    player: 1,
                    position: { row: 4, col: 3 },
                    knightColor: 2,
                }, // Queen
                {
                    player: 2,
                    position: { row: 2, col: 5 },
                    knightColor: 3,
                }, // Knight
            ],
            player: 1,
        },
    },
    trapOpponentInDeadlockMove: {
        gameState: {
            limits: { rows: [2, 4], cols: [0, 5] },
            pawns: [
                {
                    player: 0,
                    position: { row: 3, col: 4 },
                    knightColor: 1,
                }, // Knight, will be trapped
                {
                    player: 0,
                    position: { row: 4, col: 3 },
                    knightColor: 2,
                }, // Queen
                {
                    player: 2,
                    position: { row: 2, col: 5 },
                    knightColor: 3,
                }, // Knight
                {
                    player: 2,
                    position: { row: 3, col: 0 },
                    knightColor: 1,
                }, // Queen, moves
            ],
            player: 2,
        },
        pawnIndex: 3,
        destination: { row: 3, col: 3 },
        expected: {
            limits: { rows: [2, 4], cols: [3, 5] },
            pawns: [
                {
                    player: 0,
                    position: { row: 4, col: 3 },
                    knightColor: 2,
                }, // Queen
                {
                    player: 2,
                    position: { row: 2, col: 5 },
                    knightColor: 3,
                }, // Knight
                {
                    player: 2,
                    position: { row: 3, col: 3 },
                    knightColor: 1,
                }, // Queen, moves
            ],
            player: 0,
        },
    },
    deadlockMoveButWinning: {
        gameState: {
            limits: { rows: [2, 4], cols: [4, 6] },
            pawns: [
                {
                    player: 0,
                    position: { row: 4, col: 4 },
                    knightColor: 2,
                }, // Bishop, becomes knight !
                {
                    player: 3,
                    position: { row: 3, col: 5 },
                    knightColor: 1,
                }, // Queen, is beaten
            ],
            player: 0,
        },
        pawnIndex: 0,
        destination: { row: 3, col: 5 },
        expected: {
            limits: { rows: [2, 4], cols: [4, 6] },
            pawns: [
                {
                    player: 0,
                    position: { row: 3, col: 5 },
                    knightColor: 2,
                }, // Bishop, becomes knight !
            ],
            player: 0,
        },
    },
};

// -----------------------------------------------------------------------------

describe("GameState", () => {
    describe(isGameState.name, () => {
        for (const name in testMoves) {
            const { gameState } = testMoves[name];
            it(name + " GameState should work", () => {
                const actual = isGameState(gameState);
                assert.ok(actual);
            });
        }

        it("should fail on double pawn", () => {
            const { gameState: gs, pawnIndex: i } = testMoves.normalMove;
            const actual = isGameState({
                ...gs,
                pawns: [...gs.pawns, gs.pawns[i]],
            });
            assert.equal(actual, false);
        });

        it("should fail on pawn outside of the limits", () => {
            const { gameState: gs, pawnIndex: i } = testMoves.normalMove;
            const wrongPawn = { ...gs.pawns[i] };
            wrongPawn.position = { ...wrongPawn.position };
            wrongPawn.position.col = gs.limits.cols[1] + 1;
            const actual = isGameState({
                ...gs,
                pawns: [...gs.pawns, wrongPawn],
            });
            assert.equal(actual, false);
        });
    });

    testFunc(isGameOver, {
        "normal game state": [[testMoves.normalMove.gameState], false],
        "start game state": [[createGameState(true, true, true, true)], false],
        "only blue pawns": [
            [
                {
                    ...testMoves.normalMove.gameState,
                    pawns: testMoves.normalMove.gameState.pawns.filter(
                        (pawn) => pawn.player === Color.blue,
                    ),
                },
            ],
            true,
        ],
        "no pawns": [[{ ...testMoves.normalMove.gameState, pawns: [] }], true],
        "just one pawn": [
            [
                {
                    ...testMoves.normalMove.gameState,
                    pawns: [testMoves.normalMove.gameState.pawns[0]],
                },
            ],
            true,
        ],
    });

    testFunc(getPlayersAlive, {
        "red and green": [
            [createGameState(true, true, false, false)],
            { 0: true, 1: true, 2: false, 3: false },
        ],
        "all players": [
            [createGameState(true, true, true, true)],
            { 0: true, 1: true, 2: true, 3: true },
        ],
        "only a yellow pawn": [
            [
                {
                    ...createGameState(false, false, true, true),
                    pawns: [testMoves.normalMove.gameState.pawns[0]],
                },
            ],
            { 0: false, 1: false, 2: true, 3: false },
        ],
    });

    describe(createGameState.name, () => {
        [
            [[true, true, true, true], 16, false],
            [[true, true, false, true], 12, false],
            [[true, false, true, false], 8, false],
            [[true, false, false, false], 4, true],
            [[false, true, false, false], 4, true],
        ].forEach(([a, numOfPawns, gameOver]) => {
            it(`${a} => nOfPawns: ${numOfPawns}, isOver: ${gameOver}`, () => {
                const gs = createGameState(
                    ...(a as [boolean, boolean, boolean, boolean]),
                );
                assert.equal(gs.pawns.length, numOfPawns);
                assert.equal(isGameOver(gs), gameOver);
            });
        });
    });

    describe(updateGameState.name, () => {
        for (const name in testMoves) {
            const { gameState, pawnIndex, destination, expected } =
                testMoves[name];
            it(name, () => {
                const actual = updateGameState(
                    gameState,
                    pawnIndex,
                    destination,
                );
                assert.deepEqual(actual, expected);
            });
        }

        it("should fail on invalid pawn index", () => {
            const { gameState, destination } = testMoves.normalMove;
            const actual = updateGameState(
                gameState,
                gameState.pawns.length,
                destination,
            );
            assert.equal(actual, null);
        });

        it("should fail on unreachable destination", () => {
            const { gameState, pawnIndex } = testMoves.normalMove;
            const actual = updateGameState(gameState, pawnIndex, {
                row: 0,
                col: 0,
            });
            assert.equal(actual, null);
        });
    });

    describe(getNextGameStates.name, () => {
        const gs = createGameState(true, true, true, true);
        const nextGSs = getNextGameStates(gs);

        it("should return 13 game states for start game state", () => {
            assert.equal(nextGSs.length, 13);
        });

        it("should return an array of valid game states", () => {
            nextGSs.forEach((gs) => assert.ok(isGameState(gs)));
        });

        it("all game states should differ from input", () => {
            nextGSs.forEach((nextGS) => assert.notDeepEqual(nextGS, gs));
        });

        it("all game states should have player blue on turn", () => {
            nextGSs.forEach((gs) => assert.equal(gs.player, Color.blue));
        });
    });
});
