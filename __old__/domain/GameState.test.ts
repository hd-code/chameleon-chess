import * as assert from "assert";
import { Color } from "./Color";
import {
    createGameState,
    GameState,
    getNextGameStates,
    isGameOver,
    isGameState,
    updateGameState,
} from "./GameState";
import { Position } from "./Position";
import { testFunc } from "../util/testutil";

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
            limits: { row: { min: 2, max: 6 }, col: { min: 3, max: 6 } },
            pawns: [
                {
                    playerColor: 2,
                    position: { row: 6, col: 3 },
                    knightColor: 2,
                },
                {
                    playerColor: 3,
                    position: { row: 2, col: 6 },
                    knightColor: 1,
                },
                {
                    playerColor: 3,
                    position: { row: 3, col: 4 },
                    knightColor: 3,
                }, // moves
            ],
            currentPlayer: 3,
        },
        pawnIndex: 2,
        destination: { row: 4, col: 5 },
        expected: {
            limits: { row: { min: 2, max: 6 }, col: { min: 3, max: 6 } },
            pawns: [
                {
                    playerColor: 2,
                    position: { row: 6, col: 3 },
                    knightColor: 2,
                },
                {
                    playerColor: 3,
                    position: { row: 2, col: 6 },
                    knightColor: 1,
                },
                {
                    playerColor: 3,
                    position: { row: 4, col: 5 },
                    knightColor: 3,
                }, // moves
            ],
            currentPlayer: 2,
        },
    },
    shrinkingMove: {
        gameState: {
            limits: { row: { min: 1, max: 6 }, col: { min: 1, max: 7 } },
            pawns: [
                {
                    playerColor: 1,
                    position: { row: 5, col: 1 },
                    knightColor: 0,
                },
                {
                    playerColor: 1,
                    position: { row: 2, col: 2 },
                    knightColor: 1,
                },
                {
                    playerColor: 2,
                    position: { row: 4, col: 7 },
                    knightColor: 2,
                },
                {
                    playerColor: 2,
                    position: { row: 6, col: 6 },
                    knightColor: 0,
                },
                {
                    playerColor: 3,
                    position: { row: 4, col: 3 },
                    knightColor: 1,
                },
                {
                    playerColor: 3,
                    position: { row: 1, col: 6 },
                    knightColor: 2,
                }, // moves
            ],
            currentPlayer: 3,
        },
        pawnIndex: 5,
        destination: { row: 3, col: 4 },
        expected: {
            limits: { row: { min: 2, max: 6 }, col: { min: 1, max: 7 } },
            pawns: [
                {
                    playerColor: 1,
                    position: { row: 5, col: 1 },
                    knightColor: 0,
                },
                {
                    playerColor: 1,
                    position: { row: 2, col: 2 },
                    knightColor: 1,
                },
                {
                    playerColor: 2,
                    position: { row: 4, col: 7 },
                    knightColor: 2,
                },
                {
                    playerColor: 2,
                    position: { row: 6, col: 6 },
                    knightColor: 0,
                },
                {
                    playerColor: 3,
                    position: { row: 4, col: 3 },
                    knightColor: 1,
                },
                {
                    playerColor: 3,
                    position: { row: 3, col: 4 },
                    knightColor: 2,
                }, // moves
            ],
            currentPlayer: 2,
        },
    },
    beatingMove: {
        gameState: {
            limits: { row: { min: 1, max: 6 }, col: { min: 1, max: 7 } },
            pawns: [
                {
                    playerColor: 0,
                    position: { row: 4, col: 3 },
                    knightColor: 0,
                }, // moves
                {
                    playerColor: 1,
                    position: { row: 5, col: 1 },
                    knightColor: 0,
                },
                {
                    playerColor: 1,
                    position: { row: 2, col: 2 },
                    knightColor: 1,
                },
                {
                    playerColor: 2,
                    position: { row: 4, col: 7 },
                    knightColor: 2,
                }, // is beaten
                {
                    playerColor: 2,
                    position: { row: 6, col: 6 },
                    knightColor: 0,
                },
                {
                    playerColor: 3,
                    position: { row: 1, col: 6 },
                    knightColor: 2,
                },
            ],
            currentPlayer: 0,
        },
        pawnIndex: 0,
        destination: { row: 4, col: 7 },
        expected: {
            limits: { row: { min: 1, max: 6 }, col: { min: 1, max: 7 } },
            pawns: [
                {
                    playerColor: 0,
                    position: { row: 4, col: 7 },
                    knightColor: 0,
                }, // moves
                {
                    playerColor: 1,
                    position: { row: 5, col: 1 },
                    knightColor: 0,
                },
                {
                    playerColor: 1,
                    position: { row: 2, col: 2 },
                    knightColor: 1,
                },
                {
                    playerColor: 2,
                    position: { row: 6, col: 6 },
                    knightColor: 0,
                },
                {
                    playerColor: 3,
                    position: { row: 1, col: 6 },
                    knightColor: 2,
                },
            ],
            currentPlayer: 3,
        },
    },
    shrinkAndBeatingMove: {
        gameState: {
            limits: { row: { min: 1, max: 6 }, col: { min: 1, max: 7 } },
            pawns: [
                {
                    playerColor: 0,
                    position: { row: 4, col: 3 },
                    knightColor: 0,
                },
                {
                    playerColor: 1,
                    position: { row: 5, col: 1 },
                    knightColor: 0,
                },
                {
                    playerColor: 1,
                    position: { row: 2, col: 2 },
                    knightColor: 1,
                },
                {
                    playerColor: 2,
                    position: { row: 4, col: 7 },
                    knightColor: 2,
                },
                {
                    playerColor: 2,
                    position: { row: 6, col: 6 },
                    knightColor: 0,
                }, // is beaten
                {
                    playerColor: 3,
                    position: { row: 1, col: 6 },
                    knightColor: 1,
                }, // moves
            ],
            currentPlayer: 3,
        },
        pawnIndex: 5,
        destination: { row: 6, col: 6 },
        expected: {
            limits: { row: { min: 2, max: 6 }, col: { min: 1, max: 7 } },
            pawns: [
                {
                    playerColor: 0,
                    position: { row: 4, col: 3 },
                    knightColor: 0,
                },
                {
                    playerColor: 1,
                    position: { row: 5, col: 1 },
                    knightColor: 0,
                },
                {
                    playerColor: 1,
                    position: { row: 2, col: 2 },
                    knightColor: 1,
                },
                {
                    playerColor: 2,
                    position: { row: 4, col: 7 },
                    knightColor: 2,
                },
                {
                    playerColor: 3,
                    position: { row: 6, col: 6 },
                    knightColor: 1,
                }, // moves
            ],
            currentPlayer: 2,
        },
    },
    shrinkToSmallestMove: {
        gameState: {
            limits: { row: { min: 3, max: 6 }, col: { min: 1, max: 4 } },
            pawns: [
                {
                    playerColor: 1,
                    position: { row: 5, col: 3 },
                    knightColor: 2,
                },
                {
                    playerColor: 2,
                    position: { row: 3, col: 4 },
                    knightColor: 2,
                },
                {
                    playerColor: 3,
                    position: { row: 6, col: 1 },
                    knightColor: 0,
                }, // moves
            ],
            currentPlayer: 3,
        },
        pawnIndex: 2,
        destination: { row: 4, col: 3 },
        expected: {
            limits: { row: { min: 3, max: 5 }, col: { min: 2, max: 4 } },
            pawns: [
                {
                    playerColor: 1,
                    position: { row: 5, col: 3 },
                    knightColor: 2,
                },
                {
                    playerColor: 2,
                    position: { row: 3, col: 4 },
                    knightColor: 2,
                },
                {
                    playerColor: 3,
                    position: { row: 4, col: 3 },
                    knightColor: 0,
                }, // moves
            ],
            currentPlayer: 2,
        },
    },
    shrinkToSmallestAndBeatingMove: {
        gameState: {
            limits: { row: { min: 3, max: 5 }, col: { min: 2, max: 7 } },
            pawns: [
                {
                    playerColor: 0,
                    position: { row: 4, col: 3 },
                    knightColor: 1,
                },
                {
                    playerColor: 2,
                    position: { row: 5, col: 7 },
                    knightColor: 0,
                }, // moves
                {
                    playerColor: 3,
                    position: { row: 5, col: 3 },
                    knightColor: 0,
                }, // is beaten
            ],
            currentPlayer: 2,
        },
        pawnIndex: 1,
        destination: { row: 5, col: 3 },
        expected: {
            limits: { row: { min: 3, max: 5 }, col: { min: 2, max: 4 } },
            pawns: [
                {
                    playerColor: 0,
                    position: { row: 4, col: 3 },
                    knightColor: 1,
                },
                {
                    playerColor: 2,
                    position: { row: 5, col: 3 },
                    knightColor: 0,
                }, // moves
            ],
            currentPlayer: 0,
        },
    },
    normalMoveOnSmallestBoard: {
        gameState: {
            limits: { row: { min: 5, max: 7 }, col: { min: 1, max: 3 } },
            pawns: [
                {
                    playerColor: 0,
                    position: { row: 5, col: 2 },
                    knightColor: 0,
                },
                {
                    playerColor: 2,
                    position: { row: 6, col: 1 },
                    knightColor: 2,
                }, // moves
            ],
            currentPlayer: 2,
        },
        pawnIndex: 1,
        destination: { row: 7, col: 3 },
        expected: {
            limits: { row: { min: 5, max: 7 }, col: { min: 1, max: 3 } },
            pawns: [
                {
                    playerColor: 0,
                    position: { row: 5, col: 2 },
                    knightColor: 0,
                },
                {
                    playerColor: 2,
                    position: { row: 7, col: 3 },
                    knightColor: 2,
                }, // moves
            ],
            currentPlayer: 0,
        },
    },
    beatingMoveOnSmallestBoard: {
        gameState: {
            limits: { row: { min: 5, max: 7 }, col: { min: 1, max: 3 } },
            pawns: [
                {
                    playerColor: 0,
                    position: { row: 5, col: 2 },
                    knightColor: 0,
                }, // moves
                {
                    playerColor: 2,
                    position: { row: 6, col: 1 },
                    knightColor: 2,
                }, // is beaten
            ],
            currentPlayer: 0,
        },
        pawnIndex: 0,
        destination: { row: 6, col: 1 },
        expected: {
            limits: { row: { min: 5, max: 7 }, col: { min: 1, max: 3 } },
            pawns: [
                {
                    playerColor: 0,
                    position: { row: 6, col: 1 },
                    knightColor: 0,
                }, // moves
            ],
            currentPlayer: 0,
        },
    },
    deadlockMoveOnSmallestBoard: {
        gameState: {
            limits: { row: { min: 3, max: 5 }, col: { min: 3, max: 5 } },
            pawns: [
                {
                    playerColor: 0,
                    position: { row: 3, col: 5 },
                    knightColor: 1,
                },
                {
                    playerColor: 1,
                    position: { row: 3, col: 3 },
                    knightColor: 0,
                }, // moves, becomes knight
            ],
            currentPlayer: 1,
        },
        pawnIndex: 1,
        destination: { row: 4, col: 4 },
        expected: {
            limits: { row: { min: 3, max: 5 }, col: { min: 3, max: 5 } },
            pawns: [
                {
                    playerColor: 0,
                    position: { row: 3, col: 5 },
                    knightColor: 1,
                },
            ],
            currentPlayer: 0,
        },
    },
    shrinkingToDeadlockMove: {
        gameState: {
            limits: { row: { min: 2, max: 4 }, col: { min: 0, max: 5 } },
            pawns: [
                {
                    playerColor: 1,
                    position: { row: 3, col: 4 },
                    knightColor: 1,
                }, // Knight, is beaten
                {
                    playerColor: 1,
                    position: { row: 4, col: 3 },
                    knightColor: 2,
                }, // Queen
                {
                    playerColor: 2,
                    position: { row: 2, col: 5 },
                    knightColor: 3,
                }, // Knight
                {
                    playerColor: 2,
                    position: { row: 3, col: 0 },
                    knightColor: 1,
                }, // Queen, becomes Knight and is removed too
            ],
            currentPlayer: 2,
        },
        pawnIndex: 3,
        destination: { row: 3, col: 4 },
        expected: {
            limits: { row: { min: 2, max: 4 }, col: { min: 3, max: 5 } },
            pawns: [
                {
                    playerColor: 1,
                    position: { row: 4, col: 3 },
                    knightColor: 2,
                }, // Queen
                {
                    playerColor: 2,
                    position: { row: 2, col: 5 },
                    knightColor: 3,
                }, // Knight
            ],
            currentPlayer: 1,
        },
    },
    trapOpponentInDeadlockMove: {
        gameState: {
            limits: { row: { min: 2, max: 4 }, col: { min: 0, max: 5 } },
            pawns: [
                {
                    playerColor: 0,
                    position: { row: 3, col: 4 },
                    knightColor: 1,
                }, // Knight, will be trapped
                {
                    playerColor: 0,
                    position: { row: 4, col: 3 },
                    knightColor: 2,
                }, // Queen
                {
                    playerColor: 2,
                    position: { row: 2, col: 5 },
                    knightColor: 3,
                }, // Knight
                {
                    playerColor: 2,
                    position: { row: 3, col: 0 },
                    knightColor: 1,
                }, // Queen, moves
            ],
            currentPlayer: 2,
        },
        pawnIndex: 3,
        destination: { row: 3, col: 3 },
        expected: {
            limits: { row: { min: 2, max: 4 }, col: { min: 3, max: 5 } },
            pawns: [
                {
                    playerColor: 0,
                    position: { row: 4, col: 3 },
                    knightColor: 2,
                }, // Queen
                {
                    playerColor: 2,
                    position: { row: 2, col: 5 },
                    knightColor: 3,
                }, // Knight
                {
                    playerColor: 2,
                    position: { row: 3, col: 3 },
                    knightColor: 1,
                }, // Queen, moves
            ],
            currentPlayer: 0,
        },
    },
    deadlockMoveButWinning: {
        gameState: {
            limits: { row: { min: 2, max: 4 }, col: { min: 4, max: 6 } },
            pawns: [
                {
                    playerColor: 0,
                    position: { row: 4, col: 4 },
                    knightColor: 2,
                }, // Bishop, becomes knight !
                {
                    playerColor: 3,
                    position: { row: 3, col: 5 },
                    knightColor: 1,
                }, // Queen, is beaten
            ],
            currentPlayer: 0,
        },
        pawnIndex: 0,
        destination: { row: 3, col: 5 },
        expected: {
            limits: { row: { min: 2, max: 4 }, col: { min: 4, max: 6 } },
            pawns: [
                {
                    playerColor: 0,
                    position: { row: 3, col: 5 },
                    knightColor: 2,
                }, // Bishop, becomes knight !
            ],
            currentPlayer: 0,
        },
    },
};

