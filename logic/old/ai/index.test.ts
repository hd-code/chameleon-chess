import * as assert from "assert/strict";
import { createGameState, getNextGameStates } from "../GameState";
import { AILevel } from "./AILevel";
import { calcNextGameState } from "./maxNIS";

// -----------------------------------------------------------------------------

describe("ai/" + calcNextGameState.name, function () {
    it("should return one of the next game states", function () {
        const gs = createGameState(true, true, true, true);
        const nextGSs = getNextGameStates(gs);
        const calcedGS = calcNextGameState(gs);

        let numOfMatchingStates = 0;
        for (let i = 0, ie = nextGSs.length; i < ie; i++) {
            try {
                assert.deepEqual(calcedGS, nextGSs[i]);
                numOfMatchingStates += 1;
            } catch (e) {} // eslint-disable-line no-empty
        }
        assert.deepEqual(numOfMatchingStates, 1);
    });

    const tries = 7;
    it(`difficulty hard should not return the same game state as easy (${tries} tries)`, function (this: Mocha.Context) {
        this.timeout(tries * 1000);

        const gs = createGameState(true, true, true, true);
        const gsHard = calcNextGameState(gs, AILevel.hard);

        let nOfTries = 0;
        let wasDifferent = false;

        while (!wasDifferent) {
            try {
                nOfTries++;
                const gsEasy = calcNextGameState(gs, AILevel.easy);
                assert.notDeepEqual(gsEasy, gsHard);
                wasDifferent = true;
            } catch {} // eslint-disable-line no-empty
        }

        assert.ok(nOfTries <= tries, `number of tries was more than ${tries}`);
    });
});
