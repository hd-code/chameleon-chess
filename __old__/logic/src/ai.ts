import { GameState, getNextGameStates, isGameOver } from "./game-state";
import { getPawnRole } from "./pawn";
import { Role } from "./role";
import { Player } from "./player";

// -----------------------------------------------------------------------------

/** An enum which represents different levels of difficulty for the computer
 * opponent. */
export enum AILevel {
  easy,
  normal,
  hard,
}

/** This function will do a computer move. The calculation takes around one
 * second. A difficulty can be passed to specify how intelligently the computer
 * will play. */
export function calcNextGameState(
  gs: GameState,
  difficulty = AILevel.easy,
): GameState {
  const nextGSs = getNextGameStates(gs);

  const scores = [];
  for (let i = 0, ie = nextGSs.length; i < ie; i++) {
    const nextGS = nextGSs[i];
    const score = maxNIS(nextGS);
    // winning moves are performed immediately
    if (score[gs.player] === maxScore) {
      return nextGS;
    }
    scores.push(score);
  }
  updateScores(nextGSs, scores, gs.player);

  const i = selectMove(gs.player, scores, difficulty);
  return nextGSs[i];
}

// -----------------------------------------------------------------------------

const maxScore = 1;

type Score = { [player in Player]: number };

function getZeroScore(): Score {
  return { 0: 0, 1: 0, 2: 0, 3: 0 };
}

/** Do not use this on zero vectors or scores with negative values! */
function normalizeScore(score: Score): Score {
  const sum = score[0] + score[1] + score[2] + score[3];
  return {
    0: score[0] / sum,
    1: score[1] / sum,
    2: score[2] / sum,
    3: score[3] / sum,
  };
}

// -----------------------------------------------------------------------------

function maxNIS(gs: GameState, depth = 0, parentsBestScore = 0): Score {
  if (isGameOver(gs) || depth <= 0) {
    return evalGS(gs);
  }

  const player = gs.player;
  const nextGSs = getNextGameStates(gs);
  const pruningLimit = maxScore - parentsBestScore; // immediate & shallow pruning

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
  player: Player,
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

/** The move is chosen randomly from a list of the best moves. The range
 * specifies how, many entries will be in the list. The longer the list is, the
 * more of the worse moves will be in the list. */
const mapLevelToRangeOfMoves = {
  [AILevel.easy]: 0.5,
  [AILevel.normal]: 0.3,
  [AILevel.hard]: 0,
};

function selectMove(
  player: Player,
  scores: Score[],
  difficulty: AILevel,
): number {
  const indexScores = makeIndexScores(scores, player);
  const sum = calcIndexScoreSum(indexScores);
  const targetSum = sum * mapLevelToRangeOfMoves[difficulty] * Math.random();
  return findTargetSum(indexScores, targetSum).index;
}

// -----------------------------------------------------------------------------

interface IndexScore {
  index: number;
  score: number; // players score
}

function makeIndexScores(scores: Score[], player: Player): IndexScore[] {
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

function calcIndexScoreSum(scores: IndexScore[]): number {
  let result = 0;
  for (let i = 0, ie = scores.length; i < ie; i++) {
    result += scores[i].score;
  }
  return result;
}

function findTargetSum(scores: IndexScore[], targetSum: number): IndexScore {
  let sum = 0;
  for (let i = 0, ie = scores.length; i < ie; i++) {
    sum += scores[i].score;
    if (targetSum <= sum) {
      return scores[i];
    }
  }
  return scores[scores.length - 1];
}