// -----------------------------------------------------------------------------

describe("GameState", () => {
    it(isGameState.name);

    describe(getNextGameStates.name, () => {
        const gs = createGameState(true, true, true, true) as GameState;
        const nextGSs = getNextGameStates(gs);

        it("should return 13 game states for start game state", () => {
            assert.strictEqual(nextGSs.length, 13);
        });

        // it("should return an array of valid game states", () => {
        //   nextGSs.forEach((gs) => isTruthy(isGameState(gs)));
        // });

        it("all game states should differ from input", () => {
            nextGSs.forEach((nextGS) => assert.notDeepStrictEqual(nextGS, gs));
        });

        it("all game states should have player blue on turn", () => {
            nextGSs.forEach((gs) =>
                assert.strictEqual(gs.currentPlayer, Color.blue),
            );
        });
    });

    it(createGameState.name);

    testFunc(isGameOver, {
        "normal game state": [[testMoves.normalMove.gameState], false],
        "start game state": [
            [createGameState(true, true, true, true) as GameState],
            false,
        ],
        "only blue pawns": [
            [
                {
                    ...testMoves.normalMove.gameState,
                    pawns: testMoves.normalMove.gameState.pawns.filter(
                        (pawn) => pawn.playerColor === Color.blue,
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
                assert.deepStrictEqual(actual, expected);
            });
        }
        // TODO: add invalid moves
    });
});
