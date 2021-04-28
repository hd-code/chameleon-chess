import { getZeroScore, normalizeScore } from "core/game/ai/score";

// -----------------------------------------------------------------------------

describe("core/ai/score", () => {
  it(getZeroScore.name, () => {
    const expected = { 0: 0, 1: 0, 2: 0, 3: 0 };
    const actual = getZeroScore();
    expect(actual).toEqual(expected);
  });

  describe(normalizeScore.name, () => {
    it.each([
      [
        { 0: 1, 1: 1, 2: 1, 3: 1 },
        { 0: 0.25, 1: 0.25, 2: 0.25, 3: 0.25 },
      ],
      [
        { 0: 0, 1: 1, 2: 0, 3: 0 },
        { 0: 0, 1: 1, 2: 0, 3: 0 },
      ],
      [
        { 0: 0, 1: 1, 2: 1, 3: 0 },
        { 0: 0, 1: 0.5, 2: 0.5, 3: 0 },
      ],
      [
        { 0: 4, 1: 1, 2: 2, 3: 3 },
        { 0: 0.4, 1: 0.1, 2: 0.2, 3: 0.3 },
      ],
      [
        { 0: 5, 1: 5, 2: 5, 3: 5 },
        { 0: 0.25, 1: 0.25, 2: 0.25, 3: 0.25 },
      ],
    ])("%j => %j", (input, expected) => {
      const actual = normalizeScore(input);
      expect(actual).toEqual(expected);
    });
  });
});
