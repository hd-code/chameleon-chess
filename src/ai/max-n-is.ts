import { GameState, getNextGameStates, isGameOver, Role, getRole } from '../models/game-state';
import { Score, getZeroScore, maxScore, normalizeScore } from './score';

// -----------------------------------------------------------------------------

export function maxNIS(gs: GameState, depth = 0, parentsBestScore = 0): Score {
    if (isGameOver(gs) || depth <= 0) {
        return evalGS(gs);
    }

    const player = gs.player;
    const nextGSs = getNextGameStates(gs);
    const pruningLimit = maxScore - parentsBestScore; // immediate & shallow pruning

    let bestScore = maxNIS(nextGSs[0], depth - 1);

    for (let i = 1, ie = nextGSs.length; i < ie; i++) {
        if (bestScore[player] >= pruningLimit) { // immediate & shallow pruning
            break;
        }

        const nextScore = maxNIS(nextGSs[i], depth - 1, bestScore[player]);
        if (bestScore[player] < nextScore[player]) {
            bestScore = nextScore;
        }
    }

    return bestScore;
}

// -----------------------------------------------------------------------------

const mapRoleScore = {
    [Role.knight]: 101,
    [Role.bishop]: 102,
    [Role.rook]:   103,
    [Role.queen]:  105,
};

function evalGS(gs: GameState): Score {
    const result = getZeroScore();
    for (let i = 0, ie = gs.pawns.length; i < ie; i++) {
        const pawn = gs.pawns[i];
        const role = getRole(gs.pawns[i]);
        result[pawn.player] += mapRoleScore[role];
    }
    return normalizeScore(result);
}