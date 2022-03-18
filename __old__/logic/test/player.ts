import { Color } from "color";
import { getNextPlayerType, isEnoughPlayers, PlayerType } from "player";
import { testFunc } from "./testutil";

// -----------------------------------------------------------------------------

describe("player", () => {
  testFunc(getNextPlayerType, [
    [[PlayerType.human], PlayerType.computer],
    [[PlayerType.computer], PlayerType.none],
    [[PlayerType.none], PlayerType.human],
  ]);

  testFunc(isEnoughPlayers, [
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
          [Color.yellow]: PlayerType.human,
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
          [Color.yellow]: PlayerType.none,
          [Color.blue]: PlayerType.none,
        },
      ],
      false,
    ],
    [
      [
        {
          [Color.red]: PlayerType.human,
          [Color.green]: PlayerType.human,
          [Color.yellow]: PlayerType.computer,
          [Color.blue]: PlayerType.computer,
        },
      ],
      true,
    ],
    [
      [
        {
          [Color.red]: PlayerType.none,
          [Color.green]: PlayerType.none,
          [Color.yellow]: PlayerType.none,
          [Color.blue]: PlayerType.none,
        },
      ],
      false,
    ],
    [
      [
        {
          [Color.red]: PlayerType.computer,
          [Color.green]: PlayerType.computer,
          [Color.yellow]: PlayerType.computer,
          [Color.blue]: PlayerType.computer,
        },
      ],
      true,
    ],
  ]);
});
