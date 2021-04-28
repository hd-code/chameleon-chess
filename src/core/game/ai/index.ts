import { GameState, getNextGameStates } from "../game-state";
import { Player } from "../players";
import { maxNIS } from "./max-n-is";
import { Score, maxScore } from "./score";

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
const mapLevelToPropForWorseMove = {
  [AILevel.easy]: 0.2,
  [AILevel.normal]: 0.1,
  [AILevel.hard]: 0,
};

function selectMove(
  player: Player,
  scores: Score[],
  difficulty: AILevel,
): number {
  const indexScores = scores.map((score, index) => ({
    index,
    score: score[player],
  }));
  indexScores.sort(sortIndexScore);

  let index = 0;
  while (Math.random() < mapLevelToPropForWorseMove[difficulty]) {
    index += 1;
  }

  return indexScores[index].index;
}

// -----------------------------------------------------------------------------

interface IndexScore {
  index: number;
  score: number; // players score
}

function sortIndexScore(a: IndexScore, b: IndexScore): number {
  return b.score - a.score;
}
