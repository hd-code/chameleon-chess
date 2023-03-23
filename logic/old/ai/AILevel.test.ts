import * as assert from "assert/strict";
import { AILevel, getNthBestMoveToSelect } from "./AILevel";

describe("AILevel", () => {
    describe(getNthBestMoveToSelect.name, () => {
        const nOfTries = 100000;
        const tolerance = 0.01 * nOfTries;

        const testCases: [AILevel, number, number, number, number][] = [
            [AILevel.hard, 1, 0, 0, 0],
            [AILevel.normal, 0.9, 0.09, 0.009, 0.0009],
            [AILevel.easy, 0.5, 0.25, 0.125, 0.0625],
        ];

        testCases.forEach(([level, ...pIndexes]) => {
            const wantIndexes = pIndexes.map((p) => Math.round(p * nOfTries));
            it(`AILevel: ${AILevel[level]} – want: ${wantIndexes} in indexes`, () => {
                const got = [0, 0, 0, 0];
                for (let i = 0; i < nOfTries; i++) {
                    const index = getNthBestMoveToSelect(level);
                    got[index] += 1;
                }
                wantIndexes.forEach((want, i) => {
                    assert.ok(
                        want - tolerance <= got[i],
                        `number of ${i}'s is only ${got[i]}`,
                    );
                    assert.ok(
                        want + tolerance >= got[i],
                        `number of ${i}'s is too high (${got[i]})`,
                    );
                });
            });
        });
    });
});
