import { isColor } from "core/game/color";

// -----------------------------------------------------------------------------

describe(isColor.name, () => {
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
    const actual = isColor(input);
    expect(actual).toBe(expected);
  });
});
