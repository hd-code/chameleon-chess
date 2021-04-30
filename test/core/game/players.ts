import { Color } from "core/game";
import {
  getNextPlayerType,
  isPlayer,
  isPlayers,
  PlayerType,
} from "core/game/players";

// -----------------------------------------------------------------------------

describe("core/game/players", () => {
  describe(isPlayer.name, () => {
    it.each([
      [0, true],
      [1, true],
      [2, true],
      [3, true],
      [4, false],
      ["2", false],
      [[2], false],
      [[], false],
      [{}, false],
    ])("%j => %j", (input, expected) => {
      expect(isPlayer(input)).toBe(expected);
    });
  });

  describe(getNextPlayerType.name, () => {
    it.each([
      [PlayerType.human, PlayerType.computer],
      [PlayerType.computer, PlayerType.none],
      [PlayerType.none, PlayerType.human],
    ])("%j => %j", (input, expected) => {
      expect(getNextPlayerType(input)).toBe(expected);
    });
  });

  describe(isPlayers.name, () => {
    it.each([
      [
        {
          [Color.red]: PlayerType.human,
          [Color.green]: PlayerType.none,
          [Color.yellow]: PlayerType.computer,
          [Color.blue]: PlayerType.none,
        },
        true,
      ],
      [
        {
          [Color.red]: PlayerType.human,
          [Color.green]: PlayerType.none,
          [Color.yellow]: PlayerType.human,
          [Color.blue]: PlayerType.none,
        },
        true,
      ],
      [
        {
          [Color.red]: PlayerType.human,
          [Color.green]: PlayerType.none,
          [Color.yellow]: PlayerType.none,
          [Color.blue]: PlayerType.none,
        },
        false,
      ],
      [
        {
          [Color.red]: PlayerType.human,
          [Color.green]: PlayerType.human,
          [Color.yellow]: PlayerType.computer,
          [Color.blue]: PlayerType.computer,
        },
        true,
      ],
      [
        {
          [Color.red]: PlayerType.none,
          [Color.green]: PlayerType.none,
          [Color.yellow]: PlayerType.none,
          [Color.blue]: PlayerType.none,
        },
        false,
      ],
      [
        {
          [Color.red]: PlayerType.computer,
          [Color.green]: PlayerType.computer,
          [Color.yellow]: PlayerType.computer,
          [Color.blue]: PlayerType.computer,
        },
        true,
      ],
    ])("%j => %j", (input, expected) => {
      expect(isPlayers(input)).toBe(expected);
    });
  });
});
