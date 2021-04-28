import { maxNIS } from "core/game/ai/max-n-is";
import { GameState, getStartGameState } from "core/game/game-state";

// -----------------------------------------------------------------------------

describe("core/ai/" + maxNIS.name, () => {
  it("should return equal score for all players on start game state", () => {
    const expected = { 0: 0.25, 1: 0.25, 2: 0.25, 3: 0.25 };
    const gs = getStartGameState(true, true, true, true) as GameState;
    const score = maxNIS(gs, 0);
    expect(score).toEqual(expected);
  });

  it("should return different score for different depths", () => {
    const gs = getStartGameState(true, true, true, true) as GameState;
    const d0 = maxNIS(gs, 0);
    const d1 = maxNIS(gs, 1);
    expect(d0).not.toEqual(d1);
  });
});
