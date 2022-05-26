import {
    deepStrictEqual as isEqual,
    notDeepStrictEqual as isNotEqual,
} from "assert";

import {
    GameState,
    createGameState,
    getNextGameStates,
} from "../game/GameState";

import { AILevel } from "./AILevel";
import { calcNextGameState } from "./maxNIS";

// -----------------------------------------------------------------------------

describe("maxNIS/" + calcNextGameState.name, () => {
    it("should return one of the next game states", () => {
        const gs = createGameState(true, true, true, true) as GameState;
        const nextGSs = getNextGameStates(gs);
        const calcedGS = calcNextGameState(gs);

        let numOfMatchingStates = 0;
        for (let i = 0, ie = nextGSs.length; i < ie; i++) {
            try {
                isEqual(calcedGS, nextGSs[i]);
                numOfMatchingStates += 1;
            } catch (e) {} // eslint-disable-line no-empty
        }
        isEqual(numOfMatchingStates, 1);
    });

    it("difficulty hard should not return the same game state as easy (3 tries)", () => {
        const gs = createGameState(true, true, true, true) as GameState;
        const gsHard = calcNextGameState(gs, AILevel.hard);
        const execTest = () => {
            const gsEasy = calcNextGameState(gs, AILevel.easy);
            isNotEqual(gsEasy, gsHard);
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
