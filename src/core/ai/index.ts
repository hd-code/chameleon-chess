import { maxNIS } from './max-n-is';
import { Score, maxScore } from './score';

import { GameState, Player, getNextGameStates } from 'core/game-state';

// -----------------------------------------------------------------------------

/** An enum which represents different levels of difficulty for the computer
 * opponent. */
export enum Difficulty {
    easy, normal, hard,
}

/** This function will do a computer move. The calculation takes around one
 * second. A difficulty can be passed to specify how intelligently the computer
 * will play. */
export function makeComputerMove(gs: GameState, difficulty = Difficulty.easy): GameState {
    const nextGSs = getNextGameStates(gs);

    const scores = [];
    for (let i = 0, ie = nextGSs.length; i < ie; i++) {
        const nextGS = nextGSs[i] as GameState;
        const score = maxNIS(nextGS);
        // winning moves are performed immediately
        if (score[gs.player] === maxScore) {
            return nextGS;
        }
        scores.push(score);
    }
    updateScores(nextGSs, scores, gs.player);

    const i = selectMove(gs.player, scores, difficulty);
    return nextGSs[i] as GameState;
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
        scores[i] = maxNIS(nextGSs[i] as GameState, depth, bestScore);

        const score = scores[i] as Score;
        if (bestScore < score[player]) {
            bestScore = score[player];
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

/** The move is chosen randomly from a list of the best moves. The range
 * specifies how, many entries will be in the list. The longer the list is, the
 * more of the worse moves will be in the list. */
const mapDifficultyToRangeOfMoves = {
    [Difficulty.easy]: 0.5,
    [Difficulty.normal]: 0.25,
    [Difficulty.hard]: 0,
};

function selectMove(player: Player, scores: Score[], difficulty: Difficulty): number {
    const indexScores = scores.map((score, index) => ({index, score: score[player]}));
    indexScores.sort(sortIndexScore);

    const rangeOfMoves = mapDifficultyToRangeOfMoves[difficulty] * scores.length;
    const selectedI = Math.floor(Math.random() * rangeOfMoves);

    return (indexScores[selectedI] as IndexScore).index;
}

// -----------------------------------------------------------------------------

interface IndexScore {
    index: number;
    score: number; // players score
}

function sortIndexScore(a: IndexScore, b: IndexScore): number {
    return b.score - a.score;
}
