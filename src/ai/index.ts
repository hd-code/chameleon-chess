import { GameState, getNextGameStates, Player } from '../models/game-state';
import { maxNIS } from './max-n-is';
import { Score, maxScore } from './score';

// -----------------------------------------------------------------------------

export enum Difficulty { easy, normal, hard }

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

const mapDifficultyChance = {
    [Difficulty.easy]: 0.7,
    [Difficulty.normal]: 0.5,
    [Difficulty.hard]: 0,
};

function selectMove(player: Player, scores: Score[], difficulty: Difficulty): number {
    const indexScores = scores.map((score, index) => ({index, score: score[player]}));
    indexScores.sort(sortIndexScore);

    let selectedI = 0;

    while (Math.random() < mapDifficultyChance[difficulty]) {
        selectedI++;
        if (selectedI >= indexScores.length) {
            selectedI = 0;
        }
    }

    return indexScores[selectedI].index;
}