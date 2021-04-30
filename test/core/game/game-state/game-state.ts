import { Color, Position } from "core/game";
import {
  GameState,
  getNextGameStates,
  getStartGameState,
  isGameOver,
  isGameState,
  makeMove,
} from "core/game/game-state";

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
      limits: { minRow: 2, maxRow: 6, minCol: 3, maxCol: 6 },
      pawns: [
        { player: 2, position: { row: 6, col: 3 }, knightColor: 2 },
        { player: 3, position: { row: 2, col: 6 }, knightColor: 1 },
        { player: 3, position: { row: 3, col: 4 }, knightColor: 3 }, // moves
      ],
      player: 3,
    },
    pawnIndex: 2,
    destination: { row: 4, col: 5 },
    expected: {
      limits: { minRow: 2, maxRow: 6, minCol: 3, maxCol: 6 },
      pawns: [
        { player: 2, position: { row: 6, col: 3 }, knightColor: 2 },
        { player: 3, position: { row: 2, col: 6 }, knightColor: 1 },
        { player: 3, position: { row: 4, col: 5 }, knightColor: 3 }, // moves
      ],
      player: 2,
    },
  },
  shrinkingMove: {
    gameState: {
      limits: { minRow: 1, maxRow: 6, minCol: 1, maxCol: 7 },
      pawns: [
        { player: 1, position: { row: 5, col: 1 }, knightColor: 0 },
        { player: 1, position: { row: 2, col: 2 }, knightColor: 1 },
        { player: 2, position: { row: 4, col: 7 }, knightColor: 2 },
        { player: 2, position: { row: 6, col: 6 }, knightColor: 0 },
        { player: 3, position: { row: 4, col: 3 }, knightColor: 1 },
        { player: 3, position: { row: 1, col: 6 }, knightColor: 2 }, // moves
      ],
      player: 3,
    },
    pawnIndex: 5,
    destination: { row: 3, col: 4 },
    expected: {
      limits: { minRow: 2, maxRow: 6, minCol: 1, maxCol: 7 },
      pawns: [
        { player: 1, position: { row: 5, col: 1 }, knightColor: 0 },
        { player: 1, position: { row: 2, col: 2 }, knightColor: 1 },
        { player: 2, position: { row: 4, col: 7 }, knightColor: 2 },
        { player: 2, position: { row: 6, col: 6 }, knightColor: 0 },
        { player: 3, position: { row: 4, col: 3 }, knightColor: 1 },
        { player: 3, position: { row: 3, col: 4 }, knightColor: 2 }, // moves
      ],
      player: 2,
    },
  },
  beatingMove: {
    gameState: {
      limits: { minRow: 1, maxRow: 6, minCol: 1, maxCol: 7 },
      pawns: [
        { player: 0, position: { row: 4, col: 3 }, knightColor: 0 }, // moves
        { player: 1, position: { row: 5, col: 1 }, knightColor: 0 },
        { player: 1, position: { row: 2, col: 2 }, knightColor: 1 },
        { player: 2, position: { row: 4, col: 7 }, knightColor: 2 }, // is beaten
        { player: 2, position: { row: 6, col: 6 }, knightColor: 0 },
        { player: 3, position: { row: 1, col: 6 }, knightColor: 2 },
      ],
      player: 0,
    },
    pawnIndex: 0,
    destination: { row: 4, col: 7 },
    expected: {
      limits: { minRow: 1, maxRow: 6, minCol: 1, maxCol: 7 },
      pawns: [
        { player: 0, position: { row: 4, col: 7 }, knightColor: 0 }, // moves
        { player: 1, position: { row: 5, col: 1 }, knightColor: 0 },
        { player: 1, position: { row: 2, col: 2 }, knightColor: 1 },
        { player: 2, position: { row: 6, col: 6 }, knightColor: 0 },
        { player: 3, position: { row: 1, col: 6 }, knightColor: 2 },
      ],
      player: 3,
    },
  },
  shrinkAndBeatingMove: {
    gameState: {
      limits: { minRow: 1, maxRow: 6, minCol: 1, maxCol: 7 },
      pawns: [
        { player: 0, position: { row: 4, col: 3 }, knightColor: 0 },
        { player: 1, position: { row: 5, col: 1 }, knightColor: 0 },
        { player: 1, position: { row: 2, col: 2 }, knightColor: 1 },
        { player: 2, position: { row: 4, col: 7 }, knightColor: 2 },
        { player: 2, position: { row: 6, col: 6 }, knightColor: 0 }, // is beaten
        { player: 3, position: { row: 1, col: 6 }, knightColor: 1 }, // moves
      ],
      player: 3,
    },
    pawnIndex: 5,
    destination: { row: 6, col: 6 },
    expected: {
      limits: { minRow: 2, maxRow: 6, minCol: 1, maxCol: 7 },
      pawns: [
        { player: 0, position: { row: 4, col: 3 }, knightColor: 0 },
        { player: 1, position: { row: 5, col: 1 }, knightColor: 0 },
        { player: 1, position: { row: 2, col: 2 }, knightColor: 1 },
        { player: 2, position: { row: 4, col: 7 }, knightColor: 2 },
        { player: 3, position: { row: 6, col: 6 }, knightColor: 1 }, // moves
      ],
      player: 2,
    },
  },
  shrinkToSmallestMove: {
    gameState: {
      limits: { minRow: 3, maxRow: 6, minCol: 1, maxCol: 4 },
      pawns: [
        { player: 1, position: { row: 5, col: 3 }, knightColor: 2 },
        { player: 2, position: { row: 3, col: 4 }, knightColor: 2 },
        { player: 3, position: { row: 6, col: 1 }, knightColor: 0 }, // moves
      ],
      player: 3,
    },
    pawnIndex: 2,
    destination: { row: 4, col: 3 },
    expected: {
      limits: { minRow: 3, maxRow: 5, minCol: 2, maxCol: 4 },
      pawns: [
        { player: 1, position: { row: 5, col: 3 }, knightColor: 2 },
        { player: 2, position: { row: 3, col: 4 }, knightColor: 2 },
        { player: 3, position: { row: 4, col: 3 }, knightColor: 0 }, // moves
      ],
      player: 2,
    },
  },
  shrinkToSmallestAndBeatingMove: {
    gameState: {
      limits: { minRow: 3, maxRow: 5, minCol: 2, maxCol: 7 },
      pawns: [
        { player: 0, position: { row: 4, col: 3 }, knightColor: 1 },
        { player: 2, position: { row: 5, col: 7 }, knightColor: 0 }, // moves
        { player: 3, position: { row: 5, col: 3 }, knightColor: 0 }, // is beaten
      ],
      player: 2,
    },
    pawnIndex: 1,
    destination: { row: 5, col: 3 },
    expected: {
      limits: { minRow: 3, maxRow: 5, minCol: 2, maxCol: 4 },
      pawns: [
        { player: 0, position: { row: 4, col: 3 }, knightColor: 1 },
        { player: 2, position: { row: 5, col: 3 }, knightColor: 0 }, // moves
      ],
      player: 0,
    },
  },
  normalMoveOnSmallestBoard: {
    gameState: {
      limits: { minRow: 5, maxRow: 7, minCol: 1, maxCol: 3 },
      pawns: [
        { player: 0, position: { row: 5, col: 2 }, knightColor: 0 },
        { player: 2, position: { row: 6, col: 1 }, knightColor: 2 }, // moves
      ],
      player: 2,
    },
    pawnIndex: 1,
    destination: { row: 7, col: 3 },
    expected: {
      limits: { minRow: 5, maxRow: 7, minCol: 1, maxCol: 3 },
      pawns: [
        { player: 0, position: { row: 5, col: 2 }, knightColor: 0 },
        { player: 2, position: { row: 7, col: 3 }, knightColor: 2 }, // moves
      ],
      player: 0,
    },
  },
  beatingMoveOnSmallestBoard: {
    gameState: {
      limits: { minRow: 5, maxRow: 7, minCol: 1, maxCol: 3 },
      pawns: [
        { player: 0, position: { row: 5, col: 2 }, knightColor: 0 }, // moves
        { player: 2, position: { row: 6, col: 1 }, knightColor: 2 }, // is beaten
      ],
      player: 0,
    },
    pawnIndex: 0,
    destination: { row: 6, col: 1 },
    expected: {
      limits: { minRow: 5, maxRow: 7, minCol: 1, maxCol: 3 },
      pawns: [
        { player: 0, position: { row: 6, col: 1 }, knightColor: 0 }, // moves
      ],
      player: 0,
    },
  },
  deadlockMoveOnSmallestBoard: {
    gameState: {
      limits: { minRow: 3, maxRow: 5, minCol: 3, maxCol: 5 },
      pawns: [
        { player: 0, position: { row: 3, col: 5 }, knightColor: 1 },
        { player: 1, position: { row: 3, col: 3 }, knightColor: 0 }, // moves, becomes knight
      ],
      player: 1,
    },
    pawnIndex: 1,
    destination: { row: 4, col: 4 },
    expected: {
      limits: { minRow: 3, maxRow: 5, minCol: 3, maxCol: 5 },
      pawns: [{ player: 0, position: { row: 3, col: 5 }, knightColor: 1 }],
      player: 0,
    },
  },
  shrinkingToDeadlockMove: {
    gameState: {
      limits: { minRow: 2, maxRow: 4, minCol: 0, maxCol: 5 },
      pawns: [
        { player: 1, position: { row: 3, col: 4 }, knightColor: 1 }, // Knight, is beaten
        { player: 1, position: { row: 4, col: 3 }, knightColor: 2 }, // Queen
        { player: 2, position: { row: 2, col: 5 }, knightColor: 3 }, // Knight
        { player: 2, position: { row: 3, col: 0 }, knightColor: 1 }, // Queen, becomes Knight and is removed too
      ],
      player: 2,
    },
    pawnIndex: 3,
    destination: { row: 3, col: 4 },
    expected: {
      limits: { minRow: 2, maxRow: 4, minCol: 3, maxCol: 5 },
      pawns: [
        { player: 1, position: { row: 4, col: 3 }, knightColor: 2 }, // Queen
        { player: 2, position: { row: 2, col: 5 }, knightColor: 3 }, // Knight
      ],
      player: 1,
    },
  },
  trapOpponentInDeadlockMove: {
    gameState: {
      limits: { minRow: 2, maxRow: 4, minCol: 0, maxCol: 5 },
      pawns: [
        { player: 0, position: { row: 3, col: 4 }, knightColor: 1 }, // Knight, will be trapped
        { player: 0, position: { row: 4, col: 3 }, knightColor: 2 }, // Queen
        { player: 2, position: { row: 2, col: 5 }, knightColor: 3 }, // Knight
        { player: 2, position: { row: 3, col: 0 }, knightColor: 1 }, // Queen, moves
      ],
      player: 2,
    },
    pawnIndex: 3,
    destination: { row: 3, col: 3 },
    expected: {
      limits: { minRow: 2, maxRow: 4, minCol: 3, maxCol: 5 },
      pawns: [
        { player: 0, position: { row: 4, col: 3 }, knightColor: 2 }, // Queen
        { player: 2, position: { row: 2, col: 5 }, knightColor: 3 }, // Knight
        { player: 2, position: { row: 3, col: 3 }, knightColor: 1 }, // Queen, moves
      ],
      player: 0,
    },
  },
  deadlockMoveButWinning: {
    gameState: {
      limits: { minRow: 2, maxRow: 4, minCol: 4, maxCol: 6 },
      pawns: [
        { player: 0, position: { row: 4, col: 4 }, knightColor: 2 }, // Bishop, becomes knight !
        { player: 3, position: { row: 3, col: 5 }, knightColor: 1 }, // Queen, is beaten
      ],
      player: 0,
    },
    pawnIndex: 0,
    destination: { row: 3, col: 5 },
    expected: {
      limits: { minRow: 2, maxRow: 4, minCol: 4, maxCol: 6 },
      pawns: [
        { player: 0, position: { row: 3, col: 5 }, knightColor: 2 }, // Bishop, becomes knight !
      ],
      player: 0,
    },
  },
};

