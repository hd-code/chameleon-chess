import * as assert from "assert";
import { AILevel, calcNextGameState } from "./AI";
import { createGameState, GameState, getNextGameStates } from "./GameState";

// -----------------------------------------------------------------------------

describe("AI." + calcNextGameState.name, () => {
    it("should return one of the next game states", () => {
        const gs = createGameState(true, true, true, true) as GameState;
        const nextGSs = getNextGameStates(gs);
        const calcedGS = calcNextGameState(gs);

        let numOfMatchingStates = 0;
        for (let i = 0, ie = nextGSs.length; i < ie; i++) {
            try {
                assert.deepStrictEqual(calcedGS, nextGSs[i]);
                numOfMatchingStates += 1;
            } catch (e) {} // eslint-disable-line no-empty
        }
        assert.deepStrictEqual(numOfMatchingStates, 1);
    });

    it("difficulty hard should not return the same game state as easy (3 tries)", () => {
        const gs = createGameState(true, true, true, true) as GameState;
        const gsHard = calcNextGameState(gs, AILevel.hard);
        const execTest = () => {
            const gsEasy = calcNextGameState(gs, AILevel.easy);
            assert.notDeepStrictEqual(gsEasy, gsHard);
        };

        try {
            execTest();
        } catch (_) {
            try {
                execTest();
            } catch (_) {
                execTest();
            }
        }
    });
});
