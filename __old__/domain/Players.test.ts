import { Color } from "./Color";
import { isPlayerColor, isPlayers, isPlayerType, PlayerType } from "./Players";
import { testFunc } from "../util/testutil";

// -----------------------------------------------------------------------------

describe("Players", () => {
    testFunc(isPlayerColor, [
        [[Color.red], true],
        [[Color.green], true],
        [[Color.yellow], true],
        [[Color.blue], true],
        [[1.4], false],
        [[-3], false],
        [[12], false],
        [["string"], false],
    ]);

    testFunc(isPlayerType, [
        [[PlayerType.none], true],
        [[PlayerType.human], true],
        [[PlayerType.computer], true],
        [[1.4], false],
        [[-3], false],
        [[12], false],
        [["string"], false],
    ]);

    testFunc(isPlayers, [
        [
            [
                {
                    [Color.red]: PlayerType.human,
                    [Color.green]: PlayerType.none,
                    [Color.yellow]: PlayerType.computer,
                    [Color.blue]: PlayerType.none,
                },
            ],
            true,
        ],
        [
            [
                {
                    [Color.red]: PlayerType.human,
                    [Color.green]: PlayerType.none,
                },
            ],
            false,
        ],
    ]);
});
