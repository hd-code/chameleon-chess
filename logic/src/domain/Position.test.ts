import * as assert from "assert";
import {
    isInPositions,
    isPosition,
    isSamePosition,
    Position,
    sortPositions,
} from "./Position";
import { testFunc } from "../util/testutil";

describe("Position", () => {
    testFunc(isPosition, [
        [[{ row: 0, col: 0 }], true],
        [[{ row: 2, col: 1 }], true],
        [[{ row: 5, col: 2 }], true],
        [[{ row: 7, col: 7 }], true],
        [[{ row: 6, col: 3 }], true],
        [[{ row: 8, col: 3 }], false],
        [[{ row: 7, col: 9 }], false],
        [[{ row: -2, col: 4 }], false],
        [[{ row: 2, col: 2.4 }], false],
        [[{ row: 0.2, col: 0.8 }], false],
        [[{ row: 5 }], false],
        [[{ col: 3 }], false],
        [[4], false],
        [[-1], false],
        [[0.5], false],
        [[2.3], false],
        [["0"], false],
        [[null], false],
        [[[]], false],
        [[{}], false],
        [[undefined], false],
    ]);

    testFunc(isInPositions, [
        [
            [
                { row: 0, col: 0 },
                [
                    { row: 0, col: 0 },
                    { row: 1, col: 1 },
                ],
            ],
            true,
        ],
        [
            [
                { row: 1, col: 1 },
                [
                    { row: 0, col: 0 },
                    { row: 1, col: 1 },
                ],
            ],
            true,
        ],
        [
            [
                { row: 1, col: 0 },
                [
                    { row: 0, col: 0 },
                    { row: 1, col: 1 },
                ],
            ],
            false,
        ],
        [[{ row: 6, col: 4 }, []], false],
        [[{ row: 2, col: 5 }, [{ row: 2, col: 5 }]], true],
        [[{ row: 2, col: 5 }, [{ row: 2, col: 4 }]], false],
        [[{ row: 2, col: 5 }, [{ row: 3, col: 5 }]], false],
    ]);

    testFunc(isSamePosition, [
        [
            [
                { row: 0, col: 0 },
                { row: 0, col: 0 },
            ],
            true,
        ],
        [
            [
                { row: 3, col: 3 },
                { row: 3, col: 3 },
            ],
            true,
        ],
        [
            [
                { row: 6, col: 3 },
                { row: 6, col: 3 },
            ],
            true,
        ],
        [
            [
                { row: 6, col: 3 },
                { row: 1, col: 1 },
            ],
            false,
        ],
        [
            [
                { row: 6, col: 6 },
                { row: 1, col: 1 },
            ],
            false,
        ],
        [
            [
                { row: 5, col: 5 },
                { row: 2, col: 3 },
            ],
            false,
        ],
        [
            [
                { row: 5, col: 5 },
                { row: 5, col: 3 },
            ],
            false,
        ],
        [
            [
                { row: 1, col: 3 },
                { row: 5, col: 3 },
            ],
            false,
        ],
    ]);

    describe(sortPositions.name, () => {
        [
            ["just one position", [{ row: 3, col: 5 }], [{ row: 3, col: 5 }]],
            [
                "two positions, rows not sorted",
                [
                    { row: 7, col: 5 },
                    { row: 3, col: 5 },
                ],
                [
                    { row: 3, col: 5 },
                    { row: 7, col: 5 },
                ],
            ],
            [
                "two positions, rows sorted already",
                [
                    { row: 3, col: 5 },
                    { row: 7, col: 5 },
                ],
                [
                    { row: 3, col: 5 },
                    { row: 7, col: 5 },
                ],
            ],
            [
                "two positions, rows are equal, cols not sorted",
                [
                    { row: 2, col: 5 },
                    { row: 2, col: 3 },
                ],
                [
                    { row: 2, col: 3 },
                    { row: 2, col: 5 },
                ],
            ],
            [
                "two positions, rows are equal, cols sorted",
                [
                    { row: 2, col: 3 },
                    { row: 2, col: 5 },
                ],
                [
                    { row: 2, col: 3 },
                    { row: 2, col: 5 },
                ],
            ],
            [
                "six positions",
                [
                    { row: 2, col: 2 },
                    { row: 3, col: 4 },
                    { row: 2, col: 4 },
                    { row: 0, col: 0 },
                    { row: 4, col: 5 },
                    { row: 3, col: 5 },
                ],
                [
                    { row: 0, col: 0 },
                    { row: 2, col: 2 },
                    { row: 2, col: 4 },
                    { row: 3, col: 4 },
                    { row: 3, col: 5 },
                    { row: 4, col: 5 },
                ],
            ],
        ].forEach(([name, input, expected]) => {
            it(name as string, () => {
                (input as Position[]).sort(sortPositions);
                assert.deepStrictEqual(input, expected);
            });
        });
    });
});
