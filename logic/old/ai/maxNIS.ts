import { Color } from "../Color";
import { GameState, getNextGameStates, isGameOver } from "../GameState";
import { getPawnRole } from "../Pawn";
import { Role } from "../Role";
import { AILevel, getNthBestMoveToSelect } from "./AILevel";
import { MAX_SCORE, Score, getZeroScore, normalizeScore } from "./Score";

// -----------------------------------------------------------------------------

/** This function will do a computer move. The calculation takes around one
 * second. A difficulty can be passed to specify how intelligently the computer
 * will play. */
export function calcNextGameState(
    gs: GameState,
    difficulty = AILevel.hard,
): GameState {
    const nextGSs = getNextGameStates(gs);

    const scores: Score[] = [];
    for (let i = 0, ie = nextGSs.length; i < ie; i++) {
        const nextGS = nextGSs[i];
        const score = maxNIS(nextGS);
        // winning moves are performed immediately
        if (score[gs.player] === MAX_SCORE) {
            return nextGS;
        }
        scores.push(score);
    }
    updateScores(nextGSs, scores, gs.player);

    const i = selectMove(gs.player, scores, difficulty);
    return nextGSs[i];
}

// -----------------------------------------------------------------------------

function maxNIS(gs: GameState, depth = 0, parentsBestScore = 0): Score {
    if (isGameOver(gs) || depth <= 0) {
        return evalGS(gs);
    }

    const player = gs.player;
    const nextGSs = getNextGameStates(gs);
    const pruningLimit = MAX_SCORE - parentsBestScore; // immediate & shallow pruning

    let bestScore = maxNIS(nextGSs[0], depth - 1);

    for (let i = 1, ie = nextGSs.length; i < ie; i++) {
        // immediate & shallow pruning
        if (bestScore[player] >= pruningLimit) {
            break;
        }

        const nextScore = maxNIS(nextGSs[i], depth - 1, bestScore[player]);
        if (bestScore[player] < nextScore[player]) {
            bestScore = nextScore;
        }
    }

    return bestScore;
}

function evalGS(gs: GameState): Score {
    const result = getZeroScore();
    for (let i = 0, ie = gs.pawns.length; i < ie; i++) {
        const pawn = gs.pawns[i];
        const role = getPawnRole(pawn);
        result[pawn.player] += mapRoleScore[role];
    }
    return normalizeScore(result);
}

const mapRoleScore = {
    [Role.knight]: 101,
    [Role.bishop]: 102,
    [Role.rook]: 103,
    [Role.queen]: 105,
};

// -----------------------------------------------------------------------------

const calcTime = 800;

function updateScores(
    nextGSs: GameState[],
    scores: Score[],
    player: Color,
): void {
    const maxI = nextGSs.length;

    let bestScore = 0;
    let depth = 1;
    let i = 0;

    const begin = Date.now();
    while (Date.now() - begin < calcTime) {
        scores[i] = maxNIS(nextGSs[i], depth, bestScore);

        const score = scores[i];
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

function selectMove(
    player: Color,
    scores: Score[],
    difficulty: AILevel,
): number {
    const indexScores = makeIndexScores(scores, player);
    const selectI = getNthBestMoveToSelect(difficulty) % indexScores.length;
    return indexScores[selectI].index;
}

// -----------------------------------------------------------------------------

interface IndexScore {
    index: number;
    score: number; // players score
}

function makeIndexScores(scores: Score[], player: Color): IndexScore[] {
    const indexScores = scores.map((score, index) => ({
        index,
        score: score[player],
    }));
    indexScores.sort(sortIndexScore);
    return indexScores;
}

function sortIndexScore(a: IndexScore, b: IndexScore): number {
    return b.score - a.score;
}
