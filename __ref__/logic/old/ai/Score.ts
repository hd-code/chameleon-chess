import { Color } from "../Color";

// -----------------------------------------------------------------------------

export const MAX_SCORE = 1;

export type Score = { [player in Color]: number };

export function getZeroScore(): Score {
    return {
        [Color.red]: 0,
        [Color.green]: 0,
        [Color.yellow]: 0,
        [Color.blue]: 0,
    };
}

/** Do not use this on zero vectors or scores with negative values! */
export function normalizeScore(score: Score): Score {
    const sum = score[0] + score[1] + score[2] + score[3];
    return {
        [Color.red]: score[Color.red] / sum,
        [Color.green]: score[Color.green] / sum,
        [Color.yellow]: score[Color.yellow] / sum,
        [Color.blue]: score[Color.blue] / sum,
    };
}
