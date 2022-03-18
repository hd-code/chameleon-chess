import { Color } from "core/game";
import {
  getBoard,
  getFieldColor,
  isFieldColor,
  isInPositions,
  isPosition,
  isSamePosition,
  sortPositions,
} from "core/game/board";

// -----------------------------------------------------------------------------

describe("core/game/board", () => {
  describe(isFieldColor.name, () => {
    it.each([
      [0, true],
      [1, true],
      [2, true],
      [3, true],
      [-1, false],
      [4, false],
      [0.5, false],
      [2.3, false],
      ["0", false],
      [null, false],
      [[], false],
      [{}, false],
    ])("%j => %j", (input, expected) => {
      const actual = isFieldColor(input);
      expect(actual).toBe(expected);
    });
  });

  describe(getFieldColor.name, () => {
    it.each([
      [{ row: 0, col: 0 }, Color.blue],
      [{ row: 3, col: 2 }, Color.green],
      [{ row: 7, col: 0 }, Color.red],
      [{ row: 7, col: 1 }, Color.green],
      [{ row: 7, col: 2 }, Color.yellow],
      [{ row: 7, col: 3 }, Color.blue],
    ])("%j => %j", (input, expected) => {
      const actual = getFieldColor(input);
      expect(actual).toBe(expected);
    });
  });

  describe(getBoard.name, () => {
    const board = getBoard();
    it("should have 8 rows", () => expect(board.length).toBe(8));
    it("should have 8 columns", () =>
      board.forEach((row) => expect(row.length).toBe(8)));
    it("should only contain integers from 0 to 7", () => {
      const regex = /[0-7]/;
      board.forEach((row) =>
        row.forEach((val) => expect(regex.test(val.toString())).toBeTruthy()),
      );
    });
  });

  describe(isPosition.name, () => {
    it.each([
      [{ row: 0, col: 0 }, true],
      [{ row: 2, col: 1 }, true],
      [{ row: 5, col: 2 }, true],
      [{ row: 7, col: 7 }, true],
      [{ row: 6, col: 3 }, true],
      [{ row: 8, col: 3 }, false],
      [{ row: 7, col: 9 }, false],
      [{ row: -2, col: 4 }, false],
      [{ row: 2, col: 2.4 }, false],
      [{ row: 0.2, col: 0.8 }, false],
      [{ row: 5 }, false],
      [{ col: 3 }, false],
      [4, false],
      [-1, false],
      [0.5, false],
      [2.3, false],
      ["0", false],
      [null, false],
      [[], false],
      [{}, false],
    ])("%j => %j", (input, expected) => {
      const actual = isPosition(input);
      expect(actual).toBe(expected);
    });
  });

  describe(isInPositions.name, () => {
    it.each([
      [
        { row: 0, col: 0 },
        [
          { row: 0, col: 0 },
          { row: 1, col: 1 },
        ],
        true,
      ],
      [
        { row: 1, col: 1 },
        [
          { row: 0, col: 0 },
          { row: 1, col: 1 },
        ],
        true,
      ],
      [
        { row: 1, col: 0 },
        [
          { row: 0, col: 0 },
          { row: 1, col: 1 },
        ],
        false,
      ],
      [{ row: 6, col: 4 }, [], false],
      [{ row: 2, col: 5 }, [{ row: 2, col: 5 }], true],
      [{ row: 2, col: 5 }, [{ row: 2, col: 4 }], false],
      [{ row: 2, col: 5 }, [{ row: 3, col: 5 }], false],
    ])("%j in %j => %j", (position, positions, expected) => {
      const actual = isInPositions(position, positions);
      expect(actual).toBe(expected);
    });
  });

  describe(isSamePosition.name, () => {
    it.each([
      [{ row: 0, col: 0 }, { row: 0, col: 0 }, true],
      [{ row: 3, col: 3 }, { row: 3, col: 3 }, true],
      [{ row: 6, col: 3 }, { row: 6, col: 3 }, true],
      [{ row: 6, col: 3 }, { row: 1, col: 1 }, false],
      [{ row: 6, col: 6 }, { row: 1, col: 1 }, false],
      [{ row: 5, col: 5 }, { row: 2, col: 3 }, false],
      [{ row: 5, col: 5 }, { row: 5, col: 3 }, false],
      [{ row: 1, col: 3 }, { row: 5, col: 3 }, false],
    ])("%j and %j => %j", (pos1, pos2, expected) => {
      const actual = isSamePosition(pos1, pos2);
      expect(actual).toBe(expected);
    });
  });

  describe(sortPositions.name, () => {
    it.each([
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
    ])("%s", (_, input, expected) => {
      input.sort(sortPositions);
      expect(input).toEqual(expected);
    });
  });
});
