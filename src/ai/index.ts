import { maxNIS } from './max-n-is';
import { Score, maxScore } from './score';

import { GameState, Player, getNextGameStates } from 'models/game-state';

// -----------------------------------------------------------------------------

/** An enum which represents different levels of difficulty for the computer
 * opponent. */
export enum Difficulty { easy, normal, hard }

/** This function will do a computer move. The calculation takes around one
 * second. A difficulty can be passed to specify how intelligently the computer
 * will play. */
export function makeComputerMove(gs: GameState, difficulty = Difficulty.easy): GameState {
    const nextGSs = getNextGameStates(gs);

    const scores = [];
    for (let i = 0, ie = nextGSs.length; i < ie; i++) {
        const score = maxNIS(nextGSs[i]);
        // winning moves are performed immediately
        if (score[gs.player] === maxScore) {
            return nextGSs[i];
        }
        scores.push(score);
    }
    updateScores(nextGSs, scores, gs.player);

    const i = selectMove(gs.player, scores, difficulty);
    return nextGSs[i];
}

// -----------------------------------------------------------------------------

const calcTime = 800;

function updateScores(nextGSs: GameState[], scores: Score[], player: Player): void {
    const maxI = nextGSs.length;

    let bestScore = 0;
    let depth = 1;
    let i = 0;

    const begin = Date.now();
    while (Date.now() - begin < calcTime) {
        scores[i] = maxNIS(nextGSs[i], depth, bestScore);
        if (bestScore < scores[i][player]) {
            bestScore = scores[i][player];
        }

        i += 1;
        if (i >= maxI) {
            bestScore = 0;
            depth += 1;
            i = 0;
        }
    }
}

// -----------------------------------------------------------------------------

interface IndexScore {
    index: number;
    score: number; // players score
}

function sortIndexScore(a: IndexScore, b: IndexScore): number {
    return b.score - a.score;
}

// -----------------------------------------------------------------------------

/** If the random number is below the chance, the current score (which is the
 * better one) will be taken. If random number is above, the next (worse) score
 * will be considered. */
const mapDifficultyChanceForLowerMove = {
    [Difficulty.easy]: 0.8,
    [Difficulty.normal]: 0.5,
    [Difficulty.hard]: 0,
};

function selectMove(player: Player, scores: Score[], difficulty: Difficulty): number {
    const indexScores = scores.map((score, index) => ({index, score: score[player]}));
    indexScores.sort(sortIndexScore);

    const chanceToTakeLowerScore = mapDifficultyChanceForLowerMove[difficulty];

    let selectedI = 0;
    while (chanceToTakeLowerScore > Math.random()) {
        selectedI++;
        if (selectedI >= indexScores.length) {
            selectedI = 0;
        }
    }
    return indexScores[selectedI].index;
}