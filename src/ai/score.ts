import { Player } from '../models/game-state';

// -----------------------------------------------------------------------------

export const maxScore = 1;

export type Score = {[player in Player]: number};

export function getZeroScore(): Score {
    return { 0: 0, 1: 0, 2: 0, 3: 0 };
}

/** Do not use this on zero vectors or scores with negative values!  */
export function normalizeScore(score: Score): Score {
    const sum = sumScore(score);
    return {
        0: score[0] / sum,
        1: score[1] / sum,
        2: score[2] / sum,
        3: score[3] / sum,
    };
}

// -----------------------------------------------------------------------------

function sumScore(score: Score): number {
    return score[0] + score[1] + score[2] + score[3];
}