import {
  getStartLimits,
  isLimits,
  isSmallestLimits,
  isWithinLimits,
  updateLimits,
} from "limits";
import { testFunc } from "./testutil";

// -----------------------------------------------------------------------------

describe("limits", () => {
  testFunc(isLimits, [
    [[{ row: { min: 0, max: 7 }, col: { min: 0, max: 7 } }], true],
    [[{ row: { min: 0, max: 5 }, col: { min: 3, max: 7 } }], true],
    [[{ row: { min: 3, max: 6 }, col: { min: 2, max: 5 } }], true],
    [[{ row: { min: 0, max: 9 }, col: { min: 0, max: 7 } }], false],
    [[{ row: { min: 0, max: 7 }, col: { min: -2, max: 7 } }], false],
    [[{ row: { min: 0, max: 7 }, col: { min: 7, max: 0 } }], false],
    [[{ row: { min: 0, max: 7 }, col: { min: "0", max: 7 } }], false],
    [[-1], false],
    [[4], false],
    [[0.5], false],
    [[2.3], false],
    [["0"], false],
    [[null], false],
    [[[]], false],
    [[{}], false],
    [[undefined], false],
  ]);

  testFunc(getStartLimits, [
    [[], { row: { min: 0, max: 7 }, col: { min: 0, max: 7 } }],
  ]);

  testFunc(isSmallestLimits, [
    [[{ row: { min: 0, max: 7 }, col: { min: 0, max: 7 } }], false],
    [[{ row: { min: 0, max: 2 }, col: { min: 0, max: 7 } }], false],
    [[{ row: { min: 0, max: 2 }, col: { min: 0, max: 2 } }], true],
    [[{ row: { min: 0, max: 2 }, col: { min: 5, max: 7 } }], true],
    [[{ row: { min: 1, max: 3 }, col: { min: 3, max: 5 } }], true],
    [[{ row: { min: 1, max: 4 }, col: { min: 3, max: 5 } }], false],
    [[{ row: { min: 1, max: 3 }, col: { min: 3, max: 6 } }], false],
    [[{ row: { min: 0, max: 4 }, col: { min: 2, max: 6 } }], false],
  ]);

  testFunc(isWithinLimits, [
    [
      [
        { row: 0, col: 0 },
        { row: { min: 0, max: 7 }, col: { min: 0, max: 7 } },
      ],
      true,
    ],
    [
      [
        { row: 3, col: 5 },
        { row: { min: 0, max: 7 }, col: { min: 0, max: 7 } },
      ],
      true,
    ],
    [
      [
        { row: 6, col: 1 },
        { row: { min: 0, max: 7 }, col: { min: 0, max: 7 } },
      ],
      true,
    ],
    [
      [
        { row: 7, col: 7 },
        { row: { min: 0, max: 7 }, col: { min: 0, max: 7 } },
      ],
      true,
    ],
    [
      [
        { row: 4, col: 5 },
        { row: { min: 3, max: 6 }, col: { min: 2, max: 5 } },
      ],
      true,
    ],
    [
      [
        { row: 3, col: 2 },
        { row: { min: 3, max: 6 }, col: { min: 2, max: 5 } },
      ],
      true,
    ],
    [
      [
        { row: 7, col: 2 },
        { row: { min: 5, max: 7 }, col: { min: 2, max: 4 } },
      ],
      true,
    ],
    [
      [
        { row: 7, col: 3 },
        { row: { min: 5, max: 7 }, col: { min: 2, max: 4 } },
      ],
      true,
    ],
    [
      [
        { row: 7, col: 1 },
        { row: { min: 5, max: 7 }, col: { min: 2, max: 4 } },
      ],
      false,
    ],
    [
      [
        { row: 4, col: 2 },
        { row: { min: 5, max: 7 }, col: { min: 2, max: 4 } },
      ],
      false,
    ],
    [
      [
        { row: 0, col: 0 },
        { row: { min: 5, max: 7 }, col: { min: 2, max: 4 } },
      ],
      false,
    ],
    [
      [
        { row: 7, col: 7 },
        { row: { min: 0, max: 2 }, col: { min: 0, max: 2 } },
      ],
      false,
    ],
    [
      [
        { row: 5, col: 4 },
        { row: { min: 0, max: 2 }, col: { min: 0, max: 2 } },
      ],
      false,
    ],
    [
      [
        { row: 1, col: 3 },
        { row: { min: 0, max: 2 }, col: { min: 0, max: 2 } },
      ],
      false,
    ],
    [
      [
        { row: 1, col: 3 },
        { row: { min: 5, max: 7 }, col: { min: 5, max: 7 } },
      ],
      false,
    ],
    [
      [
        { row: 4, col: 4 },
        { row: { min: 5, max: 7 }, col: { min: 5, max: 7 } },
      ],
      false,
    ],
  ]);

  testFunc(updateLimits, {
    "pawns at edge, no shrinking": [
      [
        [
          { player: 0, knightColor: 0, position: { row: 0, col: 0 } },
          { player: 0, knightColor: 0, position: { row: 7, col: 7 } },
        ],
        { row: { min: 0, max: 7 }, col: { min: 0, max: 7 } },
      ],
      { row: { min: 0, max: 7 }, col: { min: 0, max: 7 } },
    ],
    "one pawn at edge, shrinks completely": [
      [
        [{ player: 0, knightColor: 0, position: { row: 0, col: 0 } }],
        { row: { min: 0, max: 7 }, col: { min: 0, max: 7 } },
      ],
      { row: { min: 0, max: 2 }, col: { min: 0, max: 2 } },
    ],
    "pawns in the middle, limits shrink a bit": [
      [
        [
          { player: 0, knightColor: 0, position: { row: 3, col: 6 } },
          { player: 0, knightColor: 0, position: { row: 5, col: 2 } },
          { player: 0, knightColor: 0, position: { row: 4, col: 3 } },
        ],
        { row: { min: 0, max: 7 }, col: { min: 0, max: 7 } },
      ],
      { row: { min: 3, max: 5 }, col: { min: 2, max: 6 } },
    ],
    "pawns in the middle, limits already right, so they should not change": [
      [
        [
          { player: 0, knightColor: 0, position: { row: 3, col: 6 } },
          { player: 0, knightColor: 0, position: { row: 5, col: 2 } },
          { player: 0, knightColor: 0, position: { row: 4, col: 3 } },
        ],
        { row: { min: 3, max: 5 }, col: { min: 2, max: 6 } },
      ],
      { row: { min: 3, max: 5 }, col: { min: 2, max: 6 } },
    ],
    "pawn in the middle, limits shrink to center around pawn": [
      [
        [{ player: 0, knightColor: 0, position: { row: 3, col: 3 } }],
        { row: { min: 0, max: 7 }, col: { min: 0, max: 7 } },
      ],
      { row: { min: 2, max: 4 }, col: { min: 2, max: 4 } },
    ],
    "pawn in the middle, limits already smallest, so they should not change": [
      [
        [{ player: 0, knightColor: 0, position: { row: 3, col: 3 } }],
        { row: { min: 3, max: 5 }, col: { min: 2, max: 4 } },
      ],
      { row: { min: 3, max: 5 }, col: { min: 2, max: 4 } },
    ],
  });
});