// -----------------------------------------------------------------------------

describe("core/game-state", () => {
  it.todo(isGameState.name);

  describe(getNextGameStates.name, () => {
    const gs = getStartGameState(true, true, true, true) as GameState;
    const nextGSs = getNextGameStates(gs);

    it("should return 13 game states for start game state", () => {
      expect(nextGSs.length).toBe(13);
    });

    it("should return an array of valid game states", () => {
      nextGSs.forEach((gs) => expect(isGameState(gs)).toBeTruthy());
    });

    it("all game states should differ from input", () => {
      nextGSs.forEach((nextGS) => expect(nextGS).not.toEqual(gs));
    });

    it("all game states should have player blue on turn", () => {
      nextGSs.forEach((gs) => expect(gs.player).toBe(Color.blue));
    });
  });

  it.todo(getStartGameState.name);

  describe(isGameOver.name, () => {
    it.each([
      ["normal game state", testMoves.normalMove.gameState, false],
      [
        "start game state",
        getStartGameState(true, true, true, true) as GameState,
        false,
      ],
      [
        "only blue pawns",
        {
          ...testMoves.normalMove.gameState,
          pawns: testMoves.normalMove.gameState.pawns.filter(
            (pawn) => pawn.player === Color.blue,
          ),
        },
        true,
      ],
      ["no pawns", { ...testMoves.normalMove.gameState, pawns: [] }, true],
      [
        "just one pawn",
        {
          ...testMoves.normalMove.gameState,
          pawns: [testMoves.normalMove.gameState.pawns[0]],
        },
        true,
      ],
    ])("%s", (_, input, expected) => {
      const actual = isGameOver(input);
      expect(actual).toBe(expected);
    });
  });

  describe(makeMove.name, () => {
    for (const name in testMoves) {
      const { gameState, pawnIndex, destination, expected } = testMoves[name];
      it(name, () => {
        const actual = makeMove(gameState, pawnIndex, destination);
        expect(actual).toEqual(expected);
      });
    }
    // TODO: add invalid moves
  });
});
