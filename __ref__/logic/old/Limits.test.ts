import { testFunc } from "./util/testutil";
import {
    createLimits,
    isLimits,
    isSmallestLimits,
    isWithinLimits,
    updateLimits,
} from "./Limits";

// -----------------------------------------------------------------------------

describe("Limits", () => {
    testFunc(isLimits, [
        [[{ rows: [0, 7], cols: [0, 7] }], true],
        [[{ rows: [0, 5], cols: [3, 7] }], true],
        [[{ rows: [3, 6], cols: [2, 5] }], true],
        [[{ rows: [0, 9], cols: [0, 7] }], false],
        [[{ rows: [0, 7], cols: { min: -2, max: 7 } }], false],
        [[{ rows: [0, 7], cols: [7, 0] }], false],
        [[{ rows: [0, 7], cols: { min: "0", max: 7 } }], false],
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

    testFunc(createLimits, [[[], { rows: [0, 7], cols: [0, 7] }]]);

    testFunc(isSmallestLimits, [
        [[{ rows: [0, 7], cols: [0, 7] }], false],
        [[{ rows: [0, 2], cols: [0, 7] }], false],
        [[{ rows: [0, 2], cols: [0, 2] }], true],
        [[{ rows: [0, 2], cols: [5, 7] }], true],
        [[{ rows: [1, 3], cols: [3, 5] }], true],
        [[{ rows: [1, 4], cols: [3, 5] }], false],
        [[{ rows: [1, 3], cols: [3, 6] }], false],
        [[{ rows: [0, 4], cols: [2, 6] }], false],
    ]);

    testFunc(isWithinLimits, [
        [
            [
                { row: 0, col: 0 },
                { rows: [0, 7], cols: [0, 7] },
            ],
            true,
        ],
        [
            [
                { row: 3, col: 5 },
                { rows: [0, 7], cols: [0, 7] },
            ],
            true,
        ],
        [
            [
                { row: 6, col: 1 },
                { rows: [0, 7], cols: [0, 7] },
            ],
            true,
        ],
        [
            [
                { row: 7, col: 7 },
                { rows: [0, 7], cols: [0, 7] },
            ],
            true,
        ],
        [
            [
                { row: 4, col: 5 },
                { rows: [3, 6], cols: [2, 5] },
            ],
            true,
        ],
        [
            [
                { row: 3, col: 2 },
                { rows: [3, 6], cols: [2, 5] },
            ],
            true,
        ],
        [
            [
                { row: 7, col: 2 },
                { rows: [5, 7], cols: [2, 4] },
            ],
            true,
        ],
        [
            [
                { row: 7, col: 3 },
                { rows: [5, 7], cols: [2, 4] },
            ],
            true,
        ],
        [
            [
                { row: 7, col: 1 },
                { rows: [5, 7], cols: [2, 4] },
            ],
            false,
        ],
        [
            [
                { row: 4, col: 2 },
                { rows: [5, 7], cols: [2, 4] },
            ],
            false,
        ],
        [
            [
                { row: 0, col: 0 },
                { rows: [5, 7], cols: [2, 4] },
            ],
            false,
        ],
        [
            [
                { row: 7, col: 7 },
                { rows: [0, 2], cols: [0, 2] },
            ],
            false,
        ],
        [
            [
                { row: 5, col: 4 },
                { rows: [0, 2], cols: [0, 2] },
            ],
            false,
        ],
        [
            [
                { row: 1, col: 3 },
                { rows: [0, 2], cols: [0, 2] },
            ],
            false,
        ],
        [
            [
                { row: 1, col: 3 },
                { rows: [5, 7], cols: [5, 7] },
            ],
            false,
        ],
        [
            [
                { row: 4, col: 4 },
                { rows: [5, 7], cols: [5, 7] },
            ],
            false,
        ],
    ]);

    testFunc(updateLimits, {
        "pawns at edge, no shrinking": [
            [
                [
                    {
                        player: 0,
                        knightColor: 0,
                        position: { row: 0, col: 0 },
                    },
                    {
                        player: 0,
                        knightColor: 0,
                        position: { row: 7, col: 7 },
                    },
                ],
                { rows: [0, 7], cols: [0, 7] },
            ],
            { rows: [0, 7], cols: [0, 7] },
        ],
        "one pawn at edge, shrinks completely": [
            [
                [
                    {
                        player: 0,
                        knightColor: 0,
                        position: { row: 0, col: 0 },
                    },
                ],
                { rows: [0, 7], cols: [0, 7] },
            ],
            { rows: [0, 2], cols: [0, 2] },
        ],
        "pawns in the middle, limits shrink a bit": [
            [
                [
                    {
                        player: 0,
                        knightColor: 0,
                        position: { row: 3, col: 6 },
                    },
                    {
                        player: 0,
                        knightColor: 0,
                        position: { row: 5, col: 2 },
                    },
                    {
                        player: 0,
                        knightColor: 0,
                        position: { row: 4, col: 3 },
                    },
                ],
                { rows: [0, 7], cols: [0, 7] },
            ],
            { rows: [3, 5], cols: [2, 6] },
        ],
        "pawns in the middle, limits already right, so they should not change":
            [
                [
                    [
                        {
                            player: 0,
                            knightColor: 0,
                            position: { row: 3, col: 6 },
                        },
                        {
                            player: 0,
                            knightColor: 0,
                            position: { row: 5, col: 2 },
                        },
                        {
                            player: 0,
                            knightColor: 0,
                            position: { row: 4, col: 3 },
                        },
                    ],
                    { rows: [3, 5], cols: [2, 6] },
                ],
                { rows: [3, 5], cols: [2, 6] },
            ],
        "pawn in the middle, limits shrink to center around pawn": [
            [
                [
                    {
                        player: 0,
                        knightColor: 0,
                        position: { row: 3, col: 3 },
                    },
                ],
                { rows: [0, 7], cols: [0, 7] },
            ],
            { rows: [2, 4], cols: [2, 4] },
        ],
        "pawn in the middle, limits already smallest, so they should not change":
            [
                [
                    [
                        {
                            player: 0,
                            knightColor: 0,
                            position: { row: 3, col: 3 },
                        },
                    ],
                    { rows: [3, 5], cols: [2, 4] },
                ],
                { rows: [3, 5], cols: [2, 4] },
            ],
    });
});
